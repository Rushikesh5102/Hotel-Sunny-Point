# HOTEL SUNNY POINT – DUAL THEME SYSTEM ARCHITECTURE
## Heritage Luxury (Dark) & Natural Heritage (Light)

---

## 1. Executive Overview

Hotel Sunny Point's digital experience features a dual-theme architecture supporting two carefully art-directed visual personalities:
1. **Dark Mode – Heritage Luxury**: The signature midnight charcoal and royal gold aesthetic that evokes refined evening dining, heritage hospitality since 1965, and warm candlelight ambiance.
2. **Light Mode – Natural Heritage**: An organic, warm ivory, soft cream, and deep forest-green palette celebrating Pure Vegetarian heritage, fresh local produce, and colonial-era Indian estate hospitality.

Neither theme is a simplistic color inversion. Both modes have been handcrafted with deliberate contrast, rich typography, harmonious borders, and accessible color ramps.

---

## 2. Color Palettes & Visual Personalities

### A. Dark Mode – "Heritage Luxury"
* **Atmosphere**: Sophisticated, intimate, nocturnal luxury, warm golden glow.
* **Palette Tokens**:
  | Token Role | Hex Code | HSL Equivalent | Usage |
  | :--- | :--- | :--- | :--- |
  | **Background** | `#0F1115` | `220 17% 7%` | Main canvas / Page background |
  | **Secondary Background** | `#171A20` | `220 16% 11%` | Section alternating backgrounds, drawers |
  | **Elevated Surface** | `#20242C` | `220 16% 15%` | Cards, popovers, dropdowns, modals |
  | **Primary Gold** | `#D4AF37` | `46 65% 52%` | Brand emblem, primary CTAs, active highlights |
  | **Terracotta Accent** | `#E07A2B` | `26 76% 52%` | Spicy indicators, special highlights, promotional tags |
  | **Vegetarian Green** | `#22C55E` | `142 71% 45%` | 100% Pure Veg badge, operational status |
  | **Primary Text** | `#F5F5F5` | `0 0% 96%` | Headings, dish names, primary body copy |
  | **Secondary Text** | `#A7A9AE` | `223 4% 67%` | Descriptions, metadata, timestamps, placeholders |
  | **Borders & Dividers** | `#30343C` | `220 11% 21%` | Card strokes, header borders, dividers |

---

### B. Light Mode – "Natural Heritage"
* **Atmosphere**: Sunlit courtyard, fresh botanical vitality, warm cream linen, artisanal tea garden.
* **Palette Tokens**:
  | Token Role | Hex Code | HSL Equivalent | Usage |
  | :--- | :--- | :--- | :--- |
  | **Main Background** | `#FAF9F3` | `48 33% 97%` | Warm ivory canvas (anti-glare, avoids stark `#FFFFFF`) |
  | **Secondary Background** | `#F5F0E6` | `38 41% 93%` | Soft cream sections, table alternating rows, chips |
  | **Elevated Cards** | `#FFFFFF` | `0 0% 100%` | Dish cards, admin stat widgets, modal dialogue |
  | **Primary Forest Green** | `#174D35` | `153 54% 20%` | Primary buttons, active nav items, key titles |
  | **Secondary Forest Green**| `#225E43` | `153 47% 25%` | Hover states, secondary action buttons |
  | **Sage Green** | `#A3B18A` | `82 20% 62%` | Subdued badges, border tints, botanical accents |
  | **Muted Gold** | `#C6A45C` | `40 48% 57%` | Heritage seal, award ribbons, star ratings |
  | **Soft Green Surface** | `#EDF2E9` | `100 24% 93%` | Veg pill backgrounds, badge pill containers |
  | **Primary Text** | `#292D29` | `120 4% 17%` | High-contrast headers, dish names, prices |
  | **Secondary Text** | `#6D756D` | `120 4% 44%` | Dish ingredients, category subtitles, timestamps |
  | **Borders & Dividers** | `#E7E2D6` | `41 29% 87%` | Delicate warm borders, separator rules |

