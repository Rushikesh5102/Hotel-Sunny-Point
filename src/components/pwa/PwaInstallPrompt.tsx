"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Download, X, Smartphone, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already dismissed recently
    const dismissedUntil = localStorage.getItem("sunny_point_pwa_dismissed");
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    // Check if app is already running standalone / installed
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait 3 seconds after page load before displaying install invite
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User response to install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Dismiss for 7 days
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "sunny_point_pwa_dismissed",
        (Date.now() + 7 * 24 * 60 * 60 * 1000).toString()
      );
    }
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div
      role="dialog"
      aria-label="Install Hotel Sunny Point Application"
      className="fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div className="p-4 rounded-2xl bg-white/95 dark:bg-[#171A21]/95 backdrop-blur-md border border-[#174D35]/30 dark:border-[#D4AF37]/40 shadow-2xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#174D35]/30 dark:border-[#D4AF37]/50 shadow shrink-0">
            <Image
              src="/assets/brand/logo.jpg"
              alt="Hotel Sunny Point"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold text-xs text-[#292D29] dark:text-white">
              <span>Install Sunny Point App</span>
              <Sparkles className="w-3 h-3 text-[#174D35] dark:text-[#D4AF37]" />
            </div>
            <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] leading-tight">
              1-tap access & 100% offline digital menu
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 rounded-lg bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] font-bold text-[11px] shadow-sm flex items-center gap-1 active:scale-95 transition-all"
          >
            <Download className="w-3 h-3" />
            <span>Install</span>
          </button>

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-[#6D756D] hover:text-[#292D29] dark:text-[#9DA4B0] dark:hover:text-white transition-colors"
            aria-label="Dismiss app install prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
