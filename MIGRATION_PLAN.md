# HOTEL SUNNY POINT — ZERO-DOWNTIME BACKEND MIGRATION PLAN
*Step-by-Step Transition Strategy: Local Demonstration Repository to Supabase Engine*

---

## 1. Migration Philosophy & Safety Principles

1. **Zero UI Disruption**: The customer-facing menu, category pills, search bar, language switcher, dish modals, mobile dock, and administrative panels must remain 100% visually and interactively identical.
2. **Non-Destructive Execution**: No local demonstration files (`initial-data.ts`, `restaurant-repository.ts`) will be deleted. They will serve as an offline fallback and local development sandbox.
3. **Transparent Circuit Breaker**: If the Supabase API is unreachable, experiences latency spikes, or environment variables are absent, the application must seamlessly fall back to local cached repository data without presenting error screens to guests.
4. **Data Parity Verification**: Every dish, price, photo, category order, and Marathi translation must match the verified local dataset before public cutover.

---

## 2. Six-Phase Migration Roadmap

```
┌────────────────────────────────────────────────────────┐
│ Phase 4.1: Hybrid Repository Abstraction               │
│ - Introduce IMenuRepository interface                  │
│ - Keep existing LocalRepository as default             │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 4.2: Database Provisioning & Schema Migration    │
│ - Execute DDL scripts in Supabase SQL editor           │
│ - Establish RLS policies and table indexes             │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 4.3: Automated Seed Migration Script             │
│ - Run `scripts/seed-supabase.ts` via Service Role Key  │
│ - Populate 39 dishes, 7 categories, and settings       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 4.4: Asset Storage Synchronization               │
│ - Upload 39 dish photos to `restaurant-public` bucket  │
│ - Generate persistent Supabase CDN URLs                │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 4.5: Dual-Read & Parity Verification             │
│ - Run synthetic verification comparing Local vs Remote │
│ - Confirm 0 discrepancies across languages and prices  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 4.6: Safe Production Cutover & Fallback Circuit  │
│ - Set `NEXT_PUBLIC_DATA_SOURCE=supabase`               │
│ - Local fallback active in catch blocks                │
└────────────────────────────────────────────────────────┘
```

---

## 3. Implementation Blueprint

### 3.1 Step 1: Repository Interface Abstraction (`src/data/repository-interface.ts`)
To prevent refactoring React components, we formalize the exact contract already used by `RestaurantContext.tsx`:

```typescript
import { Restaurant, MenuItem, MenuCategory, Promotion, CustomerFeedback, RestaurantSettings } from "@/types";

export interface IMenuRepository {
  getRestaurant(): Promise<Restaurant>;
  getCategories(): Promise<MenuCategory[]>;
  getMenuItems(categoryId?: string): Promise<MenuItem[]>;
  getMenuItemBySlug(slug: string): Promise<MenuItem | undefined>;
  addMenuItem(item: Omit<MenuItem, "id" | "updatedAt">): Promise<MenuItem>;
  updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: string): Promise<void>;
  toggleItemAvailability(id: string): Promise<boolean>;
  toggleItemBestseller(id: string): Promise<boolean>;
  addCategory(cat: Omit<MenuCategory, "id">): Promise<MenuCategory>;
  updateCategory(id: string, updates: Partial<MenuCategory>): Promise<MenuCategory>;
  deleteCategory(id: string): Promise<void>;
  addPromotion(promo: Omit<Promotion, "id">): Promise<Promotion>;
  updatePromotion(id: string, updates: Partial<Promotion>): Promise<Promotion>;
  togglePromotionActive(id: string): Promise<boolean>;
  deletePromotion(id: string): Promise<void>;
  addFeedback(fb: Omit<CustomerFeedback, "id" | "createdAt" | "status">): Promise<CustomerFeedback>;
  updateFeedbackStatus(id: string, status: CustomerFeedback["status"]): Promise<void>;
  updateSettings(updates: Partial<RestaurantSettings>): Promise<RestaurantSettings>;
  resetToDefaults(): Promise<void>;
}
```

### 3.2 Step 2: Transparent Fallback Factory
In `src/data/repository-factory.ts`:
```typescript
import { IMenuRepository } from "./repository-interface";
import { localRestaurantRepo } from "./local-repository";
import { supabaseRestaurantRepo } from "./supabase-repository";

class ResilientRepositoryProxy implements IMenuRepository {
  private useSupabase = process.env.NEXT_PUBLIC_DATA_SOURCE === "supabase" && !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  public async getRestaurant(): Promise<Restaurant> {
    if (!this.useSupabase) {
      return localRestaurantRepo.getRestaurant();
    }
    try {
      return await supabaseRestaurantRepo.getRestaurant();
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local cached repository:", err);
      return localRestaurantRepo.getRestaurant();
    }
  }

  // All other methods implement this same transparent try/catch fallback...
}

export const restaurantRepo = new ResilientRepositoryProxy();
```

### 3.3 Step 3: Automated Database Seeder Script (`scripts/seed-supabase.ts`)
An automated migration script reads the structured research data from `src/data/initial-data.ts` and populates the Supabase database using the privileged `SUPABASE_SERVICE_ROLE_KEY`:

