-- ==============================================================================
-- HOTEL SUNNY POINT — PRODUCTION SUPABASE MIGRATION 01: INITIAL SCHEMA
-- Description: Core Multi-Tenant Tables, Foreign Keys, Indexes & Constraints
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Domain Types & Enums
DO $$ BEGIN
    CREATE TYPE dietary_type AS ENUM ('pure_veg', 'vegan', 'jain_available');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE price_status_type AS ENUM ('verified', 'provisional_sample');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE feedback_status_type AS ENUM ('new', 'reviewed', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('super_admin', 'store_manager', 'kitchen_staff', 'auditor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Trigger Function for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Table: restaurants (Tenant Root Entity)
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL,
    founding_year INTEGER NOT NULL DEFAULT 1965,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_restaurants_updated_at
    BEFORE UPDATE ON public.restaurants
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 5. Table: restaurant_settings (1:1 with restaurants)
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
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
    CONSTRAINT uq_restaurant_settings_tenant UNIQUE (restaurant_id)
);

CREATE TRIGGER set_restaurant_settings_updated_at
    BEFORE UPDATE ON public.restaurant_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 6. Table: menu_categories
CREATE TABLE IF NOT EXISTS public.menu_categories (
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
    CONSTRAINT uq_menu_categories_slug UNIQUE (restaurant_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_menu_categories_restaurant ON public.menu_categories(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_categories_order ON public.menu_categories(restaurant_id, display_order);

CREATE TRIGGER set_menu_categories_updated_at
    BEFORE UPDATE ON public.menu_categories
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 7. Table: menu_items
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name JSONB NOT NULL,
    short_description JSONB NOT NULL,
    full_description JSONB,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
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
    preparation_time_minutes INTEGER CHECK (preparation_time_minutes > 0),
    ingredients JSONB DEFAULT '[]'::jsonb,
    allergens JSONB DEFAULT '[]'::jsonb,
    pairing_suggestions JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_year INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_menu_items_slug UNIQUE (restaurant_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant ON public.menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(restaurant_id, category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_order ON public.menu_items(restaurant_id, display_order);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(restaurant_id, is_available);

CREATE TRIGGER set_menu_items_updated_at
    BEFORE UPDATE ON public.menu_items
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 8. Table: menu_item_images (Gallery)
CREATE TABLE IF NOT EXISTS public.menu_item_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_item_images_dish ON public.menu_item_images(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_menu_item_images_tenant ON public.menu_item_images(restaurant_id);

-- 9. Table: promotions
CREATE TABLE IF NOT EXISTS public.promotions (
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
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_promotions_date_range CHECK (end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS idx_promotions_restaurant ON public.promotions(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON public.promotions(restaurant_id, is_active, start_date, end_date);

CREATE TRIGGER set_promotions_updated_at
    BEFORE UPDATE ON public.promotions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. Table: customer_feedback
CREATE TABLE IF NOT EXISTS public.customer_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    table_number TEXT,
    food_quality_rating SMALLINT NOT NULL CHECK (food_quality_rating BETWEEN 1 AND 5),
    taste_rating SMALLINT NOT NULL CHECK (taste_rating BETWEEN 1 AND 5),
    service_rating SMALLINT NOT NULL CHECK (service_rating BETWEEN 1 AND 5),
    cleanliness_rating SMALLINT NOT NULL CHECK (cleanliness_rating BETWEEN 1 AND 5),
    overall_rating NUMERIC(3,2) NOT NULL CHECK (overall_rating BETWEEN 1.0 AND 5.0),
    comment TEXT,
    status feedback_status_type NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_feedback_restaurant ON public.customer_feedback(restaurant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_feedback_status ON public.customer_feedback(restaurant_id, status);

-- 11. Table: admin_profiles (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    role user_role_type NOT NULL DEFAULT 'store_manager',
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_user_restaurant_admin UNIQUE (user_id, restaurant_id)
);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_user ON public.admin_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_restaurant ON public.admin_profiles(restaurant_id);

CREATE TRIGGER set_admin_profiles_updated_at
    BEFORE UPDATE ON public.admin_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 12. Table: audit_logs (Immutable Audit Trail)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
    entity_name TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PRICE_CHANGE', 'STATUS_CHANGE')),
    before_state JSONB,
    after_state JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_restaurant ON public.audit_logs(restaurant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(restaurant_id, entity_name, entity_id);
