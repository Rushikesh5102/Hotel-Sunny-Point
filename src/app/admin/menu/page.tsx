"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuItem } from "@/types";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  Sparkles,
  ExternalLink,
  X,
  Save,
} from "lucide-react";

export default function AdminMenuPage() {
  const { restaurant, addDish, updateDish, deleteDish, toggleAvailability, toggleBestseller } = useRestaurant();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for Add/Edit
  const [formNameEn, setFormNameEn] = useState("");
  const [formNameMr, setFormNameMr] = useState("");
  const [formCategoryId, setFormCategoryId] = useState(restaurant.categories[0]?.id || "");
  const [formPrice, setFormPrice] = useState(100);
  const [formImage, setFormImage] = useState("/assets/dishes/masala-dosa.jpg");
  const [formShortDescEn, setFormShortDescEn] = useState("");
  const [formShortDescMr, setFormShortDescMr] = useState("");
  const [formPrepTime, setFormPrepTime] = useState(12);
  const [formServingSize, setFormServingSize] = useState("1 Portion");
  const [formIsBestseller, setFormIsBestseller] = useState(false);
  const [formIsSignature, setFormIsSignature] = useState(false);
  const [formIsChef, setFormIsChef] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setFormNameEn("");
    setFormNameMr("");
    setFormCategoryId(restaurant.categories[0]?.id || "");
    setFormPrice(120);
    setFormImage("/assets/dishes/masala-dosa.jpg");
    setFormShortDescEn("");
    setFormShortDescMr("");
    setFormPrepTime(12);
    setFormServingSize("1 Portion");
    setFormIsBestseller(false);
    setFormIsSignature(false);
    setFormIsChef(false);
    setIsAddingNew(true);
    setEditingDish(null);
  };

  const handleOpenEdit = (dish: MenuItem) => {
    setEditingDish(dish);
    setFormNameEn(dish.name.en);
    setFormNameMr(dish.name.mr);
    setFormCategoryId(dish.categoryId);
    setFormPrice(dish.price);
    setFormImage(dish.image);
    setFormShortDescEn(dish.shortDescription.en);
    setFormShortDescMr(dish.shortDescription.mr);
    setFormPrepTime(dish.preparationTimeMinutes || 12);
    setFormServingSize(dish.servingSize || "1 Portion");
    setFormIsBestseller(dish.isBestseller);
    setFormIsSignature(dish.isSignature);
    setFormIsChef(dish.isChefRecommendation);
    setIsAddingNew(false);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingNew) {
      const slug = formNameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      await addDish({
        restaurantId: restaurant.id,
        categoryId: formCategoryId,
        slug,
        name: { en: formNameEn, mr: formNameMr || formNameEn },
        shortDescription: { en: formShortDescEn, mr: formShortDescMr || formShortDescEn },
        price: Number(formPrice),
        priceStatus: "provisional_sample",
        priceNote: "Added via Admin Management.",
        image: formImage,
        dietary: "pure_veg",
        isAvailable: true,
        isBestseller: formIsBestseller,
        isChefRecommendation: formIsChef,
        isSignature: formIsSignature,
        servingSize: formServingSize,
        preparationTimeMinutes: Number(formPrepTime),
        displayOrder: restaurant.items.length + 1,
      });
      showToast(`Added "${formNameEn}" to the menu!`);
    } else if (editingDish) {
      await updateDish(editingDish.id, {
        categoryId: formCategoryId,
        name: { en: formNameEn, mr: formNameMr || formNameEn },
        shortDescription: { en: formShortDescEn, mr: formShortDescMr || formShortDescEn },
        price: Number(formPrice),
        image: formImage,
        servingSize: formServingSize,
        preparationTimeMinutes: Number(formPrepTime),
        isBestseller: formIsBestseller,
        isChefRecommendation: formIsChef,
        isSignature: formIsSignature,
      });
      showToast(`Updated "${formNameEn}"!`);
    }

    setIsAddingNew(false);
    setEditingDish(null);
  };

  const handleDelete = async (dish: MenuItem) => {
    if (confirm(`Are you sure you want to delete "${dish.name.en}" from the menu?`)) {
      await deleteDish(dish.id);
      showToast(`Deleted "${dish.name.en}"!`);
    }
  };

  const filteredDishes = useMemo(() => {
    return restaurant.items.filter((dish) => {
      if (selectedCategoryFilter !== "all" && dish.categoryId !== selectedCategoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          dish.name.en.toLowerCase().includes(q) ||
          dish.name.mr.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [restaurant.items, selectedCategoryFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#22C55E] text-black px-4 py-3 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">Menu Management</h2>
          <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
            Add, update prices, change photography, and toggle availability across all {restaurant.items.length} dishes.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black shadow-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-none transition-colors">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#6D756D] dark:text-[#9DA4B0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish name..."
            className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl pl-9 pr-3 py-2 text-xs text-[#292D29] dark:text-white placeholder-[#9DA4B0] dark:placeholder-[#6B7280] outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategoryFilter === "all"
                ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black"
                : "bg-[#FAF9F3] dark:bg-black text-[#6D756D] dark:text-[#9DA4B0] hover:text-[#292D29] dark:hover:text-white border border-[#E7E2D6] dark:border-[#1c2028]"
            }`}
          >
            All Categories ({restaurant.items.length})
          </button>
          {restaurant.categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategoryFilter(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategoryFilter === c.id
                  ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black"
                  : "bg-[#FAF9F3] dark:bg-black text-[#6D756D] dark:text-[#9DA4B0] hover:text-[#292D29] dark:hover:text-white border border-[#E7E2D6] dark:border-[#1c2028]"
              }`}
            >
              {c.name.en}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Table */}
      <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-2xl overflow-hidden shadow-sm dark:shadow-xl transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead>
              <tr className="border-b border-[#E7E2D6] dark:border-[#1c2028] text-[#6D756D] dark:text-[#9DA4B0] uppercase text-[10px] tracking-wider bg-[#F5F0E6] dark:bg-[#111111]">
                <th className="py-3.5 px-4 font-semibold">Dish</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Price (₹)</th>
                <th className="py-3.5 px-4 font-semibold text-center">Availability</th>
                <th className="py-3.5 px-4 font-semibold text-center">Bestseller</th>
                <th className="py-3.5 px-4 font-semibold text-center">Chef Pick</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E2D6] dark:divide-[#1c2028]">
              {filteredDishes.map((dish) => {
                const cat = restaurant.categories.find((c) => c.id === dish.categoryId);
                return (
                  <tr key={dish.id} className="hover:bg-[#FAF9F3] dark:hover:bg-[#111111] transition-colors">
                    {/* Dish Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-[#E7E2D6] dark:border-[#1c2028]">
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
                          <p className="text-[10px] text-[#6D756D] dark:text-[#6B7280] line-clamp-1">{dish.shortDescription.en}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-[#6D756D] dark:text-gray-300">
                      <span className="bg-[#FAF9F3] dark:bg-black px-2 py-1 rounded text-[11px] border border-[#E7E2D6] dark:border-[#1c2028]">
                        {cat?.name.en || "Unassigned"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-base text-[#174D35] dark:text-[#F9E79F]">₹{dish.price}</span>
                    </td>

                    {/* Availability Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          toggleAvailability(dish.id);
                          showToast(`${dish.name.en} marked ${!dish.isAvailable ? "Available" : "Sold Out"}!`);
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          dish.isAvailable
                            ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                            : "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700/40"
                        }`}
                      >
                        {dish.isAvailable ? "Available" : "Sold Out"}
                      </button>
                    </td>

                    {/* Bestseller Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          toggleBestseller(dish.id);
                          showToast(`${dish.name.en} bestseller status toggled!`);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          dish.isBestseller
                            ? "bg-[#E07A2B]/20 text-[#E07A2B]"
                            : "text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
                        }`}
                        title="Toggle Bestseller Badge"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Chef Pick */}
                    <td className="py-3 px-4 text-center">
                      {dish.isChefRecommendation ? (
                        <span className="text-[10px] font-semibold text-[#174D35] bg-[#174D35]/10 border border-[#174D35]/20 dark:text-[#D4AF37] dark:bg-[#D4AF37]/15 dark:border-[#D4AF37]/30 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600 text-[10px]">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(dish)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#174D35] dark:text-gray-400 dark:hover:text-white hover:bg-[#EDF2E9] dark:hover:bg-[#111111] transition-colors"
                          title="Edit Dish Details & Price"
                        >
                          <Edit2 className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                        </button>

                        <button
                          onClick={() => handleDelete(dish)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 hover:bg-[#EDF2E9] dark:hover:bg-[#111111] transition-colors"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dish Modal */}
      {(isAddingNew || editingDish) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 transition-colors">
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingDish(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#292D29] dark:text-white mb-6">
              {isAddingNew ? "Add New Dish to Menu" : `Edit "${editingDish?.name.en}"`}
            </h3>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-1">
                    Dish Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-1">
                    Dish Name (मराठी)
                  </label>
                  <input
                    type="text"
                    value={formNameMr}
                    onChange={(e) => setFormNameMr(e.target.value)}
                    className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategoryId}
                    onChange={(e) => setFormCategoryId(e.target.value)}
                    className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  >
                    {restaurant.categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Image URL / Asset Path
                </label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white font-mono text-[11px] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Short Description (English) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formShortDescEn}
                  onChange={(e) => setFormShortDescEn(e.target.value)}
                  className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-xl p-3 text-xs text-[#292D29] dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Prep Time (Minutes)
                  </label>
                  <input
                    type="number"
                    value={formPrepTime}
                    onChange={(e) => setFormPrepTime(Number(e.target.value))}
                    className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1">
                    Serving Size
                  </label>
                  <input
                    type="text"
                    value={formServingSize}
                    onChange={(e) => setFormServingSize(e.target.value)}
                    className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-xl px-3 py-2 text-xs text-[#292D29] dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-[#292D29] dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsBestseller}
                    onChange={(e) => setFormIsBestseller(e.target.checked)}
                    className="rounded text-[#174D35] dark:text-[#D4AF37]"
                  />
                  <span>Bestseller</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#292D29] dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsChef}
                    onChange={(e) => setFormIsChef(e.target.checked)}
                    className="rounded text-[#174D35] dark:text-[#D4AF37]"
                  />
                  <span>Chef Recommendation</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#292D29] dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsSignature}
                    onChange={(e) => setFormIsSignature(e.target.checked)}
                    className="rounded text-[#174D35] dark:text-[#D4AF37]"
                  />
                  <span>Signature Dish</span>
                </label>
              </div>

              {/* Save CTA */}
              <div className="pt-4 border-t border-[#E7E2D6] dark:border-[#1c2028] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingDish(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-[#6D756D] hover:text-[#292D29] dark:text-gray-400 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black transition-colors shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isAddingNew ? "Add Dish to Live Menu" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
