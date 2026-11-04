"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import { Sparkles, History, Eye, X, BookOpen } from "lucide-react";

export function HeritageGazetteSection() {
  const { t } = useRestaurant();
  const [showGazetteModal, setShowGazetteModal] = useState(false);

  return (
    <section className="py-20 bg-[#0F1115] border-t border-b border-[#2A3140]/60 relative overflow-hidden">
      {/* Subtle warm background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Gazette Poster Thumbnail */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => setShowGazetteModal(true)}
              className="relative group cursor-pointer max-w-md w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl hover:border-[#D4AF37] transition-all duration-300"
            >
              <div className="relative aspect-[3/4] w-full bg-[#171A21]">
                <Image
                  src="/assets/brand/gazette-history.jpg"
                  alt="Sunny Point Gazette - 1965 Heritage"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-[#D4AF37]/40 flex items-center justify-between text-xs text-white">
                  <span className="font-serif font-bold text-[#D4AF37]">Sunny Point Gazette</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#C9CDD5]">
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Click to Expand</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
              <History className="w-4 h-4 text-[#D4AF37]" />
              <span>{t({ en: "Authentic Restaurant History", mr: "अस्सल इतिहास आणि वारसा" })}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {t({
                en: "Same Flavours. New Stories. Timeless Memories.",
                mr: "तोच स्वाद. नव्या गोष्टी. अजरामर आठवणी.",
              })}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#C9CDD5] leading-relaxed">
              <p>
                {t({
                  en: "Before Sunny Point became a beloved destination for generations across Chandrapur district, it was a humble dream that began in 1965. Originally situated right where the current customer parking lot is today, our kitchen prepared authentic, homely meals every day with heart and dedication.",
                  mr: "हॉटेल सनी पॉईंट हे पिढ्यान्-पिढ्यांचे लाडके ठिकाण बनण्यापूर्वी, १९६५ मध्ये एका साध्या स्वप्नातून ही सुरुवात झाली. सुरुवातीला आजच्या पार्किंगच्या जागेवर सुरू झालेले हे हॉटेल शुद्ध, घरगुती आणि मनस्वी जेवण देण्यासाठी प्रसिद्ध झाले.",
                })}
              </p>

              <div className="bg-[#171A21] border-l-4 border-[#D4AF37] p-4 sm:p-5 rounded-r-2xl space-y-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  {t({
                    en: "1995 — Bringing Dosa Culture to Bhadrawati",
                    mr: "१९९५ — भद्रावतीत डोसा संस्कृतीची सुरुवात",
                  })}
                </h3>
                <p className="text-xs sm:text-sm text-[#9DA4B0]">
                  {t({
                    en: "In 1995, we commenced our South Indian journey, becoming one of the first establishments to introduce traditional fermented dosas, idlis, and vadas to the town. The children who came with their parents in 1995 now return with their own children, sharing the exact same taste and memories.",
                    mr: "१९९५ मध्ये हॉटेल सनी पॉईंटने आपल्या दाक्षिणात्य प्रवासाला सुरुवात केली आणि भद्रावती शहराला खमंग डोशाचा पहिला अस्सल परिचय करून दिला. जे चिमुरडे एकेकाळी आपल्या पालकांसोबत येत, ते आज स्वतःच्या मुलांसह तीच चव चाखायला येतात.",
                  })}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#9DA4B0]">
                {t({
                  en: "Today, operating from our landmark modern facility, the journey continues with the same uncompromised standards of taste, cleanliness, and pure vegetarian hospitality.",
                  mr: "आज तीन मजली भव्य इमारतीत तोच सेवाभाव, तीच गुणवत्ता आणि १००% शुद्ध शाकाहारी संस्कार अविरत सुरू आहेत.",
                })}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#B89324] text-[#0F1115] uppercase tracking-wider transition-colors shadow-md"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t({ en: "Read Full Heritage Story", mr: "संपूर्ण इतिहास वाचा" })}</span>
              </Link>

              <button
                onClick={() => setShowGazetteModal(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-[#171A21] hover:bg-[#212631] text-[#D4AF37] border border-[#2A3140] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t({ en: "Inspect 1965 Newspaper Poster", mr: "१९६५ चे वृत्तपत्र पोस्टर पहा" })}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gazette Fullscreen Zoom Modal */}
      {showGazetteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-2xl w-full max-h-[90vh] bg-[#171A21] rounded-2xl overflow-hidden border border-[#D4AF37]">
            <button
              onClick={() => setShowGazetteModal(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white hover:text-[#D4AF37]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[80vh] overflow-y-auto">
              <Image
                src="/assets/brand/gazette-history.jpg"
                alt="Sunny Point Gazette Full Poster"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
