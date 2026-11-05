"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRestaurant } from "@/context/RestaurantContext";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Menu, X, Globe, Phone, MapPin, Sparkles, ShieldCheck, ChevronRight } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { restaurant, language, setLanguage, t } = useRestaurant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: { en: "Home", mr: "मुख्यपृष्ठ", hi: "होम" } },
    { href: "/menu", label: { en: "Digital Menu", mr: "डिजिटल मेनू", hi: "डिजिटल मेनू" } },
    { href: "/about", label: { en: "Heritage & Story", mr: "वारसा आणि कथा", hi: "हमारा इतिहास" } },
    { href: "/offers", label: { en: "Offers & Specials", mr: "खास ऑफर्स", hi: "खास ऑफर्स" } },
    { href: "/feedback", label: { en: "Feedback", mr: "अभिप्राय", hi: "प्रतिक्रिया" } },
    { href: "/contact", label: { en: "Contact & Location", mr: "संपर्क व पत्ता", hi: "संपर्क एवं स्थान" } },
  ];

  return (
    <>
      {/* Top Banner Notice: Pure Veg & Legacy */}
      <div className="bg-[#F5F0E6] dark:bg-gradient-to-r dark:from-[#0F1115] dark:via-[#1A1813] dark:to-[#0F1115] border-b border-[#E7E2D6] dark:border-[#2A3140]/60 text-xs py-1.5 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span className="text-[#6D756D] dark:text-[#9DA4B0] font-medium hidden sm:inline">
              {t({
                en: "100% Pure Vegetarian Restaurant in Bhadrawati",
                mr: "भद्रावतीतील १००% शुद्ध शाकाहारी रेस्टॉरंट",
                hi: "भद्रावती में १००% शुद्ध शाकाहारी रेस्टोरेंट",
              })}
            </span>
            <span className="text-[#6D756D] dark:text-[#9DA4B0] font-medium sm:hidden">
              {t({
                en: "Pure Veg • Since 1965",
                mr: "शुद्ध शाकाहारी • १९६५ पासून",
                hi: "शुद्ध शाकाहारी • १९६५ से",
              })}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#292D29] dark:text-[#C9CDD5]">
            <a
              href={`tel:${restaurant.settings.primaryPhone}`}
              className="flex items-center gap-1.5 hover:text-primary dark:hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#174D35] dark:text-[#D4AF37]" />
              <span className="font-semibold">{restaurant.settings.primaryPhone}</span>
            </a>
            <span className="text-[#C6A45C]/60 dark:text-[#4A5568] hidden sm:inline">•</span>
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1 text-[#174D35] hover:text-[#225E43] dark:text-[#D4AF37]/90 dark:hover:text-[#F9E79F] transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F3]/92 dark:bg-[#0F1115]/92 backdrop-blur-md border-b border-[#E7E2D6] dark:border-[#2A3140]/80 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#174D35] dark:border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Image
                  src={restaurant.settings.logoUrl}
                  alt={restaurant.settings.name.en}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-serif text-lg sm:text-xl xl:text-2xl font-bold tracking-wide text-[#292D29] dark:text-white group-hover:text-primary dark:group-hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                    {t(restaurant.settings.name)}
                  </span>
                  {/* Pure Veg Green Badge */}
                  <div className="w-3.5 h-3.5 border border-[#22C55E] flex items-center justify-center p-0.5 rounded-sm bg-[#22C55E]/10 shrink-0" title="100% Pure Veg">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] xl:text-xs text-[#174D35] dark:text-[#D4AF37] font-semibold tracking-wider uppercase whitespace-nowrap">
                  {t({ en: "The Taste of Legacy • Est. 1965", mr: "द टेस्ट ऑफ लेगसी • स्था. १९६५" })}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "text-[#174D35] dark:text-[#D4AF37] bg-[#174D35]/10 dark:bg-[#D4AF37]/10 border border-[#174D35]/30 dark:border-[#D4AF37]/30 font-semibold"
                        : "text-[#6D756D] dark:text-[#C9CDD5] hover:text-[#292D29] dark:hover:text-white hover:bg-[#F5F0E6] dark:hover:bg-[#171A21]"
                    }`}
                  >
                    {t(link.label)}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons: Theme Switcher, Multilingual Selector & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Theme Switcher Button */}
              <ThemeSwitcher variant="pill" className="shrink-0" />

              {/* Multilingual Selector: EN | मराठी | हिन्दी */}
              <div className="flex items-center bg-[#FFFFFF] dark:bg-[#171A21] border border-[#E7E2D6] dark:border-[#D4AF37]/40 rounded-full p-0.5 shadow-sm shrink-0">
                {(["en", "mr", "hi"] as const).map((code) => {
                  const labels = { en: "EN", mr: "मराठी", hi: "हिन्दी" };
                  const isSelected = language === code;
                  return (
                    <button
                      key={code}
                      onClick={() => setLanguage(code)}
                      className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] shadow-sm"
                          : "text-[#6D756D] hover:text-[#292D29] dark:text-[#9DA4B0] dark:hover:text-white"
                      }`}
                      title={`Switch to ${labels[code]}`}
                      aria-label={`Switch to ${labels[code]}`}
                    >
                      {labels[code]}
                    </button>
                  );
                })}
              </div>

              {/* Order/Browse Menu CTA (Desktop - on xl+ screens) */}
              <Link
                href="/menu"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-gradient-to-r dark:from-[#D4AF37] dark:to-[#B89324] dark:hover:from-[#E5C158] dark:hover:to-[#D4AF37] dark:text-[#0F1115] shadow-md transition-all transform active:scale-95 whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t({ en: "View Menu", mr: "मेनू पहा", hi: "मेनू देखें" })}</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#292D29] dark:text-[#C9CDD5] hover:text-[#174D35] dark:hover:text-white hover:bg-[#F5F0E6] dark:hover:bg-[#171A21] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#174D35] dark:text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF9F3] dark:bg-[#171A21] border-l border-[#E7E2D6] dark:border-[#2A3140] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E7E2D6] dark:border-[#2A3140]">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#174D35] dark:border-[#D4AF37]">
                    <Image
                      src={restaurant.settings.logoUrl}
                      alt="Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#292D29] dark:text-white text-base">Sunny Point</h3>
                    <p className="text-[10px] text-[#174D35] dark:text-[#D4AF37] font-semibold">The Taste of Legacy</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#292D29] dark:text-gray-400 dark:hover:text-white hover:bg-[#F5F0E6] dark:hover:bg-[#212631]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Theme & Language Controls */}
              <div className="my-4 p-3 bg-[#F5F0E6] dark:bg-[#0F1115] rounded-xl border border-[#E7E2D6] dark:border-[#2A3140] space-y-3">
                {/* Theme Switcher Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider">
                    {t({ en: "Theme Mode", mr: "थीम निवडा", hi: "थीम चुनें" })}
                  </span>
                  <ThemeSwitcher variant="pill" showLabel />
                </div>

                {/* Language Selector */}
                <div className="pt-2 border-t border-[#E7E2D6] dark:border-[#2A3140]">
                  <p className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-[#174D35] dark:text-[#D4AF37]" />
                    <span>{t({ en: "Language / भाषा", mr: "भाषा निवडा", hi: "भाषा चुनें" })}</span>
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["en", "mr", "hi"] as const).map((code) => {
                      const labels = { en: "English", mr: "मराठी", hi: "हिन्दी" };
                      const isSelected = language === code;
                      return (
                        <button
                          key={code}
                          onClick={() => setLanguage(code)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-bold text-center transition-all ${
                            isSelected
                              ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] shadow"
                              : "bg-white dark:bg-[#171A21] text-[#292D29] dark:text-gray-300 hover:text-[#174D35] dark:hover:text-white border border-[#E7E2D6] dark:border-[#2A3140]"
                          }`}
                        >
                          {labels[code]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile Nav Links */}
              <div className="py-2 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-[#174D35] dark:text-[#D4AF37] bg-[#174D35]/10 dark:bg-[#D4AF37]/15 font-semibold"
                          : "text-[#292D29] dark:text-[#C9CDD5] hover:text-[#174D35] dark:hover:text-white hover:bg-[#F5F0E6] dark:hover:bg-[#212631]"
                      }`}
                    >
                      <span>{t(link.label)}</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-[#E7E2D6] dark:border-[#2A3140] space-y-4">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-[#FFFFFF] dark:bg-[#212631] text-[#174D35] dark:text-[#D4AF37] border border-[#E7E2D6] dark:border-[#2A3140] hover:bg-[#F5F0E6] dark:hover:bg-[#2A3140] shadow-sm transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Management Portal</span>
              </Link>

              <div className="text-center text-[11px] text-[#6D756D] dark:text-[#9DA4B0] space-y-1">
                <p className="flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
                  <span>Bhadrawati, Maharashtra</span>
                </p>
                <p>Pure Vegetarian • Serving Since 1965</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
