"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRestaurant } from "@/context/RestaurantContext";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { AnimatedHamburger } from "@/components/ui/AnimatedHamburger";
import { SecretHeritageEasterEgg } from "@/components/ui/SecretHeritageEasterEgg";
import { Globe, Phone, MapPin, Sparkles, ChevronRight, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { restaurant, language, setLanguage, t } = useRestaurant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = pathname === "/";
  // On homepage: hide header at the top so only the hero seal is visible.
  // When scrolled past hero seal (> 220px), reveal header and morph logo in.
  const [isVisible, setIsVisible] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > 220;
      setIsVisible(scrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { href: "/", label: { en: "Home", mr: "मुख्यपृष्ठ", hi: "होम" } },
    { href: "/menu", label: { en: "Digital Menu", mr: "डिजिटल मेनू", hi: "डिजिटल मेनू" } },
    { href: "/about", label: { en: "Heritage & Story", mr: "वारसा आणि कथा", hi: "हमारा इतिहास" } },
    { href: "/offers", label: { en: "Offers & Specials", mr: "खास ऑफर्स", hi: "खास ऑफर्स" } },
    { href: "/feedback", label: { en: "Feedback", mr: "अभिप्राय", hi: "प्रतिक्रिया" } },
    { href: "/contact", label: { en: "Contact & Location", mr: "संपर्क व पत्ता", hi: "संपर्क एवं स्थान" } },
  ];

  const handleOpenLanguageModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-language-launch-modal"));
    }
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          y: isVisible ? 0 : -140,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 w-full transition-shadow ${
          !isVisible ? "pointer-events-none" : ""
        }`}
      >
        {/* Top Banner Notice: Pure Veg & Legacy */}
        <div className="bg-[#F5F0E6] dark:bg-black border-b border-[#E7E2D6] dark:border-[#1c2028] text-xs py-1.5 px-4 transition-colors">
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
                  en: "Pure Veg • Since 1995",
                  mr: "शुद्ध शाकाहारी • १९९५ पासून",
                  hi: "शुद्ध शाकाहारी • १९९५ से",
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
              <a
                href={restaurant.settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 text-[#174D35] hover:text-[#225E43] dark:text-[#D4AF37]/90 dark:hover:text-[#F9E79F] transition-colors font-medium"
                title="Open Hotel Sunny Point on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{t({ en: "Locate on Maps", mr: "गुगल मॅप्सवर शोधा", hi: "गूगल मैप्स पर देखें" })}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Sticky Header */}
        <header className="bg-[#FAF9F3]/95 dark:bg-black/95 backdrop-blur-md border-b border-[#E7E2D6] dark:border-[#1c2028] transition-all shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Brand Logo & Name with Morph Entrance Animation */}
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
                <motion.div
                  key="header-logo"
                  initial={{ y: 35, scale: 0.6, opacity: 0 }}
                  animate={isVisible ? { y: 0, scale: 1, opacity: 1 } : { y: 35, scale: 0.6, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22, delay: 0.05 }}
                  className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#174D35] dark:border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-transform duration-300 shrink-0"
                >
                  <Image
                    src={restaurant.settings.logoUrl}
                    alt={restaurant.settings.name.en}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
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
                  <SecretHeritageEasterEgg>
                    <span className="text-[10px] sm:text-[11px] xl:text-xs text-[#174D35] dark:text-[#D4AF37] font-semibold tracking-wider uppercase whitespace-nowrap hover:underline cursor-pointer">
                      {t({ en: "The Taste of Legacy • Est. 1995", mr: "द टेस्ट ऑफ लेगसी • स्था. १९९५" })}
                    </span>
                  </SecretHeritageEasterEgg>
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
                          : "text-[#6D756D] dark:text-[#C9CDD5] hover:text-[#292D29] dark:hover:text-white hover:bg-[#F5F0E6] dark:hover:bg-black"
                      }`}
                    >
                      {t(link.label)}
                    </Link>
                  );
                })}
              </nav>

              {/* Action Buttons: Theme Switcher, Compact Multilingual Selector & Mobile Menu */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                {/* Theme Switcher Button */}
                <ThemeSwitcher variant="pill" className="shrink-0" />

                {/* Compact Multilingual Selector Button */}
                <button
                  onClick={handleOpenLanguageModal}
                  className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#D4AF37]/50 text-[#174D35] dark:text-[#D4AF37] hover:border-[#174D35] dark:hover:border-[#D4AF37] shadow-sm text-xs font-bold transition-all shrink-0 hover:scale-105 active:scale-95"
                  title="Change Language / भाषा बदला / भाषा बदलें"
                  aria-label="Change Language"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="uppercase text-[11px] tracking-wide font-extrabold">
                    {language === "mr" ? "मराठी" : language === "hi" ? "हिन्दी" : "EN"}
                  </span>
                </button>

                {/* Order/Browse Menu CTA (Desktop - on xl+ screens) */}
                <Link
                  href="/menu"
                  className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-gradient-to-r dark:from-[#D4AF37] dark:to-[#B89324] dark:hover:from-[#E5C158] dark:hover:to-[#D4AF37] dark:text-black shadow-md transition-all transform active:scale-95 whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t({ en: "View Menu", mr: "मेनू पहा", hi: "मेनू देखें" })}</span>
                </Link>

                {/* Mobile Animated Hamburger Button */}
                <div className="lg:hidden">
                  <AnimatedHamburger
                    isOpen={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      </motion.div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF9F3] dark:bg-black border-l border-[#E7E2D6] dark:border-[#1c2028] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E7E2D6] dark:border-[#1c2028]">
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
                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#292D29] dark:text-gray-400 dark:hover:text-white hover:bg-[#F5F0E6] dark:hover:bg-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Theme & Language Controls */}
              <div className="my-4 p-3 bg-[#F5F0E6] dark:bg-black rounded-xl border border-[#E7E2D6] dark:border-[#1c2028] space-y-3">
                {/* Theme Switcher Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider">
                    {t({ en: "Theme Mode", mr: "थीम निवडा", hi: "थीम चुनें" })}
                  </span>
                  <ThemeSwitcher variant="pill" showLabel />
                </div>

                {/* Language Selector */}
                <div className="pt-2 border-t border-[#E7E2D6] dark:border-[#1c2028]">
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
                              ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black shadow"
                              : "bg-white dark:bg-black text-[#292D29] dark:text-gray-300 hover:text-[#174D35] dark:hover:text-white border border-[#E7E2D6] dark:border-[#1c2028]"
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
                          : "text-[#292D29] dark:text-[#C9CDD5] hover:text-[#174D35] dark:hover:text-white hover:bg-[#F5F0E6] dark:hover:bg-[#111111]"
                      }`}
                    >
                      <span>{t(link.label)}</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Footer: Direct Google Maps & Brand Legacy */}
            <div className="pt-6 border-t border-[#E7E2D6] dark:border-[#1c2028] space-y-4">
              <a
                href={restaurant.settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black shadow-md hover:brightness-110 transition-all active:scale-95"
              >
                <MapPin className="w-4 h-4" />
                <span>{t({ en: "Get Directions on Google Maps", mr: "गुगल मॅप्सवर दिशा मिळवा", hi: "गूगल मैप्स पर रास्ता देखें" })}</span>
              </a>

              <div className="text-center text-[11px] text-[#6D756D] dark:text-[#9DA4B0] space-y-1">
                <p className="flex items-center justify-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
                  <span>Main Road, Near Overbridge, Bhadrawati</span>
                </p>
                <p>Pure Vegetarian • Serving Since 1995</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
