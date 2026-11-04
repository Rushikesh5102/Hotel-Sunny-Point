-- ==============================================================================
-- HOTEL SUNNY POINT — PRODUCTION SUPABASE MIGRATION 02: ROW LEVEL SECURITY
-- Description: Tenant Scoping, Multi-Tenant Isolation, Public & Admin RBAC
-- ==============================================================================

-- 1. Enable RLS on All Tables
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_item_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 2. Security Helper Functions (SECURITY DEFINER with fixed search_path to prevent hijacking)
CREATE OR REPLACE FUNCTION public.get_auth_restaurant_id()
RETURNS UUID AS $$
DECLARE
    v_restaurant_id UUID;
BEGIN
    SELECT restaurant_id INTO v_restaurant_id
    FROM public.admin_profiles
    WHERE user_id = auth.uid()
      AND is_active = true
    LIMIT 1;
    RETURN v_restaurant_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS user_role_type AS $$
DECLARE
    v_role user_role_type;
BEGIN
    SELECT role INTO v_role
    FROM public.admin_profiles
    WHERE user_id = auth.uid()
      AND is_active = true
    LIMIT 1;
    RETURN v_role;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (public.get_auth_role() = 'super_admin'::user_role_type);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.has_role(allowed_roles user_role_type[])
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (public.get_auth_role() = ANY(allowed_roles));
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ==============================================================================
-- 3. PUBLIC ACCESS POLICIES (Unauthenticated Customers)
-- ==============================================================================

-- 3.1 restaurants: Public can read active restaurants
CREATE POLICY "public_read_active_restaurants"
    ON public.restaurants FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- 3.2 restaurant_settings: Public can read settings of active restaurants
CREATE POLICY "public_read_restaurant_settings"
    ON public.restaurant_settings FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.restaurants r 
            WHERE r.id = restaurant_settings.restaurant_id AND r.is_active = true
        )
    );

-- 3.3 menu_categories: Public can read active categories
CREATE POLICY "public_read_active_categories"
    ON public.menu_categories FOR SELECT
    TO anon, authenticated
    USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM public.restaurants r 
            WHERE r.id = menu_categories.restaurant_id AND r.is_active = true
        )
    );

-- 3.4 menu_items: Public can read items of active restaurants
CREATE POLICY "public_read_menu_items"
    ON public.menu_items FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.restaurants r 
            WHERE r.id = menu_items.restaurant_id AND r.is_active = true
        )
    );

-- 3.5 menu_item_images: Public can read images
CREATE POLICY "public_read_menu_item_images"
    ON public.menu_item_images FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.restaurants r 
            WHERE r.id = menu_item_images.restaurant_id AND r.is_active = true
        )
    );

-- 3.6 promotions: Public can read currently active promotions within date range
CREATE POLICY "public_read_active_promotions"
    ON public.promotions FOR SELECT
    TO anon, authenticated
    USING (
        is_active = true 
        AND CURRENT_DATE BETWEEN start_date AND end_date
        AND EXISTS (
            SELECT 1 FROM public.restaurants r 
            WHERE r.id = promotions.restaurant_id AND r.is_active = true
        )
    );

-- 3.7 customer_feedback: Public can submit feedback (INSERT ONLY)
CREATE POLICY "public_insert_customer_feedback"
    ON public.customer_feedback FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.restaurants r 
            WHERE r.id = customer_feedback.restaurant_id AND r.is_active = true
        )
    );

-- Note: Public CANNOT SELECT, UPDATE or DELETE customer_feedback (Customer privacy preserved)

-- ==============================================================================
-- 4. TENANT ADMIN RBAC POLICIES (Authenticated Admin Users)
-- ==============================================================================

-- 4.1 admin_profiles: User can inspect their own profile, Super Admin can inspect all
CREATE POLICY "admin_select_own_profile"
    ON public.admin_profiles FOR SELECT
    TO authenticated
    USING (user_id = auth.uid() OR public.is_super_admin());

CREATE POLICY "super_admin_manage_profiles"
    ON public.admin_profiles FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

-- 4.2 restaurants: Super Admin / Store Manager update own restaurant
CREATE POLICY "admin_update_restaurant"
    ON public.restaurants FOR UPDATE
    TO authenticated
    USING (id = public.get_auth_restaurant_id() AND public.has_role(ARRAY['super_admin'::user_role_type]))
    WITH CHECK (id = public.get_auth_restaurant_id() AND public.has_role(ARRAY['super_admin'::user_role_type]));

-- 4.3 restaurant_settings: Admin manage own settings
CREATE POLICY "admin_manage_restaurant_settings"
    ON public.restaurant_settings FOR ALL
    TO authenticated
    USING (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    )
    WITH CHECK (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    );

-- 4.4 menu_categories: Admin manage own categories
CREATE POLICY "admin_manage_categories"
    ON public.menu_categories FOR ALL
    TO authenticated
    USING (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    )
    WITH CHECK (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    );

-- 4.5 menu_items:
-- Store Manager & Super Admin can perform full CRUD
CREATE POLICY "admin_manage_menu_items"
    ON public.menu_items FOR ALL
    TO authenticated
    USING (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    )
    WITH CHECK (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    );

-- Kitchen Staff can only UPDATE availability
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

-- 4.6 menu_item_images: Admin manage gallery images
CREATE POLICY "admin_manage_menu_item_images"
    ON public.menu_item_images FOR ALL
    TO authenticated
    USING (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    )
    WITH CHECK (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    );

-- 4.7 promotions: Admin manage promotions
CREATE POLICY "admin_manage_promotions"
    ON public.promotions FOR ALL
    TO authenticated
    USING (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    )
    WITH CHECK (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    );

-- 4.8 customer_feedback: Admin read & status update
CREATE POLICY "admin_view_feedback"
    ON public.customer_feedback FOR SELECT
    TO authenticated
    USING (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type, 'auditor'::user_role_type])
    );

CREATE POLICY "admin_update_feedback_status"
    ON public.customer_feedback FOR UPDATE
    TO authenticated
    USING (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    )
    WITH CHECK (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'store_manager'::user_role_type])
    );

-- 4.9 audit_logs: Admin view logs & insert action records
CREATE POLICY "admin_view_audit_logs"
    ON public.audit_logs FOR SELECT
    TO authenticated
    USING (
        restaurant_id = public.get_auth_restaurant_id() 
        AND public.has_role(ARRAY['super_admin'::user_role_type, 'auditor'::user_role_type])
    );

CREATE POLICY "admin_insert_audit_logs"
    ON public.audit_logs FOR INSERT
    TO authenticated
    WITH CHECK (
        restaurant_id = public.get_auth_restaurant_id()
    );
