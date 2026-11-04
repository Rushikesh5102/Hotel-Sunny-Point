-- ==============================================================================
-- HOTEL SUNNY POINT — PRODUCTION SUPABASE MIGRATION 03: SEED DATA
-- Description: 1 Flagship Restaurant, Settings, 7 Categories, 39 Dishes & Promos
-- ==============================================================================

DO $$ 
DECLARE
    v_restaurant_id UUID;
    v_cat_south_indian UUID;
    v_cat_soups UUID;
    v_cat_starters UUID;
    v_cat_paneer UUID;
    v_cat_chinese UUID;
    v_cat_global_bites UUID;
    v_cat_desserts_beverages UUID;
BEGIN
    -- 1. Insert or Retrieve Flagship Restaurant
    INSERT INTO public.restaurants (slug, name, founding_year, is_active)
    VALUES (
        'sunny-point',
        '{"en": "Hotel Sunny Point", "mr": "हॉटेल सनी पॉईंट", "hi": "होटल सनी पॉइंट"}'::jsonb,
        1965,
        true
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_restaurant_id;

    -- 2. Insert or Update Restaurant Settings
    INSERT INTO public.restaurant_settings (
        restaurant_id,
        tagline,
        heritage_text,
        south_indian_origin_year,
        dietary_note,
        primary_phone,
        secondary_phone,
        email,
        address,
        city,
        state,
        pincode,
        latitude,
        longitude,
        google_maps_url,
        instagram_url,
        operating_hours,
        fssai_number,
        primary_color,
        accent_color,
        logo_url,
        facade_image_url,
        currency_symbol
    ) VALUES (
        v_restaurant_id,
        '{"en": "The Taste of Legacy — Pure Veg", "mr": "द टेस्ट ऑफ लेगसी — १००% शुद्ध शाकाहारी", "hi": "द टेस्ट ऑफ लेगेसी — १००% शुद्ध शाकाहारी"}'::jsonb,
        '{"en": "Serving Bhadrawati Since 1965. Bringing authentic South Indian dosa traditions since 1995.", "mr": "१९६५ पासून भद्रावतीकरांच्या सेवेत. १९९५ पासून डोशाचा अस्सल स्वाद सादर करणारी अग्रगण्य संस्था.", "hi": "१९६५ से भद्रावती में सेवारत। १९९५ से प्रामाणिक दक्षिण भारतीय डोसा परंपरा के अग्रणी।"}'::jsonb,
        1995,
        '{"en": "100% Pure Vegetarian Restaurant. Jain food options available on request.", "mr": "१००% शुद्ध शाकाहारी. जैन अन्नाचे पर्याय उपलब्ध."}'::jsonb,
        '+91 9511724562',
        '7517469858',
        'contact@hotelsunnypoint.com',
        '{"en": "Main Road, Near Old Bus Stand, Bhadrawati, Chandrapur District, Maharashtra 442902", "mr": "मुख्य रस्ता, जुन्या बस स्टँडजवळ, भद्रावती, जि. चंद्रपूर, महाराष्ट्र ४४२९०२"}'::jsonb,
        'Bhadrawati',
        'Maharashtra',
        '442902',
        20.1017,
        79.1205,
        'https://maps.google.com/?q=Hotel+Sunny+Point+Bhadrawati',
        'https://www.instagram.com/hotelsunnypoint/',
        '{"days": {"en": "Monday – Sunday (All 7 Days)", "mr": "सोमवार – रविवार (आठवड्याचे सर्व दिवस)"}, "timing": "7:30 AM – 10:30 PM"}'::jsonb,
        '0000907350',
        '#D4AF37',
        '#E07A2B',
        '/assets/brand/logo.jpg',
        '/assets/brand/facade.jpg',
        '₹'
    )
    ON CONFLICT (restaurant_id) DO UPDATE SET updated_at = now();

    -- 3. Insert Categories
    INSERT INTO public.menu_categories (restaurant_id, slug, name, description, image_url, display_order, is_active, badge)
    VALUES 
    (
        v_restaurant_id,
        'south-indian',
        '{"en": "South Indian Legacy", "mr": "दाक्षिणात्य आणि दौसा स्पेशल"}'::jsonb,
        '{"en": "Bhadrawati''s pioneer dosas since 1995, crafted with slow-fermented batter and pure tradition.", "mr": "१९९५ पासून भद्रावतीत सुरू झालेला अस्सल दाक्षिणात्य स्वाद, पारंपरिक पद्धतीने तयार केलेले कुरकुरीत डोसे."}'::jsonb,
        '/assets/dishes/masala-dosa.jpg',
        1,
        true,
        '{"en": "Signature Since 1995", "mr": "१९९५ पासून खास"}'::jsonb
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_cat_south_indian;

    INSERT INTO public.menu_categories (restaurant_id, slug, name, description, image_url, display_order, is_active, badge)
    VALUES 
    (
        v_restaurant_id,
        'soups',
        '{"en": "Soups & Warm Comforts", "mr": "सूप्स आणि वॉर्म बाउल्स"}'::jsonb,
        '{"en": "Rich, steamy vegetable broths and Indo-Chinese classics. All verified under ₹120.", "mr": "वाफाळलेले गरमागरम व्हेज सूप्स आणि इंडो-चायनीज स्वादांची मेजवानी. सर्व ₹१२० च्या आत."}'::jsonb,
        '/assets/dishes/veg-manchow-soup.jpg',
        2,
        true,
        '{"en": "Under ₹120", "mr": "₹१२० च्या आत"}'::jsonb
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_cat_soups;

    INSERT INTO public.menu_categories (restaurant_id, slug, name, description, image_url, display_order, is_active)
    VALUES 
    (
        v_restaurant_id,
        'starters',
        '{"en": "Starters & Small Bites", "mr": "स्टार्टर्स आणि क्रिस्पी स्नॅक्स"}'::jsonb,
        '{"en": "Crispy rolls, succulent lollipops, baked nachos, and cheesy bites designed for sharing.", "mr": "कुरकुरीत रोल्स, व्हेज लॉलीपॉप, बेक्ड नाचोज आणि चीझी स्नॅक्स."}'::jsonb,
        '/assets/dishes/veg-dragon-roll.jpg',
        3,
        true
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_cat_starters;

    INSERT INTO public.menu_categories (restaurant_id, slug, name, description, image_url, display_order, is_active, badge)
    VALUES 
    (
        v_restaurant_id,
        'paneer-specialities',
        '{"en": "Paneer Creations", "mr": "पनीर स्पेशल"}'::jsonb,
        '{"en": "Fresh cottage cheese marinated in secret spices, from 24-hr satays to crunchy butterfly bites.", "mr": "ताज्या मऊ पनीरची अप्रतिम मेजवानी — सताय, बटरफ्लाय पनीर आणि सिझलर प्लॅटर्स."}'::jsonb,
        '/assets/dishes/butterfly-paneer.jpg',
        4,
        true,
        '{"en": "Chef''s Pride", "mr": "शेफ स्पेशल"}'::jsonb
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_cat_paneer;

    INSERT INTO public.menu_categories (restaurant_id, slug, name, description, image_url, display_order, is_active)
    VALUES 
    (
        v_restaurant_id,
        'chinese',
        '{"en": "Indo-Chinese & Wok", "mr": "इंडो-चायनीज आणि नूडल्स"}'::jsonb,
        '{"en": "Wok-tossed noodles, crunchy manchurian, and hearty triple schezwan bowls.", "mr": "गरमागरम नूडल्स, कुरकुरीत मंचुरियन आणि ट्रिपल शेजवान राईस."}'::jsonb,
        '/assets/dishes/triple-schezwan-rice.jpg',
        5,
        true
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_cat_chinese;

    INSERT INTO public.menu_categories (restaurant_id, slug, name, description, image_url, display_order, is_active)
    VALUES 
    (
        v_restaurant_id,
        'global-bites',
        '{"en": "Global Bites & Continental", "mr": "ग्लोबल बाईट्स आणि इटालियन"}'::jsonb,
        '{"en": "Continental favorites — creamy stroganoff, authentic aglio e olio, and comforting gratins.", "mr": "आंतरराष्ट्रीय स्वादांची मेजवानी — क्रीमी पास्ता, मेक्सिकन राईस आणि बेक्ड व्हेज."}'::jsonb,
        '/assets/dishes/spaghetti-aglio-e-olio.jpg',
        6,
        true
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_cat_global_bites;

    INSERT INTO public.menu_categories (restaurant_id, slug, name, description, image_url, display_order, is_active)
    VALUES 
    (
        v_restaurant_id,
        'desserts-beverages',
        '{"en": "Beverages & Desserts", "mr": "पेये आणि गोड मिष्टान्न"}'::jsonb,
        '{"en": "Signature fried ice cream, thick hot chocolate with marshmallows, filter coffee, and spiced chai.", "mr": "हॉटेल सनी पॉईंटचे प्रसिद्ध फ्राईड आईस्क्रीम, हॉट चॉकलेट, फिल्टर कॉफी आणि मसाला चहा."}'::jsonb,
        '/assets/dishes/fried-ice-cream.jpg',
        7,
        true
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET updated_at = now()
    RETURNING id INTO v_cat_desserts_beverages;

    -- 4. Seed All 39 Dishes

    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_south_indian,
        'iconic-masala-dosa',
        '{"en":"The Iconic Masala Dosa","hi":"The Iconic Masala Dosa"}'::jsonb,
        '{"en":"The Iconic Masala Dosa","mr":"The Iconic Masala Dosa"}'::jsonb,
        90,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/masala-dosa.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_south_indian,
        'iconic-pesarattu-dosa',
        '{"en":"The Iconic Pesarattu Dosa","hi":"The Iconic Pesarattu Dosa"}'::jsonb,
        '{"en":"The Iconic Pesarattu Dosa","mr":"The Iconic Pesarattu Dosa"}'::jsonb,
        110,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/pesarattu-dosa.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_south_indian,
        'set-dosa',
        '{"en":"Sunny Special Set Dosa","hi":"Sunny Special Set Dosa"}'::jsonb,
        '{"en":"Sunny Special Set Dosa","mr":"Sunny Special Set Dosa"}'::jsonb,
        95,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/set-dosa.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_south_indian,
        'butter-dosa',
        '{"en":"Crispy Butter Dosa","hi":"Crispy Butter Dosa"}'::jsonb,
        '{"en":"Crispy Butter Dosa","mr":"Crispy Butter Dosa"}'::jsonb,
        105,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/butter-dosa.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_south_indian,
        'mla-dosa',
        '{"en":"Royal MLA Dosa","hi":"Royal MLA Dosa"}'::jsonb,
        '{"en":"Royal MLA Dosa","mr":"Royal MLA Dosa"}'::jsonb,
        125,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/mla-dosa.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_south_indian,
        'cheese-dosa',
        '{"en":"Cheesy Twist Dosa","hi":"Cheesy Twist Dosa"}'::jsonb,
        '{"en":"Cheesy Twist Dosa","mr":"Cheesy Twist Dosa"}'::jsonb,
        130,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/cheese-dosa.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_south_indian,
        'schezwan-dosa',
        '{"en":"Desi Schezwan Dosa","hi":"Desi Schezwan Dosa"}'::jsonb,
        '{"en":"Desi Schezwan Dosa","mr":"Desi Schezwan Dosa"}'::jsonb,
        115,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/schezwan-dosa.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_soups,
        'veg-manchow-soup',
        '{"en":"Veg Manchow Soup","hi":"Veg Manchow Soup"}'::jsonb,
        '{"en":"Veg Manchow Soup","mr":"Veg Manchow Soup"}'::jsonb,
        110,
        'verified',
        'Verified Menu Tariff',
        '/assets/dishes/veg-manchow-soup.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_soups,
        'burnt-garlic-soup',
        '{"en":"Burnt Garlic Soup","hi":"Burnt Garlic Soup"}'::jsonb,
        '{"en":"Burnt Garlic Soup","mr":"Burnt Garlic Soup"}'::jsonb,
        115,
        'verified',
        'Verified Menu Tariff',
        '/assets/dishes/burnt-garlic-soup.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_soups,
        'creamy-tomato-soup',
        '{"en":"Creamy Tomato Soup","hi":"Creamy Tomato Soup"}'::jsonb,
        '{"en":"Creamy Tomato Soup","mr":"Creamy Tomato Soup"}'::jsonb,
        100,
        'verified',
        'Verified Menu Tariff',
        '/assets/dishes/tomato-soup.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_soups,
        'hot-and-sour-soup',
        '{"en":"Hot & Sour Soup","hi":"Hot & Sour Soup"}'::jsonb,
        '{"en":"Hot & Sour Soup","mr":"Hot & Sour Soup"}'::jsonb,
        110,
        'verified',
        'Verified Menu Tariff',
        '/assets/dishes/hot-and-sour-soup.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_soups,
        'lemon-coriander-soup',
        '{"en":"Lemon Coriander Soup","hi":"Lemon Coriander Soup"}'::jsonb,
        '{"en":"Lemon Coriander Soup","mr":"Lemon Coriander Soup"}'::jsonb,
        105,
        'verified',
        'Verified Menu Tariff',
        '/assets/dishes/lemon-coriander-soup.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_soups,
        'veg-clear-soup',
        '{"en":"Veg Clear Soup","hi":"Veg Clear Soup"}'::jsonb,
        '{"en":"Veg Clear Soup","mr":"Veg Clear Soup"}'::jsonb,
        95,
        'verified',
        'Verified Menu Tariff',
        '/assets/dishes/veg-clear-soup.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_starters,
        'veg-dragon-roll',
        '{"en":"Crispy Veg Dragon Roll","hi":"Crispy Veg Dragon Roll"}'::jsonb,
        '{"en":"Crispy Veg Dragon Roll","mr":"Crispy Veg Dragon Roll"}'::jsonb,
        180,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/veg-dragon-roll.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_starters,
        'veg-lollipop',
        '{"en":"Crispy Veg Lollipop","hi":"Crispy Veg Lollipop"}'::jsonb,
        '{"en":"Crispy Veg Lollipop","mr":"Crispy Veg Lollipop"}'::jsonb,
        160,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/veg-lollipop.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_starters,
        'loaded-nachos',
        '{"en":"In-House Baked Loaded Nachos","hi":"In-House Baked Loaded Nachos"}'::jsonb,
        '{"en":"In-House Baked Loaded Nachos","mr":"In-House Baked Loaded Nachos"}'::jsonb,
        170,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/loaded-nachos.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_starters,
        'shanghai-roll',
        '{"en":"Veggie-Paneer Shanghai Roll","hi":"Veggie-Paneer Shanghai Roll"}'::jsonb,
        '{"en":"Veggie-Paneer Shanghai Roll","mr":"Veggie-Paneer Shanghai Roll"}'::jsonb,
        175,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/shanghai-roll.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_starters,
        'veg-cutlet',
        '{"en":"Golden Veg Cutlets","hi":"Golden Veg Cutlets"}'::jsonb,
        '{"en":"Golden Veg Cutlets","mr":"Golden Veg Cutlets"}'::jsonb,
        130,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/veg-cutlet.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_starters,
        'cheese-garlic-bread',
        '{"en":"Cheese Garlic Bread","hi":"Cheese Garlic Bread"}'::jsonb,
        '{"en":"Cheese Garlic Bread","mr":"Cheese Garlic Bread"}'::jsonb,
        140,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/cheese-garlic-bread.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_starters,
        'cheese-pockets',
        '{"en":"Crispy Cheese Pockets","hi":"Crispy Cheese Pockets"}'::jsonb,
        '{"en":"Crispy Cheese Pockets","mr":"Crispy Cheese Pockets"}'::jsonb,
        150,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/cheese-pockets.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_paneer,
        'paneer-satay-peanut-sauce',
        '{"en":"Paneer Satay with Peanut Butter Sauce","hi":"Paneer Satay with Peanut Butter Sauce"}'::jsonb,
        '{"en":"Paneer Satay with Peanut Butter Sauce","mr":"Paneer Satay with Peanut Butter Sauce"}'::jsonb,
        240,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/paneer-satay.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_paneer,
        'butterfly-paneer',
        '{"en":"Signature Butterfly Paneer","hi":"Signature Butterfly Paneer"}'::jsonb,
        '{"en":"Signature Butterfly Paneer","mr":"Signature Butterfly Paneer"}'::jsonb,
        230,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/butterfly-paneer.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_paneer,
        'peri-peri-paneer-platter',
        '{"en":"Peri Peri Paneer Sizzler Platter","hi":"Peri Peri Paneer Sizzler Platter"}'::jsonb,
        '{"en":"Peri Peri Paneer Sizzler Platter","mr":"Peri Peri Paneer Sizzler Platter"}'::jsonb,
        290,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/peri-peri-paneer-platter.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_paneer,
        'paneer-kentucky',
        '{"en":"Paneer Kentucky","hi":"Paneer Kentucky"}'::jsonb,
        '{"en":"Paneer Kentucky","mr":"Paneer Kentucky"}'::jsonb,
        220,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/paneer-kentucky.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_chinese,
        'triple-schezwan-fried-rice',
        '{"en":"Triple Schezwan Fried Rice","hi":"Triple Schezwan Fried Rice"}'::jsonb,
        '{"en":"Triple Schezwan Fried Rice","mr":"Triple Schezwan Fried Rice"}'::jsonb,
        220,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/triple-schezwan-rice.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_chinese,
        'veg-hakka-noodles',
        '{"en":"Veg Hakka Noodles","hi":"Veg Hakka Noodles"}'::jsonb,
        '{"en":"Veg Hakka Noodles","mr":"Veg Hakka Noodles"}'::jsonb,
        150,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/veg-noodles.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_chinese,
        'schezwan-noodles',
        '{"en":"Fiery Schezwan Noodles","hi":"Fiery Schezwan Noodles"}'::jsonb,
        '{"en":"Fiery Schezwan Noodles","mr":"Fiery Schezwan Noodles"}'::jsonb,
        165,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/schezwan-noodles.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_chinese,
        'veg-manchurian',
        '{"en":"Veg Manchurian (Gravy)","hi":"Veg Manchurian (Gravy)"}'::jsonb,
        '{"en":"Veg Manchurian (Gravy)","mr":"Veg Manchurian (Gravy)"}'::jsonb,
        160,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/veg-manchurian.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_chinese,
        'gobi-manchurian',
        '{"en":"Gobi Manchurian (Crispy)","hi":"Gobi Manchurian (Crispy)"}'::jsonb,
        '{"en":"Gobi Manchurian (Crispy)","mr":"Gobi Manchurian (Crispy)"}'::jsonb,
        155,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/gobi-manchurian.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_global_bites,
        'spaghetti-aglio-e-olio',
        '{"en":"Spaghetti Aglio e Olio","hi":"Spaghetti Aglio e Olio"}'::jsonb,
        '{"en":"Spaghetti Aglio e Olio","mr":"Spaghetti Aglio e Olio"}'::jsonb,
        210,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/spaghetti-aglio-e-olio.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_global_bites,
        'mushroom-stroganoff',
        '{"en":"Creamy Mushroom Stroganoff","hi":"Creamy Mushroom Stroganoff"}'::jsonb,
        '{"en":"Creamy Mushroom Stroganoff","mr":"Creamy Mushroom Stroganoff"}'::jsonb,
        230,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/mushroom-stroganoff.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_global_bites,
        'veg-lasagne',
        '{"en":"Classic Veg Lasagne","hi":"Classic Veg Lasagne"}'::jsonb,
        '{"en":"Classic Veg Lasagne","mr":"Classic Veg Lasagne"}'::jsonb,
        240,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/veg-lasagne.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_global_bites,
        'mexican-rice',
        '{"en":"Zesty Mexican Rice","hi":"Zesty Mexican Rice"}'::jsonb,
        '{"en":"Zesty Mexican Rice","mr":"Zesty Mexican Rice"}'::jsonb,
        195,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/mexican-rice.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_global_bites,
        'baked-veg',
        '{"en":"Baked Veg Gratin","hi":"Baked Veg Gratin"}'::jsonb,
        '{"en":"Baked Veg Gratin","mr":"Baked Veg Gratin"}'::jsonb,
        210,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/baked-veg.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_global_bites,
        'cheese-cake-bell-pepper',
        '{"en":"Cheese Cake Bell Pepper","hi":"Cheese Cake Bell Pepper"}'::jsonb,
        '{"en":"Cheese Cake Bell Pepper","mr":"Cheese Cake Bell Pepper"}'::jsonb,
        220,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/cheese-cake-bell-pepper.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_global_bites,
        'greek-salad',
        '{"en":"Mediterranean Greek Salad","hi":"Mediterranean Greek Salad"}'::jsonb,
        '{"en":"Mediterranean Greek Salad","mr":"Mediterranean Greek Salad"}'::jsonb,
        140,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/greek-salad.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_desserts_beverages,
        'signature-fried-ice-cream',
        '{"en":"Signature Fried Ice Cream","hi":"Signature Fried Ice Cream"}'::jsonb,
        '{"en":"Signature Fried Ice Cream","mr":"Signature Fried Ice Cream"}'::jsonb,
        140,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/fried-ice-cream.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_desserts_beverages,
        'gourmet-hot-chocolate',
        '{"en":"Gourmet Hot Chocolate","hi":"Gourmet Hot Chocolate"}'::jsonb,
        '{"en":"Gourmet Hot Chocolate","mr":"Gourmet Hot Chocolate"}'::jsonb,
        120,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/dishes/hot-chocolate.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    INSERT INTO public.menu_items (
        restaurant_id, category_id, slug, name, short_description, price, price_status, price_note, image_url,
        is_available, is_bestseller, is_signature, is_chef_recommendation, display_order, created_year
    ) VALUES (
        v_restaurant_id,
        v_cat_desserts_beverages,
        'south-indian-filter-coffee',
        '{"en":"Authentic Filter Coffee","hi":"Authentic Filter Coffee"}'::jsonb,
        '{"en":"Authentic Filter Coffee","mr":"Authentic Filter Coffee"}'::jsonb,
        45,
        'provisional_sample',
        'Provisional demo price. Editable via Admin Dashboard.',
        '/assets/brand/gazette-masala-dosa.jpg',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        NULL
    )
    ON CONFLICT (restaurant_id, slug) DO UPDATE SET
        price = EXCLUDED.price,
        price_status = EXCLUDED.price_status,
        updated_at = now();
  
    -- 5. Seed Initial Promotions
    INSERT INTO public.promotions (
        restaurant_id, title, subtitle, description, badge_text, banner_image_url,
        is_active, start_date, end_date, coupon_code, discount_description
    ) VALUES (
        v_restaurant_id,
        '{"en": "Monsoon Affairs — Warm Sips & Sizzles", "mr": "मान्सून अफेअर्स — गरमागरम चव"}'::jsonb,
        '{"en": "Enjoy seasonal hot chocolate & chef special soups", "mr": "हॉट चॉकलेट आणि शेफ स्पेशल सूप्स"}'::jsonb,
        '{"en": "Embrace rainy evenings in Bhadrawati with comforting hot soups and chocolate desserts.", "mr": "पावसाळी संध्याकाळ अधिक आनंददायी बनवा गरमागरम सूप्स आणि चॉकलेटसोबत."}'::jsonb,
        'Monsoon Special',
        '/assets/brand/monsoon-special.jpg',
        true,
        CURRENT_DATE - INTERVAL '10 days',
        CURRENT_DATE + INTERVAL '60 days',
        'MONSOON20',
        '20% Off on Soups & Desserts Combo'
    )
    ON CONFLICT DO NOTHING;

    RAISE NOTICE 'Seed migration completed successfully: 1 Restaurant, 7 Categories, 39 Dishes seeded.';
END $$;
