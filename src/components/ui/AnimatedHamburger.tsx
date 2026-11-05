"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function AnimatedHamburger({ isOpen, onClick, className = "" }: AnimatedHamburgerProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch {}
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      className={`relative w-10 h-10 rounded-xl flex flex-col items-center justify-center p-2 text-[#174D35] dark:text-[#D4AF37] hover:bg-[#F5F0E6] dark:hover:bg-[#111111] focus:outline-none transition-colors active:scale-90 ${className}`}
    >
      <div className="w-5 h-4 flex flex-col justify-between">
        {/* Top Bar */}
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="w-full h-0.5 bg-current rounded-full origin-center block"
        />

        {/* Middle Bar */}
        <motion.span
          animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="w-3/4 h-0.5 bg-current rounded-full block self-end"
        />

        {/* Bottom Bar */}
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="w-full h-0.5 bg-current rounded-full origin-center block"
        />
      </div>
    </button>
  );
}
