"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, X, RotateCcw, ArrowRight, Heart } from "lucide-react";
import { triggerMarigoldConfetti } from "./MarigoldConfetti";

interface DishRecommendation {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  moodTag: string;
}

const MOOD_DISHES: Record<string, DishRecommendation[]> = {
  crispy: [
    {
      id: "mysore-masala-dosa",
      name: "Special Mysore Masala Dosa",
      category: "South Indian Special",
      price: 130,
      description: "Crisped in pure golden ghee with red garlic chutney layer and spiced potato mash.",
      imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      moodTag: "Golden & Ultra-Crisp",
    },
    {
      id: "paper-plain-roast",
      name: "Crispy Paper Ghee Roast",
      category: "South Indian Special",
      price: 110,
      description: "Wafer-thin golden conical roast dripping in aromatic clarified butter.",
      imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      moodTag: "Light & Crunchy",
    },
  ],
  spicy: [
    {
      id: "paneer-sizzler",
      name: "Sunny Point Special Paneer Sizzler",
      category: "Global Bites",
      price: 240,
      description: "Charred cottage cheese cubes sizzling on smoking iron with pepper garlic glaze.",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      moodTag: "Fiery & Sizzling",
    },
    {
      id: "veg-schezwan-fried-rice",
      name: "Wok Tossed Schezwan Fried Rice",
      category: "Global Bites",
      price: 170,
      description: "Aromatic basmati rice tossed with fresh crisp veggies in pungent home-style Schezwan chilli oil.",
      imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      moodTag: "Zesty & Piquant",
    },
  ],
  comfort: [
    {
      id: "medu-vada-sambar",
      name: "Ghee Medu Vada Sambar (2 Pcs)",
      category: "South Indian Classic",
      price: 75,
      description: "Golden crispy lentil doughnuts soaked in steaming hot drumstick sambar and fresh coconut chutney.",
      imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      moodTag: "Warm & Soulful",
    },
    {
      id: "dal-khichdi-tadka",
      name: "Special Desi Ghee Dal Khichdi",
      category: "Homestyle Comfort",
      price: 150,
      description: "Slow-simmered rice and yellow lentils tempered with cumin, garlic, and hot desi ghee.",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      moodTag: "Homely & Gentle",
    },
  ],
  sweet: [
    {
      id: "filter-coffee",
      name: "Degree South Indian Filter Coffee",
      category: "Signature Beverage",
      price: 40,
      description: "Frothy, strong chicory decoction poured from height into brass dabarah and tumbler.",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      moodTag: "Aromatic & Uplifting",
    },
  ],
};

const MOODS = [
  { id: "crispy", label: "Crispy & Golden", emoji: "🥞", color: "from-amber-500 to-yellow-600" },
  { id: "spicy", label: "Spicy & Fiery", emoji: "🌶️", color: "from-red-500 to-orange-600" },
  { id: "comfort", label: "Warm Comfort", emoji: "🍲", color: "from-emerald-500 to-teal-700" },
  { id: "sweet", label: "Sweet & Fresh", emoji: "☕", color: "from-amber-600 to-rose-700" },
];

export function FoodMoodDial() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>("crispy");
  const [isSpinning, setIsSpinning] = useState(false);
  const [recommendation, setRecommendation] = useState<DishRecommendation | null>(null);

  const spinDial = () => {
    setIsSpinning(true);
    setRecommendation(null);

    // Mobile haptic vibration pattern
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([20, 40, 20, 50, 30]);
    }

    setTimeout(() => {
      const moodKeys = Object.keys(MOOD_DISHES);
      const chosenMood = selectedMood || moodKeys[Math.floor(Math.random() * moodKeys.length)];
      const candidateList = MOOD_DISHES[chosenMood] || MOOD_DISHES.crispy;
      const chosenDish = candidateList[Math.floor(Math.random() * candidateList.length)];

      setRecommendation(chosenDish);
      setIsSpinning(false);
      triggerMarigoldConfetti();
    }, 900);
  };

  return (
    <>
      {/* Floating Futuristic Decider Dial Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          if (!recommendation) {
            spinDial();
          }
        }}
        className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-30 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#174D35] dark:bg-[#D4AF37] text-white dark:text-black shadow-[0_4px_25px_rgba(23,77,53,0.35)] dark:shadow-[0_4px_25px_rgba(212,175,55,0.4)] border border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Open Food Mood Decider Dial"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white dark:bg-black opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white dark:bg-black"></span>
        </span>
        <Compass className="w-5 h-5 animate-[spin_8s_linear_infinite]" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          Can&apos;t Decide? Spin Food Mood
        </span>
        <span className="text-xs font-bold tracking-wide sm:hidden">
          Food Mood
        </span>
      </button>

      {/* Interactive Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#FAF9F3] dark:bg-black border border-[#D4AF37]/50 p-6 shadow-2xl text-[#292D29] dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D6] dark:border-[#1c2028]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#174D35]/10 dark:bg-[#D4AF37]/20 flex items-center justify-center text-[#174D35] dark:text-[#D4AF37]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#292D29] dark:text-white">
                    What Should I Eat Today?
                  </h3>
                  <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0]">
                    Sunny Point Culinary Mood Decider
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mood Category Pills */}
            <div className="my-5">
              <label className="text-[11px] uppercase font-bold tracking-wider text-[#6D756D] dark:text-[#9DA4B0] mb-2.5 block">
                Select Your Craving:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {MOODS.map((mood) => {
                  const isSelected = selectedMood === mood.id;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => {
                        setSelectedMood(mood.id);
                      }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? "border-[#174D35] dark:border-[#D4AF37] bg-[#174D35]/10 dark:bg-[#D4AF37]/15 text-[#174D35] dark:text-[#D4AF37] shadow-sm scale-[1.02]"
                          : "border-[#E7E2D6] dark:border-[#1c2028] hover:border-gray-400 bg-white dark:bg-black text-[#292D29] dark:text-[#C9CDD5]"
                      }`}
                    >
                      <span className="text-base">{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action: Spin Button */}
            <div className="flex justify-center my-4">
              <button
                onClick={spinDial}
                disabled={isSpinning}
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#174D35] via-[#225E43] to-[#174D35] dark:from-[#D4AF37] dark:via-[#F9E79F] dark:to-[#D4AF37] text-white dark:text-black font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
              >
                <RotateCcw className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
                <span>{isSpinning ? "Consulting Master Chefs..." : "Spin My Food Mood"}</span>
              </button>
            </div>

            {/* Recommendation Result Card */}
            {recommendation && !isSpinning && (
              <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-black border border-[#174D35]/30 dark:border-[#D4AF37]/40 shadow-inner animate-in zoom-in-95 duration-300">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#D4AF37]/30">
                    <Image
                      src={recommendation.imageUrl}
                      alt={recommendation.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#174D35] dark:text-[#D4AF37] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {recommendation.moodTag}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#292D29] dark:text-white truncate">
                      {recommendation.name}
                    </h4>
                    <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] line-clamp-2 mt-0.5 leading-relaxed">
                      {recommendation.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-sm text-[#174D35] dark:text-[#D4AF37]">
                        ₹{recommendation.price}
                      </span>
                      <Link
                        href={`/menu`}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#174D35] dark:text-[#D4AF37] hover:underline"
                      >
                        <span>View on Menu</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-4 text-center">
              <p className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                Hand-curated pure vegetarian recipes perfected since 1995
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
