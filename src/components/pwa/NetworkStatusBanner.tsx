"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, Wifi, RefreshCw, CheckCircle2, X } from "lucide-react";
import { offlineSyncManager } from "@/lib/offline-sync";
import { useRestaurant } from "@/context/RestaurantContext";

export function NetworkStatusBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [justReconnected, setJustReconnected] = useState(false);
  const [syncedCount, setSyncedCount] = useState(0);
  const { submitFeedback } = useRestaurant();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial check
    const currentStatus = navigator.onLine;
    setIsOnline(currentStatus);
    if (!currentStatus) {
      setShowBanner(true);
    }

    const handleOnline = async () => {
      setIsOnline(true);
      setShowBanner(true);
      setJustReconnected(true);

      // Flush offline queues
      try {
        const result = await offlineSyncManager.flushQueue(submitFeedback);
        if (result.syncedCount > 0) {
          setSyncedCount(result.syncedCount);
        }
      } catch (err) {
        console.warn("[NetworkBanner] Queue sync failed:", err);
      }

      // Auto-hide the reconnected banner after 4 seconds
      const timer = setTimeout(() => {
        setJustReconnected(false);
        setShowBanner(false);
      }, 4000);

      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setJustReconnected(false);
      setShowBanner(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [submitFeedback]);

  if (!showBanner) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div
        className={`px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md border flex items-center justify-between gap-3 text-xs transition-all ${
          isOnline
            ? "bg-[#174D35]/95 text-white border-[#22C55E]/50 dark:bg-[#123C29]/95 dark:border-[#22C55E]/60 shadow-[#174D35]/20"
            : "bg-black/95 text-white border-amber-500/50 dark:bg-black/95 dark:border-[#D4AF37]/50 shadow-black/40"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {isOnline ? (
            <div className="w-7 h-7 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0">
              <Wifi className="w-3.5 h-3.5 animate-pulse" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 dark:text-[#D4AF37] flex items-center justify-center shrink-0">
              <WifiOff className="w-3.5 h-3.5 animate-bounce" />
            </div>
          )}

          <div className="flex flex-col">
            <span className="font-bold text-xs">
              {isOnline ? "Back Online" : "Browsing in Offline Mode"}
            </span>
            <span className="text-[10px] opacity-80 leading-tight">
              {isOnline
                ? syncedCount > 0
                  ? `Synchronized ${syncedCount} queued action(s)`
                  : "Live menu updates & connectivity restored"
                : "Full digital menu & prices available offline"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowBanner(false)}
          className="p-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-colors ml-2"
          aria-label="Dismiss offline notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
