"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import { Promotion } from "@/types";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Sparkles,
  Tag,
  Calendar,
  X,
  Save,
  Percent,
  IndianRupee,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

export interface CustomCoupon {
  id: string;
  code: string;
  description: string;
  discountType: "percent" | "flat";
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
}

const DEFAULT_COUPONS: CustomCoupon[] = [
  {
    id: "coupon-legacy-1995",
    code: "LEGACY1995",
    description: "Celebrating 30 Years of Sunny Point (Est. 1995) - 15% Off South Indian Classics",
    discountType: "percent",
    discountValue: 15,
    minOrder: 150,
    maxDiscount: 100,
    expiryDate: "2026-12-31",
    isActive: true,
    usageCount: 48,
  },
  {
    id: "coupon-monsoon-10",
    code: "MONSOON10",
    description: "Monsoon Affairs Special - 10% Off on hot soups, sizzlers & crisp dosas",
    discountType: "percent",
    discountValue: 10,
    minOrder: 200,
    maxDiscount: 75,
    expiryDate: "2026-11-30",
    isActive: true,
    usageCount: 112,
  },
  {
    id: "coupon-family-50",
    code: "FAMILY50",
    description: "Family Feast Voucher - Flat ₹50 off on orders above ₹400",
    discountType: "flat",
    discountValue: 50,
    minOrder: 400,
    expiryDate: "2026-12-31",
    isActive: true,
    usageCount: 84,
  },
];

