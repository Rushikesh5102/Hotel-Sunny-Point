"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuItem } from "@/types";
import { DishModal } from "@/components/ui/DishModal";
import { Globe, ArrowRight, Sparkles } from "lucide-react";

export function GlobalBitesSection() {
  const { restaurant, t } = useRestaurant();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Dishes belonging to Global Bites
  const globalDishes = restaurant.items.filter((i) => i.categoryId === "cat-global-bites").slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF9F3] dark:bg-[#0B0D10] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E07A2B]/10 border border-[#E07A2B]/40 text-xs font-bold text-[#E07A2B] uppercase tracking-widest">
            <Globe className="w-3.5 h-3.5 text-[#E07A2B]" />
            <span>{t({ en: "Global Flavours in Bhadrawati", mr: "भद्रावतीत आंतरराष्ट्रीय चव" })}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#292D29] dark:text-white tracking-tight">
            GLOBAL BITES
          </h2>

          <p className="text-sm sm:text-base text-[#6D756D] dark:text-[#9DA4B0]">
            {t({
              en: "Have you ever tried international cuisine in Bhadrawati? From artisanal Italian pastas to creamy stroganoff and Mexican rice, crafted 100% pure vegetarian.",
              mr: "भद्रावतीत कधी आंतरराष्ट्रीय चवींचा आस्वाद घेतला आहे का? इटालियन पास्ता, लसानिया आणि मेक्सिकन राईसची शुद्ध शाकाहारी मेजवानी.",
            })}
          </p>
        </div>

        {/* Global Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {globalDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="bg-white dark:bg-[#171A21] border border-[#E7E2D6] dark:border-[#2A3140] hover:border-[#174D35] dark:hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md group cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full bg-[#F5F0E6] dark:bg-[#0F1115] overflow-hidden">
                <Image
                  src={dish.image}
                  alt={t(dish.name)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#171A21] via-transparent to-transparent" />

                <div className="absolute top-2.5 left-2.5">
                  <div className="w-4 h-4 bg-white/90 dark:bg-[#0F1115]/90 border border-[#22C55E] flex items-center justify-center rounded p-0.5 shadow-md">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                  </div>
                </div>

                <div className="absolute bottom-2.5 right-2.5">
                  <span className="font-bold text-[#174D35] dark:text-white bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs border border-[#E7E2D6] dark:border-[#2A3140] shadow-sm">
                    ₹{dish.price}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-[#292D29] dark:text-white text-base group-hover:text-primary dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {t(dish.name)}
                  </h3>
                  <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] line-clamp-2 mt-1 leading-relaxed">
                    {t(dish.shortDescription)}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E7E2D6] dark:border-[#2A3140]/60 flex items-center justify-between text-xs text-[#174D35] dark:text-[#D4AF37]">
                  <span className="text-[11px] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Pure Veg Creation</span>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/menu/global-bites"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-white hover:bg-[#FAF9F3] text-[#174D35] border border-[#E7E2D6] hover:border-[#174D35] dark:bg-[#171A21] dark:hover:bg-[#212631] dark:text-[#D4AF37] dark:border-[#D4AF37]/40 dark:hover:border-[#D4AF37] uppercase tracking-wider transition-all shadow-md"
          >
            <span>{t({ en: "View All Global Bites Items", mr: "सर्व ग्लोबल बाईट्स पहा" })}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
