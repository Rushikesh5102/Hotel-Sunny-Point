"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import { ArrowRight, Utensils } from "lucide-react";

export function CategoryGrid() {
  const { restaurant, t } = useRestaurant();

  return (
    <section className="py-20 bg-[#F5F0E6] dark:bg-[#0F1115] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-widest">
              <Utensils className="w-3.5 h-3.5" />
              <span>{t({ en: "Curated Culinary Selection", mr: "आमचे मेनू विभाग" })}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292D29] dark:text-white tracking-tight">
              {t({ en: "Explore Menu by Category", mr: "कॅटेगरीनुसार मेनू निवडा" })}
            </h2>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174D35] hover:text-[#225E43] dark:text-[#D4AF37] dark:hover:text-[#F9E79F] transition-colors"
          >
            <span>{t({ en: "View All 30+ Dishes", mr: "सर्व ३०+ पदार्थ पहा" })}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurant.categories.map((cat, idx) => {
            const itemCount = restaurant.items.filter((i) => i.categoryId === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.slug}`}
                className="group relative flex flex-col justify-end h-72 rounded-2xl overflow-hidden border border-[#E7E2D6] dark:border-[#2A3140] hover:border-[#174D35] dark:hover:border-[#D4AF37]/70 shadow-md hover:shadow-2xl hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300"
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={t(cat.name)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/30 transition-colors" />

                {/* Top Badge (if any) */}
                {cat.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md uppercase">
                      {t(cat.badge)}
                    </span>
                  </div>
                )}

                {/* Bottom Content Area */}
                <div className="relative z-10 p-5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#F5E8BA] dark:text-[#D4AF37] tracking-wider uppercase">
                      {itemCount} {t({ en: "Dishes", mr: "पदार्थ" })}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-[#174D35] dark:group-hover:bg-[#D4AF37] group-hover:text-white dark:group-hover:text-[#0F1115] text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F9E79F] transition-colors">
                    {t(cat.name)}
                  </h3>

                  <p className="text-xs text-[#E5E7EB] line-clamp-2 leading-relaxed">
                    {t(cat.description)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
