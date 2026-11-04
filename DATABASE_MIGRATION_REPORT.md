# HOTEL SUNNY POINT — DATABASE MIGRATION SPECIFICATION & AUDIT REPORT
*Data Transformation Mapping, Seed Manifest & Parity Validation*

---

## 1. Migration Overview

This document specifies the data transformation and migration pipeline moving Hotel Sunny Point from static JSON structures (`src/data/initial-data.ts`) to the PostgreSQL relational tables in Supabase.

### 1.1 Strict Governance Constraints Enforced
1. **Zero Price Escalation**: Under no circumstance is a provisional rate converted into a verified rate. All 33 sample dishes retain `price_status = 'provisional_sample'`.
2. **Preservation of Authentic Research**: The 6 verified soup tariffs (under ₹120) remain tagged as `price_status = 'verified'`.
3. **Tri-lingual Integrity**: All Devanagari typography (Marathi and Hindi) is mapped into JSONB columns without encoding corruption.
4. **Asset Reference Retention**: All 39 image mappings directly reference verified assets in `/assets/dishes/`.

---

## 2. Seed Migration Manifest & Entity Mapping

The migration script ([20261104000003_seed_data.sql](file:///c:/Users/Rushi/Desktop/Hotel%20Sunny%20Point/supabase/migrations/20261104000003_seed_data.sql)) executes the following record insertions:

### 2.1 Restaurant Root & Brand Settings (1 Tenant)
- **Slug**: `sunny-point`
- **Name**: `{"en": "Hotel Sunny Point", "mr": "हॉटेल सनी पॉईंट", "hi": "होटल सनी पॉइंट"}`
- **Founding Year**: 1965
- **South Indian Heritage Year**: 1995
- **FSSAI Number**: `0000907350` (Verified on neon signboard)
- **Primary Phone**: `+91 9511724562`
- **Secondary Phone**: `7517469858`
- **Address**: Main Road, Near Old Bus Stand, Bhadrawati, Chandrapur District, Maharashtra 442902

### 2.2 Food Categories (7 Categories)

| # | Slug | Name (EN) | Name (मराठी) | Display Order | Items Count |
|:---|:---|:---|:---|:---:|:---:|
| 1 | `south-indian` | South Indian Legacy | दाक्षिणात्य आणि दौसा स्पेशल | 1 | 7 |
| 2 | `soups` | Soups & Warm Comforts | सूप्स आणि वॉर्म बाउल्स | 2 | 6 |
| 3 | `starters` | Starters & Small Bites | स्टार्टर्स आणि क्रिस्पी स्नॅक्स | 3 | 7 |
| 4 | `paneer-specialities` | Paneer Creations | पनीर स्पेशल | 4 | 4 |
| 5 | `chinese` | Indo-Chinese & Wok | इंडो-चायनीज आणि नूडल्स | 5 | 5 |
| 6 | `global-bites` | Global Bites & Continental | ग्लोबल बाईट्स आणि इटालियन | 6 | 7 |
| 7 | `desserts-beverages` | Beverages & Desserts | पेये आणि गोड मिष्टान्न | 7 | 3 |
| **Total** | | | | | **39** |

### 2.3 Menu Item Verification Breakdown (39 Dishes)

| Category Slug | Total Dishes | Verified Tariffs | Provisional Rates | Verification Details |
|:---|:---:|:---:|:---:|:---|
| `south-indian` | 7 | 0 | 7 | 1995 heritage series, gazette posters & dosa carousels |
| `soups` | 6 | 6 | 0 | Instagram Soup Series ("Under ₹120 Verified") |
| `starters` | 7 | 0 | 7 | Snack attack series & photo assets |
| `paneer-specialities` | 4 | 0 | 4 | Chef specials & sizzler platters |
| `chinese` | 5 | 0 | 5 | Wok specials & noodles carousel |
| `global-bites` | 7 | 0 | 7 | Continental dishes & baked gratins |
| `desserts-beverages` | 3 | 0 | 3 | Fried ice cream & monsoon beverages |
| **Grand Total** | **39** | **6** | **33** | **100% Asset Parity Maintained** |

---

## 3. Data Transformation Rules

### 3.1 Multilingual Text Transformation
```sql
-- TypeScript LocalizedString:
-- name: { en: "The Iconic Masala Dosa", mr: "आयकॉनिक मसाला डोसा", hi: "द आइकॉनिक मसाला डोसा" }

-- Transformed to PostgreSQL JSONB:
'{"en": "The Iconic Masala Dosa", "mr": "आयकॉनिक मसाला डोसा", "hi": "द आइकॉनिक मसाला डोसा"}'::jsonb
```

### 3.2 Price & Status Transformation
```sql
-- For verified items (e.g. Veg Manchow Soup):
price = 110.00,
price_status = 'verified'::price_status_type,
price_note = 'Verified Menu Tariff'

-- For provisional items (e.g. Masala Dosa):
price = 90.00,
price_status = 'provisional_sample'::price_status_type,
price_note = 'Provisional demo price. Editable via Admin Dashboard.'
```

---

## 4. Migration Execution Plan & Safety Verification

1. **Pre-Migration State**:
   - Local state in `initial-data.ts` and `localStorage`.
   - Production Next.js build clean (17 routes).
2. **Migration Run**:
   - Execute Migration 01 (DDL).
   - Execute Migration 02 (RLS).
   - Execute Migration 03 (Seed).
3. **Post-Migration Verification Query**:
   ```sql
   SELECT 
       c.slug AS category,
       COUNT(m.id) AS total_items,
       COUNT(CASE WHEN m.price_status = 'verified' THEN 1 END) AS verified_items,
       COUNT(CASE WHEN m.price_status = 'provisional_sample' THEN 1 END) AS provisional_items
   FROM public.menu_categories c
   JOIN public.menu_items m ON m.category_id = c.id
   GROUP BY c.slug;
   ```
   **Expected Output**: Exactly 39 total items (6 verified, 33 provisional) distributed across 7 categories.
4. **Rollback Contingency**:
   - In case of failure during staging: Execute [20261104000004_rollback.sql](file:///c:/Users/Rushi/Desktop/Hotel%20Sunny%20Point/supabase/migrations/20261104000004_rollback.sql) to cleanly drop all objects.
   - Frontend remains 100% operable on local fallback without data loss.
