# HOTEL SUNNY POINT — SUPABASE ARCHITECTURE & IMPLEMENTATION PLAN
*Multi-Tenant Relational Schema, Row Level Security Policies, Storage & Key Management*

---

## 1. Architectural Overview & Tenant Scoping Strategy

To transform the Hotel Sunny Point platform from a single-restaurant demonstration into a robust, enterprise-grade multi-restaurant SaaS engine, all relational tables enforce strict **`restaurant_id` scoping**.

```
                           ┌────────────────────────┐
                           │      restaurants       │
                           │  (Tenant Root Entity)  │
                           └───────────┬────────────┘
                                       │ 1:1
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
     ┌─────────────────────┐                       ┌─────────────────────┐
     │ restaurant_settings │                       │   admin_profiles    │
     │  (Brand & Contacts) │                       │ (RBAC / Auth Links) │
     └─────────────────────┘                       └─────────────────────┘
                │ 1:N                                         │
    ┌───────────┴───────────┬───────────────────┐             │
    ▼                       ▼                   ▼             ▼
┌─────────────────┐ ┌───────────────┐ ┌────────────────┐ ┌────────────┐
│ menu_categories │ │  promotions   │ │cust_feedback   │ │ audit_logs │
└────────┬────────┘ └───────────────┘ └────────────────┘ └────────────┘
         │ 1:N
         ▼
┌─────────────────┐
│   menu_items    │
└────────┬────────┘
         │ 1:N
         ▼
┌─────────────────┐
│menu_item_images │
└─────────────────┘
```

---

## 2. PostgreSQL DDL Schema Definitions

### 2.1 Enums & Extensions
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Domain Enums
CREATE TYPE dietary_type AS ENUM ('pure_veg', 'vegan', 'jain_available');
CREATE TYPE price_status_type AS ENUM ('verified', 'provisional_sample');
CREATE TYPE feedback_status_type AS ENUM ('new', 'reviewed', 'archived');
CREATE TYPE user_role_type AS ENUM ('super_admin', 'store_manager', 'kitchen_staff', 'auditor');
```

### 2.2 Core Tenant & Settings Tables
```sql
-- 1. Restaurants (Tenants)
CREATE TABLE public.restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL, -- {"en": "Hotel Sunny Point", "mr": "हॉटेल सनी पॉईंट", "hi": "होटल सनी पॉइंट"}
    founding_year INTEGER NOT NULL DEFAULT 1965,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Restaurant Settings
CREATE TABLE public.restaurant_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    tagline JSONB NOT NULL,
    heritage_text JSONB NOT NULL,
    south_indian_origin_year INTEGER DEFAULT 1995,
    dietary_note JSONB NOT NULL,
    primary_phone TEXT NOT NULL,
    secondary_phone TEXT,
    email TEXT NOT NULL,
    address JSONB NOT NULL,
    city TEXT NOT NULL DEFAULT 'Bhadrawati',
    state TEXT NOT NULL DEFAULT 'Maharashtra',
    pincode TEXT NOT NULL DEFAULT '442902',
    latitude NUMERIC(9,6) DEFAULT 20.1017,
    longitude NUMERIC(9,6) DEFAULT 79.1205,
    google_maps_url TEXT,
    instagram_url TEXT,
    operating_hours JSONB NOT NULL,
    fssai_number TEXT NOT NULL DEFAULT '0000907350',
    primary_color TEXT NOT NULL DEFAULT '#D4AF37',
    accent_color TEXT NOT NULL DEFAULT '#E07A2B',
    logo_url TEXT NOT NULL,
    facade_image_url TEXT NOT NULL,
    currency_symbol TEXT NOT NULL DEFAULT '₹',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_restaurant_settings UNIQUE (restaurant_id)
);
```

### 2.3 Menu & Catalog Tables
```sql
-- 3. Menu Categories
CREATE TABLE public.menu_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    badge JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_restaurant_category_slug UNIQUE (restaurant_id, slug)
);

-- 4. Menu Items
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name JSONB NOT NULL,
    short_description JSONB NOT NULL,
    full_description JSONB,
    price NUMERIC(10,2) NOT NULL,
    price_status price_status_type NOT NULL DEFAULT 'provisional_sample',
    price_note TEXT,
    image_url TEXT NOT NULL,
    dietary dietary_type NOT NULL DEFAULT 'pure_veg',
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_bestseller BOOLEAN NOT NULL DEFAULT false,
    is_chef_recommendation BOOLEAN NOT NULL DEFAULT false,
    is_signature BOOLEAN NOT NULL DEFAULT false,
    spiciness_level SMALLINT CHECK (spiciness_level IN (1, 2, 3)),
    serving_size TEXT,
    preparation_time_minutes INTEGER,
    ingredients JSONB DEFAULT '[]'::jsonb,
    allergens JSONB DEFAULT '[]'::jsonb,
    pairing_suggestions JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_year INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_restaurant_dish_slug UNIQUE (restaurant_id, slug)
);

