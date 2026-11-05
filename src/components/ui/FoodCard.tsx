"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types";
import { useRestaurant } from "@/context/RestaurantContext";
import { Sparkles, Star, Flame, Eye, Clock, CheckCircle2 } from "lucide-react";

interface FoodCardProps {
  dish: MenuItem;
  onSelectDish?: (dish: MenuItem) => void;
  variant?: "grid" | "compact";
}

export function FoodCard({ dish, onSelectDish, variant = "grid" }: FoodCardProps) {
  const { t } = useRestaurant();
  const [imageError, setImageError] = useState(false);

  // Compact List View (Ultra-fast mobile scanning)
  if (variant === "compact") {
    return (
      <div
        onClick={() => onSelectDish && onSelectDish(dish)}
        className={`group relative flex items-center justify-between gap-3 bg-white dark:bg-[#171A21] p-3.5 rounded-2xl border border-[#E7E2D6] dark:border-[#2A3140]/80 shadow-sm hover:border-[#174D35]/50 dark:hover:border-[#D4AF37]/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer ${
          !dish.isAvailable ? "opacity-75 grayscale-[30%]" : ""
        }`}
      >
        {/* Left Information Column */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            {/* Pure Veg Badge */}
            <div
              className="w-4 h-4 bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#22C55E] flex items-center justify-center rounded p-0.5 shrink-0"
              title="100% Pure Veg"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            </div>

            {dish.isSignature && (
              <span className="flex items-center gap-0.5 bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-2 h-2" />
                <span>Signature</span>
              </span>
            )}

            {dish.isBestseller && !dish.isSignature && (
              <span className="flex items-center gap-0.5 bg-[#E07A2B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                <Star className="w-2 h-2 fill-white" />
                <span>Bestseller</span>
              </span>
            )}

            {dish.spicinessLevel && dish.spicinessLevel > 1 && (
              <span className="flex items-center bg-[#FAF9F3] dark:bg-[#0F1115] px-1 py-0.5 rounded text-[9px] text-[#E07A2B] font-bold border border-[#E07A2B]/40">
                {Array.from({ length: dish.spicinessLevel }).map((_, i) => (
                  <Flame key={i} className="w-2 h-2 fill-[#E07A2B]" />
                ))}
              </span>
            )}
          </div>

          <h3 className="font-serif text-sm sm:text-base font-bold text-[#292D29] dark:text-white group-hover:text-primary dark:group-hover:text-[#D4AF37] transition-colors leading-snug truncate">
            {t(dish.name)}
          </h3>

          <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0] line-clamp-1 leading-normal my-1">
            {t(dish.shortDescription)}
          </p>

          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-bold text-base text-[#174D35] dark:text-[#F9E79F]">₹{dish.price}</span>
            {dish.priceStatus === "verified" ? (
              <span className="text-[9px] text-[#22C55E] font-medium flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>Verified</span>
              </span>
            ) : (
              <span className="text-[8px] text-[#6D756D] bg-[#F5F0E6] dark:text-[#9DA4B0] dark:bg-[#212631] px-1 py-0.5 rounded">
                Demo Rate
              </span>
            )}
            {dish.preparationTimeMinutes && (
              <span className="text-[10px] text-[#6D756D] dark:text-[#6B7280] ml-auto flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-[#174D35] dark:text-[#D4AF37]" />
                <span>{dish.preparationTimeMinutes}m</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Image Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#F5F0E6] dark:bg-[#1F2532] shrink-0 border border-[#E7E2D6] dark:border-[#2A3140]">
          <Image
            src={imageError ? "/assets/brand/logo.jpg" : dish.image}
            alt={t(dish.name)}
            fill
            sizes="(max-width: 640px) 96px, 120px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          {!dish.isAvailable && (
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-1 text-center">
              <span className="text-[9px] font-bold text-red-300 uppercase leading-tight">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard Grid View (Rich photography)
  return (
    <div
      onClick={() => onSelectDish && onSelectDish(dish)}
      className={`group relative flex flex-col justify-between bg-white dark:bg-[#171A21] rounded-2xl border border-[#E7E2D6] dark:border-[#2A3140]/80 overflow-hidden shadow-sm hover:border-[#174D35]/50 dark:hover:border-[#D4AF37]/50 hover:shadow-xl hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 cursor-pointer ${
        !dish.isAvailable ? "opacity-75 grayscale-[30%]" : ""
      }`}
    >
      {/* Top Media Area */}
      <div className="relative w-full aspect-[4/3] bg-[#F5F0E6] dark:bg-[#1F2532] overflow-hidden">
        <Image
          src={imageError ? "/assets/brand/logo.jpg" : dish.image}
          alt={t(dish.name)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          onError={() => setImageError(true)}
        />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#171A21] via-transparent to-black/30 pointer-events-none" />

        {/* Futuristic Specular Sheen Shimmer on Hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 dark:via-[#D4AF37]/15 to-transparent pointer-events-none z-20" />

        {/* Top Badges: Pure Veg symbol & Spiciness */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <div
            className="w-5 h-5 bg-[#FAF9F3]/95 dark:bg-[#0F1115]/90 backdrop-blur-md border border-[#22C55E] flex items-center justify-center rounded p-0.5 shadow-md"
            title="100% Pure Veg"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
          </div>

          {dish.spicinessLevel && dish.spicinessLevel > 1 && (
            <div className="flex items-center bg-[#FAF9F3]/90 dark:bg-[#0F1115]/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-[#E07A2B] font-bold border border-[#E07A2B]/40">
              {Array.from({ length: dish.spicinessLevel }).map((_, i) => (
                <Flame key={i} className="w-2.5 h-2.5 fill-[#E07A2B]" />
              ))}
            </div>
          )}
        </div>

        {/* Top Right Badges: Bestseller / Signature / Chef */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
          {dish.isSignature && (
            <span className="flex items-center gap-1 bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md tracking-wider uppercase">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Signature</span>
            </span>
          )}
          {dish.isBestseller && !dish.isSignature && (
            <span className="flex items-center gap-1 bg-[#E07A2B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md uppercase">
              <Star className="w-2.5 h-2.5 fill-white" />
              <span>Bestseller</span>
            </span>
          )}
          {dish.isChefRecommendation && !dish.isSignature && !dish.isBestseller && (
            <span className="bg-[#FAF9F3] dark:bg-[#212631]/95 text-[#174D35] dark:text-[#D4AF37] border border-[#174D35]/30 dark:border-[#D4AF37]/50 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md">
              Chef&apos;s Pick
            </span>
          )}
        </div>

        {/* Unavailable Ribbon */}
        {!dish.isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-red-950/90 text-red-300 border border-red-700/80 text-xs font-bold px-3 py-1 rounded-full shadow-lg tracking-wider uppercase">
              {t({ en: "Currently Unavailable", mr: "सध्या अनुपलब्ध" })}
            </span>
          </div>
        )}

        {/* Quick View Hover Prompt */}
        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 bg-black/75 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
          <Eye className="w-3 h-3 text-[#174D35] dark:text-[#D4AF37]" />
          <span>{t({ en: "Details", mr: "माहिती" })}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5 min-h-[2.75rem]">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#292D29] dark:text-white group-hover:text-[#174D35] dark:group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
              {t(dish.name)}
            </h3>
          </div>

          <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] line-clamp-2 leading-relaxed mb-3 min-h-[2rem]">
            {t(dish.shortDescription)}
          </p>
        </div>

        {/* Footer Area: Price & Prep Time */}
        <div className="pt-2 border-t border-[#E7E2D6] dark:border-[#2A3140]/60 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg sm:text-xl text-[#174D35] dark:text-[#F9E79F]">
                ₹{dish.price}
              </span>
              {dish.priceStatus === "verified" ? (
                <span
                  className="text-[10px] text-[#22C55E] flex items-center gap-0.5"
                  title="Verified Published Menu Price"
                >
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>Verified</span>
                </span>
              ) : (
                <span
                  className="text-[9px] text-[#6D756D] bg-[#F5F0E6] dark:text-[#9DA4B0] dark:bg-[#212631] px-1.5 py-0.5 rounded"
                  title="Sample Rate for Demo. Editable in Admin."
                >
                  Demo Rate
                </span>
              )}
            </div>
            {dish.servingSize && (
              <span className="text-[10px] text-[#6D756D] dark:text-[#6B7280]">{dish.servingSize}</span>
            )}
          </div>

          {dish.preparationTimeMinutes && (
            <div className="flex items-center gap-1 text-[11px] text-[#6D756D] dark:text-[#9DA4B0] bg-[#FAF9F3] dark:bg-[#0F1115] px-2 py-1 rounded-md border border-[#E7E2D6] dark:border-[#2A3140]/60">
              <Clock className="w-3 h-3 text-[#174D35] dark:text-[#D4AF37]" />
              <span>{dish.preparationTimeMinutes} min</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