---

## 3. Centralized CSS Custom Properties

All theme-dependent colors are declared as CSS Custom Properties in [`src/app/globals.css`](file:///c:/Users/Rushi/Desktop/Hotel%20Sunny%20Point/src/app/globals.css):

```css
:root,
.light,
[data-theme="light"] {
  --background: 48 33% 97%;           /* #FAF9F3 Warm Ivory */
  --foreground: 120 4% 17%;           /* #292D29 Deep Charcoal */
  --surface: 38 41% 93%;              /* #F5F0E6 Soft Cream */
  --surface-elevated: 0 0% 100%;       /* #FFFFFF Pure White */
  --primary: 153 54% 20%;             /* #174D35 Forest Green */
  --primary-foreground: 0 0% 100%;    /* #FFFFFF White */
  --secondary: 153 47% 25%;           /* #225E43 Secondary Forest */
  --accent: 40 48% 57%;               /* #C6A45C Muted Gold */
  --sage: 82 20% 62%;                 /* #A3B18A Sage Green */
  --surface-green: 100 24% 93%;       /* #EDF2E9 Soft Green */
  --muted: 38 41% 93%;                /* #F5F0E6 */
  --muted-foreground: 120 4% 44%;      /* #6D756D */
  --border: 41 29% 87%;               /* #E7E2D6 */
  --card: 0 0% 100%;                  /* #FFFFFF */
  --card-foreground: 120 4% 17%;      /* #292D29 */
  --input: 41 29% 87%;                /* #E7E2D6 */
  --ring: 153 54% 20%;                /* #174D35 */
}

.dark,
[data-theme="dark"] {
  --background: 220 17% 7%;           /* #0F1115 Dark Charcoal */
  --foreground: 0 0% 96%;             /* #F5F5F5 Off White */
  --surface: 220 16% 11%;             /* #171A20 Dark Surface */
  --surface-elevated: 220 16% 15%;    /* #20242C Elevated Surface */
  --primary: 46 65% 52%;              /* #D4AF37 Primary Gold */
  --primary-foreground: 220 17% 7%;   /* #0F1115 */
  --secondary: 26 76% 52%;            /* #E07A2B Terracotta */
  --accent: 46 65% 52%;               /* #D4AF37 Gold */
  --sage: 142 71% 45%;                /* Pure Veg Green */
  --surface-green: 142 71% 15%;       /* Dark Veg Surface */
  --muted: 220 16% 11%;               /* #171A20 */
  --muted-foreground: 223 4% 67%;     /* #A7A9AE */
  --border: 220 11% 21%;              /* #30343C */
  --card: 220 16% 11%;                /* #171A20 */
  --card-foreground: 0 0% 96%;        /* #F5F5F5 */
  --input: 220 11% 21%;               /* #30343C */
  --ring: 46 65% 52%;                 /* #D4AF37 */
}
```

---

## 4. Tailwind Token Integration

In [`tailwind.config.ts`](file:///c:/Users/Rushi/Desktop/Hotel%20Sunny%20Point/tailwind.config.ts), Tailwind is configured with `darkMode: "class"` and binds semantic tokens:

```typescript
darkMode: "class",
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background) / <alpha-value>)",
      foreground: "hsl(var(--foreground) / <alpha-value>)",
      surface: {
        DEFAULT: "hsl(var(--surface) / <alpha-value>)",
        elevated: "hsl(var(--surface-elevated) / <alpha-value>)",
        green: "hsl(var(--surface-green) / <alpha-value>)",
      },
      primary: {
        DEFAULT: "hsl(var(--primary) / <alpha-value>)",
        foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
      },
      card: {
        DEFAULT: "hsl(var(--card) / <alpha-value>)",
        foreground: "hsl(var(--card-foreground) / <alpha-value>)",
      },
      muted: {
        DEFAULT: "hsl(var(--muted) / <alpha-value>)",
        foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
      },
      border: "hsl(var(--border) / <alpha-value>)",
      input: "hsl(var(--input) / <alpha-value>)",
      ring: "hsl(var(--ring) / <alpha-value>)",
      sage: "hsl(var(--sage) / <alpha-value>)",
    }
  }
}
```

Components use standard Tailwind dark-mode variants (e.g. `bg-[#FAF9F3] dark:bg-[#0F1115]`) and semantic tokens (`bg-background text-foreground`). When `.dark` class is on `<html>`, the dark values apply; when removed or `.light` is applied, the light values apply.

---

## 5. Theme State & Zero-Flash Implementation

### A. Zero-Flash Inline Script
In [`src/app/layout.tsx`](file:///c:/Users/Rushi/Desktop/Hotel%20Sunny%20Point/src/app/layout.tsx), an inline blocking script executes prior to CSS/DOM rendering:

```html
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          var storageKey = 'sunny_point_theme';
          var saved = localStorage.getItem(storageKey);
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          var theme = saved ? saved : (prefersDark ? 'dark' : 'light');
          var root = document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
          root.setAttribute('data-theme', theme);
        } catch (e) {
          document.documentElement.classList.add('dark');
        }
      })();
    `,
  }}
/>
```
This guarantees zero FOUC (Flash of Unstyled Content) and prevents hydration mismatches because the DOM is correctly tagged on initial paint.

### B. Theme Context API
[`src/context/ThemeContext.tsx`](file:///c:/Users/Rushi/Desktop/Hotel%20Sunny%20Point/src/context/ThemeContext.tsx) exposes:

```typescript
export interface ThemeContextValue {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  isDark: boolean;
}
```

* **Persistence**: Synchronizes to `localStorage.getItem("sunny_point_theme")`.
* **System Listener**: If no user override is stored, dynamically updates when the operating system switches between daylight and dark modes.
* **Decoupling**: Autonomous provider wrapped in root layout without creating tight coupling to restaurant data state.

---

## 6. Theme Switcher Component

The [`src/components/ui/ThemeSwitcher.tsx`](file:///c:/Users/Rushi/Desktop/Hotel%20Sunny%20Point/src/components/ui/ThemeSwitcher.tsx) is rendered across all key surfaces:

1. **Customer Desktop Navigation**: Pill-style button beside the multilingual language selector. Shows active theme icon (Sun in light mode, Moon in dark mode) with a gentle rotation transition and status badge.
2. **Customer Mobile Navigation**: Full-width interactive control inside the mobile slide-out drawer.
3. **Admin Dashboard Header**: Minimal icon button with accessible tooltip and keyboard focus ring.
4. **Admin Mobile Navigation**: Dedicated toggle inside the admin sidebar drawer.

**Accessibility Attributes**:
- `role="button"`
- `aria-label="Switch to light mode / Switch to dark mode"`
- Visible focus rings with keyboard tab support (`focus:outline-none focus:ring-2 focus:ring-[#174D35] dark:focus:ring-[#D4AF37]`)

---

## 7. Guidelines for Adding Future Components

When creating or modifying components, follow these pair-programming rules:

1. **Avoid Naked Hex Values**: Always provide both light and dark classes:
   ```tsx
   // Correct:
   className="bg-[#FAF9F3] dark:bg-[#0F1115] text-[#292D29] dark:text-white border-[#E7E2D6] dark:border-[#2A3140]"
   
   // Semantic Tokens also supported:
   className="bg-card text-card-foreground border-border"
   ```
2. **Interactive States**:
   * Light mode primary action: `bg-[#174D35] hover:bg-[#123E2A] text-white`
   * Dark mode primary action: `dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115]`
3. **Borders**: Keep light mode borders delicate (`#E7E2D6`) and dark mode borders subdued (`#2A3140` / `#30343C`).
4. **Print & Static Assets**: QR codes and table tents remain high-contrast black on crisp white cardstock for scan reliability in both themes.
