"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { Restaurant, MenuItem, MenuCategory, Promotion, CustomerFeedback, RestaurantSettings, LanguageCode, LocalizedString } from "@/types";
import { restaurantRepo } from "@/data/restaurant-repository";
import { initialSunnyPointRestaurant } from "@/data/initial-data";

interface RestaurantContextType {
  restaurant: Restaurant;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (loc: LocalizedString | undefined) => string;
  isLoading: boolean;
  // Dish actions
  addDish: (item: Omit<MenuItem, "id" | "updatedAt">) => Promise<MenuItem>;
  updateDish: (id: string, updates: Partial<MenuItem>) => Promise<MenuItem>;
  deleteDish: (id: string) => Promise<void>;
  toggleAvailability: (id: string) => Promise<boolean>;
  toggleBestseller: (id: string) => Promise<boolean>;
  // Category actions
  addCategory: (cat: Omit<MenuCategory, "id">) => Promise<MenuCategory>;
  updateCategory: (id: string, updates: Partial<MenuCategory>) => Promise<MenuCategory>;
  deleteCategory: (id: string) => Promise<void>;
  // Promotion actions
  addPromotion: (promo: Omit<Promotion, "id">) => Promise<Promotion>;
  updatePromotion: (id: string, updates: Partial<Promotion>) => Promise<Promotion>;
  togglePromotion: (id: string) => Promise<boolean>;
  deletePromotion: (id: string) => Promise<void>;
  // Feedback
  submitFeedback: (fb: Omit<CustomerFeedback, "id" | "createdAt" | "status">) => Promise<CustomerFeedback>;
  updateFeedbackStatus: (id: string, status: CustomerFeedback["status"]) => Promise<void>;
  // Settings
  updateSettings: (settings: Partial<RestaurantSettings>) => Promise<RestaurantSettings>;
  resetToDefaults: () => Promise<void>;
}

const RestaurantContext = createContext<RestaurantContextType | null>(null);

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [restaurant, setRestaurant] = useState<Restaurant>(initialSunnyPointRestaurant);
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [isLoading, setIsLoading] = useState(true);
  const [, startTransition] = useTransition();

  const refreshData = () => {
    const updated = restaurantRepo.getRestaurantSync();
    startTransition(() => {
      setRestaurant({ ...updated });
    });
  };

  useEffect(() => {
    // Initial fetch from repository
    refreshData();
    setIsLoading(false);

    // Read stored language preference if exists
    try {
      const savedLang = localStorage.getItem("sunny_point_lang");
      if (savedLang === "mr" || savedLang === "en" || savedLang === "hi") {
        setLanguageState(savedLang as LanguageCode);
      }
    } catch {}

    // Listen for custom data change events (cross-component and cross-tab)
    const handleDataChange = () => {
      refreshData();
    };

    window.addEventListener("sunny_point_data_changed", handleDataChange);
    window.addEventListener("storage", handleDataChange);

    return () => {
      window.removeEventListener("sunny_point_data_changed", handleDataChange);
      window.removeEventListener("storage", handleDataChange);
    };
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("sunny_point_lang", lang);
    } catch {}
  };

  const t = (loc: LocalizedString | undefined): string => {
    if (!loc) return "";
    return loc[language] || loc.en || "";
  };

  // Actions wrapped with instant state refresh
  const addDish = async (item: Omit<MenuItem, "id" | "updatedAt">) => {
    const res = await restaurantRepo.addMenuItem(item);
    refreshData();
    return res;
  };

  const updateDish = async (id: string, updates: Partial<MenuItem>) => {
    const res = await restaurantRepo.updateMenuItem(id, updates);
    refreshData();
    return res;
  };

  const deleteDish = async (id: string) => {
    await restaurantRepo.deleteMenuItem(id);
    refreshData();
  };

  const toggleAvailability = async (id: string) => {
    const res = await restaurantRepo.toggleItemAvailability(id);
    refreshData();
    return res;
  };

  const toggleBestseller = async (id: string) => {
    const res = await restaurantRepo.toggleItemBestseller(id);
    refreshData();
    return res;
  };

  const addCategory = async (cat: Omit<MenuCategory, "id">) => {
    const res = await restaurantRepo.addCategory(cat);
    refreshData();
    return res;
  };

  const updateCategory = async (id: string, updates: Partial<MenuCategory>) => {
    const res = await restaurantRepo.updateCategory(id, updates);
    refreshData();
    return res;
  };

  const deleteCategory = async (id: string) => {
    await restaurantRepo.deleteCategory(id);
    refreshData();
  };

  const addPromotion = async (promo: Omit<Promotion, "id">) => {
    const res = await restaurantRepo.addPromotion(promo);
    refreshData();
    return res;
  };

  const updatePromotion = async (id: string, updates: Partial<Promotion>) => {
    const res = await restaurantRepo.updatePromotion(id, updates);
    refreshData();
    return res;
  };

  const togglePromotion = async (id: string) => {
    const res = await restaurantRepo.togglePromotionActive(id);
    refreshData();
    return res;
  };

  const deletePromotion = async (id: string) => {
    await restaurantRepo.deletePromotion(id);
    refreshData();
  };

  const submitFeedback = async (fb: Omit<CustomerFeedback, "id" | "createdAt" | "status">) => {
    const res = await restaurantRepo.addFeedback(fb);
    refreshData();
    return res;
  };

  const updateFeedbackStatus = async (id: string, status: CustomerFeedback["status"]) => {
    await restaurantRepo.updateFeedbackStatus(id, status);
    refreshData();
  };

  const updateSettings = async (settings: Partial<RestaurantSettings>) => {
    const res = await restaurantRepo.updateSettings(settings);
    refreshData();
    return res;
  };

  const resetToDefaults = async () => {
    await restaurantRepo.resetToDefaults();
    refreshData();
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        language,
        setLanguage,
        t,
        isLoading,
        addDish,
        updateDish,
        deleteDish,
        toggleAvailability,
        toggleBestseller,
        addCategory,
        updateCategory,
        deleteCategory,
        addPromotion,
        updatePromotion,
        togglePromotion,
        deletePromotion,
        submitFeedback,
        updateFeedbackStatus,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
}
