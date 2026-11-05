"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import {
  UtensilsCrossed,
  Layers,
  CheckCircle2,
  XCircle,
  Star,
  Sparkles,
  QrCode,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { restaurant, toggleAvailability, toggleBestseller, updateDish } = useRestaurant();
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState<number>(0);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const totalDishes = restaurant.items.length;
  const availableDishes = restaurant.items.filter((i) => i.isAvailable).length;
  const unavailableDishes = totalDishes - availableDishes;
  const bestsellersCount = restaurant.items.filter((i) => i.isBestseller).length;
  const categoriesCount = restaurant.categories.length;

  const avgRating = (
    restaurant.feedback.reduce((acc, f) => acc + f.overallRating, 0) /
    (restaurant.feedback.length || 1)
  ).toFixed(1);

  const startEditPrice = (id: string, currentPrice: number) => {
    setEditingPriceId(id);
    setPriceInput(currentPrice);
  };

  const handleSavePrice = async (id: string) => {
    if (priceInput > 0) {
      await updateDish(id, { price: priceInput });
      setEditingPriceId(null);
      setSaveFeedback(`Price updated to ₹${priceInput}! Check customer menu.`);
      setTimeout(() => setSaveFeedback(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Alert for Demo */}
      {saveFeedback && (
        <div className="bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E] px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveFeedback}</span>
          </div>
          <Link href="/menu" target="_blank" className="underline flex items-center gap-1">
            <span>View on Customer Menu</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">Operations Dashboard</h2>
          <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] mt-0.5">
            Real-time management for Hotel Sunny Point • Changes sync instantly to customer devices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/menu"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black shadow-md transition-colors"
          >
            + Add New Dish
          </Link>
          <Link
            href="/admin/qr"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-black hover:bg-[#F5F0E6] dark:hover:bg-[#111111] text-[#292D29] dark:text-white border border-[#E7E2D6] dark:border-[#1c2028] flex items-center gap-1.5 transition-colors shadow-sm dark:shadow-none"
          >
            <QrCode className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37]" />
            <span>Print QR Card</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-5 rounded-2xl space-y-2 shadow-sm dark:shadow-none transition-colors">
          <div className="flex items-center justify-between text-xs text-[#6D756D] dark:text-[#9DA4B0]">
            <span>Total Menu Items</span>
            <UtensilsCrossed className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-[#292D29] dark:text-white">{totalDishes}</span>
            <span className="text-[11px] text-[#22C55E] font-medium">100% Pure Veg</span>
          </div>
        </div>

        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-5 rounded-2xl space-y-2 shadow-sm dark:shadow-none transition-colors">
          <div className="flex items-center justify-between text-xs text-[#6D756D] dark:text-[#9DA4B0]">
            <span>Live Availability</span>
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-[#22C55E]">{availableDishes}</span>
            <span className="text-[11px] text-red-500 dark:text-red-400">
              {unavailableDishes > 0 ? `${unavailableDishes} Sold Out` : "0 Sold Out"}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-5 rounded-2xl space-y-2 shadow-sm dark:shadow-none transition-colors">
          <div className="flex items-center justify-between text-xs text-[#6D756D] dark:text-[#9DA4B0]">
            <span>Active Categories</span>
            <Layers className="w-4 h-4 text-[#E07A2B]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-[#292D29] dark:text-white">{categoriesCount}</span>
            <span className="text-[11px] text-[#174D35] dark:text-[#D4AF37] font-medium">7 Food Divisions</span>
          </div>
        </div>

        <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-5 rounded-2xl space-y-2 shadow-sm dark:shadow-none transition-colors">
          <div className="flex items-center justify-between text-xs text-[#6D756D] dark:text-[#9DA4B0]">
            <span>Guest Rating</span>
            <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-[#292D29] dark:text-white">{avgRating}★</span>
            <span className="text-[11px] text-[#6D756D] dark:text-gray-400">{restaurant.feedback.length} Reviews</span>
          </div>
        </div>
      </div>

      {/* Quick Dish Live Controls Table */}
      <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-2xl overflow-hidden shadow-sm dark:shadow-xl space-y-4 p-5 sm:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E2D6] dark:border-[#1c2028]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#292D29] dark:text-white">Dishes Quick Control & Price Editor</h3>
            <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
              Edit price inline or toggle availability. Instantly updates the customer menu.
            </p>
          </div>
          <Link
            href="/admin/menu"
            className="text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>Open Advanced Menu Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead>
              <tr className="border-b border-[#E7E2D6] dark:border-[#1c2028] text-[#6D756D] dark:text-[#9DA4B0] uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-semibold">Dish</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Price (₹)</th>
                <th className="pb-3 font-semibold text-center">Availability</th>
                <th className="pb-3 font-semibold text-center">Bestseller</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E2D6] dark:divide-[#1c2028]">
              {restaurant.items.slice(0, 8).map((dish) => {
                const cat = restaurant.categories.find((c) => c.id === dish.categoryId);
                const isEditingThisPrice = editingPriceId === dish.id;

                return (
                  <tr key={dish.id} className="hover:bg-[#FAF9F3] dark:hover:bg-[#111111] transition-colors">
                    {/* Dish Name + Thumbnail */}
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0">
                          <Image
                            src={dish.image}
                            alt={dish.name.en}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#292D29] dark:text-white text-xs">{dish.name.en}</p>
                          <p className="text-[10px] text-[#174D35] dark:text-[#D4AF37]">{dish.name.mr}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 text-[#6D756D] dark:text-gray-300">
                      {cat?.name.en || "Unassigned"}
                    </td>

                    {/* Price with Inline Edit */}
                    <td className="py-3">
                      {isEditingThisPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#174D35] dark:text-[#D4AF37] font-bold">₹</span>
                          <input
                            type="number"
                            value={priceInput}
                            onChange={(e) => setPriceInput(Number(e.target.value))}
                            className="w-16 bg-[#FAF9F3] dark:bg-black border border-[#174D35] dark:border-[#D4AF37] rounded px-1.5 py-0.5 text-xs text-[#292D29] dark:text-white"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSavePrice(dish.id)}
                            className="px-2 py-0.5 bg-[#22C55E] text-white rounded text-[10px] font-bold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPriceId(null)}
                            className="text-[#6D756D] dark:text-gray-400 text-[10px] px-1"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditPrice(dish.id, dish.price)}
                          className="font-bold text-[#174D35] dark:text-[#F9E79F] hover:underline flex items-center gap-1"
                          title="Click to edit price"
                        >
                          <span>₹{dish.price}</span>
                          <span className="text-[10px] text-gray-400 font-normal">✎</span>
                        </button>
                      )}
                    </td>

                    {/* Availability Toggle */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => toggleAvailability(dish.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          dish.isAvailable
                            ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                            : "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700/40"
                        }`}
                      >
                        {dish.isAvailable ? "Available" : "Sold Out"}
                      </button>
                    </td>

                    {/* Bestseller Toggle */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => toggleBestseller(dish.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                          dish.isBestseller
                            ? "bg-[#E07A2B]/20 text-[#E07A2B] border border-[#E07A2B]/40"
                            : "text-[#6D756D] hover:text-[#292D29] dark:text-gray-500 dark:hover:text-gray-300"
                        }`}
                      >
                        {dish.isBestseller ? "★ Bestseller" : "Standard"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 text-right">
                      <Link
                        href={`/dish/${dish.slug}`}
                        target="_blank"
                        className="text-[#6D756D] hover:text-[#174D35] dark:text-gray-400 dark:hover:text-[#D4AF37] text-[11px] inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
