"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { HeritageGazetteSection } from "@/components/home/HeritageGazetteSection";
import { SignatureDosaFeature } from "@/components/home/SignatureDosaFeature";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { GlobalBitesSection } from "@/components/home/GlobalBitesSection";
import { SeasonalSpecialsSection } from "@/components/home/SeasonalSpecialsSection";
import { useRestaurant } from "@/context/RestaurantContext";
import { ShieldAlert, Star, MessageSquareQuote, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

export default function HomePage() {
  const { restaurant, t } = useRestaurant();

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1115] pb-16 md:pb-0">
      {/* Interactive Demonstration Banner */}
      <div className="bg-[#171A21] border-b border-[#D4AF37]/30 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#9DA4B0] gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              <strong>Client Demonstration Mode:</strong> Local reactive database active. Any price or availability edit in{" "}
              <Link href="/admin" className="text-[#D4AF37] underline font-semibold">
                Admin Dashboard
              </Link>{" "}
              immediately reflects across this menu in real-time.
            </span>
          </div>

          <Link
            href="/admin"
            className="text-[11px] font-bold text-[#0F1115] bg-[#D4AF37] px-3 py-1 rounded-full uppercase tracking-wider hover:bg-[#F9E79F] transition-colors shrink-0"
          >
            Launch Admin
          </Link>
        </div>
      </div>

      {/* Main Navigation Header */}
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Heritage Story & Gazette Feature */}
        <HeritageGazetteSection />

        {/* 3. The Iconic Masala Dosa & South Indian Signatures */}
        <SignatureDosaFeature />

        {/* 4. Category Grid Navigation */}
        <CategoryGrid />

        {/* 5. Global Bites (International Cuisine) */}
        <GlobalBitesSection />

        {/* 6. Seasonal Specials & Monsoon Affairs */}
        <SeasonalSpecialsSection />

        {/* 7. Customer Testimonials & Heritage Voices */}
        <section className="py-20 bg-[#0B0D10] border-t border-[#2A3140]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>{t({ en: "Three Decades of Trust", mr: "ग्राहकांचे प्रेम आणि विश्वास" })}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {t({ en: "What Bhadrawati Says", mr: "आमच्या ग्राहकांचे मनोगत" })}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {restaurant.feedback.slice(0, 3).map((fb) => (
                <div
                  key={fb.id}
                  className="bg-[#171A21] border border-[#2A3140] p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: fb.overallRating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#C9CDD5] italic leading-relaxed">
                      &ldquo;{fb.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2A3140] flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{fb.customerName}</span>
                    <span className="text-[#9DA4B0] text-[11px]">{fb.tableNumber || "Verified Guest"}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/feedback"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#F9E79F] transition-colors"
              >
                <span>{t({ en: "Share Your Experience with Us", mr: "आपला अभिप्राय येथे नोंदवा" })}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Visit Information & Map Navigation Callout */}
        <section className="py-16 bg-[#171A21] border-t border-[#2A3140]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0F1115] border border-[#D4AF37]/40 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center lg:text-left">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Hotel Sunny Point — Pure Veg
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  {t({ en: "Join Us for a Taste of Legacy", mr: "भद्रावतीतील स्वादाच्या वारशाचा अनुभव घ्या" })}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9CDD5] max-w-xl">
                  {t({
                    en: "Located on Main Road, Bhadrawati. Family dining with air-conditioned comfort, generous parking, and genuine hospitality.",
                    mr: "मुख्य रस्ता, भद्रावती. वातानुकूलित कौटुंबिक आसनव्यवस्था, प्रशस्त पार्किंग आणि आपुलकीचे आदरातिथ्य.",
                  })}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
                <a
                  href={`tel:${restaurant.settings.primaryPhone}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#B89324] text-[#0F1115] uppercase tracking-wider transition-colors shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {restaurant.settings.primaryPhone}</span>
                </a>

                <a
                  href={restaurant.settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold bg-[#212631] hover:bg-[#2A3140] text-white border border-[#2A3140] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#E07A2B]" />
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
