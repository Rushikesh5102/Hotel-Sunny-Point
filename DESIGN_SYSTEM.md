# HOTEL SUNNY POINT — DESIGN SYSTEM DOCUMENTATION
*Specification for Digital Menu & Restaurant Management Platform*

---

## 1. Visual Brand Philosophy & Identity

Hotel Sunny Point's visual direction is defined as **"Premium Heritage Hospitality"**. It avoids generic, sterile restaurant templates, synthetic neon glassmorphism, or overcrowded layouts. Instead, it embodies the legacy of a restaurant serving Bhadrawati since 1965 and pioneering Dosa culture since 1995.

### Core Visual Attributes
- **Heritage Warmth**: Rooted in vintage editorial styling ("Sunny Point Gazette"), deep charcoals, and metallic gold accents drawn directly from the restaurant's physical seal and signage.
- **Pure Vegetarian Distinction**: Prominent, dignified representation of India's green dot vegetarian emblem on every food card and banner.
- **Photography Primacy**: Generous imagery showcasing authentic platings on stainless steel thalis, brass bowls, and sizzling platters.
- **Touch Ergonomics**: Mobile-first touch targets (minimum 44×44px), horizontal category scrollbars with zero-width scrollbar indicators, and instantaneous bilingual switching.

---

## 2. Color Palette & Token Definitions

All colors are strictly tailored to match the physical building facade, illuminated signage, and gold seal medallion.

| Token | Hex Value | Role & Usage | Contrast Ratio on Dark |
| :--- | :--- | :--- | :--- |
| `--color-gold-primary` | `#D4AF37` | Master Accent, Logo Seal, CTA Buttons, Active Pills | 9.4:1 (AAA) |
| `--color-gold-hover` | `#B89324` | Interactive Hover States & Secondary Borders | 7.6:1 (AAA) |
| `--color-gold-light` | `#F5E8BA` | Highlight Typography & Subtle Badges | 13.8:1 (AAA) |
| `--color-terracotta` | `#E07A2B` | Warm Spiced Accent (Building Clay Facade, Sizzlers) | 6.8:1 (AA) |
| `--color-dark-bg` | `#0F1115` | Master Background (Deep Obsidian Slate) | Base |
| `--color-card-bg` | `#171A21` | Card Surfaces, Table Rows, Container Surfaces | 1.3:1 vs Base |
| `--color-surface-hover`| `#212631` | Interactive Hover Surface on Cards & Buttons | Distinct |
| `--color-border` | `#2A3140` | Subtle Dividing Borders & Separators | Subtle |
| `--color-pure-veg` | `#22C55E` | Certified 100% Pure Vegetarian Green Symbol | 8.2:1 (AAA) |
| `--color-text-white` | `#F8F9FA` | Primary Dish Headlines & Key Metrics | 17.5:1 (AAA) |
| `--color-text-muted` | `#9DA4B0` | Ingredient Descriptions & Secondary Metadata | 6.5:1 (AA) |

---

## 3. Typography Hierarchy

### 3.1 Font Families
- **Display & Heritage Headings**: `Playfair Display` & `Cinzel` (Serif). Used for "Hotel Sunny Point", editorial banners, signature dish names, and section titles.
- **Interface & Content Text**: `Outfit` & `Inter` (Sans-Serif). Geometric, high-x-height sans-serif ensuring crisp legibility on compact Android and iOS mobile displays.
- **Devanagari Localization**: `Noto Sans Devanagari`. High-legibility Devanagari typography for authentic Marathi translations.

### 3.2 Scale & Weights
- **H1 / Hero Display**: `3rem` to `4.5rem` (48px–72px), Bold (700), Line Height: 1.1
- **H2 / Section Title**: `2rem` to `3rem` (32px–48px), Bold (700), Line Height: 1.2
- **H3 / Dish Card Title**: `1.125rem` to `1.25rem` (18px–20px), Bold (700), Serif
- **Body Regular**: `0.875rem` (14px), Regular (400), Line Height: 1.5
- **Micro / Metadata**: `0.6875rem` to `0.75rem` (11px–12px), Medium (500), Uppercase Tracking

---

## 4. Reusable UI Components

### 4.1 Header (`Header.tsx`)
- Sticky frosted-glass navbar (`bg-[#0F1115]/90 backdrop-blur-md`).
- Master Gold Seal logo medallion linking to root.
- Pure vegetarian live status indicator.
- Instant language toggle button (English / मराठी).
- Direct call-to-action button for the Digital Menu.
- Full-screen mobile drawer with smooth slide-over animation.

### 4.2 Food Card (`FoodCard.tsx`)
- **Dual-Mode Layout**:
  - `variant="grid"`: 4:3 authentic photography ratio with Next.js image optimization.
  - `variant="compact"`: Ultra-fast horizontal scanning mode for mobile smartphones (left text details + right 96px thumbnail).
- Indian vegetarian green square symbol overlay.
- Dynamic badge system: Signature (Gold), Bestseller (Terracotta), Chef's Recommendation (Dark Slate), Spiciness Flames (1 to 3).
- Inline price display with verified status badge vs. provisional demo tag.
- Unavailable/Sold Out overlay banner.

### 4.3 Mobile Bottom Dock (`MobileBottomBar.tsx`)
- Fixed bottom dock displayed on mobile viewports (`< 768px`).
- Provides 1-tap thumb navigation for **Home**, **Menu** (with 26+ dish badge), **Offers**, **Story**, and a dedicated circular **Call Now** button.
- Integrates iOS bottom notch / home bar safe-area insets (`pb-safe`).

### 4.4 Mobile Category Quick Jump Bottom Sheet & FAB
- Floating "Categories" action button on mobile devices.
- Slide-up bottom sheet allowing instant category jumping across all 7 food divisions without endless scrolling.

### 4.5 Dish Modal (`DishModal.tsx`)
- Responsive bottom-sheet on mobile devices with visible pull-handle indicator.
- Comprehensive culinary details: preparation time, serving size, spice profile.
- Ingredient tag cloud and allergen alerts.
- Curated food & beverage pairing suggestions.
- Native clipboard link sharing.

### 4.6 Printable Table Tent (`AdminQRPage`)
- A5/A6 print-ready foldover layout.
- High-contrast pure white canvas with gold double-ruled borders.
- Center-aligned 600px QR Code pointing to permanent menu URL.
- Customized optional table numbering.

---

## 5. Mobile-First Touch Ergonomics & Performance

1. **Zero Tap Delay**: `touch-action: manipulation;` applied across all interactive elements (`button`, `a`, `input`, `[role="button"]`) eliminates browser 300ms double-tap delay.
2. **Smooth Momentum Scrolling**: Touch scrolling with `-webkit-overflow-scrolling: touch` and `overscroll-behavior-y: contain`.
3. **Safe Area Insets**: Dynamic padding utilities (`.pb-safe`, `.pt-safe`) account for iOS home indicator bars and camera notches.
4. **Adaptive Breakpoints**:
   - `320px`: Compact mobile (iPhone SE) – single column, condensed badges.
   - `375px–430px`: Standard modern smartphone (iPhone 13–16, Galaxy S) – high-density touch layout.
   - `768px`: Tablet portrait – 2-column food cards, expanded filters.
   - `1024px+`: Desktop/Laptop – full 3 to 4 column grid with persistent desktop navbar.

