/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { useRestaurant } from "@/context/RestaurantContext";
import { QrCode, Download, Printer, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

export default function AdminQRPage() {
  const { restaurant } = useRestaurant();
  const [tableNumber, setTableNumber] = useState("");
  const [qrPngUrl, setQrPngUrl] = useState<string>("");
  const [qrSvgString, setQrSvgString] = useState<string>("");
  const [originUrl, setOriginUrl] = useState("http://localhost:3000");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOriginUrl(window.location.origin);
    }
  }, []);

  const menuUrl = tableNumber.trim()
    ? `${originUrl}/menu?table=${encodeURIComponent(tableNumber.trim())}`
    : `${originUrl}/menu`;

  useEffect(() => {
    // Generate QR PNG data URL
    QRCode.toDataURL(
      menuUrl,
      {
        width: 600,
        margin: 2,
        color: {
          dark: "#0F1115",
          light: "#FFFFFF",
        },
      },
      (err, url) => {
        if (!err && url) setQrPngUrl(url);
      }
    );

    // Generate QR SVG string
    QRCode.toString(
      menuUrl,
      {
        type: "svg",
        margin: 2,
        color: {
          dark: "#0F1115",
          light: "#FFFFFF",
        },
      },
      (err, string) => {
        if (!err && string) setQrSvgString(string);
      }
    );
  }, [menuUrl]);

  const handleDownloadPNG = () => {
    if (!qrPngUrl) return;
    const link = document.createElement("a");
    link.download = `sunny-point-menu-qr${tableNumber ? `-table-${tableNumber}` : ""}.png`;
    link.href = qrPngUrl;
    link.click();
  };

  const handleDownloadSVG = () => {
    if (!qrSvgString) return;
    const blob = new Blob([qrSvgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `sunny-point-menu-qr${tableNumber ? `-table-${tableNumber}` : ""}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header (Hidden in Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">Permanent QR Code Manager</h2>
          <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] mt-0.5">
            Table tent cards & instant QR downloads for Hotel Sunny Point.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] shadow-md transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Table Tent Card</span>
        </button>
      </div>

      {/* Configuration & Downloads (Hidden in Print) */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Config Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] p-6 rounded-2xl space-y-6 shadow-sm dark:shadow-none transition-colors">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#292D29] dark:text-white">QR Target URL</h3>
            <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
              This permanent URL remains constant. Updating prices or dishes in Admin updates customer phones without changing the QR code.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-1.5">
                Table Number (Optional)
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 5, 12, or leave blank for General"
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Generated Permanent URL
              </label>
              <div className="bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] p-3 rounded-xl text-xs text-[#174D35] dark:text-[#F9E79F] font-mono break-all flex items-center justify-between gap-2 transition-colors">
                <span>{menuUrl}</span>
                <a href={menuUrl} target="_blank" className="text-gray-400 hover:text-[#174D35] dark:hover:text-white shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2.5">
            <h4 className="text-xs font-semibold text-[#292D29] dark:text-white uppercase tracking-wider">Export Assets</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadPNG}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-[#F5F0E6] hover:bg-[#EAE4D7] text-[#292D29] dark:bg-[#1C212C] dark:hover:bg-[#252C3B] dark:text-white border border-[#E7E2D6] dark:border-[#2A3140] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
                <span>PNG (600px)</span>
              </button>

              <button
                onClick={handleDownloadSVG}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-[#F5F0E6] hover:bg-[#EAE4D7] text-[#292D29] dark:bg-[#1C212C] dark:hover:bg-[#252C3B] dark:text-white border border-[#E7E2D6] dark:border-[#2A3140] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Vector SVG</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-7 bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 shadow-sm dark:shadow-none transition-colors">
          <span className="text-xs text-[#6D756D] dark:text-[#9DA4B0] uppercase font-bold tracking-wider">
            Live Preview
          </span>

          <div className="p-4 bg-white rounded-2xl shadow-md dark:shadow-2xl border-4 border-[#174D35] dark:border-[#D4AF37]">
            {qrPngUrl ? (
              <img
                src={qrPngUrl}
                alt="QR Code"
                className="w-56 h-56 object-contain"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-gray-400 text-xs">
                Generating QR...
              </div>
            )}
          </div>

          <p className="text-xs text-[#6D756D] dark:text-[#C9CDD5] text-center max-w-sm">
            Scan with any standard smartphone camera. No app download required. Works directly in browser.
          </p>
        </div>
      </div>

      {/* Printable Table Tent Poster (Optimized for Paper Printouts) */}
      <div className="pt-4">
        <h3 className="no-print font-serif text-lg font-bold text-[#292D29] dark:text-white mb-4">
          Table Tent Card Design (Print Ready)
        </h3>

        <div className="max-w-md mx-auto bg-white text-[#0F1115] border-4 border-[#D4AF37] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          {/* Brand Header */}
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] mx-auto shadow-md relative">
              <Image
                src={restaurant.settings.logoUrl}
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold tracking-wide text-[#0F1115] uppercase">
                Hotel Sunny Point
              </h2>
              <p className="text-[11px] font-bold text-[#D4AF37] tracking-widest uppercase">
                The Taste of Legacy • Pure Veg
              </p>
              <p className="text-[10px] text-gray-500">
                Serving Bhadrawati Since 1965
              </p>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="py-2">
            <div className="p-3 bg-gray-50 border-2 border-dashed border-[#D4AF37] rounded-2xl inline-block shadow-inner">
              {qrPngUrl && (
                <img
                  src={qrPngUrl}
                  alt="Sunny Point Menu QR"
                  className="w-48 h-48 object-contain"
                />
              )}
            </div>
            {tableNumber && (
              <p className="mt-2 text-xs font-bold text-[#E07A2B] uppercase tracking-wider">
                Table No. {tableNumber}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="space-y-1 text-xs">
            <p className="font-bold text-sm text-[#0F1115]">
              SCAN TO BROWSE DIGITAL MENU
            </p>
            <p className="text-gray-600 text-[11px]">
              Point your smartphone camera to view full menu, prices, and chef specials.
            </p>
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-gray-200 text-[10px] text-gray-500 flex items-center justify-between">
            <span className="flex items-center gap-1 font-semibold text-[#22C55E]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
              <span>100% Pure Vegetarian</span>
            </span>
            <span>Tel: {restaurant.settings.primaryPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
