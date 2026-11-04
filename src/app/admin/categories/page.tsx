"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuCategory } from "@/types";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, CheckCircle2, Layers, X, Save } from "lucide-react";

export default function AdminCategoriesPage() {
  const { restaurant, addCategory, updateCategory, deleteCategory } = useRestaurant();
  const [editingCat, setEditingCat] = useState<MenuCategory | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formNameEn, setFormNameEn] = useState("");
  const [formNameMr, setFormNameMr] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formDescMr, setFormDescMr] = useState("");
  const [formImage, setFormImage] = useState("/assets/dishes/masala-dosa.jpg");
  const [formBadgeEn, setFormBadgeEn] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setFormNameEn("");
    setFormNameMr("");
    setFormDescEn("");
    setFormDescMr("");
    setFormImage("/assets/dishes/masala-dosa.jpg");
    setFormBadgeEn("");
    setIsAddingNew(true);
    setEditingCat(null);
  };

  const handleOpenEdit = (cat: MenuCategory) => {
    setEditingCat(cat);
    setFormNameEn(cat.name.en);
    setFormNameMr(cat.name.mr);
    setFormDescEn(cat.description.en);
    setFormDescMr(cat.description.mr);
    setFormImage(cat.image);
    setFormBadgeEn(cat.badge?.en || "");
    setIsAddingNew(false);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingNew) {
      const slug = formNameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      await addCategory({
        restaurantId: restaurant.id,
        slug,
        name: { en: formNameEn, mr: formNameMr || formNameEn },
        description: { en: formDescEn, mr: formDescMr || formDescEn },
        image: formImage,
        displayOrder: restaurant.categories.length + 1,
        isActive: true,
        badge: formBadgeEn ? { en: formBadgeEn, mr: formBadgeEn } : undefined,
      });
      showToast(`Added category "${formNameEn}"!`);
    } else if (editingCat) {
      await updateCategory(editingCat.id, {
        name: { en: formNameEn, mr: formNameMr || formNameEn },
        description: { en: formDescEn, mr: formDescMr || formDescEn },
        image: formImage,
        badge: formBadgeEn ? { en: formBadgeEn, mr: formBadgeEn } : undefined,
      });
      showToast(`Updated category "${formNameEn}"!`);
    }

    setIsAddingNew(false);
    setEditingCat(null);
  };

  const handleDelete = async (cat: MenuCategory) => {
    const dishCount = restaurant.items.filter((i) => i.categoryId === cat.id).length;
    if (dishCount > 0) {
      alert(`Cannot delete category "${cat.name.en}" because it contains ${dishCount} menu items. Please reassign or delete the dishes first.`);
      return;
    }

    if (confirm(`Are you sure you want to delete category "${cat.name.en}"?`)) {
      await deleteCategory(cat.id);
      showToast(`Deleted category "${cat.name.en}"!`);
    }
  };

  const handleMoveOrder = async (cat: MenuCategory, direction: "up" | "down") => {
    const currentOrder = cat.displayOrder;
    const targetOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;
    const swapCat = restaurant.categories.find((c) => c.displayOrder === targetOrder);

    if (swapCat) {
      await updateCategory(cat.id, { displayOrder: targetOrder });
      await updateCategory(swapCat.id, { displayOrder: currentOrder });
      showToast("Category order updated!");
    }
  };

  const sortedCategories = [...restaurant.categories].sort((a, b) => a.displayOrder - b.displayOrder);

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
          <h2 className="font-serif text-2xl font-bold text-white">Category Management</h2>
          <p className="text-xs text-[#9DA4B0]">
            Organize the {restaurant.categories.length} food divisions of Hotel Sunny Point.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#B89324] text-[#0F1115] shadow-lg transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid/Table */}
      <div className="bg-[#12151C] border border-[#2A3140] rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-[#2A3140]/60">
          {sortedCategories.map((cat, idx) => {
            const count = restaurant.items.filter((i) => i.categoryId === cat.id).length;

            return (
              <div
                key={cat.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#171A21] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-[#2A3140]">
                    <Image
                      src={cat.image}
                      alt={cat.name.en}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-white text-base">
                        {cat.name.en}
                      </span>
                      <span className="text-xs text-[#D4AF37] font-medium">({cat.name.mr})</span>
                      {cat.badge && (
                        <span className="text-[10px] bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                          {cat.badge.en}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#9DA4B0] max-w-lg line-clamp-1">{cat.description.en}</p>
                    <span className="inline-block text-[11px] text-[#22C55E] font-medium">
                      {count} Dishes assigned
                    </span>
                  </div>
                </div>

                {/* Controls: Reorder & Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveOrder(cat, "up")}
                    className="p-1.5 rounded-lg bg-[#0F1115] text-gray-400 hover:text-white disabled:opacity-30 border border-[#2A3140]"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    disabled={idx === sortedCategories.length - 1}
                    onClick={() => handleMoveOrder(cat, "down")}
                    className="p-1.5 rounded-lg bg-[#0F1115] text-gray-400 hover:text-white disabled:opacity-30 border border-[#2A3140]"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#252C3B] transition-colors ml-2"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4 text-[#D4AF37]" />
                  </button>

                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-[#252C3B] transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Add / Edit Category */}
      {(isAddingNew || editingCat) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#171A21] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingCat(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-white mb-6">
              {isAddingNew ? "Add New Category" : `Edit "${editingCat?.name.en}"`}
            </h3>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Category Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Category Name (मराठी)
                  </label>
                  <input
                    type="text"
                    value={formNameMr}
                    onChange={(e) => setFormNameMr(e.target.value)}
                    className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Optional Badge Text (e.g. Signature, Under ₹120)
                </label>
                <input
                  type="text"
                  value={formBadgeEn}
                  onChange={(e) => setFormBadgeEn(e.target.value)}
                  className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl px-3 py-2 text-xs text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescEn}
                  onChange={(e) => setFormDescEn(e.target.value)}
                  className="w-full bg-[#0F1115] border border-[#2A3140] rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="pt-4 border-t border-[#2A3140] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingCat(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#B89324] text-[#0F1115] transition-colors shadow-lg"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isAddingNew ? "Create Category" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
