"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRestaurant } from "@/context/RestaurantContext";
import { Home, UtensilsCrossed, Sparkles, BookOpen, PhoneCall } from "lucide-react";

export function MobileBottomBar() {
  const pathname = usePathname();
  const { restaurant, t } = useRestaurant();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    {
      href: "/",
      label: { en: "Home", mr: "मुख्य", hi: "होम" },
      icon: Home,
      isActive: pathname === "/",
    },
    {
      href: "/menu",
      label: { en: "Menu", mr: "मेनू", hi: "मेनू" },
      icon: UtensilsCrossed,
      isActive: pathname === "/menu" || pathname.startsWith("/menu/"),
      badge: "26",
    },
    {
      href: "/offers",
      label: { en: "Offers", mr: "ऑफर्स", hi: "ऑफर्स" },
      icon: Sparkles,
      isActive: pathname === "/offers",
    },
    {
      href: "/about",
      label: { en: "Story", mr: "वारसा", hi: "इतिहास" },
      icon: BookOpen,
      isActive: pathname === "/about",
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#0F1115]/95 backdrop-blur-xl border-t border-[#2A3140]/90 md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.6)] pb-safe transition-all"
    >
      <div className="grid grid-cols-5 items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                item.isActive
                  ? "text-[#D4AF37] font-bold"
                  : "text-[#9DA4B0] hover:text-white"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? "scale-110 text-[#D4AF37]" : ""}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-[#E07A2B] text-white text-[9px] font-bold px-1 rounded-full leading-none py-0.5 shadow">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
                {t(item.label)}
              </span>
              {item.isActive && (
                <span className="w-1 h-1 rounded-full bg-[#D4AF37] absolute bottom-0.5" />
              )}
            </Link>
          );
        })}

        {/* Quick Call Action Button */}
        <a
          href={`tel:${restaurant.settings.primaryPhone}`}
          className="flex flex-col items-center justify-center py-1 px-1 text-[#22C55E] hover:text-[#4ade80] transition-colors"
          title="Direct Call Hotel Sunny Point"
        >
          <div className="w-9 h-9 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 flex items-center justify-center shadow-md active:scale-95 transition-transform">
            <PhoneCall className="w-4 h-4 text-[#22C55E]" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight text-[#22C55E]">
            {t({ en: "Call", mr: "कॉल", hi: "कॉल" })}
          </span>
        </a>
      </div>
    </nav>
  );
}
