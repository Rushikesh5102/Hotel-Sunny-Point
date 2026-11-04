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
        brand: {
          gold: "#D4AF37",
          "gold-hover": "#B89324",
          "gold-light": "#F5E8BA",
          terracotta: "#E07A2B",
          dark: "#0F1115",
          card: "#171A21",
          surface: "#212631",
          border: "#2A3140",
          cream: "#FCFBF7",
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
