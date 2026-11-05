"use client";

import React from "react";
import Image from "next/image";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { useRestaurant } from "@/context/RestaurantContext";
import { Phone, MapPin, Clock, Instagram, ExternalLink, ShieldCheck, Mail } from "lucide-react";

export default function ContactPage() {
  const { restaurant, t } = useRestaurant();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-black text-[#292D29] dark:text-[#F5F5F5] pb-16 md:pb-0 transition-colors duration-200">
      <Header />

      <main className="flex-1 pb-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-[#F5F0E6] to-[#FAF9F3] dark:from-black dark:to-black border-b border-[#E7E2D6] dark:border-[#1c2028] py-14 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D35]/10 border border-[#174D35]/20 text-[#174D35] dark:bg-[#D4AF37]/10 dark:border-[#D4AF37]/30 dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t({ en: "Hospitality & Location", mr: "स्थान आणि संपर्क" })}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292D29] dark:text-white tracking-tight">
              {t({ en: "Visit Hotel Sunny Point", mr: "हॉटेल सनी पॉईंटला भेट द्या" })}
            </h1>

            <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed">
              {t({
                en: "Serving Bhadrawati with warmth and authenticity since 1995. Reach out for table reservations, family gatherings, or directions.",
                mr: "१९९५ पासून अखंड सेवेत. टेबल बुकिंग, कौटुंबिक स्नेहभोजन किंवा माहितीसाठी संपर्क करा.",
              })}
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Address Card */}
              <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-6 rounded-2xl space-y-3 shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#174D35]/10 border border-[#174D35]/20 dark:bg-[#D4AF37]/10 dark:border-[#D4AF37]/30 flex items-center justify-center text-[#174D35] dark:text-[#D4AF37]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#292D29] dark:text-white text-base">Address</h3>
                    <p className="text-[11px] text-[#174D35] dark:text-[#D4AF37]">Bhadrawati, Maharashtra</p>
                  </div>
                </div>
                <p className="text-xs text-[#6D756D] dark:text-[#C9CDD5] leading-relaxed">
                  {t(restaurant.settings.address)}
                </p>
                <div className="pt-2">
                  <a
                    href={restaurant.settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Telephone Card */}
              <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-6 rounded-2xl space-y-3 shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#292D29] dark:text-white text-base">Phone Inquiries</h3>
                    <p className="text-[11px] text-[#22C55E]">Direct Restaurant Lines</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-[#6D756D] dark:text-[#C9CDD5]">
                  <p>
                    Primary Line:{" "}
                    <a href={`tel:${restaurant.settings.primaryPhone}`} className="font-bold text-[#174D35] dark:text-white hover:text-[#123E2A] dark:hover:text-[#D4AF37]">
                      {restaurant.settings.primaryPhone}
                    </a>
                  </p>
                  <p>
                    Secondary Line:{" "}
                    <a href={`tel:${restaurant.settings.secondaryPhone}`} className="text-[#174D35] dark:text-white hover:text-[#123E2A] dark:hover:text-[#D4AF37]">
                      {restaurant.settings.secondaryPhone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Timings Card */}
              <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-6 rounded-2xl space-y-3 shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E07A2B]/10 border border-[#E07A2B]/30 flex items-center justify-center text-[#E07A2B]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#292D29] dark:text-white text-base">Service Hours</h3>
                    <p className="text-[11px] text-[#E07A2B]">{t(restaurant.settings.operatingHours.days)}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#292D29] dark:text-white">
                  {restaurant.settings.operatingHours.timing}
                </p>
                <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">
                  Breakfast, Lunch, High Tea & Family Dinner service.
                </p>
              </div>

              {/* Instagram Connection */}
              <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-6 rounded-2xl flex items-center justify-between shadow-sm dark:shadow-none transition-colors">
                <div className="flex items-center gap-3">
                  <Instagram className="w-6 h-6 text-[#E1306C]" />
                  <div>
                    <p className="font-bold text-[#292D29] dark:text-white text-xs">Follow Our Food Stories</p>
                    <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">@hotelsunnypoint</p>
                  </div>
                </div>
                <a
                  href={restaurant.settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F5F0E6] dark:bg-black text-[#174D35] dark:text-[#D4AF37] border border-[#E7E2D6] dark:border-[#1c2028] hover:bg-[#EAE4D7] dark:hover:bg-[#111111] transition-colors"
                >
                  Visit Instagram
                </a>
              </div>
            </div>

            {/* Right: Building Facade Showcase */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-3xl overflow-hidden shadow-sm dark:shadow-2xl transition-colors">
                <div className="relative aspect-[16/10] w-full bg-black">
                  <Image
                    src="/assets/brand/facade.jpg"
                    alt="Hotel Sunny Point Landmark Building"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="text-xs text-[#D4AF37] font-serif">Bhadrawati Landmark</span>
                    <h3 className="font-serif text-2xl font-bold">Hotel Sunny Point Building</h3>
                    <p className="text-xs text-[#C9CDD5]">
                      Air-conditioned dining halls, spacious family cabins, pure veg culinary excellence.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-black border-t border-[#E7E2D6] dark:border-[#1c2028] flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
                  <div className="flex items-center gap-2 text-xs text-[#6D756D] dark:text-[#9DA4B0]">
                    <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                    <span>Pure Vegetarian Standards Strictly Maintained</span>
                  </div>

                  <a
                    href={restaurant.settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black uppercase tracking-wider text-center transition-colors shadow-md"
                  >
                    Get GPS Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