-- 5. Menu Item Images (Gallery & Alternate Angles)
CREATE TABLE public.menu_item_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 2.4 Marketing, Feedback & Audit Tables
```sql
-- 6. Promotions & Special Offers
CREATE TABLE public.promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    title JSONB NOT NULL,
    subtitle JSONB NOT NULL,
    description JSONB NOT NULL,
    badge_text TEXT NOT NULL,
    banner_image_url TEXT NOT NULL,
    linked_dish_ids JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    coupon_code TEXT,
    discount_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Customer Feedback
CREATE TABLE public.customer_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    table_number TEXT,
    food_quality_rating SMALLINT NOT NULL CHECK (food_quality_rating BETWEEN 1 AND 5),
    taste_rating SMALLINT NOT NULL CHECK (taste_rating BETWEEN 1 AND 5),
    service_rating SMALLINT NOT NULL CHECK (service_rating BETWEEN 1 AND 5),
    cleanliness_rating SMALLINT NOT NULL CHECK (cleanliness_rating BETWEEN 1 AND 5),
    overall_rating NUMERIC(3,2) NOT NULL,
    comment TEXT,
    status feedback_status_type NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Admin Profiles (RBAC Linked to auth.users)
CREATE TABLE public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    role user_role_type NOT NULL DEFAULT 'store_manager',
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_user_restaurant UNIQUE (user_id, restaurant_id)
);

-- 9. Audit Logs
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
    entity_name TEXT NOT NULL, -- e.g. 'menu_items', 'restaurant_settings'
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    before_state JSONB,
    after_state JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## 3. Row Level Security (RLS) Policies

All tables have RLS enabled by default:

```sql
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_item_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
```

### 3.1 Public Read-Only Access Policies
Customers scanning QR codes can read active menu items without logging in:
```sql
-- Public can read active restaurants
CREATE POLICY "Public read active restaurants"
    ON public.restaurants FOR SELECT
    USING (is_active = true);

-- Public can read restaurant settings
CREATE POLICY "Public read restaurant settings"
    ON public.restaurant_settings FOR SELECT
    USING (true);

-- Public can read active categories
CREATE POLICY "Public read active categories"
    ON public.menu_categories FOR SELECT
    USING (is_active = true);

-- Public can read active menu items
CREATE POLICY "Public read menu items"
    ON public.menu_items FOR SELECT
    USING (true);

-- Public can read active promotions
CREATE POLICY "Public read active promotions"
    ON public.promotions FOR SELECT
    USING (is_active = true AND CURRENT_DATE BETWEEN start_date AND end_date);

-- Public can submit customer feedback
CREATE POLICY "Public insert feedback"
    ON public.customer_feedback FOR INSERT
    WITH CHECK (true);
```

### 3.2 Tenant Admin Scoped Write Policies
Admins can only mutate records belonging to their assigned `restaurant_id`:
```sql
-- Helper function to extract user's assigned restaurant_id
CREATE OR REPLACE FUNCTION public.get_auth_restaurant_id()
RETURNS UUID AS $$
  SELECT restaurant_id FROM public.admin_profiles 
  WHERE user_id = auth.uid() AND is_active = true 
  LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Admin update menu items policy
CREATE POLICY "Admin manage menu items"
    ON public.menu_items FOR ALL
    USING (restaurant_id = public.get_auth_restaurant_id())
    WITH CHECK (restaurant_id = public.get_auth_restaurant_id());

-- Admin manage categories policy
CREATE POLICY "Admin manage categories"
    ON public.menu_categories FOR ALL
    USING (restaurant_id = public.get_auth_restaurant_id())
    WITH CHECK (restaurant_id = public.get_auth_restaurant_id());

-- Admin manage promotions policy
CREATE POLICY "Admin manage promotions"
    ON public.promotions FOR ALL
    USING (restaurant_id = public.get_auth_restaurant_id())
    WITH CHECK (restaurant_id = public.get_auth_restaurant_id());

-- Admin read customer feedback
CREATE POLICY "Admin view feedback"
    ON public.customer_feedback FOR SELECT
    USING (restaurant_id = public.get_auth_restaurant_id());
```

---

## 4. Supabase Storage Architecture

Two dedicated storage buckets are configured:

1. **`restaurant-public` (Public Bucket)**:
   - Contains: Dish photos (`/dishes/*`), Brand logos (`/brand/*`), and Promotion banners (`/promotions/*`).
   - RLS Policy: Anyone can read (`GET`). Only authenticated admins belonging to the tenant can `INSERT` / `UPDATE` / `DELETE`.
   - CDN Cache TTL: 30 days (`Cache-Control: public, max-age=2592000`).

2. **`restaurant-private` (Private Authenticated Bucket)**:
   - Contains: Monthly audit log exports, FSSAI compliance documents, raw feedback CSV exports.
   - Access: Signed URLs only via Next.js Server Actions with active admin JWT verification.

---

## 5. Environment Secrets & Key Separation

```env
# .env.local (Required for Supabase Integration)

# Exposed to Client Browser (Constrained by RLS)
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# RESTRICTED SERVER-ONLY KEY (NEVER EXPOSED TO BROWSER)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Application Feature Flag (Zero-Downtime Migration Switch)
NEXT_PUBLIC_DATA_SOURCE=supabase  # or 'local_demo'
```
