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
    const dismissed = sessionStorage.getItem("sunny_point_late_night_whisper_dismissed");
    if (!dismissed && late) {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("sunny_point_late_night_whisper_dismissed", "true");
  };

  if (!isLateNight || isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Late Night Kitchen Whisper"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#171A21]/95 border border-[#D4AF37]/50 p-4 shadow-2xl backdrop-blur-xl text-white">
        {/* Ambient starry backdrop glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#E07A2B]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#E07A2B]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-inner">
            <Moon className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Late Night Kitchen Whisper
              </span>
            </div>

            <p className="text-xs text-[#C9CDD5] leading-relaxed mb-3">
              Our cast-iron tawas are resting tonight. The firewood aromas and hot ghee dosas return fresh at <strong className="text-white">7:30 AM</strong> tomorrow.
            </p>

            <div className="flex items-center gap-2">
              <Link
                href="/menu/south-indian"
                onClick={handleDismiss}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] hover:text-[#F9E79F] transition-colors"
              >
                <Sunrise className="w-3.5 h-3.5 text-[#E07A2B]" />
                <span>Bookmark Tomorrow&apos;s Breakfast</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Dismiss late night notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
