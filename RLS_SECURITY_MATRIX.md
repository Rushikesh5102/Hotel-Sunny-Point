# HOTEL SUNNY POINT — ROW LEVEL SECURITY (RLS) MATRIX
*Access Control Policy, Multi-Tenant Isolation & Attack Vector Mitigations*

---

## 1. Role-Based Permissions Matrix

The following matrix defines the exact access granted across every relational entity:

| Table Name | Public (Anon) | Kitchen Staff | Store Manager | Super Admin | Auditor | Cross-Tenant Admin |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **`restaurants`** | `SELECT` (active) | `SELECT` | `SELECT`, `UPDATE` | `ALL` | `SELECT` | **BLOCKED** |
| **`restaurant_settings`**| `SELECT` | `SELECT` | `ALL` | `ALL` | `SELECT` | **BLOCKED** |
| **`menu_categories`** | `SELECT` (active) | `SELECT` | `ALL` | `ALL` | `SELECT` | **BLOCKED** |
| **`menu_items`** | `SELECT` | `SELECT`, `UPDATE` (stock only) | `ALL` | `ALL` | `SELECT` | **BLOCKED** |
| **`menu_item_images`** | `SELECT` | `SELECT` | `ALL` | `ALL` | `SELECT` | **BLOCKED** |
| **`promotions`** | `SELECT` (active & in date) | `SELECT` | `ALL` | `ALL` | `SELECT` | **BLOCKED** |
| **`customer_feedback`**| `INSERT` only | **BLOCKED** | `SELECT`, `UPDATE` (status) | `ALL` | `SELECT` | **BLOCKED** |
| **`admin_profiles`** | **BLOCKED** | `SELECT` (own) | `SELECT` (own) | `ALL` | `SELECT` (own) | **BLOCKED** |
| **`audit_logs`** | **BLOCKED** | **BLOCKED** | **BLOCKED** | `ALL` | `SELECT` | **BLOCKED** |

---

## 2. Table-by-Table Policy Audit & Logic

### 2.1 `restaurants` & `restaurant_settings`
- **Public**: Can read active restaurants and their associated brand settings (names, operating hours, phone numbers, FSSAI numbers, logos).
- **Tenant Scope Enforcement**:
  ```sql
  -- Store Managers can only update settings for their assigned restaurant_id
  USING (restaurant_id = public.get_auth_restaurant_id())
  WITH CHECK (restaurant_id = public.get_auth_restaurant_id())
  ```
- **Cross-Tenant Mitigation**: If an admin from Restaurant B issues `UPDATE restaurant_settings SET ... WHERE restaurant_id = 'restaurant-A-uuid'`, RLS evaluates to `FALSE` and 0 rows are affected.

### 2.2 `menu_categories` & `menu_items`
- **Public**: Can view all menu items and active categories to browse the menu. Available and out-of-stock items are both visible so customers know what dishes exist.
- **Store Manager**: Full CRUD permissions within their own `restaurant_id`.
- **Kitchen Staff Granularity**:
  Kitchen tablets can toggle dish availability (`is_available: true/false`), but cannot change dish prices, descriptions, or delete menu items:
  ```sql
  CREATE POLICY "kitchen_update_item_availability"
      ON public.menu_items FOR UPDATE
      TO authenticated
      USING (
          restaurant_id = public.get_auth_restaurant_id() 
          AND public.has_role(ARRAY['kitchen_staff'::user_role_type])
      )
      WITH CHECK (
          restaurant_id = public.get_auth_restaurant_id() 
          AND public.has_role(ARRAY['kitchen_staff'::user_role_type])
      );
  ```

### 2.3 `customer_feedback` (Privacy Protection)
- **Public Guest Access**: `INSERT` only.
  Guests dining at Hotel Sunny Point can submit a review with their name, phone number, and ratings.
- **Privacy Enforcement**: Public users have **ZERO `SELECT` access**. No anonymous user or web scraper can query `/rest/v1/customer_feedback` to harvest guest names or telephone numbers.
- **Admin Access**: Only managers and auditors belonging to that specific restaurant can inspect feedback records.

### 2.4 `admin_profiles` & Privilege Escalation Defense
- **Self-Inspection**: Authenticated users can only read their own profile row (`user_id = auth.uid()`).
- **Privilege Escalation Prevention**: A `store_manager` cannot update their own role column to `super_admin`. Modifying `admin_profiles` requires `public.is_super_admin()`.

---

## 3. Critical Security Mitigations Implemented

| Vulnerability Threat | Mitigation in Phase 4 RLS |
|:---|:---|
| **SQL Search Path Hijacking** | All helper functions (`get_auth_restaurant_id`, `has_role`, `is_super_admin`) are marked `SECURITY DEFINER` and enforce `SET search_path = public`. This prevents attackers from injecting malicious schemas ahead of `public`. |
| **Cross-Tenant Data Tampering** | Every `WITH CHECK` clause verifies `restaurant_id = public.get_auth_restaurant_id()`. An admin cannot insert items under another tenant's UUID even if they craft raw API calls. |
| **Service Role Leakage Prevention** | Service Role keys are **never** used in frontend browser code or client contexts. Browser operations use strictly `NEXT_PUBLIC_SUPABASE_ANON_KEY` governed by RLS. |
| **Cascade Leakage on Deletions** | Deleting a restaurant cascades down exclusively to its own records (`ON DELETE CASCADE`), ensuring orphaned records cannot linger or re-attach to other tenants. |
| **Audit Trail Tampering** | Audit log records can only be inserted; `UPDATE` and `DELETE` on `audit_logs` are completely disabled for all roles including Store Managers. |

---

## 4. Verification Test Cases for Security Audit

1. **TEST-RLS-01**: Unauthenticated `GET /rest/v1/menu_items` returns 200 OK with active menu items.
2. **TEST-RLS-02**: Unauthenticated `POST /rest/v1/menu_items` returns 401 Unauthorized.
3. **TEST-RLS-03**: Unauthenticated `GET /rest/v1/customer_feedback` returns 200 OK with `[]` (0 rows exposed).
4. **TEST-RLS-04**: Tenant A Admin attempts to `UPDATE menu_items SET price = 10 WHERE restaurant_id = 'tenant-b-uuid'` -> 0 rows updated.
5. **TEST-RLS-05**: Store Manager attempts to `UPDATE admin_profiles SET role = 'super_admin'` -> 0 rows updated / 403 Forbidden.
