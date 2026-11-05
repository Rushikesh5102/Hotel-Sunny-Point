"use client";

import React from "react";
import { useRestaurant } from "@/context/RestaurantContext";
import { CustomerFeedback } from "@/types";
import { Star, MessageSquareQuote, CheckCircle2, Clock, Archive, Sparkles } from "lucide-react";

export default function AdminFeedbackPage() {
  const { restaurant, updateFeedbackStatus } = useRestaurant();

  const totalReviews = restaurant.feedback.length;

  const calculateAvg = (key: keyof CustomerFeedback) => {
    if (totalReviews === 0) return "5.0";
    const sum = restaurant.feedback.reduce((acc, f) => acc + (Number(f[key]) || 0), 0);
    return (sum / totalReviews).toFixed(1);
  };

  const avgFoodQuality = calculateAvg("foodQualityRating");
  const avgTaste = calculateAvg("tasteRating");
  const avgService = calculateAvg("serviceRating");
  const avgCleanliness = calculateAvg("cleanlinessRating");
  const avgOverall = calculateAvg("overallRating");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">Guest Feedback Management</h2>
        <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] mt-0.5">
          Reviews and ratings submitted by guests visiting Hotel Sunny Point.
        </p>
      </div>

      {/* 5 Rating Criteria Summaries */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-4 rounded-2xl text-center space-y-1 shadow-sm dark:shadow-none transition-colors">
          <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] uppercase font-semibold">Food Quality</span>
          <div className="text-2xl font-bold text-[#174D35] dark:text-[#F9E79F]">{avgFoodQuality}★</div>
          <p className="text-[10px] text-[#22C55E]">Fresh & Authentic</p>
        </div>

        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-4 rounded-2xl text-center space-y-1 shadow-sm dark:shadow-none transition-colors">
          <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] uppercase font-semibold">Taste & Flavor</span>
          <div className="text-2xl font-bold text-[#174D35] dark:text-[#D4AF37]">{avgTaste}★</div>
          <p className="text-[10px] text-[#22C55E]">Legacy Recipes</p>
        </div>

        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-4 rounded-2xl text-center space-y-1 shadow-sm dark:shadow-none transition-colors">
          <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] uppercase font-semibold">Service</span>
          <div className="text-2xl font-bold text-[#E07A2B]">{avgService}★</div>
          <p className="text-[10px] text-[#6D756D] dark:text-[#C9CDD5]">Warm Hospitality</p>
        </div>

        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-4 rounded-2xl text-center space-y-1 shadow-sm dark:shadow-none transition-colors">
          <span className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] uppercase font-semibold">Cleanliness</span>
          <div className="text-2xl font-bold text-[#22C55E]">{avgCleanliness}★</div>
          <p className="text-[10px] text-[#22C55E]">Pure Veg Standards</p>
        </div>

        <div className="bg-white dark:bg-black border border-[#174D35]/30 dark:border-[#D4AF37]/40 p-4 rounded-2xl text-center space-y-1 col-span-2 sm:col-span-1 shadow-sm dark:shadow-none transition-colors">
          <span className="text-[10px] text-[#174D35] dark:text-[#D4AF37] uppercase font-bold">Overall Rating</span>
          <div className="text-2xl font-bold text-[#292D29] dark:text-white">{avgOverall}★</div>
          <p className="text-[10px] text-[#174D35] dark:text-[#D4AF37]">{totalReviews} Verified Guests</p>
        </div>
      </div>

      {/* Feedback Items List */}
      <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-2xl overflow-hidden shadow-sm dark:shadow-xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-[#E7E2D6] dark:border-[#1c2028] flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-[#292D29] dark:text-white">Recent Guest Reviews</h3>
          <span className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">{totalReviews} Total Submissions</span>
        </div>

        <div className="divide-y divide-[#E7E2D6] dark:divide-[#1c2028]">
          {restaurant.feedback.map((fb) => (
            <div key={fb.id} className="p-5 space-y-3 hover:bg-[#FAF9F3] dark:hover:bg-[#111111] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#174D35]/10 border border-[#174D35]/30 text-[#174D35] dark:bg-[#D4AF37]/20 dark:border-[#D4AF37] dark:text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    {fb.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#292D29] dark:text-white text-xs sm:text-sm">{fb.customerName}</h4>
                    <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">
                      {fb.tableNumber || "Walk-in Guest"} {fb.customerPhone ? `• ${fb.customerPhone}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: fb.overallRating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      fb.status === "new"
                        ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        : fb.status === "reviewed"
                        ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {fb.status}
                  </span>
                </div>
              </div>

              {fb.comment && (
                <p className="text-xs text-[#292D29] dark:text-[#C9CDD5] italic bg-[#FAF9F3] dark:bg-black p-3 rounded-xl border border-[#E7E2D6] dark:border-[#1c2028]">
                  &ldquo;{fb.comment}&rdquo;
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between pt-1 text-[11px] text-[#6D756D] dark:text-[#9DA4B0] gap-2">
                <span>Submitted: {new Date(fb.createdAt).toLocaleDateString()}</span>

                <div className="flex items-center gap-2">
                  {fb.status !== "reviewed" && (
                    <button
                      onClick={() => updateFeedbackStatus(fb.id, "reviewed")}
                      className="px-2.5 py-1 rounded bg-[#EDF2E9] dark:bg-black text-[#174D35] dark:text-[#22C55E] border border-transparent dark:border-[#1c2028] hover:bg-[#E2EAE0] dark:hover:bg-[#111111] transition-colors font-medium"
                    >
                      Mark Reviewed
                    </button>
                  )}
                  {fb.status !== "archived" && (
                    <button
                      onClick={() => updateFeedbackStatus(fb.id, "archived")}
                      className="px-2.5 py-1 rounded bg-[#F5F0E6] dark:bg-black text-[#6D756D] dark:text-gray-400 hover:text-[#292D29] dark:hover:text-white border border-transparent dark:border-[#1c2028] hover:bg-[#EAE4D7] dark:hover:bg-[#111111] transition-colors"
                    >
                      Archive
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
