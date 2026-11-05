import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hotel Sunny Point — The Taste of Legacy",
    short_name: "Sunny Point",
    description: "100% Pure Vegetarian Restaurant in Bhadrawati. Iconic Masala Dosa, South Indian legacy & Global Bites since 1995.",
    start_url: "/",
    scope: "/",
    id: "hotel-sunny-point-bhadrawati",
    display: "standalone",
    background_color: "#0F1115",
    theme_color: "#174D35",
    orientation: "portrait",
    categories: ["food", "restaurants", "lifestyle"],
    shortcuts: [
      {
        name: "Digital Menu",
        short_name: "Menu",
        description: "Browse pure vegetarian menu & prices offline",
        url: "/menu",
        icons: [{ src: "/assets/brand/logo.jpg", sizes: "192x192", type: "image/jpeg" }],
      },
      {
        name: "Special Offers",
        short_name: "Offers",
        description: "View current discounts & festival specials",
        url: "/offers",
        icons: [{ src: "/assets/brand/logo.jpg", sizes: "192x192", type: "image/jpeg" }],
      },
      {
        name: "Contact & Table",
        short_name: "Contact",
        description: "Restaurant location, phone number and directions",
        url: "/contact",
        icons: [{ src: "/assets/brand/logo.jpg", sizes: "192x192", type: "image/jpeg" }],
      },
    ],
    icons: [
      {
        src: "/assets/brand/logo.jpg",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "maskable",
      },
      {
        src: "/assets/brand/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
