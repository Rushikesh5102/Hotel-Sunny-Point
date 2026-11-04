# HOTEL SUNNY POINT — BACKEND SECURITY & INTEGRATION TEST SPECIFICATION
*Test Matrix, Automated Verification Scripts & Pre-Flight Validation Report*

---

## 1. Pre-Flight Test Results

Before backend provisioning, the codebase was audited for strict type safety and compilation stability:

| Test Target | Command Executed | Result | Status |
|:---|:---|:---:|:---:|
| **TypeScript Validation** | `npx tsc --noEmit` | **0 Errors** | **PASS** |
| **ESLint Validation** | `npm run lint` | **0 Warnings / Errors** | **PASS** |
| **Production Build** | `npm run build` | **17 Routes Compiled (12.8s)** | **PASS** |
| **SQL Syntax & Constraints** | DDL Parser Check | **0 Syntax Errors** | **PASS** |
| **Foreign Key References** | Schema Relational Link Check | **100% Referenced Tables Exist** | **PASS** |

---

## 2. Stage 5 Comprehensive Test Suite Specification

The following 12 test suites are engineered for execution immediately upon database provisioning:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      STAGE 5 TEST SUITE MATRIX                         │
├────┬─────────────────────────────┬────────────────────────────────────┤
│ 01 │ Authentication & Logout     │ Real JWT lifecycle & cookie clear  │
│ 02 │ Route Guard & Direct URL    │ Next.js middleware 307 redirects   │
│ 03 │ Cross-Tenant Isolation      │ RLS blocks Tenant A from Tenant B  │
│ 04 │ Unauthorized REST Writes    │ Anon key blocked on write ops      │
│ 05 │ Menu Item CRUD Operations   │ Add, edit price, toggle, delete    │
│ 06 │ Category CRUD & Ordering    │ Add, reorder display_order, delete │
│ 07 │ Promotion Management        │ Active dates & coupon validation   │
│ 08 │ Guest Feedback Lifecycle    │ Submit (public) & review (admin)   │
│ 09 │ Settings Synchronization    │ Multi-lingual text & phone update  │
│ 10 │ Storage CDN Asset Access    │ Public image fetch & cache headers │
│ 11 │ Network Failure & Fallback  │ Error toasts, no silent local sync │
│ 12 │ Rollback Script Execution   │ Clean, reversible teardown check   │
└────┴─────────────────────────────┴────────────────────────────────────┘
```

### Detailed Test Cases & Expected Behaviors

#### Test 01: Authentication & Logout
- **Action**: Call `supabase.auth.signInWithPassword` with valid credentials. Verify access token cookie is set. Call `supabase.auth.signOut()`.
- **Expected**: Cookie deleted, session invalidated, redirect to `/admin/login`.

#### Test 02: Direct Protected URL Access
- **Action**: Execute `curl -I http://localhost:3000/admin/menu` without auth cookie.
- **Expected**: HTTP 307 Redirect to `/admin/login?redirectedFrom=%2Fadmin%2Fmenu`.

#### Test 03: Cross-Restaurant Data Isolation
- **Action**: Authenticate as Admin of Restaurant A (`id = 'tenant-a'`). Attempt to query or update `menu_items` with `restaurant_id = 'tenant-b'`.
- **Expected**: RLS returns 0 rows updated, 0 rows read. Complete multi-tenant privacy.

#### Test 04: Unauthorized Database Writes
- **Action**: Send HTTP `POST` to `/rest/v1/menu_items` using `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Expected**: HTTP 401 Unauthorized / RLS rejection.

#### Test 05: Menu Item CRUD Operations
- **Action**: Add new dish `Paneer Tikka Roll` via `/admin/menu`. Edit price from ₹180 to ₹195. Toggle availability to false. Delete test item.
- **Expected**: Real-time update in Supabase table; customer menu updates reactively.

#### Test 06: Category CRUD & Reordering
- **Action**: Reorder Category `Soups & Warm Comforts` from position 2 to position 1.
- **Expected**: `display_order` updated in PostgreSQL; homepage and menu tabs reflect new order immediately.

#### Test 07: Promotion Management
- **Action**: Create seasonal coupon `FESTIVE25`. Set start date in the future.
- **Expected**: Public menu does not display future coupon; admin dashboard shows it as scheduled.

#### Test 08: Customer Feedback & Privacy
- **Action**: Public user submits 5-star review via `/feedback`. Attempt to read all feedback using anonymous key.
- **Expected**: Insert succeeds with HTTP 201; Anonymous read returns `[]` (0 records leaked).

#### Test 09: Settings Updates
- **Action**: Update secondary phone number in `/admin/settings`.
- **Expected**: Reflected on `/contact`, footer, and database.

#### Test 10: Image Storage CDN
- **Action**: Upload image to `restaurant-public` bucket under `/dishes/test.jpg`.
- **Expected**: Resolves over public HTTPS CDN with `image/jpeg` content-type.

#### Test 11: Network Failure & Error Handling
- **Action**: Temporarily block Supabase endpoint. Attempt to modify price in admin.
- **Expected**: UI displays clean toast: *"Network Error: Unable to sync price to server. Please check connection and retry."* **Crucially: No silent overwrite of production state into localStorage.**

#### Test 12: Migration Rollback
- **Action**: Dry-run execute `20261104000004_rollback.sql` in staging.
- **Expected**: Clean removal of all 9 tables, functions, and types.