export default function AdminPromotionsPage() {
  const { restaurant, addPromotion, updatePromotion, togglePromotion, deletePromotion } = useRestaurant();

  const [activeTab, setActiveTab] = useState<"campaigns" | "coupons">("coupons");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Campaign Form State
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [isAddingNewPromo, setIsAddingNewPromo] = useState(false);
  const [formTitleEn, setFormTitleEn] = useState("");
  const [formTitleMr, setFormTitleMr] = useState("");
  const [formSubtitleEn, setFormSubtitleEn] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formBadgeText, setFormBadgeText] = useState("Seasonal Special");
  const [formBannerImage, setFormBannerImage] = useState("/assets/campaigns/monsoon-affairs-1.jpg");
  const [formStartDate, setFormStartDate] = useState("2026-07-01");
  const [formEndDate, setFormEndDate] = useState("2026-11-30");
  const [formCouponCode, setFormCouponCode] = useState("");

  // Coupon State
  const [coupons, setCoupons] = useState<CustomCoupon[]>(DEFAULT_COUPONS);
  const [editingCoupon, setEditingCoupon] = useState<CustomCoupon | null>(null);
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);

  // Coupon Form State
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponDescInput, setCouponDescInput] = useState("");
  const [couponTypeInput, setCouponTypeInput] = useState<"percent" | "flat">("percent");
  const [couponValueInput, setCouponValueInput] = useState(10);
  const [couponMinOrderInput, setCouponMinOrderInput] = useState(150);
  const [couponMaxDiscountInput, setCouponMaxDiscountInput] = useState(100);
  const [couponExpiryInput, setCouponExpiryInput] = useState("2026-12-31");
  const [couponActiveInput, setCouponActiveInput] = useState(true);

  // Test Coupon Interactive Widget State
  const [testCode, setTestCode] = useState("LEGACY1995");
  const [testSubtotal, setTestSubtotal] = useState(300);
  const [testResult, setTestResult] = useState<{ valid: boolean; message: string; discount: number } | null>(null);

  // Load saved coupons from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sunny_point_coupons");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCoupons(parsed);
          }
        } catch {}
      }
    }
  }, []);

  const saveCoupons = (newList: CustomCoupon[]) => {
    setCoupons(newList);
    if (typeof window !== "undefined") {
      localStorage.setItem("sunny_point_coupons", JSON.stringify(newList));
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Open Add Coupon Modal
  const handleOpenAddCoupon = () => {
    setCouponCodeInput("");
    setCouponDescInput("");
    setCouponTypeInput("percent");
    setCouponValueInput(10);
    setCouponMinOrderInput(150);
    setCouponMaxDiscountInput(100);
    setCouponExpiryInput("2026-12-31");
    setCouponActiveInput(true);
    setEditingCoupon(null);
    setIsAddingCoupon(true);
  };

  // Open Edit Coupon Modal
  const handleOpenEditCoupon = (c: CustomCoupon) => {
    setEditingCoupon(c);
    setCouponCodeInput(c.code);
    setCouponDescInput(c.description);
    setCouponTypeInput(c.discountType);
    setCouponValueInput(c.discountValue);
    setCouponMinOrderInput(c.minOrder);
    setCouponMaxDiscountInput(c.maxDiscount || 0);
    setCouponExpiryInput(c.expiryDate);
    setCouponActiveInput(c.isActive);
    setIsAddingCoupon(true);
  };

  // Save Coupon (Add or Edit)
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCodeInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (editingCoupon) {
      // Edit existing
      const updated = coupons.map((c) =>
        c.id === editingCoupon.id
          ? {
              ...c,
              code: cleanCode,
              description: couponDescInput,
              discountType: couponTypeInput,
              discountValue: Number(couponValueInput),
              minOrder: Number(couponMinOrderInput),
              maxDiscount: couponTypeInput === "percent" ? Number(couponMaxDiscountInput) : undefined,
              expiryDate: couponExpiryInput,
              isActive: couponActiveInput,
            }
          : c
      );
      saveCoupons(updated);
      showToast(`Updated coupon code ${cleanCode}!`);
    } else {
      // Add new
      const newCoupon: CustomCoupon = {
        id: `coupon-${Date.now()}`,
        code: cleanCode,
        description: couponDescInput || `${cleanCode} Special Discount Voucher`,
        discountType: couponTypeInput,
        discountValue: Number(couponValueInput),
        minOrder: Number(couponMinOrderInput),
        maxDiscount: couponTypeInput === "percent" ? Number(couponMaxDiscountInput) : undefined,
        expiryDate: couponExpiryInput,
        isActive: couponActiveInput,
        usageCount: 0,
      };
      saveCoupons([newCoupon, ...coupons]);
      showToast(`Created new coupon code ${cleanCode}!`);
    }

    setIsAddingCoupon(false);
    setEditingCoupon(null);
  };

  // Delete Coupon
  const handleDeleteCoupon = (c: CustomCoupon) => {
    if (confirm(`Are you sure you want to delete coupon code "${c.code}"? Customers will no longer be able to use it.`)) {
      const remaining = coupons.filter((item) => item.id !== c.id);
      saveCoupons(remaining);
      showToast(`Deleted coupon code ${c.code}!`);
    }
  };

  // Toggle Coupon Active/Inactive
  const handleToggleCouponActive = (c: CustomCoupon) => {
    const updated = coupons.map((item) =>
      item.id === c.id ? { ...item, isActive: !item.isActive } : item
    );
    saveCoupons(updated);
    showToast(`Coupon ${c.code} is now ${!c.isActive ? "Active" : "Paused"}!`);
  };

  // Live Coupon Test Engine
  const handleTestCoupon = () => {
    const codeClean = testCode.trim().toUpperCase();
    const found = coupons.find((c) => c.code === codeClean);

    if (!found) {
      setTestResult({
        valid: false,
        message: `Coupon code "${codeClean}" is invalid or does not exist.`,
        discount: 0,
      });
      return;
    }

    if (!found.isActive) {
      setTestResult({
        valid: false,
        message: `Coupon code "${codeClean}" is currently paused by admin.`,
        discount: 0,
      });
      return;
    }

    if (testSubtotal < found.minOrder) {
      setTestResult({
        valid: false,
        message: `Order subtotal ₹${testSubtotal} is below minimum requirement of ₹${found.minOrder}.`,
        discount: 0,
      });
      return;
    }

    let calculated = 0;
    if (found.discountType === "percent") {
      calculated = Math.round((testSubtotal * found.discountValue) / 100);
      if (found.maxDiscount && calculated > found.maxDiscount) {
        calculated = found.maxDiscount;
      }
    } else {
      calculated = Math.min(testSubtotal, found.discountValue);
    }

    setTestResult({
      valid: true,
      message: `Coupon applied successfully! Customer saves ₹${calculated}.`,
      discount: calculated,
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#22C55E] text-[#0F1115] px-4 py-3 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">
            Promotions & Coupon Studio
          </h2>
          <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
            Customize coupon codes, configure discount vouchers, and manage seasonal campaigns.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] rounded-xl p-1 shadow-sm shrink-0">
          <button
            onClick={() => setActiveTab("coupons")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "coupons"
                ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] shadow-sm"
                : "text-[#6D756D] dark:text-[#9DA4B0] hover:text-[#292D29] dark:hover:text-white"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Coupon Codes ({coupons.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "campaigns"
                ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] shadow-sm"
                : "text-[#6D756D] dark:text-[#9DA4B0] hover:text-[#292D29] dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campaign Banners ({restaurant.promotions.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: COUPON CODES MANAGER */}
      {activeTab === "coupons" && (
        <div className="space-y-6">
          {/* Top Action Bar & Live Tester */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Create Coupon Card */}
            <div className="lg:col-span-8 bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#292D29] dark:text-white flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                    <span>Active Restaurant Coupon Codes</span>
                  </h3>
                  <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
                    Create, edit, or delete customer promo codes used at digital checkout.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddCoupon}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] shadow transition-all active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Coupon</span>
                </button>
              </div>

              {/* Coupons List Table */}
              <div className="space-y-3 pt-2">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="p-4 rounded-xl border border-[#E7E2D6] dark:border-[#2A3140] bg-[#FAF9F3] dark:bg-[#171A21] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#174D35]/40 dark:hover:border-[#D4AF37]/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-base font-extrabold text-[#174D35] dark:text-[#F9E79F] bg-white dark:bg-[#0F1115] px-2.5 py-1 rounded-lg border border-[#E7E2D6] dark:border-[#2A3140]">
                          {coupon.code}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#174D35]/10 dark:bg-[#D4AF37]/15 text-[#174D35] dark:text-[#D4AF37]">
                          {coupon.discountType === "percent"
                            ? `${coupon.discountValue}% OFF`
                            : `Flat ₹${coupon.discountValue} OFF`}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            coupon.isActive
                              ? "bg-[#22C55E]/15 text-[#22C55E]"
                              : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                          }`}
                        >
                          {coupon.isActive ? "Active" : "Paused"}
                        </span>
                      </div>
                      <p className="text-xs text-[#292D29] dark:text-[#C9CDD5]">
                        {coupon.description}
                      </p>
                      <div className="flex items-center gap-4 text-[10px] text-[#6D756D] dark:text-[#9DA4B0] pt-1">
                        <span>Min Order: ₹{coupon.minOrder}</span>
                        {coupon.maxDiscount && <span>Max Cap: ₹{coupon.maxDiscount}</span>}
                        <span>Expires: {coupon.expiryDate}</span>
                        <span>Used: {coupon.usageCount} times</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleToggleCouponActive(coupon)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                          coupon.isActive
                            ? "text-[#6D756D] hover:text-[#292D29] dark:text-gray-400 dark:hover:text-white bg-white dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140]"
                            : "bg-[#22C55E] text-white"
                        }`}
                      >
                        {coupon.isActive ? "Pause" : "Activate"}
                      </button>

                      <button
                        onClick={() => handleOpenEditCoupon(coupon)}
                        className="p-2 rounded-lg text-gray-500 hover:text-[#174D35] dark:text-gray-400 dark:hover:text-[#D4AF37] hover:bg-[#EDF2E9] dark:hover:bg-[#252C3B] transition-colors"
                        title="Edit Coupon"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteCoupon(coupon)}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Coupon Tester Card */}
            <div className="lg:col-span-4 bg-white dark:bg-[#12151C] border border-[#E7E2D6] dark:border-[#2A3140] rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
              <div className="border-b border-[#E7E2D6] dark:border-[#2A3140] pb-3">
                <h3 className="font-serif font-bold text-base text-[#292D29] dark:text-white flex items-center gap-2">
                  <Percent className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                  <span>Live Coupon Tester</span>
                </h3>
                <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">
                  Verify how any coupon code behaves with mock orders.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#6D756D] dark:text-[#9DA4B0] mb-1">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={testCode}
                    onChange={(e) => setTestCode(e.target.value.toUpperCase())}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#174D35] dark:text-white outline-none"
                    placeholder="E.g. LEGACY1995"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#6D756D] dark:text-[#9DA4B0] mb-1">
                    Mock Order Subtotal (₹)
                  </label>
                  <input
                    type="number"
                    value={testSubtotal}
                    onChange={(e) => setTestSubtotal(Number(e.target.value))}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs font-mono text-[#292D29] dark:text-white outline-none"
                  />
                </div>

                <button
                  onClick={handleTestCoupon}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] hover:brightness-110 transition-all active:scale-95"
                >
                  Test Voucher Calculation
                </button>

                {testResult && (
                  <div
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      testResult.valid
                        ? "bg-[#22C55E]/10 border-[#22C55E]/30 text-[#174D35] dark:text-[#22C55E]"
                        : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                    }`}
                  >
                    <p className="font-bold">{testResult.message}</p>
                    {testResult.valid && (
                      <p className="font-mono text-[11px]">
                        Net Payable: ₹{testSubtotal - testResult.discount} (Discount: -₹{testResult.discount})
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGN BANNERS (Original Promotions) */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setFormTitleEn("");
                setFormTitleMr("");
                setFormSubtitleEn("");
                setFormDescEn("");
                setFormBadgeText("Seasonal Special");
                setFormBannerImage("/assets/campaigns/monsoon-affairs-1.jpg");
                setFormStartDate(new Date().toISOString().split("T")[0]);
                setFormEndDate("2026-12-31");
                setFormCouponCode("");
                setIsAddingNewPromo(true);
                setEditingPromo(null);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-[#0F1115] shadow-md transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign Banner</span>
            </button>
          </div>

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
                      showToast(`Campaign ${!promo.isActive ? "Activated" : "Deactivated"}!`);
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
                      onClick={() => {
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
                        setIsAddingNewPromo(false);
                      }}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#174D35] dark:text-gray-400 dark:hover:text-white hover:bg-[#EDF2E9] dark:hover:bg-[#252C3B] transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete promotion "${promo.title.en}"?`)) {
                          await deletePromotion(promo.id);
                          showToast("Campaign deleted!");
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 hover:bg-[#EDF2E9] dark:hover:bg-[#252C3B] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT COUPON */}
      {isAddingCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-white dark:bg-[#171A21] border border-[#E7E2D6] dark:border-[#D4AF37]/50 rounded-3xl p-6 shadow-2xl transition-colors">
            <button
              onClick={() => {
                setIsAddingCoupon(false);
                setEditingCoupon(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#292D29] dark:text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#174D35] dark:text-[#D4AF37]" />
              <span>{editingCoupon ? "Edit Coupon Code" : "Create New Coupon Code"}</span>
            </h3>

            <form onSubmit={handleSaveCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Coupon Promo Code
                </label>
                <input
                  type="text"
                  required
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                  placeholder="E.g. DIWALI25, SUNNY20"
                  className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-[#174D35] dark:text-[#D4AF37] uppercase outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Customer Description / Offer Note
                </label>
                <input
                  type="text"
                  required
                  value={couponDescInput}
                  onChange={(e) => setCouponDescInput(e.target.value)}
                  placeholder="E.g. 15% off on your pure veg dinner"
                  className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Discount Type
                  </label>
                  <select
                    value={couponTypeInput}
                    onChange={(e) => setCouponTypeInput(e.target.value as "percent" | "flat")}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-xs text-[#292D29] dark:text-white outline-none"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Discount Value {couponTypeInput === "percent" ? "(%)" : "(₹)"}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={couponValueInput}
                    onChange={(e) => setCouponValueInput(Number(e.target.value))}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#292D29] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Min Order (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={couponMinOrderInput}
                    onChange={(e) => setCouponMinOrderInput(Number(e.target.value))}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#292D29] dark:text-white outline-none"
                  />
                </div>

                {couponTypeInput === "percent" && (
                  <div>
                    <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                      Max Discount Cap (₹)
                    </label>
                    <input
                      type="number"
                      value={couponMaxDiscountInput}
                      onChange={(e) => setCouponMaxDiscountInput(Number(e.target.value))}
                      className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#292D29] dark:text-white outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={couponExpiryInput}
                    onChange={(e) => setCouponExpiryInput(e.target.value)}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={couponActiveInput ? "active" : "paused"}
                    onChange={(e) => setCouponActiveInput(e.target.value === "active")}
                    className="w-full bg-[#FAF9F3] dark:bg-[#0F1115] border border-[#E7E2D6] dark:border-[#2A3140] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-xs text-[#292D29] dark:text-white outline-none"
                  >
                    <option value="active">Active & Redeemable</option>
                    <option value="paused">Paused / Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCoupon(false);
                    setEditingCoupon(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-[#0F1115] hover:brightness-110 shadow"
                >
                  {editingCoupon ? "Save Changes" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
