"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitcherProps {
  className?: string;
  variant?: "pill" | "icon" | "minimal";
  showLabel?: boolean;
}

export function ThemeSwitcher({ className = "", variant = "pill", showLabel = false }: ThemeSwitcherProps) {
  const { theme, toggleTheme, isLoaded } = useTheme();

  const isDark = theme === "dark";
  const ariaLabel = isDark
    ? "Switch to Light Theme (Natural Heritage)"
    : "Switch to Dark Theme (Heritage Luxury)";

  if (!isLoaded) {
    // Render placeholder to prevent hydration layout shift
    return (
      <div className={`w-8 h-8 rounded-full border border-transparent ${className}`} />
    );
  }

  if (variant === "icon") {
    return (
      <button
        onClick={toggleTheme}
        className={`relative p-2 rounded-xl transition-all duration-200 border ${
          isDark
            ? "bg-black border-[#1c2028] text-[#D4AF37] hover:bg-[#111111] hover:border-[#D4AF37]/50"
            : "bg-[#FFFFFF] border-[#E7E2D6] text-[#174D35] hover:bg-[#F5F0E6] hover:border-[#174D35]/40 shadow-sm"
        } ${className}`}
        title={ariaLabel}
        aria-label={ariaLabel}
      >
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`group relative flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 shadow-sm ${
        isDark
          ? "bg-black border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#111111] hover:border-[#D4AF37]"
          : "bg-[#FFFFFF] border-[#174D35]/30 text-[#174D35] hover:bg-[#F5F0E6] hover:border-[#174D35] shadow-sm"
      } ${className}`}
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      <div className="relative flex items-center justify-center w-4 h-4">
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#174D35] transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>

      {showLabel ? (
        <span className="text-[11px] tracking-tight">
          {isDark ? "Heritage Dark" : "Natural Light"}
        </span>
      ) : (
        <span className="text-[10px] hidden xl:inline uppercase tracking-wider font-bold">
          {isDark ? "Dark" : "Light"}
        </span>
      )}
    </button>
  );
}
