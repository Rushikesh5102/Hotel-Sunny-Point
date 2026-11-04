import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
          soft: "var(--surface-soft)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
          border: "var(--card-border)",
          muted: "var(--card-muted)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
          subtle: "var(--primary-subtle)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          hover: "var(--accent-hover)",
        },
        sage: "var(--sage)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--border-subtle)",
        },
        input: "var(--input)",
        ring: "var(--ring)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        brand: {
          gold: "#D4AF37",
          "gold-hover": "#B89324",
          "gold-light": "#F5E8BA",
          "muted-gold": "#C6A45C",
          forest: "#174D35",
          "forest-hover": "#123C29",
          "forest-secondary": "#225E43",
          sage: "#A3B18A",
          terracotta: "#E07A2B",
          dark: "#0F1115",
          card: "#171A21",
          surface: "#212631",
          border: "#2A3140",
          cream: "#FAF9F3",
          "cream-warm": "#F5F0E6",
          "cream-card": "#FFFFFF",
          "pure-veg": "#22C55E",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
