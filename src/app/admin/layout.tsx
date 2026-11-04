"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRestaurant } from "@/context/RestaurantContext";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  Sparkles,
  MessageSquare,
  QrCode,
  Settings,
  ExternalLink,
  Menu,
  X,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { restaurant, resetToDefaults } = useRestaurant();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // If on /admin/login, don't show the dashboard sidebar
  const isLoginPage = pathname === "/admin/login";
  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/menu", label: "Menu Management", icon: UtensilsCrossed },
    { href: "/admin/categories", label: "Category Manager", icon: Layers },
    { href: "/admin/promotions", label: "Promotions & Offers", icon: Sparkles },
    { href: "/admin/feedback", label: "Guest Feedback", icon: MessageSquare },
    { href: "/admin/qr", label: "QR Code Generator", icon: QrCode },
    { href: "/admin/settings", label: "Restaurant Settings", icon: Settings },
  ];

  const handleReset = async () => {
    if (confirm("Reset all menu prices and demo data back to authentic initial research defaults?")) {
      await resetToDefaults();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F8F9FA] flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-[#12151C] border-r border-[#2A3140] p-5 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          {/* Brand Card in Admin */}
          <div className="flex items-center gap-3 pb-5 border-b border-[#2A3140]">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#D4AF37] shrink-0">
              <Image
                src={restaurant.settings.logoUrl}
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif font-bold text-white text-sm truncate">Sunny Point</h2>
              <span className="inline-block text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                Admin Control
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#D4AF37] text-[#0F1115] shadow-md"
                      : "text-[#9DA4B0] hover:text-white hover:bg-[#1C212C]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0F1115]" : "text-[#D4AF37]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Controls */}
        <div className="space-y-3 pt-6 border-t border-[#2A3140]">
          {/* Quick link to live customer menu */}
          <Link
            href="/menu"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#1C212C] hover:bg-[#252C3B] text-xs font-semibold text-[#D4AF37] border border-[#2A3140] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Live Menu</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" title="Live Sync Active" />
          </Link>

          {/* Reset Demo Data Button */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 w-full px-3.5 py-2 rounded-xl text-[11px] font-medium text-gray-400 hover:text-white bg-[#0F1115] hover:bg-[#171A21] border border-[#2A3140] transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-[#E07A2B]" />
            <span>{resetSuccess ? "Reset Applied!" : "Reset Demo Data"}</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#12151C]/90 backdrop-blur-md border-b border-[#2A3140] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1C212C]"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <span>Hotel Sunny Point Administration</span>
                <span className="hidden sm:inline-block text-[10px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 px-2 py-0.5 rounded-full font-sans font-semibold">
                  Multi-Tenant Flagship
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#D4AF37] hover:bg-[#B89324] text-[#0F1115] shadow transition-colors"
            >
              <span>Customer View</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-[#2A3140] text-xs">
              <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center font-bold text-[#D4AF37] text-xs">
                A
              </div>
              <span className="hidden md:inline font-medium text-gray-300">Admin</span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Modal */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-64 bg-[#12151C] border-r border-[#2A3140] p-5 shadow-2xl flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#2A3140]">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]">
                      <Image
                        src={restaurant.settings.logoUrl}
                        alt="Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-serif font-bold text-white text-sm">Sunny Point</span>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive
                            ? "bg-[#D4AF37] text-[#0F1115]"
                            : "text-[#9DA4B0] hover:text-white hover:bg-[#1C212C]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#2A3140] space-y-2">
                <Link
                  href="/menu"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#D4AF37] text-[#0F1115] text-xs font-bold"
                >
                  <span>Customer Menu</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Admin Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
