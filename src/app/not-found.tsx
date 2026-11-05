import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Home, Utensils, Phone, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-[#0F1115] text-[#292D29] dark:text-[#F5F5F5] transition-colors duration-200">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl w-full text-center space-y-6">
          {/* Brand Seal */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-[#174D35] dark:border-[#D4AF37] shadow-xl p-1 bg-white dark:bg-[#171A21]">
            <Image
              src="/assets/brand/logo.jpg"
              alt="Hotel Sunny Point"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D35]/10 dark:bg-[#D4AF37]/15 border border-[#174D35]/30 dark:border-[#D4AF37]/40 text-[#174D35] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>404 • Page Not Found</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292D29] dark:text-white tracking-tight">
              Dish Not On Today&apos;s Menu
            </h1>

            <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#9DA4B0] max-w-md mx-auto leading-relaxed">
              The page or culinary specialty you are seeking has been moved, renamed, or retired from our active digital archives.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-gradient-to-r dark:from-[#D4AF37] dark:to-[#B89324] dark:hover:from-[#E5C158] dark:hover:to-[#D4AF37] dark:text-[#0F1115] font-semibold text-xs shadow-md transition-all active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#F5F0E6] text-[#174D35] border border-[#E7E2D6] dark:bg-[#171A21] dark:hover:bg-[#212631] dark:text-[#D4AF37] dark:border-[#2A3140] font-semibold text-xs shadow-sm transition-all active:scale-95"
            >
              <Utensils className="w-4 h-4" />
              <span>Explore Digital Menu</span>
            </Link>

            <a
              href="tel:+919511724562"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 font-semibold text-xs transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
