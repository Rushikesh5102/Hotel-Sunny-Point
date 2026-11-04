"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuItem } from "@/types";
import { DishModal } from "@/components/ui/DishModal";
import { CloudRain, Sparkles, ArrowRight, Tag } from "lucide-react";

export function SeasonalSpecialsSection() {
  const { restaurant, t } = useRestaurant();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const activePromo = restaurant.promotions.find((p) => p.isActive) || restaurant.promotions[0];
  const promoDishes = restaurant.items.filter((item) =>
    activePromo?.linkedDishIds.includes(item.id)
  );

  return (
    <section className="py-20 bg-[#0F1115] border-t border-[#2A3140]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Area */}
        <div className="bg-gradient-to-br from-[#171A21] via-[#1A1813] to-[#171A21] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                <CloudRain className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{activePromo.badgeText}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t(activePromo.title)}
              </h2>

              <p className="text-sm sm:text-base text-[#D4AF37] font-medium">
                {t(activePromo.subtitle)}
              </p>

              <p className="text-xs sm:text-sm text-[#C9CDD5] leading-relaxed max-w-xl">
                {t(activePromo.description)}
              </p>

              {activePromo.couponCode && (
                <div className="inline-flex items-center gap-2 bg-[#0F1115] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-xl text-xs">
                  <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[#9DA4B0]">Coupon Code:</span>
                  <span className="font-mono font-bold text-[#F9E79F]">{activePromo.couponCode}</span>
                </div>
              )}

              <div className="pt-2">
                <Link
                  href="/offers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#B89324] text-[#0F1115] uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>{t({ en: "View All Specials & Offers", mr: "सर्व ऑफर्स पहा" })}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Poster Thumbnail */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-[4/3] w-full max-w-md rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
                <Image
                  src={activePromo.bannerImage}
                  alt={t(activePromo.title)}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Linked Promo Dishes Grid */}
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span>{t({ en: "Featured in this Promotion", mr: "या ऑफरमधील खास पदार्थ" })}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promoDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="bg-[#171A21] border border-[#2A3140] hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full bg-[#0F1115]">
                  <Image
                    src={dish.image}
                    alt={t(dish.name)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <div className="w-4 h-4 bg-[#0F1115]/90 border border-[#22C55E] flex items-center justify-center rounded p-0.5 shadow-md">
                      <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-white text-sm group-hover:text-[#D4AF37] transition-colors">
                      {t(dish.name)}
                    </h4>
                    <span className="font-bold text-sm text-[#F9E79F] shrink-0">
                      ₹{dish.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#9DA4B0] line-clamp-2">
                    {t(dish.shortDescription)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
