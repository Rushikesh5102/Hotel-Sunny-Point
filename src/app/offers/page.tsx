"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { FoodCard } from "@/components/ui/FoodCard";
import { DishModal } from "@/components/ui/DishModal";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuItem } from "@/types";
import { Sparkles, Tag, CloudRain, Copy, Check, ArrowRight } from "lucide-react";

export default function OffersPage() {
  const { restaurant, t } = useRestaurant();
  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCoupon = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-[#0F1115] text-[#292D29] dark:text-[#F5F5F5] pb-16 md:pb-0 transition-colors duration-200">
      <Header />

      <main className="flex-1 pb-24">
        {/* Offers Header */}
        <section className="bg-gradient-to-b from-[#F5F0E6] to-[#FAF9F3] dark:from-[#171A21] dark:to-[#0F1115] border-b border-[#E7E2D6] dark:border-[#2A3140]/60 py-14 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D35]/10 border border-[#174D35]/20 text-[#174D35] dark:bg-[#D4AF37]/10 dark:border-[#D4AF37]/30 dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t({ en: "Promotions & Seasonal Specials", mr: "सण आणि सिझनल ऑफर्स" })}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292D29] dark:text-white tracking-tight">
              {t({ en: "Special Offers & Campaigns", mr: "हॉटेल सनी पॉईंटच्या खास ऑफर्स" })}
            </h1>

            <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#9DA4B0] max-w-xl mx-auto leading-relaxed">
              {t({
                en: "Seasonal menu curations, verified value festivals, and limited-time dishes created by our chefs in Bhadrawati.",
                mr: "पावसाळी विशेष पदार्थ, सूप महोत्सव आणि आमच्या शेफने तयार केलेल्या खास डिशेस.",
              })}
            </p>
          </div>
        </section>

        {/* Promotions List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
          {restaurant.promotions.map((promo) => {
            const linkedDishes = restaurant.items.filter((item) =>
              promo.linkedDishIds.includes(item.id)
            );

            return (
              <div
                key={promo.id}
                className="bg-white dark:bg-[#171A21] border border-[#E7E2D6] dark:border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-md dark:shadow-2xl space-y-8 transition-colors"
              >
                {/* Promo Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D35]/10 border border-[#174D35]/30 text-[#174D35] dark:bg-[#D4AF37]/10 dark:border-[#D4AF37]/40 dark:text-[#D4AF37] text-xs font-semibold uppercase">
                      <CloudRain className="w-3.5 h-3.5" />
                      <span>{promo.badgeText}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#292D29] dark:text-white leading-tight">
                      {t(promo.title)}
                    </h2>

                    <p className="text-sm text-[#174D35] dark:text-[#D4AF37] font-medium">{t(promo.subtitle)}</p>

                    <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#C9CDD5] leading-relaxed">
                      {t(promo.description)}
                    </p>

                    {promo.couponCode && (
                      <div className="flex items-center gap-3 pt-2">
                        <div className="bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#D4AF37]/50 px-4 py-2 rounded-xl flex items-center gap-2.5">
                          <Tag className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                          <span className="font-mono font-bold text-[#174D35] dark:text-white text-sm">
                            {promo.couponCode}
                          </span>
                        </div>

                        <button
                          onClick={() => copyCoupon(promo.couponCode!)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#EDF2E9] dark:bg-[#212631] text-[#174D35] dark:text-[#D4AF37] hover:bg-[#E2EAE0] dark:hover:bg-[#2A3140] hover:shadow-sm active:scale-95 transition-all duration-200"
                        >
                          {copiedCode === promo.couponCode ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                              <span>Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Coupon Code</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative aspect-[4/3] w-full max-w-md rounded-2xl overflow-hidden border border-[#E7E2D6] dark:border-[#D4AF37]/30 shadow-md">
                      <Image
                        src={promo.bannerImage}
                        alt={t(promo.title)}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Linked Dishes Grid */}
                {linkedDishes.length > 0 && (
                  <div className="pt-6 border-t border-[#E7E2D6] dark:border-[#2A3140]">
                    <h3 className="font-serif text-lg font-bold text-[#292D29] dark:text-white mb-6 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                      <span>{t({ en: "Dishes in this Campaign", mr: "या मोहिमेतील पदार्थ" })}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {linkedDishes.map((dish) => (
                        <FoodCard
                          key={dish.id}
                          dish={dish}
                          onSelectDish={(d) => setActiveDish(d)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>

      <DishModal dish={activeDish} onClose={() => setActiveDish(null)} />
      <Footer />
    </div>
  );
}
