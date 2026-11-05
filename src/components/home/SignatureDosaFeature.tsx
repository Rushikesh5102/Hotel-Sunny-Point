"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuItem } from "@/types";
import { DishModal } from "@/components/ui/DishModal";
import { Sparkles, ArrowRight, Award, Coffee, Star } from "lucide-react";

export function SignatureDosaFeature() {
  const { restaurant, t } = useRestaurant();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const masalaDosa = restaurant.items.find((i) => i.id === "dish-masala-dosa") || restaurant.items[0];
  const pesarattu = restaurant.items.find((i) => i.id === "dish-pesarattu-dosa");
  const setDosa = restaurant.items.find((i) => i.id === "dish-set-dosa");
  const mlaDosa = restaurant.items.find((i) => i.id === "dish-mla-dosa");

  return (
    <section className="py-20 bg-[#FAF9F3] dark:bg-black relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D35]/10 dark:bg-[#D4AF37]/10 border border-[#174D35]/30 dark:border-[#D4AF37]/30 text-xs font-bold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
            <span>{t({ en: "Signature Culinary Heritage", mr: "आमचा स्वादाचा वारसा" })}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#292D29] dark:text-white tracking-tight">
            {t({
              en: "The Iconic Masala Dosa",
              mr: "आयकॉनिक मसाला डोसा",
            })}
          </h2>

          <p className="text-sm sm:text-base text-[#6D756D] dark:text-[#9DA4B0]">
            {t({
              en: "Crispy outside, soft & flavourful inside. Perfected over three decades since 1995.",
              mr: "बाहेरून कुरकुरीत, आतून मऊ आणि सुगंधी. १९९५ पासून भद्रावतीची लाडकी चव.",
            })}
          </p>
        </div>

        {/* Feature Hero Card */}
        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Area */}
            <div className="lg:col-span-6 relative">
              <div
                onClick={() => setSelectedDish(masalaDosa)}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#E7E2D6] dark:border-[#D4AF37]/30 shadow-xl cursor-pointer group"
              >
                <Image
                  src="/assets/dishes/masala-dosa.jpg"
                  alt="Iconic Masala Dosa at Hotel Sunny Point"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/90 dark:bg-black/90 border border-[#22C55E] flex items-center justify-center rounded p-0.5 shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
                  </div>
                  <span className="bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md uppercase">
                    Signature Since 1995
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs text-[#F5E8BA] font-serif">Served with Filter Coffee</span>
                    <p className="font-bold text-xl text-white">₹{masalaDosa.price}</p>
                  </div>
                  <span className="text-xs bg-black/60 px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                    <span>Inspect Recipe</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
                  </span>
                </div>
              </div>
            </div>

            {/* Information & What Makes It Special */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider">
                  South Indian Classic • Served With Love
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#292D29] dark:text-white mt-1">
                  {t(masalaDosa.name)}
                </h3>
              </div>

              <p className="text-sm text-[#6D756D] dark:text-[#C9CDD5] leading-relaxed">
                {t(masalaDosa.fullDescription) || t(masalaDosa.shortDescription)}
              </p>

              {/* What Makes It Special Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-3 rounded-xl flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#292D29] dark:text-white">Crispy Golden Dosa</h4>
                    <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">Slow-fermented rice & lentil batter</p>
                  </div>
                </div>

                <div className="bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-3 rounded-xl flex items-start gap-2.5">
                  <Star className="w-4 h-4 text-[#E07A2B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#292D29] dark:text-white">Flavourful Potato Masala</h4>
                    <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">Tempered with fresh herbs & spices</p>
                  </div>
                </div>

                <div className="bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-3 rounded-xl flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#292D29] dark:text-white">Signature Coconut Chutney</h4>
                    <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">Freshly ground daily, rich & creamy</p>
                  </div>
                </div>

                <div className="bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-3 rounded-xl flex items-start gap-2.5">
                  <Coffee className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#292D29] dark:text-white">Hot Filter Coffee</h4>
                    <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">Traditional davara tumbler pairing</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setSelectedDish(masalaDosa)}
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                >
                  {t({ en: "View Masala Dosa Details", mr: "डोशाची माहिती पहा" })}
                </button>

                <Link
                  href="/menu/south-indian"
                  className="text-xs font-semibold text-[#174D35] hover:text-[#225E43] dark:text-[#D4AF37] dark:hover:text-[#F9E79F] transition-colors flex items-center gap-1 group/link"
                >
                  <span>{t({ en: "Explore All Dosas", mr: "सर्व डोसे पहा" })}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Signature Dosas Trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pesarattu && (
            <div
              onClick={() => setSelectedDish(pesarattu)}
              className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] hover:border-[#174D35] dark:hover:border-[#D4AF37]/50 p-5 rounded-2xl cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-[#F5F0E6] dark:bg-black">
                <Image
                  src={pesarattu.image}
                  alt={t(pesarattu.name)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-serif font-bold text-[#292D29] dark:text-white text-base group-hover:text-primary dark:group-hover:text-[#D4AF37] transition-colors">
                {t(pesarattu.name)}
              </h4>
              <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] line-clamp-2 mt-1">
                {t(pesarattu.shortDescription)}
              </p>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E7E2D6] dark:border-[#1c2028]">
                <span className="font-bold text-[#174D35] dark:text-white">₹{pesarattu.price}</span>
                <span className="text-[11px] text-[#174D35] dark:text-[#D4AF37] font-semibold">Andhra Special</span>
              </div>
            </div>
          )}

          {setDosa && (
            <div
              onClick={() => setSelectedDish(setDosa)}
              className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] hover:border-[#174D35] dark:hover:border-[#D4AF37]/50 p-5 rounded-2xl cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-[#F5F0E6] dark:bg-black">
                <Image
                  src={setDosa.image}
                  alt={t(setDosa.name)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-serif font-bold text-[#292D29] dark:text-white text-base group-hover:text-primary dark:group-hover:text-[#D4AF37] transition-colors">
                {t(setDosa.name)}
              </h4>
              <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] line-clamp-2 mt-1">
                {t(setDosa.shortDescription)}
              </p>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E7E2D6] dark:border-[#1c2028]">
                <span className="font-bold text-[#174D35] dark:text-white">₹{setDosa.price}</span>
                <span className="text-[11px] text-[#174D35] dark:text-[#D4AF37] font-semibold">Sponge Dosa Trio</span>
              </div>
            </div>
          )}

          {mlaDosa && (
            <div
              onClick={() => setSelectedDish(mlaDosa)}
              className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] hover:border-[#174D35] dark:hover:border-[#D4AF37]/50 p-5 rounded-2xl cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-[#F5F0E6] dark:bg-black">
                <Image
                  src={mlaDosa.image}
                  alt={t(mlaDosa.name)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-serif font-bold text-[#292D29] dark:text-white text-base group-hover:text-primary dark:group-hover:text-[#D4AF37] transition-colors">
                {t(mlaDosa.name)}
              </h4>
              <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] line-clamp-2 mt-1">
                {t(mlaDosa.shortDescription)}
              </p>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E7E2D6] dark:border-[#1c2028]">
                <span className="font-bold text-[#174D35] dark:text-white">₹{mlaDosa.price}</span>
                <span className="text-[11px] text-[#174D35] dark:text-[#D4AF37] font-semibold">Ghee Upma Stuffing</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dish Modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
