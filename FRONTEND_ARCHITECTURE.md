# HOTEL SUNNY POINT — FRONTEND ARCHITECTURE & DATA LAYER SPECIFICATION
*Prepared by Senior Frontend Engineer & System Architect*

---

## 1. High-Level Architecture Overview

The Hotel Sunny Point application is built as a production-grade, two-sided web platform utilizing the **Next.js 15 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 15 APP ROUTER                          │
├───────────────────────────────────┬────────────────────────────────────┤
│       CUSTOMER APPLICATION        │        ADMINISTRATION DASHBOARD    │
│  - / (Homepage & Heritage)        │  - /admin/login (Authentication)   │
│  - /menu (Full Interactive Menu)  │  - /admin (Operations Overview)    │
│  - /menu/[category] (Filtered)    │  - /admin/menu (Dish CRUD & Price) │
│  - /dish/[slug] (Deep Dish View)  │  - /admin/categories (Categories)  │
│  - /about (1965/1995 Gazette)     │  - /admin/promotions (Offers)      │
│  - /offers (Seasonal Specials)    │  - /admin/feedback (Guest Reviews) │
│  - /feedback (Interactive Form)   │  - /admin/qr (QR Table Tent Studio)│
│  - /contact (Location & Phone)    │  - /admin/settings (Brand Config)  │
└───────────────────────────────────┴────────────────────────────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
       ┌─────────────────────┐             ┌─────────────────────┐
       │  RestaurantContext  │             │   Language Engine   │
       │  (Reactive State)   │             │   (English & मराठी)  │
       └──────────┬──────────┘             └─────────────────────┘
                  │
                  ▼
       ┌─────────────────────────────────────────────────────────┐
       │             RESTAURANT REPOSITORY PATTERN               │
       │  - Isolates data storage from presentation components    │
       │  - Current: Synchronized Reactive LocalStorage Engine    │
       │  - Cross-tab / cross-window event synchronization       │
       │  - Future Phase 4: Direct Supabase / PostgreSQL Client  │
       └─────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure & Separation of Concerns

```
src/
├── app/
│   ├── layout.tsx              # Root HTML, SEO meta tags, viewport settings, RestaurantProvider
│   ├── globals.css             # Tailwind directives, Google font imports, print styles
│   ├── page.tsx                # Homepage (Hero, Gazette, Dosa Feature, Categories, Global Bites)
│   ├── menu/
│   │   ├── page.tsx            # Full Menu with live search, sticky category pills, badge filters
│   │   └── [category]/page.tsx # Dynamic Category page (/menu/south-indian, /menu/soups, etc.)
│   ├── dish/
│   │   └── [slug]/page.tsx     # Permanent Dish shareable route with ingredients and pairings
│   ├── about/page.tsx          # 1965 Origin, 1995 Dosa story, Gazette poster zoom viewer
│   ├── offers/page.tsx         # Monsoon Affairs & Seasonal Campaigns with coupon codes
│   ├── feedback/page.tsx       # 5-Criteria guest rating submission form & Google redirect
│   ├── contact/page.tsx        # Location, verified phone numbers, facade photo & directions
│   └── admin/
│       ├── layout.tsx          # Dedicated admin layout with sidebar & live preview button
│       ├── login/page.tsx      # Pre-filled evaluation login page
│       ├── page.tsx            # Overview stats, quick controls, and inline price editor
│       ├── menu/page.tsx       # Complete menu CRUD, search, and category management
│       ├── categories/page.tsx # Category manager with reordering and safe deletion checks
│       ├── promotions/page.tsx # Campaign activator with start/end date validation
│       ├── feedback/page.tsx   # Guest review listing and status management
│       ├── qr/page.tsx         # Native QR code generator and printable Table Tent Card
│       └── settings/page.tsx   # Configurable restaurant tenant settings
├── components/
│   ├── ui/
│   │   ├── Header.tsx          # Navigation bar with language switcher & mobile drawer
│   │   ├── Footer.tsx          # Heritage footer with phone, address, timings, FSSAI note
│   │   ├── FoodCard.tsx        # Dish card with veg badge, price status, and quick view
│   │   └── DishModal.tsx       # Detailed popup dialog for ingredients & full narrative
│   └── home/
│       ├── HeroSection.tsx
│       ├── HeritageGazetteSection.tsx
│       ├── SignatureDosaFeature.tsx
│       ├── CategoryGrid.tsx
│       ├── GlobalBitesSection.tsx
│       └── SeasonalSpecialsSection.tsx
├── context/
│   └── RestaurantContext.tsx   # React Context providing live state, t(), and mutation functions
├── data/
│   ├── initial-data.ts         # Verified authentic seed dataset from Phase 1 asset discovery
│   └── restaurant-repository.ts# Repository abstraction with LocalStorage persistence
└── types/
    └── index.ts                # TypeScript domain models and interfaces
```

---

## 3. Data Flow & Reactive Persistence Engine

### 3.1 The Problem
In standard client demonstrations, modifying a menu item or price in the Admin interface often requires hardcoding changes, reloading mock files, or setting up a full live backend prematurely.

### 3.2 The Solution: Repository Pattern
1. All UI components communicate solely through `useRestaurant()`, which delegates mutations to `restaurantRepo` (`restaurant-repository.ts`).
2. When an administrator edits a dish price (e.g., Masala Dosa from ₹90 to ₹95), `restaurantRepo` writes the updated state to `localStorage` under `sunny_point_restaurant_data_v1` and broadcasts a `sunny_point_data_changed` window event.
3. Every open customer tab or browser window immediately catches the broadcast and updates its React state in-place without requiring a page refresh.
4. If the page is refreshed or restarted, the data persists seamlessly.
5. An administrator can click **"Reset Demo Data"** at any time in the admin sidebar to instantly restore original research defaults.

---

## 4. Multi-Tenant SaaS Preparation

Although Hotel Sunny Point is the flagship debut tenant, the application is structurally designed for future SaaS multi-tenancy:

1. **Foreign Key Scoping**: Every `MenuItem`, `MenuCategory`, `Promotion`, and `CustomerFeedback` carries a mandatory `restaurantId: string` attribute.
2. **Dynamic Tenant Settings**: Restaurant name, tagline, phones, address, colors, logo URL, and operating hours are read entirely from `restaurant.settings` rather than hardcoded in JSX.
3. **Multi-Tenant URL Ready**: The URL structure easily adapts to `/r/[tenant-slug]/menu` in future releases by passing the tenant slug to the repository.

---

## 5. Phase 4 Supabase Migration Blueprint

When connecting Supabase in Phase 4:
1. **Zero Presentation Changes**: Neither `Header.tsx`, `FoodCard.tsx`, `MenuPage`, nor `AdminMenuPage` will need a single line of code modified.
2. **Repository Swap**: Replace the `localStorage` read/write blocks in `RestaurantRepository` with `@supabase/supabase-js` table queries:
   ```ts
   // Phase 4 drop-in replacement:
   async updateMenuItem(id: string, updates: Partial<MenuItem>) {
     const { data, error } = await supabase
       .from('menu_items')
       .update(updates)
       .eq('id', id)
       .select()
       .single();
     if (error) throw error;
     return data;
   }
   ```
3. **Row Level Security (RLS)**: The database schema will enforce `WHERE restaurant_id = auth.uid()` so tenants can never cross-contaminate data.
