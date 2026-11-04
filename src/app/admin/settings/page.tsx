"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import { Settings, Save, CheckCircle2, Phone, MapPin, Clock, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const { restaurant, updateSettings } = useRestaurant();

  const [nameEn, setNameEn] = useState(restaurant.settings.name.en);
  const [nameMr, setNameMr] = useState(restaurant.settings.name.mr);
  const [taglineEn, setTaglineEn] = useState(restaurant.settings.tagline.en);
  const [taglineMr, setTaglineMr] = useState(restaurant.settings.tagline.mr);
  const [primaryPhone, setPrimaryPhone] = useState(restaurant.settings.primaryPhone);
  const [secondaryPhone, setSecondaryPhone] = useState(restaurant.settings.secondaryPhone);
  const [addressEn, setAddressEn] = useState(restaurant.settings.address.en);
  const [addressMr, setAddressMr] = useState(restaurant.settings.address.mr);
  const [operatingHoursTiming, setOperatingHoursTiming] = useState(restaurant.settings.operatingHours.timing);
  const [operatingHoursDays, setOperatingHoursDays] = useState(restaurant.settings.operatingHours.days.en);
  const [instagramUrl, setInstagramUrl] = useState(restaurant.settings.instagramUrl);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(restaurant.settings.googleMapsUrl);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateSettings({
      name: { en: nameEn, mr: nameMr },
      tagline: { en: taglineEn, mr: taglineMr },
      primaryPhone,
      secondaryPhone,
      address: { en: addressEn, mr: addressMr },
      operatingHours: {
        days: { en: operatingHoursDays, mr: operatingHoursDays },
        timing: operatingHoursTiming,
      },
      instagramUrl,
      googleMapsUrl,
    });

    setToastMessage("Restaurant settings saved! Live customer menu updated.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#22C55E] text-[#0F1115] px-4 py-3 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-white">Restaurant Configuration & Branding</h2>
        <p className="text-xs text-[#9DA4B0] mt-0.5">
          Tenant identity settings for Hotel Sunny Point. Used across headers, footers, and metadata.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Card */}
        <div className="bg-[#12151C] border border-[#2A3140] p-6 rounded-2xl space-y-4">
          <h3 className="font-serif font-bold text-base text-white border-b border-[#2A3140] pb-3">
            Restaurant Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                Restaurant Name (English)
              </label>
              <input
                type="text"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                Restaurant Name (मराठी)
              </label>
              <input
                type="text"
                required
                value={nameMr}
                onChange={(e) => setNameMr(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                Tagline (English)
              </label>
              <input
                type="text"
                value={taglineEn}
                onChange={(e) => setTaglineEn(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                Tagline (मराठी)
              </label>
              <input
                type="text"
                value={taglineMr}
                onChange={(e) => setTaglineMr(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Hours */}
        <div className="bg-[#12151C] border border-[#2A3140] p-6 rounded-2xl space-y-4">
          <h3 className="font-serif font-bold text-base text-white border-b border-[#2A3140] pb-3">
            Contact Information & Operating Hours
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                Primary Phone Number *
              </label>
              <input
                type="text"
                required
                value={primaryPhone}
                onChange={(e) => setPrimaryPhone(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                Secondary Phone Number
              </label>
              <input
                type="text"
                value={secondaryPhone}
                onChange={(e) => setSecondaryPhone(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                Operating Days
              </label>
              <input
                type="text"
                value={operatingHoursDays}
                onChange={(e) => setOperatingHoursDays(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={operatingHoursTiming}
                onChange={(e) => setOperatingHoursTiming(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Address & Social Links */}
        <div className="bg-[#12151C] border border-[#2A3140] p-6 rounded-2xl space-y-4">
          <h3 className="font-serif font-bold text-base text-white border-b border-[#2A3140] pb-3">
            Address & Social Presence
          </h3>

          <div>
            <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
              Physical Street Address (English)
            </label>
            <input
              type="text"
              value={addressEn}
              onChange={(e) => setAddressEn(e.target.value)}
              className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                Google Maps Navigation URL
              </label>
              <input
                type="url"
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#B89324] text-[#0F1115] uppercase tracking-wider transition-colors shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>Save All Restaurant Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
