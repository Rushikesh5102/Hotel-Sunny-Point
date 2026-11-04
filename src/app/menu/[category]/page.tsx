"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { FoodCard } from "@/components/ui/FoodCard";
import { DishModal } from "@/components/ui/DishModal";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuItem } from "@/types";
import { ArrowLeft, Utensils } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;

  const { restaurant, t } = useRestaurant();
  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);

  const category = restaurant.categories.find((c) => c.slug === categorySlug);
  const dishes = category
    ? restaurant.items.filter((item) => item.categoryId === category.id)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1115] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 pb-24">
        {/* Category Header */}
        <section className="bg-gradient-to-b from-[#171A21] to-[#0F1115] border-b border-[#2A3140]/60 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#F9E79F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Full Menu</span>
            </Link>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
                {t(category?.badge) || "Category Special"}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {category ? t(category.name) : "Category"}
              </h1>
              <p className="text-sm text-[#9DA4B0] max-w-2xl leading-relaxed">
                {category ? t(category.description) : ""}
              </p>
            </div>
          </div>
        </section>

        {/* Dish List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex items-center justify-between pb-6 text-xs text-[#9DA4B0]">
            <span>Showing {dishes.length} authentic dishes</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-[#22C55E] flex items-center justify-center p-0.5 rounded-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
              </div>
              <span>100% Pure Veg</span>
            </div>
          </div>

          {dishes.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Utensils className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No dishes found in this category.</p>
              <Link href="/menu" className="text-xs text-[#D4AF37] underline mt-2 inline-block">
                Return to Full Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dishes.map((dish) => (
                <FoodCard
                  key={dish.id}
                  dish={dish}
                  onSelectDish={(d) => setActiveDish(d)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <DishModal dish={activeDish} onClose={() => setActiveDish(null)} />
      <Footer />
    </div>
  );
}
