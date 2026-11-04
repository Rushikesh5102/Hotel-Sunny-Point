"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import { Sparkles, ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";

export function HeroSection() {
  const { restaurant, t } = useRestaurant();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B0D10] py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Photography with Warm Luxury Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/brand/facade.jpg"
          alt="Hotel Sunny Point Exterior"
          fill
          className="object-cover object-center scale-105 opacity-30 filter blur-[1px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/80 to-[#0F1115]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0F1115]/60 to-[#0F1115]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Established Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171A21]/90 border border-[#D4AF37]/50 shadow-lg text-xs font-semibold text-[#D4AF37] uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{t({ en: "Serving Bhadrawati Since 1965", mr: "१९६५ पासून भद्रावतीकरांच्या सेवेत" })}</span>
        </div>

        {/* Master Logo Medallion */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-2xl p-1 bg-[#0F1115]">
            <Image
              src={restaurant.settings.logoUrl}
              alt="Hotel Sunny Point Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-md">
            {t(restaurant.settings.name)}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-gold-gradient tracking-wide uppercase">
              {t(restaurant.settings.tagline)}
            </p>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#C9CDD5] leading-relaxed">
            {t({
              en: "The historic home of authentic South Indian dosas since 1995 and curated Global Bites in Bhadrawati. A pure vegetarian culinary legacy passed down through generations.",
              mr: "१९९५ पासून भद्रावतीत सुरू झालेली अस्सल दाक्षिणात्य डोसा संस्कृती आणि आंतरराष्ट्रीय स्वादांचा अनोखा संगम. पिढ्यानपिढ्या जतन केलेला १००% शुद्ध शाकाहारी वारसा.",
            })}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89324] text-[#0F1115] shadow-xl hover:shadow-[#D4AF37]/25 hover:scale-105 active:scale-95 transition-all duration-300 tracking-wide uppercase"
          >
            <span>{t({ en: "Explore Digital Menu", mr: "डिजिटल मेनू पहा" })}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-[#171A21]/90 hover:bg-[#212631] text-white border border-[#2A3140] hover:border-[#D4AF37]/60 transition-all duration-300"
          >
            <span>{t({ en: "Our 1965 Heritage", mr: "आमचा १९६५ चा इतिहास" })}</span>
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-[#9DA4B0]">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#171A21]/60 border border-[#2A3140]/60 backdrop-blur-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
            <span className="font-medium text-white">100% Pure Veg</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#171A21]/60 border border-[#2A3140]/60 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium text-white">Dosa Pioneer 1995</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#171A21]/60 border border-[#2A3140]/60 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium text-white">7:30 AM – 10:30 PM</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#171A21]/60 border border-[#2A3140]/60 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-[#E07A2B]" />
            <span className="font-medium text-white">Bhadrawati, MH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
