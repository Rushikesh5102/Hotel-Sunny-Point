"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types";
import { useRestaurant } from "@/context/RestaurantContext";
import { X, Clock, Sparkles, CheckCircle2, Share2, Flame, Heart } from "lucide-react";

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
}

export function DishModal({ dish, onClose }: DishModalProps) {
  const { t } = useRestaurant();
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!dish) return null;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/dish/${dish.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog (Bottom Sheet on Mobile, Centered Card on Desktop) */}
      <div className="relative w-full max-w-2xl bg-[#171A21] border-t sm:border border-[#D4AF37]/40 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-sm:max-h-[92vh] max-sm:mb-0 my-auto flex flex-col animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-300">
        {/* Mobile Pull Handle Indicator */}
        <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 hover:text-[#D4AF37] transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-52 sm:h-80 bg-[#0F1115] shrink-0">
          <Image
            src={imageError ? "/assets/brand/logo.jpg" : dish.image}
            alt={t(dish.name)}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-transparent to-black/40" />

          {/* Badges on Hero */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#0F1115]/90 border border-[#22C55E] flex items-center justify-center rounded p-1 shadow-md">
                <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
              </div>

              {dish.isSignature && (
                <span className="flex items-center gap-1 bg-[#D4AF37] text-[#0F1115] text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Signature Creation</span>
                </span>
              )}
            </div>

            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-bold text-[#F9E79F] drop-shadow-md">
                ₹{dish.price}
              </div>
              <div className="text-[10px] text-[#9DA4B0]">
                {dish.priceStatus === "verified" ? (
                  <span className="text-[#22C55E] flex items-center gap-1 justify-end font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Price</span>
                  </span>
                ) : (
                  <span>Provisional Demo Rate</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Header Title & Subtitle */}
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
              {t(dish.name)}
            </h2>
            <p className="text-sm text-[#D4AF37] font-medium">
              {dish.name.mr}
            </p>
          </div>

          {/* Description */}
          <div className="text-sm text-[#C9CDD5] leading-relaxed">
            {t(dish.fullDescription) || t(dish.shortDescription)}
          </div>

          {/* Key Attributes Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {dish.preparationTimeMinutes && (
              <div className="bg-[#0F1115] border border-[#2A3140] p-3 rounded-xl flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <p className="text-[10px] text-[#9DA4B0] uppercase">Prep Time</p>
                  <p className="text-xs font-semibold text-white">{dish.preparationTimeMinutes} minutes</p>
                </div>
              </div>
            )}

            {dish.servingSize && (
              <div className="bg-[#0F1115] border border-[#2A3140] p-3 rounded-xl flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-[#E07A2B]" />
                <div>
                  <p className="text-[10px] text-[#9DA4B0] uppercase">Serving Size</p>
                  <p className="text-xs font-semibold text-white">{dish.servingSize}</p>
                </div>
              </div>
            )}

            {dish.spicinessLevel && (
              <div className="bg-[#0F1115] border border-[#2A3140] p-3 rounded-xl flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Flame className="w-4 h-4 text-red-400" />
                <div>
                  <p className="text-[10px] text-[#9DA4B0] uppercase">Spice Level</p>
                  <p className="text-xs font-semibold text-white">
                    {dish.spicinessLevel === 1 ? "Mild" : dish.spicinessLevel === 2 ? "Medium Spicy" : "Fiery"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2.5">
                {t({ en: "Key Ingredients & Preparation", mr: "मुख्य घटक आणि पद्धत" })}
              </h4>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-[#0F1115] border border-[#2A3140] text-[#E2E8F0]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pairings */}
          {dish.pairingSuggestions && dish.pairingSuggestions.length > 0 && (
            <div className="bg-[#0F1115]/70 border border-[#D4AF37]/30 p-4 rounded-2xl">
              <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t({ en: "Recommended Pairings", mr: "सोबत काय घ्यावे" })}</span>
              </h4>
              <p className="text-xs text-[#C9CDD5]">
                {dish.pairingSuggestions.join(" • ")}
              </p>
            </div>
          )}

          {/* Share Button */}
          <div className="pt-4 border-t border-[#2A3140] flex items-center justify-between">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#F9E79F] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "Link Copied to Clipboard!" : "Share this Dish"}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#212631] hover:bg-[#2A3140] text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
