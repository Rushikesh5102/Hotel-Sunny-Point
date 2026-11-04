"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import { Phone, MapPin, Clock, Instagram, ShieldCheck, Heart, Award } from "lucide-react";

export function Footer() {
  const { restaurant, t } = useRestaurant();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0D10] text-[#9DA4B0] border-t border-[#2A3140]/80 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1F2532]">
          {/* Col 1: Brand & Legacy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]">
                <Image
                  src={restaurant.settings.logoUrl}
                  alt={restaurant.settings.name.en}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                  {t(restaurant.settings.name)}
                </h3>
                <p className="text-xs text-[#D4AF37] font-medium">
                  {t({ en: "The Taste of Legacy", mr: "द टेस्ट ऑफ लेगसी" })}
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#C9CDD5]">
              {t({
                en: "Serving Bhadrawati with pride since 1965. Introducing authentic South Indian dosa traditions in 1995 and curated Global Bites in a modern pure vegetarian family setting.",
                mr: "१९६५ पासून भद्रावतीकरांच्या सेवेत अविरत सुरू असलेला स्वाद. १९९५ मध्ये अस्सल दाक्षिणात्य डोसा संस्कृती आणून आज आंतरराष्ट्रीय स्वादांची समृद्ध मेजवानी.",
              })}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="w-4 h-4 border border-[#22C55E] flex items-center justify-center p-0.5 rounded-sm bg-[#22C55E]/10">
                <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
              </div>
              <span className="text-xs font-semibold text-[#22C55E] tracking-wider uppercase">
                100% Pure Vegetarian
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2.5">
              {t({ en: "Quick Navigation", mr: "महत्त्वाचे दुवे" })}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  {t({ en: "Home & Heritage", mr: "मुख्यपृष्ठ व इतिहास" })}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#D4AF37] transition-colors">
                  {t({ en: "Full Digital Menu", mr: "संपूर्ण डिजिटल मेनू" })}
                </Link>
              </li>
              <li>
                <Link href="/menu/south-indian" className="hover:text-[#D4AF37] transition-colors">
                  {t({ en: "South Indian Dosas", mr: "दाक्षिणात्य डोसे" })}
                </Link>
              </li>
              <li>
                <Link href="/menu/global-bites" className="hover:text-[#D4AF37] transition-colors">
                  {t({ en: "Global Bites & Pastas", mr: "ग्लोबल बाईट्स व पास्ता" })}
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#D4AF37] transition-colors">
                  {t({ en: "Monsoon & Seasonal Specials", mr: "सिझनल स्पेशल ऑफर्स" })}
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-[#D4AF37] transition-colors">
                  {t({ en: "Submit Customer Feedback", mr: "ग्राहक अभिप्राय द्या" })}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#D4AF37] hover:text-[#F9E79F] transition-colors font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t({ en: "Admin Dashboard", mr: "प्रशासन डॅशबोर्ड" })}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours & FSSAI */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2.5">
              {t({ en: "Hours & Standards", mr: "वेळ आणि मानके" })}
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{t(restaurant.settings.operatingHours.days)}</p>
                  <p className="text-[#D4AF37] font-medium">{restaurant.settings.operatingHours.timing}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <Award className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">FSSAI Certified</p>
                  <p className="text-[11px] text-[#9DA4B0]">
                    {restaurant.settings.fssaiDisplayNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Verified Contact & Social */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2.5">
              {t({ en: "Visit Us", mr: "भेट द्या" })}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[#C9CDD5]">{t(restaurant.settings.address)}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div className="space-x-2">
                  <a href={`tel:${restaurant.settings.primaryPhone}`} className="hover:text-white font-semibold">
                    {restaurant.settings.primaryPhone}
                  </a>
                  <span>/</span>
                  <a href={`tel:${restaurant.settings.secondaryPhone}`} className="hover:text-white">
                    {restaurant.settings.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={restaurant.settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#171A21] hover:bg-[#212631] text-[#D4AF37] border border-[#2A3140] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span className="font-medium">@hotelsunnypoint</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-4">
          <p>
            © {currentYear} {restaurant.settings.name.en} – Pure Veg. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for Bhadrawati Food Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
