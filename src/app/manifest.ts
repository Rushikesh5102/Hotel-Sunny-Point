import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hotel Sunny Point — The Taste of Legacy",
    short_name: "Sunny Point",
    description: "100% Pure Vegetarian Restaurant in Bhadrawati. Iconic Masala Dosa, South Indian legacy & Global Bites since 1995.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1115",
    theme_color: "#174D35",
    orientation: "portrait",
    categories: ["food", "restaurants", "lifestyle"],
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
