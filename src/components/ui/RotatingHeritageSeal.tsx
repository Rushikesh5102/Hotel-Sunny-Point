"use client";

import React from "react";
import Image from "next/image";

interface RotatingHeritageSealProps {
  logoUrl: string;
  size?: number; // pixel diameter
  onClick?: () => void;
}

export function RotatingHeritageSeal({
  logoUrl,
  size = 140,
  onClick,
}: RotatingHeritageSealProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center group cursor-pointer select-none"
      style={{ width: size, height: size }}
      title="Hotel Sunny Point — Pure Vegetarian Legacy Seal (Estd. 1995)"
    >
      {/* Ambient Breathing Luxury Gold Halo */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#174D35]/30 via-[#D4AF37]/40 to-[#E5C158]/40 dark:from-[#D4AF37]/40 dark:via-[#F9E79F]/30 dark:to-[#B89324]/40 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

      {/* Rotating Circular Text Ring */}
      <svg
        viewBox="0 0 140 140"
        className="absolute inset-0 w-full h-full animate-[spin_28s_linear_infinite] group-hover:animate-[spin_12s_linear_infinite] transition-all duration-700 pointer-events-none"
      >
        <defs>
          <path
            id="heritageCirclePath"
            d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          />
        </defs>

        <text
          className="text-[8px] font-bold uppercase tracking-[0.22em] fill-[#174D35] dark:fill-[#D4AF37] font-serif"
          style={{ letterSpacing: "0.26em" }}
        >
          <textPath href="#heritageCirclePath" startOffset="0%">
            ✦ 100% PURE VEG ✦ TASTE OF LEGACY ✦ ESTD 1995 ✦ BHADRAWATI
          </textPath>
        </text>
      </svg>

      {/* Center Medallion with Gold Rim */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#174D35] dark:border-[#D4AF37] shadow-2xl p-1 bg-white dark:bg-[#0F1115] group-hover:scale-105 transition-transform duration-500 z-10">
        <Image
          src={logoUrl}
          alt="Hotel Sunny Point Heritage Medallion"
          fill
          className="object-cover rounded-full p-0.5"
          priority
          sizes="112px"
        />
        {/* Specular Light Sweep on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      </div>
    </div>
  );
}
