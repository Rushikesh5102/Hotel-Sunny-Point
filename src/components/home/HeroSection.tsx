"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRestaurant } from "@/context/RestaurantContext";
import { Sparkles, ArrowRight, Clock, Star, ChevronDown } from "lucide-react";
import { GoldenParticles } from "@/components/ui/GoldenParticles";
import { RotatingHeritageSeal } from "@/components/ui/RotatingHeritageSeal";
import { HeroTastingTrio } from "@/components/home/HeroTastingTrio";

export function HeroSection() {
  const { restaurant, t } = useRestaurant();

  // Scroll smoothly down to the menu or heritage section
  const handleScrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const target = document.getElementById("menu-section") || document.getElementById("heritage-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-[94vh] flex flex-col items-center justify-center overflow-hidden bg-[#FAF9F3] dark:bg-black py-14 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* 1. Background Photography with Visible Landmark Architectural Silhouette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/assets/brand/facade.jpg"
          alt="Hotel Sunny Point Landmark Architectural Facade"
          fill
          className="object-cover object-top scale-100 opacity-60 dark:opacity-45 contrast-125 saturate-110 transition-opacity duration-700"
          priority
        />
        {/* Architectural Silhouette overlay with balanced contrast in both light and dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F3] via-[#FAF9F3]/70 to-[#FAF9F3]/30 dark:from-black dark:via-black/75 dark:to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#FAF9F3]/30 to-[#FAF9F3]/85 dark:via-black/40 dark:to-black/95" />
      </div>

      {/* 2. Ambient Golden Embers & Floating Steam Canvas */}
      <GoldenParticles />

      {/* 3. Main Center Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7 w-full pt-4">
        {/* Master Heritage Seal with Rotating Circular Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center"
        >
          <RotatingHeritageSeal logoUrl={restaurant.settings.logoUrl} size={150} />
        </motion.div>

        {/* Luxury Headlines & Editorial Typographic Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#292D29] dark:text-white drop-shadow-sm">
            {t(restaurant.settings.name)}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#174D35] dark:to-[#D4AF37]" />
            <p className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold text-[#174D35] dark:text-gold-gradient tracking-wider uppercase">
              {t(restaurant.settings.tagline)}
            </p>
            <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#174D35] dark:to-[#D4AF37]" />
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#6D756D] dark:text-[#C9CDD5] leading-relaxed">
            {t({
              en: "The historic home of authentic South Indian dosas since 1995 and curated Global Bites in Bhadrawati. A pure vegetarian culinary legacy passed down through three decades of devotion.",
              mr: "१९९५ पासून भद्रावतीत सुरू झालेली अस्सल दाक्षिणात्य डोसा संस्कृती आणि आंतरराष्ट्रीय स्वादांचा अनोखा संगम. पिढ्यानपिढ्या जतन केलेला १००% शुद्ध शाकाहारी वारसा.",
            })}
          </p>
        </motion.div>

        {/* Action: Text + Bouncing Down Arrow Pointing Directly to Menu Below */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1"
        >
          <a
            href="#menu-section"
            onClick={handleScrollToMenu}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm sm:text-base font-serif font-bold text-[#174D35] dark:text-[#D4AF37] hover:text-[#225E43] dark:hover:text-[#F9E79F] transition-all group border border-[#174D35]/30 dark:border-[#D4AF37]/40 bg-white/80 dark:bg-black/90 backdrop-blur-md shadow-sm hover:shadow-md cursor-pointer"
          >
            <span className="tracking-wide uppercase text-xs sm:text-sm">
              {t({ en: "Explore Full Digital Menu", mr: "डिजिटल मेनू पहा", hi: "डिजिटल मेनू देखें" })}
            </span>
            <ChevronDown className="w-4 h-4 text-[#E07A2B] animate-bounce group-hover:translate-y-1 transition-transform" />
          </a>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs text-[#6D756D] dark:text-[#C9CDD5] hover:text-[#174D35] dark:hover:text-white font-medium hover:underline transition-colors py-1"
          >
            <span>{t({ en: "Our 1995 Story", mr: "आमचा १९९५ चा इतिहास" })}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Heritage Trust & Accolades Bar (4 Stats) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs"
        >
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-black/90 border border-[#E7E2D6] dark:border-[#1c2028] backdrop-blur-sm shadow-sm hover:border-[#22C55E]/60 transition-colors">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-4 ring-[#22C55E]/20" />
            <div className="text-left">
              <span className="font-bold text-xs text-[#292D29] dark:text-white block">100% Pure Veg</span>
              <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0]">No Egg • No Non-Veg</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-black/90 border border-[#E7E2D6] dark:border-[#1c2028] backdrop-blur-sm shadow-sm hover:border-[#174D35]/60 dark:hover:border-[#D4AF37]/60 transition-colors">
            <Clock className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37] shrink-0" />
            <div className="text-left">
              <span className="font-bold text-xs text-[#292D29] dark:text-white block">Since 1995</span>
              <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0]">30+ Years Legacy</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-black/90 border border-[#E7E2D6] dark:border-[#1c2028] backdrop-blur-sm shadow-sm hover:border-[#174D35]/60 dark:hover:border-[#D4AF37]/60 transition-colors">
            <Sparkles className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37] shrink-0" />
            <div className="text-left">
              <span className="font-bold text-xs text-[#292D29] dark:text-white block">Dosa Pioneer</span>
              <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0]">Bhadrawati&apos;s First</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-black/90 border border-[#E7E2D6] dark:border-[#1c2028] backdrop-blur-sm shadow-sm hover:border-[#E07A2B]/60 transition-colors">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <div className="text-left">
              <span className="font-bold text-xs text-[#292D29] dark:text-white block">4.8 ★ Google Rating</span>
              <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0]">Family Favorite</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Hero Tasting Trio (Floating Specular Dish Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
        >
          <HeroTastingTrio />
        </motion.div>
      </div>
    </section>
  );
}
