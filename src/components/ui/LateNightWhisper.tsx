"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sparkles, X, Sunrise, ArrowRight } from "lucide-react";

export function LateNightWhisper() {
  const [isLateNight, setIsLateNight] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Check client hour: late night is between 10:00 PM (22:00) and 7:00 AM
    const currentHour = new Date().getHours();
    const late = currentHour >= 22 || currentHour < 7;
    setIsLateNight(late);

    // Check if dismissed during current browser session
    try {
      const dismissed = sessionStorage.getItem("sunny_point_late_night_whisper_dismissed");
      if (!dismissed && late) {
        setIsDismissed(false);
      }
    } catch (e) {}
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem("sunny_point_late_night_whisper_dismissed", "true");
    } catch (e) {}
  };

  if (!isLateNight || isDismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <aside
        aria-label="Late Night Kitchen Whisper"
        className="relative max-w-md w-full bg-[#12141A]/95 border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl text-white text-center overflow-hidden animate-in zoom-in-95 duration-300"
      >
        {/* Ambient starry backdrop glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#E07A2B]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button top right */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Dismiss late night notice"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Center Moon Badge */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#E07A2B]/20 border border-[#D4AF37]/50 flex items-center justify-center mb-4 shadow-inner">
          <Moon className="w-7 h-7 text-[#D4AF37] animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Late Night Kitchen Whisper
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
          Our Tawas Are Resting Tonight
        </h3>

        <p className="text-xs sm:text-sm text-[#C9CDD5] leading-relaxed mb-6 max-w-sm mx-auto">
          The firewood aromas, crisp golden dosas, and fresh desi ghee delicacies will return hot &amp; fresh at <strong className="text-white">7:30 AM</strong> tomorrow morning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/menu/south-indian"
            onClick={handleDismiss}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89324] text-[#0F1115] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all active:scale-95"
          >
            <Sunrise className="w-4 h-4 text-[#78350F]" />
            <span>Bookmark Tomorrow&apos;s Breakfast</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Close / समजल
          </button>
        </div>
      </aside>
    </div>
  );
}
