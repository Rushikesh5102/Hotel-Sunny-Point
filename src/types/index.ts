export type DietaryType = "pure_veg" | "vegan" | "jain_available";

export type PriceStatus = "verified" | "provisional_sample";

export type LanguageCode = "en" | "mr" | "hi";

export interface LocalizedString {
  en: string;
  mr: string;
  hi?: string;
  [key: string]: string | undefined;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription?: LocalizedString;
  price: number;
  priceStatus: PriceStatus;
  priceNote?: string;
  image: string;
  dietary: DietaryType;
  isAvailable: boolean;
  isBestseller: boolean;
  isChefRecommendation: boolean;
  isSignature: boolean;
  spicinessLevel?: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Fiery
  servingSize?: string;
  preparationTimeMinutes?: number;
  ingredients?: string[];
  allergens?: string[];
  pairingSuggestions?: string[];
  displayOrder: number;
  createdYear?: number; // e.g. 1995 for Masala Dosa
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  restaurantId: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  displayOrder: number;
  isActive: boolean;
  badge?: LocalizedString;
}

export interface Promotion {
  id: string;
  restaurantId: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  badgeText: string;
  bannerImage: string;
  linkedDishIds: string[];
  isActive: boolean;
  startDate: string;
  endDate: string;
  couponCode?: string;
  discountDescription?: string;
}

export interface CustomerFeedback {
  id: string;
  restaurantId: string;
  customerName: string;
  customerPhone?: string;
  tableNumber?: string;
  foodQualityRating: number; // 1 to 5
  tasteRating: number;
  serviceRating: number;
  cleanlinessRating: number;
  overallRating: number;
  comment?: string;
  status: "new" | "reviewed" | "archived";
  createdAt: string;
}

export interface RestaurantSettings {
  id: string;
  restaurantId: string;
  name: LocalizedString;
  tagline: LocalizedString;
  heritageText: LocalizedString;
  foundingYear: number;
  southIndianOriginYear: number;
  dietaryNote: LocalizedString;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  address: LocalizedString;
  city: string;
  state: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  instagramUrl: string;
  operatingHours: {
    days: LocalizedString;
    timing: string;
  };
  fssaiNumber: string;
  fssaiDisplayNote: string;
  primaryColor: string;
  accentColor: string;
  logoUrl: string;
  facadeImageUrl: string;
  currencySymbol: string;
}

export interface Restaurant {
  id: string;
  slug: string;
  settings: RestaurantSettings;
  categories: MenuCategory[];
  items: MenuItem[];
  promotions: Promotion[];
  feedback: CustomerFeedback[];
}
