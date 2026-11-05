"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRestaurant } from "@/context/RestaurantContext";
import { Sparkles, ArrowRight, Clock, MapPin, Utensils, Star, ShieldCheck, Heart, Volume2 } from "lucide-react";
import { GoldenParticles } from "@/components/ui/GoldenParticles";
import { RotatingHeritageSeal } from "@/components/ui/RotatingHeritageSeal";
import { HeroTastingTrio } from "@/components/home/HeroTastingTrio";
import { DosaSizzleASMR } from "@/components/ui/DosaSizzleASMR";

export function HeroSection() {
  const { restaurant, t } = useRestaurant();

  // Scroll smoothly down to the heritage section
  const handleScrollDown = () => {
    if (typeof window !== "undefined") {
      const target = document.getElementById("heritage-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col items-center justify-center overflow-hidden bg-[#FAF9F3] dark:bg-[#0B0D10] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* 1. Background Photography with Warm Luxury Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/brand/facade.jpg"
          alt="Hotel Sunny Point Exterior"
          fill
          className="object-cover object-center scale-105 opacity-15 dark:opacity-25 filter blur-[1px]"
          priority
        />
        {/* Soft radial and linear gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F3] via-[#FAF9F3]/90 to-[#FAF9F3]/70 dark:from-[#0F1115] dark:via-[#0F1115]/85 dark:to-[#0F1115]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#FAF9F3]/60 to-[#FAF9F3] dark:from-transparent dark:via-[#0F1115]/60 dark:to-[#0F1115]" />
      </div>

      {/* 2. Ambient Golden Embers & Floating Steam Canvas */}
      <GoldenParticles />

      {/* 3. Main Center Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7 w-full pt-4">
        {/* Real-Time Live Kitchen Status & Operational Beacon */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 dark:bg-[#171A21]/95 border border-[#174D35]/30 dark:border-[#D4AF37]/50 shadow-md text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-widest backdrop-blur-md"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span>
            {t({
              en: "Kitchen Open Now • Serving Heritage Specials (7:30 AM – 10:30 PM)",
              mr: "किचन सुरू आहे • अस्सल दाक्षिणात्य स्वाद (सकाळी ७:३० – रात्री १०:३०)",
            })}
          </span>
        </motion.div>

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

        {/* Action CTAs with Interactive Sizzle Soundbite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <Link
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-gradient-to-r dark:from-[#D4AF37] dark:via-[#E5C158] dark:to-[#B89324] dark:text-[#0F1115] shadow-xl hover:shadow-[#174D35]/30 dark:hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 tracking-wider uppercase"
          >
            <Utensils className="w-4 h-4" />
            <span>{t({ en: "Explore Full Digital Menu", mr: "डिजिटल मेनू पहा" })}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-xs font-semibold bg-white hover:bg-[#F5F0E6] text-[#292D29] border border-[#E7E2D6] hover:border-[#174D35]/50 dark:bg-[#171A21]/90 dark:hover:bg-[#212631] dark:text-white dark:border-[#2A3140] dark:hover:border-[#D4AF37]/60 shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            <span>{t({ en: "Our 1995 Heritage", mr: "आमचा १९९५ चा इतिहास" })}</span>
          </Link>

          {/* Crispy Dosa Sizzle ASMR Bite */}
          <div className="w-full sm:w-auto flex justify-center">
            <DosaSizzleASMR />
          </div>
        </motion.div>

        {/* Heritage Trust & Accolades Bar (4 Stats) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs"
        >
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-[#171A21]/80 border border-[#E7E2D6] dark:border-[#2A3140]/60 backdrop-blur-sm shadow-sm hover:border-[#22C55E]/60 transition-colors">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-4 ring-[#22C55E]/20" />
            <div className="text-left">
              <span className="font-bold text-xs text-[#292D29] dark:text-white block">100% Pure Veg</span>
              <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0]">No Egg • No Non-Veg</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-[#171A21]/80 border border-[#E7E2D6] dark:border-[#2A3140]/60 backdrop-blur-sm shadow-sm hover:border-[#174D35]/60 dark:hover:border-[#D4AF37]/60 transition-colors">
            <Clock className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37] shrink-0" />
            <div className="text-left">
              <span className="font-bold text-xs text-[#292D29] dark:text-white block">Since 1995</span>
              <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0]">30+ Years Legacy</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-[#171A21]/80 border border-[#E7E2D6] dark:border-[#2A3140]/60 backdrop-blur-sm shadow-sm hover:border-[#174D35]/60 dark:hover:border-[#D4AF37]/60 transition-colors">
            <Sparkles className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37] shrink-0" />
            <div className="text-left">
              <span className="font-bold text-xs text-[#292D29] dark:text-white block">Dosa Pioneer</span>
              <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0]">Bhadrawati&apos;s First</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-[#171A21]/80 border border-[#E7E2D6] dark:border-[#2A3140]/60 backdrop-blur-sm shadow-sm hover:border-[#E07A2B]/60 transition-colors">
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

        {/* 5. Smooth Scroll Down Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="pt-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
          onClick={handleScrollDown}
        >
          <span className="text-[11px] font-semibold text-[#6D756D] dark:text-[#9DA4B0] group-hover:text-[#174D35] dark:group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
            Scroll to Taste Legacy
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[#174D35]/40 dark:border-[#D4AF37]/50 flex items-start justify-center p-1 group-hover:border-[#174D35] dark:group-hover:border-[#D4AF37] transition-colors">
            <div className="w-1.5 h-2 bg-[#174D35] dark:bg-[#D4AF37] rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
