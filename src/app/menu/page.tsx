"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { FoodCard } from "@/components/ui/FoodCard";
import { DishModal } from "@/components/ui/DishModal";
import { FoodMoodDial } from "@/components/ui/FoodMoodDial";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuItem } from "@/types";
import {
  Search,
  Sparkles,
  Star,
  Utensils,
  X,
  CheckCircle2,
  LayoutGrid,
  ListFilter,
  Layers,
  ChevronRight,
} from "lucide-react";

function MenuContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { restaurant, t } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "bestseller" | "chef" | "signature" | "budget">("all");
  const [viewMode, setViewMode] = useState<"compact" | "grid">("grid");
  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  // Sync state if URL query param changes
  React.useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter items based on category, search, and badges
  const filteredDishes = useMemo(() => {
    return restaurant.items.filter((dish) => {
      // Category match
      if (selectedCategory !== "all") {
        const cat = restaurant.categories.find((c) => c.slug === selectedCategory);
        if (cat && dish.categoryId !== cat.id) return false;
      }

      // Quick filter tags
      if (filterType === "bestseller" && !dish.isBestseller) return false;
      if (filterType === "chef" && !dish.isChefRecommendation) return false;
      if (filterType === "signature" && !dish.isSignature) return false;
      if (filterType === "budget" && dish.price > 120) return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameEn = dish.name.en.toLowerCase();
        const nameMr = dish.name.mr.toLowerCase();
        const nameHi = (dish.name.hi || "").toLowerCase();
        const descEn = dish.shortDescription.en.toLowerCase();
        const descMr = dish.shortDescription.mr.toLowerCase();
        const descHi = (dish.shortDescription.hi || "").toLowerCase();
        const ingredients = (dish.ingredients || []).join(" ").toLowerCase();

        return (
          nameEn.includes(query) ||
          nameMr.includes(query) ||
          nameHi.includes(query) ||
          descEn.includes(query) ||
          descMr.includes(query) ||
          descHi.includes(query) ||
          ingredients.includes(query)
        );
      }

      return true;
    });
  }, [restaurant.items, restaurant.categories, selectedCategory, filterType, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-black pb-16 md:pb-0 transition-colors">
      <Header />

      <main className="flex-1 pb-24">
        {/* Menu Hero Header (Mobile Compact) */}
        <section className="bg-gradient-to-b from-[#F5F0E6] to-[#FAF9F3] dark:from-black dark:to-black border-b border-[#E7E2D6] dark:border-[#1c2028] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D35]/10 dark:bg-[#D4AF37]/10 border border-[#174D35]/30 dark:border-[#D4AF37]/30 text-[11px] font-bold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider">
              <Utensils className="w-3 h-3" />
              <span>{t({ en: "Pure Veg Digital Menu", mr: "शुद्ध शाकाहारी डिजिटल मेनू" })}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#292D29] dark:text-white tracking-tight">
              {t({ en: "Explore Our Full Menu", mr: "हॉटेल सनी पॉईंटचा संपूर्ण मेनू" })}
            </h1>

            <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#9DA4B0] max-w-xl mx-auto">
              {t({
                en: "Authentic 1995 legacy, South Indian specialties, sizzlers & Global Bites. Tap any dish for details.",
                mr: "१९९५ पासूनचा वारसा, खास डोसे, सूप्स आणि आंतरराष्ट्रीय पदार्थ. सविस्तर माहितीसाठी पदार्थावर क्लिक करा.",
              })}
            </p>

            {/* Fast Search Input Bar */}
            <div className="max-w-md mx-auto pt-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D756D] dark:text-[#9DA4B0]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t({
                    en: "Search dosa, paneer, noodles, soup...",
                    mr: "डोसा, पनीर, नूडल्स, सूप शोधा...",
                  })}
                  className="w-full bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl pl-10 pr-9 py-2.5 text-xs text-[#292D29] dark:text-white placeholder-[#9DA4B0] outline-none shadow-sm transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-[#292D29] dark:hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Mobile-First Category Navigation Bar */}
        <div className="sticky top-20 z-30 bg-[#FAF9F3]/95 dark:bg-black/95 backdrop-blur-md border-b border-[#E7E2D6] dark:border-[#1c2028] shadow-sm py-2 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-2">
            {/* Category Pills (Full-Width Touch Horizontal Scroll) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full py-0.5 overscroll-x-contain">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                  selectedCategory === "all"
                    ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black shadow-md font-bold"
                    : "bg-white text-[#292D29] hover:bg-[#F5F0E6] border border-[#E7E2D6] dark:bg-black dark:text-[#C9CDD5] dark:hover:bg-[#111111] dark:border-[#1c2028]"
                }`}
              >
                {t({ en: "All", mr: "सर्व" })} ({restaurant.items.length})
              </button>

              {restaurant.categories.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                const count = restaurant.items.filter((i) => i.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 active:scale-95 ${
                      isSelected
                        ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black shadow-md font-bold"
                        : "bg-white text-[#292D29] hover:bg-[#F5F0E6] border border-[#E7E2D6] dark:bg-black dark:text-[#C9CDD5] dark:hover:bg-[#111111] dark:border-[#1c2028]"
                    }`}
                  >
                    <span>{t(cat.name)}</span>
                    <span className="opacity-70 text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Filter Badges & View Switcher Row */}
            <div className="flex items-center justify-between gap-2 w-full pt-1.5 border-t border-[#E7E2D6]/60 dark:border-[#1c2028]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  onClick={() => setFilterType(filterType === "signature" ? "all" : "signature")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold whitespace-nowrap border transition-all flex items-center gap-1 shrink-0 ${
                    filterType === "signature"
                      ? "bg-[#174D35]/15 border-[#174D35] text-[#174D35] dark:bg-[#D4AF37]/20 dark:border-[#D4AF37] dark:text-[#D4AF37]"
                      : "bg-white border-[#E7E2D6] text-[#6D756D] hover:text-[#292D29] dark:bg-black dark:border-[#1c2028] dark:text-[#9DA4B0] dark:hover:text-white"
                  }`}
                >
                  <Sparkles className="w-2.5 h-2.5 text-[#174D35] dark:text-[#D4AF37]" />
                  <span>Signature</span>
                </button>

                <button
                  onClick={() => setFilterType(filterType === "bestseller" ? "all" : "bestseller")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold whitespace-nowrap border transition-all flex items-center gap-1 shrink-0 ${
                    filterType === "bestseller"
                      ? "bg-[#E07A2B]/20 border-[#E07A2B] text-[#E07A2B]"
                      : "bg-white border-[#E7E2D6] text-[#6D756D] hover:text-[#292D29] dark:bg-black dark:border-[#1c2028] dark:text-[#9DA4B0] dark:hover:text-white"
                  }`}
                >
                  <Star className="w-2.5 h-2.5 text-[#E07A2B]" />
                  <span>Bestseller</span>
                </button>

                <button
                  onClick={() => setFilterType(filterType === "budget" ? "all" : "budget")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold whitespace-nowrap border transition-all flex items-center gap-1 shrink-0 ${
                    filterType === "budget"
                      ? "bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]"
                      : "bg-white border-[#E7E2D6] text-[#6D756D] hover:text-[#292D29] dark:bg-black dark:border-[#1c2028] dark:text-[#9DA4B0] dark:hover:text-white"
                  }`}
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-[#22C55E]" />
                  <span>Under ₹120</span>
                </button>
              </div>

              {/* View Switcher & Result Count */}
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-[11px] font-medium text-[#6D756D] dark:text-[#9DA4B0] hidden sm:inline">
                  {filteredDishes.length} {filteredDishes.length === 1 ? t({ en: "dish", mr: "पदार्थ" }) : t({ en: "dishes", mr: "पदार्थ" })}
                </span>
                <div className="flex items-center gap-0.5 bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-0.5 rounded-lg shrink-0 shadow-sm">
                  <button
                    onClick={() => setViewMode("compact")}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      viewMode === "compact"
                        ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black shadow"
                        : "text-gray-400 hover:text-[#292D29] dark:hover:text-white"
                    }`}
                    title="Compact List View"
                    aria-label="Switch to compact list view"
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black shadow"
                        : "text-gray-400 hover:text-[#292D29] dark:hover:text-white"
                    }`}
                    title="Photo Grid View"
                    aria-label="Switch to photo grid view"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dish Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Active Filter Info & Count */}
          <div className="flex items-center justify-between pb-4 text-xs text-[#6D756D] dark:text-[#9DA4B0]">
            <div>
              <span>Showing </span>
              <strong className="text-[#292D29] dark:text-white">{filteredDishes.length}</strong>
              <span> dishes</span>
              {searchQuery && (
                <span>
                  {" "}
                  for &ldquo;<strong className="text-[#174D35] dark:text-[#D4AF37]">{searchQuery}</strong>&rdquo;
                </span>
              )}
            </div>

            {(selectedCategory !== "all" || filterType !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setFilterType("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[#174D35] dark:text-[#D4AF37] hover:underline font-semibold"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredDishes.length === 0 ? (
            <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-2xl p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
              <Utensils className="w-12 h-12 text-[#9DA4B0] mx-auto opacity-40" />
              <h3 className="font-serif text-lg font-bold text-[#292D29] dark:text-white">No dishes found</h3>
              <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
                We couldn&apos;t find any dishes matching your search. Try searching for something else or reset your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setFilterType("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black shadow-sm"
              >
                Show All Dishes
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "compact"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              }
            >
              {filteredDishes.map((dish) => (
                <FoodCard
                  key={dish.id}
                  dish={dish}
                  variant={viewMode}
                  onSelectDish={(d) => setActiveDish(d)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Mobile Category Jump FAB */}
      <div className="fixed bottom-20 right-4 z-30 md:hidden">
        <button
          onClick={() => setCategoryDrawerOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#174D35] text-white dark:bg-gradient-to-r dark:from-[#D4AF37] dark:to-[#B89324] dark:text-black font-bold text-xs shadow-xl border border-white/20 dark:border-black/40 active:scale-95 transition-transform"
          aria-label="Browse Categories"
        >
          <Layers className="w-4 h-4" />
          <span>{t({ en: "Categories", mr: "कॅटेगरी" })}</span>
          <span className="bg-white/20 dark:bg-black text-white dark:text-[#D4AF37] text-[10px] px-1.5 py-0.5 rounded-full">
            {restaurant.categories.length}
          </span>
        </button>
      </div>

      {/* Mobile Category Quick Jump Bottom Sheet */}
      {categoryDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setCategoryDrawerOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 bg-[#FAF9F3] dark:bg-black border-t border-[#E7E2D6] dark:border-[#D4AF37]/50 rounded-t-3xl p-5 shadow-2xl z-10 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-400/40 dark:bg-white/30 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D6] dark:border-[#1c2028]">
              <h3 className="font-serif font-bold text-base text-[#292D29] dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                <span>{t({ en: "Select Food Category", mr: "कॅटेगरी निवडा" })}</span>
              </h3>
              <button
                onClick={() => setCategoryDrawerOpen(false)}
                className="p-1 rounded-lg text-gray-500 hover:text-[#292D29] dark:text-gray-400 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-[#E7E2D6] dark:divide-[#1c2028] mt-2">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setCategoryDrawerOpen(false);
                }}
                className={`w-full py-3 flex items-center justify-between text-left text-xs font-semibold ${
                  selectedCategory === "all" ? "text-[#174D35] dark:text-[#D4AF37]" : "text-[#292D29] dark:text-white"
                }`}
              >
                <span>{t({ en: "All Categories", mr: "सर्व पदार्थ" })}</span>
                <span className="text-[#6D756D] dark:text-[#9DA4B0] text-[11px] font-normal">
                  {restaurant.items.length} items
                </span>
              </button>

              {restaurant.categories.map((cat) => {
                const count = restaurant.items.filter((i) => i.categoryId === cat.id).length;
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setCategoryDrawerOpen(false);
                    }}
                    className={`w-full py-3 flex items-center justify-between text-left text-xs font-semibold transition-colors ${
                      isSelected ? "text-[#174D35] dark:text-[#D4AF37]" : "text-[#292D29] dark:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-[#F5F0E6] dark:bg-black shrink-0 border border-[#E7E2D6] dark:border-[#1c2028]">
                        <Image
                          src={cat.image}
                          alt={cat.name.en}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p>{t(cat.name)}</p>
                        <p className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] font-normal">
                          {count} {t({ en: "dishes", mr: "पदार्थ" })}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6D756D] dark:text-[#9DA4B0]" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Dish Details Modal */}
      <DishModal dish={activeDish} onClose={() => setActiveDish(null)} />

      {/* Futuristic Food Mood Dial Decider */}
      <FoodMoodDial />

      <Footer />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white p-12 text-center">
          Loading Menu...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
