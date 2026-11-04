import { Restaurant, MenuItem, MenuCategory, Promotion, CustomerFeedback, RestaurantSettings } from "@/types";
import { initialSunnyPointRestaurant } from "./initial-data";

const STORAGE_KEY = "sunny_point_restaurant_data_v1";

/**
 * Repository interface isolating frontend components from the underlying data source.
 * In this Phase, it synchronizes with localStorage for real-time reactivity and persistence.
 * When Supabase is connected in Phase 4, only this module is updated.
 */
class RestaurantRepository {
  private data: Restaurant = initialSunnyPointRestaurant;
  private isBrowser = typeof window !== "undefined";

  constructor() {
    this.init();
  }

  private init() {
    if (!this.isBrowser) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id === "sunny-point") {
          this.data = parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read from localStorage:", e);
    }
  }

  private persist() {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      // Dispatch storage event so all tabs / pages reactively update
      window.dispatchEvent(new Event("sunny_point_data_changed"));
    } catch (e) {
      console.error("Failed to persist to localStorage:", e);
    }
  }

  public getRestaurantSync(): Restaurant {
    this.init();
    return this.data;
  }

  public async getRestaurant(): Promise<Restaurant> {
    this.init();
    return { ...this.data };
  }

  public async getCategories(): Promise<MenuCategory[]> {
    this.init();
    return [...this.data.categories].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public async getMenuItems(categoryId?: string): Promise<MenuItem[]> {
    this.init();
    let items = [...this.data.items];
    if (categoryId) {
      items = items.filter((item) => item.categoryId === categoryId);
    }
    return items.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public async getMenuItemBySlug(slug: string): Promise<MenuItem | undefined> {
    this.init();
    return this.data.items.find((item) => item.slug === slug);
  }

  public async addMenuItem(item: Omit<MenuItem, "id" | "updatedAt">): Promise<MenuItem> {
    this.init();
    const newItem: MenuItem = {
      ...item,
      id: "dish-" + Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.items.push(newItem);
    this.persist();
    return newItem;
  }

  public async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    this.init();
    const index = this.data.items.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Menu item ${id} not found`);

    const updated = {
      ...this.data.items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.data.items[index] = updated;
    this.persist();
    return updated;
  }

  public async deleteMenuItem(id: string): Promise<void> {
    this.init();
    this.data.items = this.data.items.filter((item) => item.id !== id);
    this.persist();
  }

  public async toggleItemAvailability(id: string): Promise<boolean> {
    this.init();
    const item = this.data.items.find((i) => i.id === id);
    if (!item) throw new Error("Item not found");
    item.isAvailable = !item.isAvailable;
    item.updatedAt = new Date().toISOString();
    this.persist();
    return item.isAvailable;
  }

  public async toggleItemBestseller(id: string): Promise<boolean> {
    this.init();
    const item = this.data.items.find((i) => i.id === id);
    if (!item) throw new Error("Item not found");
    item.isBestseller = !item.isBestseller;
    item.updatedAt = new Date().toISOString();
    this.persist();
    return item.isBestseller;
  }

  public async addCategory(cat: Omit<MenuCategory, "id">): Promise<MenuCategory> {
    this.init();
    const newCat: MenuCategory = {
      ...cat,
      id: "cat-" + Date.now().toString(),
    };
    this.data.categories.push(newCat);
    this.persist();
    return newCat;
  }

  public async updateCategory(id: string, updates: Partial<MenuCategory>): Promise<MenuCategory> {
    this.init();
    const index = this.data.categories.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Category not found");
    const updated = { ...this.data.categories[index], ...updates };
    this.data.categories[index] = updated;
    this.persist();
    return updated;
  }

  public async deleteCategory(id: string): Promise<void> {
    this.init();
    // Reassign items in this category or check
    this.data.categories = this.data.categories.filter((c) => c.id !== id);
    this.persist();
  }

  public async addPromotion(promo: Omit<Promotion, "id">): Promise<Promotion> {
    this.init();
    const newPromo: Promotion = {
      ...promo,
      id: "promo-" + Date.now().toString(),
    };
    this.data.promotions.push(newPromo);
    this.persist();
    return newPromo;
  }

  public async updatePromotion(id: string, updates: Partial<Promotion>): Promise<Promotion> {
    this.init();
    const index = this.data.promotions.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Promotion not found");
    const updated = { ...this.data.promotions[index], ...updates };
    this.data.promotions[index] = updated;
    this.persist();
    return updated;
  }

  public async togglePromotionActive(id: string): Promise<boolean> {
    this.init();
    const promo = this.data.promotions.find((p) => p.id === id);
    if (!promo) throw new Error("Promotion not found");
    promo.isActive = !promo.isActive;
    this.persist();
    return promo.isActive;
  }

  public async deletePromotion(id: string): Promise<void> {
    this.init();
    this.data.promotions = this.data.promotions.filter((p) => p.id !== id);
    this.persist();
  }

  public async addFeedback(fb: Omit<CustomerFeedback, "id" | "createdAt" | "status">): Promise<CustomerFeedback> {
    this.init();
    const newFb: CustomerFeedback = {
      ...fb,
      id: "fb-" + Date.now().toString(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    this.data.feedback.unshift(newFb);
    this.persist();
    return newFb;
  }

  public async updateFeedbackStatus(id: string, status: CustomerFeedback["status"]): Promise<void> {
    this.init();
    const fb = this.data.feedback.find((f) => f.id === id);
    if (!fb) throw new Error("Feedback not found");
    fb.status = status;
    this.persist();
  }

  public async updateSettings(updates: Partial<RestaurantSettings>): Promise<RestaurantSettings> {
    this.init();
    this.data.settings = {
      ...this.data.settings,
      ...updates,
    };
    this.persist();
    return this.data.settings;
  }

  public async resetToDefaults(): Promise<void> {
    this.data = JSON.parse(JSON.stringify(initialSunnyPointRestaurant));
    this.persist();
  }
}

export const restaurantRepo = new RestaurantRepository();