```typescript
import { createClient } from "@supabase/supabase-js";
import { initialSunnyPointRestaurant } from "../src/data/initial-data";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log("Starting Sunny Point database migration...");

  // 1. Insert Restaurant Root
  const { data: restaurant, error: rErr } = await supabase
    .from("restaurants")
    .upsert({
      slug: initialSunnyPointRestaurant.slug,
      name: initialSunnyPointRestaurant.settings.name,
      founding_year: initialSunnyPointRestaurant.settings.foundingYear,
      is_active: true,
    })
    .select()
    .single();

  if (rErr) throw rErr;
  const restaurantId = restaurant.id;
  console.log("✓ Seeded Restaurant record:", restaurantId);

  // 2. Insert Settings
  const { error: sErr } = await supabase.from("restaurant_settings").upsert({
    restaurant_id: restaurantId,
    tagline: initialSunnyPointRestaurant.settings.tagline,
    heritage_text: initialSunnyPointRestaurant.settings.heritageText,
    dietary_note: initialSunnyPointRestaurant.settings.dietaryNote,
    primary_phone: initialSunnyPointRestaurant.settings.primaryPhone,
    secondary_phone: initialSunnyPointRestaurant.settings.secondaryPhone,
    email: initialSunnyPointRestaurant.settings.email,
    address: initialSunnyPointRestaurant.settings.address,
    city: initialSunnyPointRestaurant.settings.city,
    operating_hours: initialSunnyPointRestaurant.settings.operatingHours,
    fssai_number: initialSunnyPointRestaurant.settings.fssaiNumber,
    primary_color: initialSunnyPointRestaurant.settings.primaryColor,
    logo_url: initialSunnyPointRestaurant.settings.logoUrl,
    facade_image_url: initialSunnyPointRestaurant.settings.facadeImageUrl,
  });
  if (sErr) throw sErr;
  console.log("✓ Seeded Restaurant Settings");

  // 3. Insert Categories
  const categoryIdMap = new Map<string, string>();
  for (const cat of initialSunnyPointRestaurant.categories) {
    const { data: cData, error: cErr } = await supabase
      .from("menu_categories")
      .upsert({
        restaurant_id: restaurantId,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        image_url: cat.image,
        display_order: cat.displayOrder,
        badge: cat.badge,
        is_active: cat.isActive,
      })
      .select()
      .single();
    if (cErr) throw cErr;
    categoryIdMap.set(cat.id, cData.id);
  }
  console.log(`✓ Seeded ${categoryIdMap.size} Categories`);

  // 4. Insert Menu Items (39 Dishes)
  const itemsToInsert = initialSunnyPointRestaurant.items.map((item) => ({
    restaurant_id: restaurantId,
    category_id: categoryIdMap.get(item.categoryId),
    slug: item.slug,
    name: item.name,
    short_description: item.shortDescription,
    full_description: item.fullDescription,
    price: item.price,
    price_status: item.priceStatus,
    price_note: item.priceNote,
    image_url: item.image,
    dietary: item.dietary,
    is_available: item.isAvailable,
    is_bestseller: item.isBestseller,
    is_chef_recommendation: item.isChefRecommendation,
    is_signature: item.isSignature,
    spiciness_level: item.spicinessLevel,
    serving_size: item.servingSize,
    preparation_time_minutes: item.preparationTimeMinutes,
    ingredients: item.ingredients,
    allergens: item.allergens,
    pairing_suggestions: item.pairingSuggestions,
    display_order: item.displayOrder,
    created_year: item.createdYear,
  }));

  const { error: iErr } = await supabase.from("menu_items").upsert(itemsToInsert);
  if (iErr) throw iErr;
  console.log(`✓ Seeded ${itemsToInsert.length} Menu Items`);

  console.log("=== MIGRATION COMPLETE: ZERO ERRORS ===");
}

seed().catch(console.error);
```

---

## 4. Verification & Cutover Checklist

| Verification Task | Acceptance Criteria | Sign-Off |
|:---|:---|:---:|
| **Schema Validation** | 9 relational tables created with correct foreign keys & unique constraints | [ ] |
| **RLS Verification** | Unauthenticated curl requests to `/rest/v1/menu_items` return items; `DELETE` is rejected with 401 Unauthorized | [ ] |
| **Seeded Count Check** | Exactly 39 dishes and 7 categories populated in Supabase tables | [ ] |
| **Price Status Check** | 6 dishes verified, 33 dishes tagged as `provisional_sample` | [ ] |
| **Asset CDN Check** | Public CDN image links resolve over HTTPS with HTTP 200 | [ ] |
| **Tri-lingual Check** | Multilingual JSONB fields correctly return Marathi and Hindi Devanagari | [ ] |
| **Offline Fallback Check** | Disconnecting internet gracefully falls back to local data without throwing client errors | [ ] |
| **Admin Route Guard** | Unauthorized direct navigation to `/admin` redirects to `/admin/login` | [ ] |
