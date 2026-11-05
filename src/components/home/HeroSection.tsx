"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRestaurant } from "@/context/RestaurantContext";
import { Sparkles, ArrowRight, Clock, MapPin, Utensils } from "lucide-react";

export function HeroSection() {
  const { restaurant, t } = useRestaurant();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#FAF9F3] dark:bg-[#0B0D10] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Background Photography with Warm Luxury Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/brand/facade.jpg"
          alt="Hotel Sunny Point Exterior"
          fill
          className="object-cover object-center scale-105 opacity-15 dark:opacity-30 filter blur-[1px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F3] via-[#FAF9F3]/85 to-[#FAF9F3]/60 dark:from-[#0F1115] dark:via-[#0F1115]/80 dark:to-[#0F1115]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#FAF9F3]/60 to-[#FAF9F3] dark:from-transparent dark:via-[#0F1115]/60 dark:to-[#0F1115]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Established Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-[#171A21]/90 border border-[#174D35]/30 dark:border-[#D4AF37]/50 shadow-md text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-widest backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37] animate-pulse" />
          <span>{t({ en: "Serving Bhadrawati Since 1965", mr: "१९६५ पासून भद्रावतीकरांच्या सेवेत" })}</span>
        </motion.div>

        {/* Master Logo Medallion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative group">
            {/* Ambient Breathing Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#174D35]/30 to-[#C6A45C]/40 dark:from-[#D4AF37]/40 dark:to-[#E5C158]/40 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#174D35] dark:border-[#D4AF37] shadow-2xl p-1 bg-white dark:bg-[#0F1115]">
              <Image
                src={restaurant.settings.logoUrl}
                alt="Hotel Sunny Point Logo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Headlines */}
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
              en: "The historic home of authentic South Indian dosas since 1995 and curated Global Bites in Bhadrawati. A pure vegetarian culinary legacy passed down through generations.",
              mr: "१९९५ पासून भद्रावतीत सुरू झालेली अस्सल दाक्षिणात्य डोसा संस्कृती आणि आंतरराष्ट्रीय स्वादांचा अनोखा संगम. पिढ्यानपिढ्या जतन केलेला १००% शुद्ध शाकाहारी वारसा.",
            })}
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-gradient-to-r dark:from-[#D4AF37] dark:via-[#E5C158] dark:to-[#B89324] dark:text-[#0F1115] shadow-xl hover:shadow-[#174D35]/30 dark:hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 tracking-wide uppercase"
          >
            <Utensils className="w-4 h-4" />
            <span>{t({ en: "Explore Digital Menu", mr: "डिजिटल मेनू पहा" })}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-white hover:bg-[#F5F0E6] text-[#292D29] border border-[#E7E2D6] hover:border-[#174D35]/50 dark:bg-[#171A21]/90 dark:hover:bg-[#212631] dark:text-white dark:border-[#2A3140] dark:hover:border-[#D4AF37]/60 shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            <span>{t({ en: "Our 1965 Heritage", mr: "आमचा १९६५ चा इतिहास" })}</span>
          </Link>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-[#6D756D] dark:text-[#9DA4B0]"
        >
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 dark:bg-[#171A21]/80 border border-[#E7E2D6] dark:border-[#2A3140]/60 backdrop-blur-sm shadow-sm hover:border-[#22C55E]/60 transition-colors">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-4 ring-[#22C55E]/20"></div>
            <span className="font-semibold text-[#292D29] dark:text-white">100% Pure Veg</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 dark:bg-[#171A21]/80 border border-[#E7E2D6] dark:border-[#2A3140]/60 backdrop-blur-sm shadow-sm hover:border-[#174D35]/60 dark:hover:border-[#D4AF37]/60 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
            <span className="font-semibold text-[#292D29] dark:text-white">Dosa Pioneer 1995</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 dark:bg-[#171A21]/80 border border-[#E7E2D6] dark:border-[#2A3140]/60 backdrop-blur-sm shadow-sm hover:border-[#174D35]/60 dark:hover:border-[#D4AF37]/60 transition-colors">
            <Clock className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
            <span className="font-semibold text-[#292D29] dark:text-white">7:30 AM – 10:30 PM</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 dark:bg-[#171A21]/80 border border-[#E7E2D6] dark:border-[#2A3140]/60 backdrop-blur-sm shadow-sm hover:border-[#E07A2B]/60 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#E07A2B]" />
            <span className="font-semibold text-[#292D29] dark:text-white">Bhadrawati, MH</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
