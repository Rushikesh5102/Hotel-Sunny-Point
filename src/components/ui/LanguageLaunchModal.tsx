"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import { LanguageCode } from "@/types";
import { Globe, Check, Sparkles } from "lucide-react";

export function LanguageLaunchModal() {
  const { language, setLanguage, restaurant } = useRestaurant();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already made an explicit language selection
    try {
      const selected = localStorage.getItem("sunny_point_lang_selected");
      if (!selected) {
        // First-time launch: display welcoming language selector
        setIsOpen(true);
      }
    } catch (e) {
      // Fallback
    }

    // Listen to manual open trigger from header compact button
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-language-launch-modal", handleOpen);
    return () => window.removeEventListener("open-language-launch-modal", handleOpen);
  }, []);

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    try {
      localStorage.setItem("sunny_point_lang_selected", "true");
      localStorage.setItem("sunny_point_lang", code);
    } catch (e) {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const languages: { code: LanguageCode; native: string; subtitle: string; badge: string }[] = [
    {
      code: "en",
      native: "English",
      subtitle: "Explore our pure veg culinary legacy",
      badge: "EN",
    },
    {
      code: "mr",
      native: "मराठी",
      subtitle: "अस्सल चव आणि डिजिटल मेनू पहा",
      badge: "मराठी",
    },
    {
      code: "hi",
      native: "हिन्दी",
      subtitle: "स्वादिष्ट व्यंजन और डिजिटल मेनू",
      badge: "हिन्दी",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative max-w-lg w-full bg-[#FAF9F3] dark:bg-black border-2 border-[#174D35]/30 dark:border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Ambient background glows */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#174D35]/20 dark:bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Crest */}
        <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#174D35] dark:border-[#D4AF37] shadow-lg mb-4">
          <Image
            src={restaurant.settings.logoUrl}
            alt={restaurant.settings.name.en}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Welcome Tagline */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D35]/10 dark:bg-[#D4AF37]/15 text-[#174D35] dark:text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>Estd 1995 • 100% Pure Veg</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292D29] dark:text-white mb-1">
          Welcome to Hotel Sunny Point
        </h2>
        <p className="font-serif text-sm text-[#174D35] dark:text-[#D4AF37] font-semibold mb-4">
          हॉटेल सनी पॉईंट मध्ये आपले स्वागत आहे
        </p>

        <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#9DA4B0] mb-6 max-w-md mx-auto">
          Please select your preferred language to access the digital menu and hospitality specials:
        </p>

        {/* 3 Language Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {languages.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                onClick={() => handleSelectLanguage(item.code)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 active:scale-95 group relative ${
                  isSelected
                    ? "bg-[#174D35] text-white border-[#174D35] dark:bg-[#D4AF37] dark:text-black dark:border-[#D4AF37] shadow-lg"
                    : "bg-white dark:bg-black text-[#292D29] dark:text-white border-[#E7E2D6] dark:border-[#1c2028] hover:border-[#174D35]/60 dark:hover:border-[#D4AF37]/60 shadow-sm"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                    isSelected
                      ? "bg-white/20 text-white dark:bg-black/20 dark:text-black"
                      : "bg-[#174D35]/10 text-[#174D35] dark:bg-[#D4AF37]/20 dark:text-[#D4AF37]"
                  }`}
                >
                  {item.badge}
                </span>

                <span className="font-bold text-base sm:text-lg mb-0.5">{item.native}</span>
                <span
                  className={`text-[10px] leading-tight text-center ${
                    isSelected ? "text-white/80 dark:text-black/80" : "text-[#6D756D] dark:text-[#9DA4B0]"
                  }`}
                >
                  {item.subtitle}
                </span>

                {isSelected && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#174D35] dark:text-[#D4AF37]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Continue Button */}
        <button
          onClick={() => handleSelectLanguage(language)}
          className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-gradient-to-r dark:from-[#D4AF37] dark:via-[#E5C158] dark:to-[#B89324] dark:text-black shadow-lg uppercase tracking-wider transition-transform active:scale-95"
        >
          Continue to Digital Menu / मेनू पहा
        </button>
      </div>
    </div>
  );
}
