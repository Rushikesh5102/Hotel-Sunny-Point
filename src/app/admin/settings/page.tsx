"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import {
  Settings,
  Save,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  Globe,
  Lock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

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

  // Security & Admin Password Setup State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSecurityPass, setShowSecurityPass] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null);

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

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);
    setSecuritySuccess(null);

    const savedPassword =
      typeof window !== "undefined"
        ? localStorage.getItem("sunny_point_admin_password") || "SunnyPoint1995!"
        : "SunnyPoint1995!";

    if (currentPassword !== savedPassword) {
      setSecurityError("Current password incorrect. Please verify and try again.");
      return;
    }

    if (newPassword.length < 6) {
      setSecurityError("New password must be at least 6 characters in length.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError("New password and confirmation do not match.");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("sunny_point_admin_password", newPassword);
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSecuritySuccess("Admin password updated successfully! Use your new password on your next login.");
    setTimeout(() => setSecuritySuccess(null), 5000);
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#22C55E] text-[#0F1115] px-4 py-3 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">Restaurant Configuration & Branding</h2>
        <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] mt-0.5">
          Tenant identity and security credentials for Hotel Sunny Point. Used across headers, footers, and authentication.
        </p>
      </div>

      {/* Admin Password & Security Setup Card */}
      <div className="bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] p-6 rounded-2xl space-y-5 shadow-sm dark:shadow-none transition-colors">
        <div className="flex items-center justify-between border-b border-[#E7E2D6] dark:border-[#2A3140] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#174D35]/10 dark:bg-[#D4AF37]/15 border border-[#174D35]/30 dark:border-[#D4AF37]/30 flex items-center justify-center text-[#174D35] dark:text-[#D4AF37]">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#292D29] dark:text-white">
                Admin Password Setup & Security
              </h3>
              <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">
                Update the master owner credentials protecting the /admin dashboard.
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
            Protected
          </span>
        </div>

        {securityError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{securityError}</span>
          </div>
        )}

        {securitySuccess && (
          <div className="p-3 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#174D35] dark:text-[#22C55E] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{securitySuccess}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Current Password
              </label>
              <input
                type={showSecurityPass ? "text" : "password"}
                required
                value={currentPassword}
                placeholder="Current password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                New Password
              </label>
              <input
                type={showSecurityPass ? "text" : "password"}
                required
                value={newPassword}
                placeholder="New password (min 6 chars)"
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <input
                type={showSecurityPass ? "text" : "password"}
                required
                value={confirmPassword}
                placeholder="Re-type new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowSecurityPass(!showSecurityPass)}
              className="text-xs text-[#6D756D] dark:text-[#9DA4B0] hover:text-[#174D35] dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {showSecurityPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showSecurityPass ? "Hide Passwords" : "Show Passwords"}</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              Update Admin Password
            </button>
          </div>
        </form>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Card */}
        <div className="bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] p-6 rounded-2xl space-y-4 shadow-sm dark:shadow-none transition-colors">
          <h3 className="font-serif font-bold text-base text-[#292D29] dark:text-white border-b border-[#E7E2D6] dark:border-[#2A3140] pb-3">
            Restaurant Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-1">
                Restaurant Name (English)
              </label>
              <input
                type="text"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-1">
                Restaurant Name (मराठी)
              </label>
              <input
                type="text"
                required
                value={nameMr}
                onChange={(e) => setNameMr(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Tagline (English)
              </label>
              <input
                type="text"
                value={taglineEn}
                onChange={(e) => setTaglineEn(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Tagline (मराठी)
              </label>
              <input
                type="text"
                value={taglineMr}
                onChange={(e) => setTaglineMr(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours & Phones */}
        <div className="bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] p-6 rounded-2xl space-y-4 shadow-sm dark:shadow-none transition-colors">
          <h3 className="font-serif font-bold text-base text-[#292D29] dark:text-white border-b border-[#E7E2D6] dark:border-[#2A3140] pb-3">
            Hours & Contact Lines
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Primary Inquiry Line
              </label>
              <input
                type="tel"
                value={primaryPhone}
                onChange={(e) => setPrimaryPhone(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white font-mono outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Secondary Helpline
              </label>
              <input
                type="tel"
                value={secondaryPhone}
                onChange={(e) => setSecondaryPhone(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white font-mono outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Operating Days
              </label>
              <input
                type="text"
                value={operatingHoursDays}
                onChange={(e) => setOperatingHoursDays(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Daily Timing
              </label>
              <input
                type="text"
                value={operatingHoursTiming}
                onChange={(e) => setOperatingHoursTiming(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white font-mono outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Address & Social Links */}
        <div className="bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] p-6 rounded-2xl space-y-4 shadow-sm dark:shadow-none transition-colors">
          <h3 className="font-serif font-bold text-base text-[#292D29] dark:text-white border-b border-[#E7E2D6] dark:border-[#2A3140] pb-3">
            Address & Social Presence
          </h3>

          <div>
            <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
              Physical Street Address (English)
            </label>
            <input
              type="text"
              value={addressEn}
              onChange={(e) => setAddressEn(e.target.value)}
              className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white font-mono text-[11px] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                Google Maps Navigation URL
              </label>
              <input
                type="url"
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white font-mono text-[11px] outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] uppercase tracking-wider transition-colors shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save All Restaurant Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
