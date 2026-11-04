"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import { Promotion } from "@/types";
import { Plus, Edit2, Trash2, CheckCircle2, Sparkles, Tag, Calendar, X, Save } from "lucide-react";

export default function AdminPromotionsPage() {
  const { restaurant, addPromotion, updatePromotion, togglePromotion, deletePromotion } = useRestaurant();

  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formTitleEn, setFormTitleEn] = useState("");
  const [formTitleMr, setFormTitleMr] = useState("");
  const [formSubtitleEn, setFormSubtitleEn] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formBadgeText, setFormBadgeText] = useState("Seasonal Special");
  const [formBannerImage, setFormBannerImage] = useState("/assets/campaigns/monsoon-affairs-1.jpg");
  const [formStartDate, setFormStartDate] = useState("2026-07-01");
  const [formEndDate, setFormEndDate] = useState("2026-11-30");
  const [formCouponCode, setFormCouponCode] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setFormTitleEn("");
    setFormTitleMr("");
    setFormSubtitleEn("");
    setFormDescEn("");
    setFormBadgeText("Seasonal Special");
    setFormBannerImage("/assets/campaigns/monsoon-affairs-1.jpg");
    setFormStartDate(new Date().toISOString().split("T")[0]);
    setFormEndDate("2026-12-31");
    setFormCouponCode("");
    setIsAddingNew(true);
    setEditingPromo(null);
  };

  const handleOpenEdit = (promo: Promotion) => {
    setEditingPromo(promo);
    setFormTitleEn(promo.title.en);
    setFormTitleMr(promo.title.mr);
    setFormSubtitleEn(promo.subtitle.en);
    setFormDescEn(promo.description.en);
    setFormBadgeText(promo.badgeText);
    setFormBannerImage(promo.bannerImage);
    setFormStartDate(promo.startDate);
    setFormEndDate(promo.endDate);
    setFormCouponCode(promo.couponCode || "");
    setIsAddingNew(false);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingNew) {
      await addPromotion({
        restaurantId: restaurant.id,
        title: { en: formTitleEn, mr: formTitleMr || formTitleEn },
        subtitle: { en: formSubtitleEn, mr: formSubtitleEn },
        description: { en: formDescEn, mr: formDescEn },
        badgeText: formBadgeText,
        bannerImage: formBannerImage,
        linkedDishIds: ["dish-masala-dosa", "dish-butterfly-paneer", "dish-fried-ice-cream"],
        isActive: true,
        startDate: formStartDate,
        endDate: formEndDate,
        couponCode: formCouponCode || undefined,
      });
      showToast(`Added campaign "${formTitleEn}"!`);
    } else if (editingPromo) {
      await updatePromotion(editingPromo.id, {
        title: { en: formTitleEn, mr: formTitleMr || formTitleEn },
        subtitle: { en: formSubtitleEn, mr: formSubtitleEn },
        description: { en: formDescEn, mr: formDescEn },
        badgeText: formBadgeText,
        bannerImage: formBannerImage,
        startDate: formStartDate,
        endDate: formEndDate,
        couponCode: formCouponCode || undefined,
      });
      showToast(`Updated campaign "${formTitleEn}"!`);
    }

    setIsAddingNew(false);
    setEditingPromo(null);
  };

  const handleDelete = async (promo: Promotion) => {
    if (confirm(`Delete promotion "${promo.title.en}"?`)) {
      await deletePromotion(promo.id);
      showToast("Promotion deleted!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#22C55E] text-[#0F1115] px-4 py-3 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">Promotions & Campaigns</h2>
          <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
            Manage seasonal specials, Monsoon Affairs banners, and coupon vouchers.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] shadow-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promotion</span>
        </button>
      </div>

      {/* Promotions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurant.promotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] rounded-2xl overflow-hidden shadow-sm dark:shadow-xl p-5 flex flex-col justify-between space-y-4 transition-colors"
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-[#E7E2D6] dark:border-[#2A3140]">
                <Image
                  src={promo.bannerImage}
                  alt={promo.title.en}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] px-2.5 py-0.5 rounded-full uppercase shadow">
                    {promo.badgeText}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif font-bold text-[#292D29] dark:text-white text-lg">{promo.title.en}</h3>
                <p className="text-xs text-[#174D35] dark:text-[#D4AF37] font-medium">{promo.subtitle.en}</p>
                <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] mt-1 line-clamp-2">{promo.description.en}</p>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[#6D756D] dark:text-[#C9CDD5] pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
                  <span>Valid till {promo.endDate}</span>
                </span>
                {promo.couponCode && (
                  <span className="flex items-center gap-1 font-mono text-[#174D35] dark:text-[#F9E79F] bg-[#FAF9F3] dark:bg-[#0F1115] px-2 py-0.5 rounded border border-[#E7E2D6] dark:border-[#2A3140]">
                    <Tag className="w-3 h-3 text-[#174D35] dark:text-[#D4AF37]" />
                    <span>{promo.couponCode}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7E2D6] dark:border-[#2A3140] flex items-center justify-between">
              <button
                onClick={() => {
                  togglePromotion(promo.id);
                  showToast(`Promotion ${!promo.isActive ? "Activated" : "Deactivated"}!`);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  promo.isActive
                    ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {promo.isActive ? "Active on Home" : "Inactive / Draft"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(promo)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#174D35] dark:text-gray-400 dark:hover:text-white hover:bg-[#EDF2E9] dark:hover:bg-[#252C3B] transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                </button>
                <button
                  onClick={() => handleDelete(promo)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 hover:bg-[#EDF2E9] dark:hover:bg-[#252C3B] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isAddingNew || editingPromo) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#171A21] border border-[#E7E2D6] dark:border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 transition-colors">
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingPromo(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#292D29] dark:text-white mb-6">
              {isAddingNew ? "Create Promotion" : `Edit "${editingPromo?.title.en}"`}
            </h3>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formTitleEn}
                  onChange={(e) => setFormTitleEn(e.target.value)}
                  className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formSubtitleEn}
                  onChange={(e) => setFormSubtitleEn(e.target.value)}
                  className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={formBadgeText}
                    onChange={(e) => setFormBadgeText(e.target.value)}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Coupon Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formCouponCode}
                    onChange={(e) => setFormCouponCode(e.target.value)}
                    placeholder="e.g. FESTIVE10"
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white font-mono uppercase outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  required
                  value={formBannerImage}
                  onChange={(e) => setFormBannerImage(e.target.value)}
                  className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white font-mono text-[11px] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formDescEn}
                  onChange={(e) => setFormDescEn(e.target.value)}
                  className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl p-3 text-xs text-[#292D29] dark:text-white outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E7E2D6] dark:border-[#2A3140] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingPromo(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-[#6D756D] hover:text-[#292D29] dark:text-gray-400 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] transition-colors shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Campaign</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
