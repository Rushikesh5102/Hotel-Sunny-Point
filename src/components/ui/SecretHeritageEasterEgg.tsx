"use client";

import React, { useState } from "react";
import { Sparkles, X, Copy, Check, Gift } from "lucide-react";
import { triggerMarigoldConfetti } from "./MarigoldConfetti";

interface SecretHeritageProps {
  children: React.ReactNode;
  className?: string;
}

export function SecretHeritageEasterEgg({ children, className = "" }: SecretHeritageProps) {
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTapTime > 1500) {
      setTapCount(1);
    } else {
      const nextCount = tapCount + 1;
      setTapCount(nextCount);
      if (nextCount >= 3) {
        // Trigger Easter Egg
        setShowModal(true);
        setTapCount(0);
        triggerMarigoldConfetti();
        if (typeof window !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate([30, 50, 30, 80, 50]);
        }
      }
    }
    setLastTapTime(now);
  };

  const copyPromo = () => {
    navigator.clipboard.writeText("LEGACY1995");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <span
        onClick={handleTap}
        className={`cursor-pointer select-none transition-transform active:scale-95 ${className}`}
        title="Double-tap or triple-tap for a heritage surprise!"
      >
        {children}
      </span>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#1E232B] to-[#12151B] border-2 border-[#D4AF37] p-6 text-center text-white shadow-[0_0_50px_rgba(212,175,55,0.4)] animate-in zoom-in-90 duration-300">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Trophy / Badge */}
            <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(212,175,55,0.5)]">
              <Gift className="w-8 h-8 text-[#D4AF37] animate-bounce" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Heritage Easter Egg Unlocked!
            </span>

            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Serving Bhadrawati Since 1995
            </h3>

            <p className="text-xs text-[#C9CDD5] leading-relaxed mb-5">
              You discovered our secret 1995 founder seal! Enjoy an exclusive 15% discount on your pure vegetarian order.
            </p>

            {/* Promo Code Box */}
            <div className="p-3 rounded-2xl bg-black/40 border border-[#D4AF37]/60 flex items-center justify-between gap-3 mb-5">
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#9DA4B0] block">Promo Code</span>
                <span className="font-mono text-base font-extrabold text-[#D4AF37] tracking-wider">LEGACY1995</span>
              </div>
              <button
                onClick={copyPromo}
                className="px-3 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#F9E79F] text-[#0F1115] font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#E7E2D6] transition-colors"
            >
              Continue Exploring Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
}
