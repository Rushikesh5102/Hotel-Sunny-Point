-- ==============================================================================
-- HOTEL SUNNY POINT — PRODUCTION SUPABASE MIGRATION 04: ROLLBACK SCRIPT
-- Description: Clean, Reversible Rollback for Phase 4 Migrations
-- WARNING: EXECUTE ONLY IF REVERSING BACKEND MIGRATION
-- ==============================================================================

-- 1. Drop Tables in Reverse Dependency Order
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.admin_profiles CASCADE;
DROP TABLE IF EXISTS public.customer_feedback CASCADE;
DROP TABLE IF EXISTS public.promotions CASCADE;
DROP TABLE IF EXISTS public.menu_item_images CASCADE;
DROP TABLE IF EXISTS public.menu_items CASCADE;
DROP TABLE IF EXISTS public.menu_categories CASCADE;
DROP TABLE IF EXISTS public.restaurant_settings CASCADE;
DROP TABLE IF EXISTS public.restaurants CASCADE;

-- 2. Drop Functions
DROP FUNCTION IF EXISTS public.get_auth_restaurant_id() CASCADE;
DROP FUNCTION IF EXISTS public.get_auth_role() CASCADE;
DROP FUNCTION IF EXISTS public.is_super_admin() CASCADE;
DROP FUNCTION IF EXISTS public.has_role(user_role_type[]) CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

-- 3. Drop Enums
DROP TYPE IF EXISTS user_role_type CASCADE;
DROP TYPE IF EXISTS feedback_status_type CASCADE;
DROP TYPE IF EXISTS price_status_type CASCADE;
DROP TYPE IF EXISTS dietary_type CASCADE;

-- Rollback complete
