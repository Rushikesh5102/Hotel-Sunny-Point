"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { WifiOff, RefreshCw, Utensils, Phone, Clock, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function OfflinePage() {
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : false);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setIsChecking(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        if (navigator.onLine) {
          window.location.reload();
        } else {
          setIsChecking(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-black text-[#292D29] dark:text-white transition-colors">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Offline Icon with Pulse */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-amber-500/10 dark:bg-[#D4AF37]/10 border-2 border-amber-500/30 dark:border-[#D4AF37]/40 flex items-center justify-center shadow-xl">
              <WifiOff className="w-12 h-12 text-amber-600 dark:text-[#D4AF37] animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
            </span>
          </div>

          {/* Heading and Description */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#174D35]/10 dark:bg-[#D4AF37]/10 border border-[#174D35]/20 dark:border-[#D4AF37]/30 text-xs font-bold text-[#174D35] dark:text-[#D4AF37] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offline Ready Architecture</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292D29] dark:text-white tracking-tight">
              {isOnline ? "Back Online!" : "You're Browsing Offline"}
            </h1>
            <p className="text-sm sm:text-base text-[#6D756D] dark:text-[#9DA4B0] max-w-lg mx-auto leading-relaxed">
              {isOnline
                ? "Your internet connection is restored. Click refresh to view the latest live menu updates."
                : "No internet connection detected, but don't worry! Hotel Sunny Point's complete digital menu, dish pricing, and heritage details are safely saved on your device."}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <Utensils className="w-4 h-4" />
              <span>Browse Saved Menu Offline</span>
            </Link>

            <button
              onClick={handleRetry}
              disabled={isChecking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#F5F0E6] text-[#292D29] dark:bg-black dark:hover:bg-[#111111] dark:text-white border border-[#E7E2D6] dark:border-[#1c2028] shadow-sm transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-[#174D35] dark:text-[#D4AF37] ${isChecking ? "animate-spin" : ""}`} />
              <span>{isChecking ? "Checking Signal..." : "Check Connection / Refresh"}</span>
            </button>
          </div>

          {/* Offline Features Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] shadow-sm space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#174D35] dark:text-[#D4AF37]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Full Menu Access</span>
              </div>
              <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0] leading-snug">
                All South Indian dishes, pricing, and ingredients are stored locally.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] shadow-sm space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#174D35] dark:text-[#D4AF37]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Offline Feedback Queue</span>
              </div>
              <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0] leading-snug">
                Leave reviews or suggestions; they sync automatically when online.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] shadow-sm space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#174D35] dark:text-[#D4AF37]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Direct Phone Call</span>
              </div>
              <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0] leading-snug">
                Call our restaurant counter directly without mobile data.
              </p>
            </div>
          </div>

          {/* Direct Contact Banner */}
          <div className="p-5 rounded-2xl bg-[#F5F0E6] dark:bg-black/70 border border-[#E7E2D6] dark:border-[#1c2028] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-[#174D35]/10 dark:bg-[#D4AF37]/10 flex items-center justify-center text-[#174D35] dark:text-[#D4AF37] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#292D29] dark:text-white block">Need to place a table or takeout order?</span>
                <span className="text-[#6D756D] dark:text-[#9DA4B0]">Call our Bhadrawati counter directly anytime.</span>
              </div>
            </div>

            <a
              href="tel:+919511724562"
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#20242C] border border-[#E7E2D6] dark:border-[#D4AF37]/40 text-[#174D35] dark:text-[#D4AF37] font-bold hover:shadow transition-all shrink-0"
            >
              +91 9511724562
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
