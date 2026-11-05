"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Award } from "lucide-react";

interface HeroTastingTrioProps {
  onSelectDish?: (dishSlug: string) => void;
}

export function HeroTastingTrio({ onSelectDish }: HeroTastingTrioProps) {
  const trio = [
    {
      title: "Iconic Masala Dosa",
      marathiTitle: "अस्सल मसाला डोसा",
      price: "₹90",
      tag: "Legacy Since 1995",
      tagColor: "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black",
      image: "/assets/dishes/masala-dosa.jpg",
      slug: "masala-dosa",
      desc: "Slow-fermented batter, tempered spiced potato & fresh coconut chutney.",
    },
    {
      title: "Peri-Peri Paneer Platter",
      marathiTitle: "पेरी-पेरी पनीर प्लॅटर",
      price: "₹220",
      tag: "Chef's Creation",
      tagColor: "bg-[#E07A2B] text-white dark:bg-[#E07A2B] dark:text-white",
      image: "/assets/dishes/peri-peri-paneer-platter.jpg",
      slug: "peri-peri-paneer-platter",
      desc: "Marinated cottage cheese tossed in smoky peri-peri herbs & bell peppers.",
    },
    {
      title: "Golden Butter Dosa",
      marathiTitle: "बटर स्पेशल डोसा",
      price: "₹110",
      tag: "Pure Butter Crisp",
      tagColor: "bg-amber-600 text-white dark:bg-amber-500 dark:text-black",
      image: "/assets/dishes/butter-dosa.jpg",
      slug: "butter-dosa",
      desc: "Lavishly roasted with rich Amul butter for an unmistakable golden aroma.",
    },
  ];

  return (
    <div className="w-full pt-8">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#174D35] dark:bg-[#D4AF37] animate-ping" />
          <span className="text-xs font-serif font-bold tracking-wider uppercase text-[#174D35] dark:text-[#D4AF37]">
            Guest Favorites • Taste of 1995
          </span>
        </div>
        <Link
          href="/menu"
          className="text-xs font-semibold text-[#6D756D] hover:text-[#174D35] dark:text-[#9DA4B0] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-1 group"
        >
          <span>Explore All 26+ Delicacies</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trio.map((item) => (
          <Link
            key={item.slug}
            href={`/dish/${item.slug}`}
            className="group relative rounded-2xl overflow-hidden bg-white/90 dark:bg-black/90 border border-[#E7E2D6] dark:border-[#1c2028] shadow-md hover:shadow-xl hover:border-[#174D35]/50 dark:hover:border-[#D4AF37]/60 transition-all duration-300 p-3.5 flex flex-col justify-between backdrop-blur-sm text-left hover:-translate-y-1"
          >
            {/* Top row: Badge and Pure Veg dot */}
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.tagColor} shadow-sm`}>
                {item.tag}
              </span>
              <div className="w-3.5 h-3.5 border border-[#22C55E] flex items-center justify-center p-0.5 rounded-sm bg-[#22C55E]/10" title="100% Pure Veg">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              </div>
            </div>

            {/* Dish Image with Hover Zoom */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 border border-[#E7E2D6]/60 dark:border-white/10 shadow-inner">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white font-bold text-xs border border-white/20">
                {item.price}
              </div>
            </div>

            {/* Information */}
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#292D29] dark:text-white group-hover:text-[#174D35] dark:group-hover:text-[#D4AF37] transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0] line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Subtle View Recipe / Inspect Link */}
            <div className="mt-3 pt-2.5 border-t border-[#E7E2D6] dark:border-[#1c2028] flex items-center justify-between text-[11px] font-semibold text-[#174D35] dark:text-[#D4AF37]">
              <span>View Recipe & Pairings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Specular sheen sweep on card hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          </Link>
        ))}
      </div>
    </div>
  );
}
