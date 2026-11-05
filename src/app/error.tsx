"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, Phone } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for production diagnostics
    console.error("Hotel Sunny Point Application Runtime Exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F3] dark:bg-black text-[#292D29] dark:text-[#F5F5F5] px-4 sm:px-6 lg:px-8 py-20 transition-colors">
      <div className="max-w-lg w-full text-center space-y-6 bg-white dark:bg-black p-8 sm:p-10 rounded-3xl border border-[#E7E2D6] dark:border-[#1c2028] shadow-xl">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E07A2B]/10 border border-[#E07A2B]/30 flex items-center justify-center text-[#E07A2B]">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#E07A2B] uppercase tracking-widest">
            Application Interruption
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#292D29] dark:text-white">
            Something Paused Our Kitchen
          </h1>
          <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed">
            We encountered a temporary connection or rendering issue while preparing this page. Our live data remains safe and preserved.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black font-semibold text-xs shadow-md transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF9F3] hover:bg-[#F5F0E6] text-[#292D29] border border-[#E7E2D6] dark:bg-black dark:hover:bg-[#111111] dark:text-[#C9CDD5] dark:border-[#1c2028] font-semibold text-xs transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>

        {error.digest && (
          <p className="text-[10px] text-gray-400 font-mono pt-2">
            Incident Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
