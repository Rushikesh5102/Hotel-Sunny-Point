"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { useRestaurant } from "@/context/RestaurantContext";
import { History, Sparkles, MapPin, Award, CheckCircle2, X } from "lucide-react";

export default function AboutPage() {
  const { restaurant, t } = useRestaurant();
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  const posters = [
    {
      title: "Sunny Point Gazette — History Since 1995",
      src: "/assets/brand/gazette-history.jpg",
      caption: "Documenting our 1995 humble beginnings at the current parking lot and the original opening ceremony.",
    },
    {
      title: "The Iconic Masala Dosa Feature",
      src: "/assets/brand/gazette-masala-dosa.jpg",
      caption: "How Sunny Point pioneered South Indian Dosa culture in Bhadrawati in 1995.",
    },
    {
      title: "The Iconic Pesarattu Andhra Special",
      src: "/assets/brand/gazette-pesarattu.jpg",
      caption: "Introducing healthy whole green gram moong dal dosas with upma stuffing to Chandrapur district.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-black text-[#292D29] dark:text-[#F5F5F5] pb-16 md:pb-0 transition-colors duration-200">
      <Header />

      <main className="flex-1 pb-24">
        {/* About Hero */}
        <section className="bg-gradient-to-b from-[#F5F0E6] to-[#FAF9F3] dark:from-black dark:to-black border-b border-[#E7E2D6] dark:border-[#1c2028] py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D35]/10 border border-[#174D35]/20 text-[#174D35] dark:bg-[#D4AF37]/10 dark:border-[#D4AF37]/30 dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <History className="w-3.5 h-3.5" />
              <span>{t({ en: "Our Story • Est. 1995", mr: "आमची जीवनगाथा • स्था. १९९५" })}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#292D29] dark:text-white tracking-tight">
              {t({ en: "The Taste of Legacy", mr: "द टेस्ट ऑफ लेगसी" })}
            </h1>

            <p className="text-base sm:text-lg text-[#174D35] dark:text-[#D4AF37] font-medium font-serif">
              &ldquo;Same Flavours. New Stories. Timeless Memories.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#C9CDD5] max-w-2xl mx-auto leading-relaxed">
              {t({
                en: "For 30 years since 1995, Hotel Sunny Point has been at the culinary heart of Bhadrawati. A pure vegetarian legacy built on uncompromising quality, authentic spices, and heartfelt hospitality.",
                mr: "१९९५ पासून गेल्या ३ दशकांपासून हॉटेल सनी पॉईंट हे भद्रावती शहराचे एक प्रमुख खाद्यवैशिष्ट्य राहिले आहे. अस्सल मसाले, शुद्ध शाकाहारी परंपरा आणि आपुलकीचे आदरातिथ्य.",
              })}
            </p>
          </div>
        </section>

        {/* Milestone Timeline Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-[#E7E2D6] dark:before:bg-[#1c2028]">
            {/* Timeline Item 1: 1995 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="sm:w-5/12 sm:text-right space-y-2 pl-10 sm:pl-0 order-2 sm:order-1">
                <span className="text-xs font-bold text-[#174D35] dark:text-[#D4AF37] tracking-widest uppercase">The Foundation</span>
                <h3 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">1995 — Humble Beginnings</h3>
                <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed">
                  Before Sunny Point became a landmark for generations, it began as a humble dream with simple ideas, hard work, and a passion for good food. The original kitchen and dining setup was situated where today&apos;s customer parking is located.
                </p>
              </div>

              <div className="absolute left-1.5 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#174D35] dark:bg-[#D4AF37] border-4 border-[#FAF9F3] dark:border-black shadow-lg flex items-center justify-center z-10 order-1 sm:order-2" />

              <div className="sm:w-5/12 pl-10 sm:pl-0 order-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7E2D6] dark:border-[#D4AF37]/30 shadow-lg">
                  <Image
                    src="/assets/brand/gazette-history.jpg"
                    alt="Original opening 1995"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Timeline Item 2: 1995 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="sm:w-5/12 pl-10 sm:pl-0 order-2 sm:order-1">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7E2D6] dark:border-[#D4AF37]/30 shadow-lg">
                  <Image
                    src="/assets/brand/gazette-masala-dosa.jpg"
                    alt="Iconic Masala Dosa 1995"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute left-1.5 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#22C55E] border-4 border-[#FAF9F3] dark:border-black shadow-lg flex items-center justify-center z-10 order-1 sm:order-2" />

              <div className="sm:w-5/12 space-y-2 pl-10 sm:pl-0 order-3">
                <span className="text-xs font-bold text-[#22C55E] tracking-widest uppercase">The South Indian Pioneer</span>
                <h3 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">1995 — Introducing Dosa Culture</h3>
                <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed">
                  In 1995, Hotel Sunny Point began its South Indian journey, becoming one of the very first establishments in Bhadrawati to serve dosas, idlis, and vadas. Our signature Masala Dosa quickly grew into a local obsession that families have shared for 30 years.
                </p>
              </div>
            </div>

            {/* Timeline Item 3: Today */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="sm:w-5/12 sm:text-right space-y-2 pl-10 sm:pl-0 order-2 sm:order-1">
                <span className="text-xs font-bold text-[#E07A2B] tracking-widest uppercase">Global Bites Era</span>
                <h3 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">Today — Modern Pure Veg Landmark</h3>
                <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed">
                  Operating from our current modern 3-story building with illuminated neon facade, Hotel Sunny Point combines South Indian legacy with North Indian curries, Indo-Chinese woks, and international Global Bites.
                </p>
              </div>

              <div className="absolute left-1.5 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E07A2B] border-4 border-[#FAF9F3] dark:border-black shadow-lg flex items-center justify-center z-10 order-1 sm:order-2" />

              <div className="sm:w-5/12 pl-10 sm:pl-0 order-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7E2D6] dark:border-[#D4AF37]/30 shadow-lg">
                  <Image
                    src="/assets/brand/facade.jpg"
                    alt="Current Building Exterior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vintage Gazette Archives Section */}
        <section className="bg-[#F5F0E6] dark:bg-black border-t border-b border-[#E7E2D6] dark:border-[#1c2028] py-16 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
              <h2 className="font-serif text-3xl font-bold text-[#292D29] dark:text-white">
                {t({ en: "Sunny Point Gazette Archives", mr: "सनी पॉईंट गॅझेट ऐतिहासिक संग्रह" })}
              </h2>
              <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
                Original vintage editorial posters published by Hotel Sunny Point celebrating local culinary history.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posters.map((poster, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPoster(poster.src)}
                  className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] hover:border-[#174D35] dark:hover:border-[#D4AF37]/70 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-xl"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={poster.src}
                      alt={poster.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-serif font-bold text-[#292D29] dark:text-white text-sm group-hover:text-[#174D35] dark:group-hover:text-[#D4AF37] transition-colors">
                      {poster.title}
                    </h4>
                    <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed">
                      {poster.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Poster Zoom Modal */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-2xl w-full max-h-[90vh] bg-white dark:bg-black rounded-2xl overflow-hidden border border-[#174D35] dark:border-[#D4AF37] shadow-2xl">
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[85vh] overflow-y-auto">
              <Image
                src={selectedPoster}
                alt="Selected Gazette Poster"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
