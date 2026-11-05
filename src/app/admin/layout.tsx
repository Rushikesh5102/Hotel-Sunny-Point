"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRestaurant } from "@/context/RestaurantContext";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
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
  LogOut,
  Lock,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { restaurant, resetToDefaults } = useRestaurant();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // If on /admin/login, don't show the dashboard sidebar or check auth
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    if (typeof window !== "undefined") {
      const auth =
        sessionStorage.getItem("sunny_point_admin_auth") === "true" ||
        localStorage.getItem("sunny_point_admin_auth") === "true";
      if (!auth) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Prevent flash of admin dashboard while verifying authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex flex-col items-center justify-center p-4 text-white">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold tracking-wider text-[#9DA4B0] uppercase">
          Verifying Admin Authorization...
        </p>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/menu", label: "Menu Management", icon: UtensilsCrossed },
    { href: "/admin/categories", label: "Category Manager", icon: Layers },
    { href: "/admin/promotions", label: "Promotions & Coupons", icon: Sparkles },
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

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sunny_point_admin_auth");
      sessionStorage.removeItem("sunny_point_admin_auth");
    }
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F3] dark:bg-[#0B0D10] text-[#292D29] dark:text-[#F8F9FA] flex flex-col lg:flex-row transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-white dark:bg-[#12151C] border-r border-[#E7E2D6] dark:border-[#2A3140] p-5 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto transition-colors">
        <div className="space-y-6">
          {/* Brand Card in Admin */}
          <div className="flex items-center gap-3 pb-5 border-b border-[#E7E2D6] dark:border-[#2A3140]">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#174D35] dark:border-[#D4AF37] shrink-0">
              <Image
                src={restaurant.settings.logoUrl}
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif font-bold text-[#292D29] dark:text-white text-sm truncate">Sunny Point</h2>
              <span className="inline-block text-[10px] text-[#174D35] dark:text-[#D4AF37] font-semibold bg-[#174D35]/10 dark:bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#174D35]/20 dark:border-[#D4AF37]/20">
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
                      ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] shadow-md"
                      : "text-[#6D756D] dark:text-[#9DA4B0] hover:text-[#174D35] dark:hover:text-white hover:bg-[#EDF2E9] dark:hover:bg-[#1C212C]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white dark:text-[#0F1115]" : "text-[#174D35] dark:text-[#D4AF37]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Controls */}
        <div className="space-y-3 pt-6 border-t border-[#E7E2D6] dark:border-[#2A3140]">
          {/* Quick link to live customer menu */}
          <Link
            href="/menu"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#FAF9F3] dark:bg-[#1C212C] hover:bg-[#F5F0E6] dark:hover:bg-[#252C3B] text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] border border-[#E7E2D6] dark:border-[#2A3140] transition-colors"
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
            className="flex items-center justify-center gap-2 w-full px-3.5 py-2 rounded-xl text-[11px] font-medium text-[#6D756D] hover:text-[#292D29] bg-[#FAF9F3] hover:bg-[#F5F0E6] dark:text-gray-400 dark:hover:text-white dark:bg-[#0F1115] dark:hover:bg-[#171A21] border border-[#E7E2D6] dark:border-[#2A3140] transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-[#E07A2B]" />
            <span>{resetSuccess ? "Reset Applied!" : "Reset Demo Data"}</span>
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-3.5 py-2 rounded-xl text-[11px] font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#12151C]/90 backdrop-blur-md border-b border-[#E7E2D6] dark:border-[#2A3140] px-4 sm:px-6 py-3 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-[#6D756D] dark:text-gray-400 hover:text-[#292D29] dark:hover:text-white hover:bg-[#EDF2E9] dark:hover:bg-[#1C212C]"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-[#292D29] dark:text-white flex items-center gap-2">
                <span>Hotel Sunny Point Administration</span>
                <span className="hidden sm:inline-block text-[10px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 px-2 py-0.5 rounded-full font-sans font-semibold">
                  Multi-Tenant Flagship
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Switcher in Admin Header */}
            <ThemeSwitcher variant="icon" />

            <Link
              href="/menu"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] shadow transition-colors"
            >
              <span>Customer View</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors"
              title="Sign Out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Modal */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#12151C] border-r border-[#E7E2D6] dark:border-[#2A3140] p-5 shadow-2xl flex flex-col justify-between transition-colors">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D6] dark:border-[#2A3140]">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#174D35] dark:border-[#D4AF37]">
                      <Image
                        src={restaurant.settings.logoUrl}
                        alt="Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-serif font-bold text-[#292D29] dark:text-white text-sm">Sunny Point</span>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X className="w-5 h-5 text-[#6D756D] dark:text-gray-400" />
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
                            ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115]"
                            : "text-[#6D756D] dark:text-[#9DA4B0] hover:text-[#174D35] dark:hover:text-white hover:bg-[#EDF2E9] dark:hover:bg-[#1C212C]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#E7E2D6] dark:border-[#2A3140] space-y-2">
                <div className="flex justify-center pb-2">
                  <ThemeSwitcher variant="pill" />
                </div>
                <Link
                  href="/menu"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] text-xs font-bold transition-colors"
                >
                  <span>Customer Menu</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 border border-red-500/30 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
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
