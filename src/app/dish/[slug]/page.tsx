"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { useRestaurant } from "@/context/RestaurantContext";
import { ArrowLeft, Clock, Sparkles, CheckCircle2, Flame, Heart, Share2, Award, Phone } from "lucide-react";

export default function DishDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const { restaurant, t } = useRestaurant();
  const dish = restaurant.items.find((item) => item.slug === slug);
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!dish) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-black text-[#292D29] dark:text-white transition-colors">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <h2 className="font-serif text-3xl font-bold text-[#292D29] dark:text-white">Dish Not Found</h2>
          <p className="text-sm text-[#6D756D] dark:text-[#9DA4B0] max-w-md">
            The culinary item you requested could not be located in our current menu. It may have been updated or rotated seasonally.
          </p>
          <Link
            href="/menu"
            className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black shadow-md transition-all duration-300"
          >
            Browse Full Menu
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const category = restaurant.categories.find((c) => c.id === dish.categoryId);
  const relatedDishes = restaurant.items
    .filter((i) => i.categoryId === dish.categoryId && i.id !== dish.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-black pb-16 md:pb-0 transition-colors">
      <Header />

      <main className="flex-1 pb-24">
        {/* Back Link */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174D35] hover:text-[#225E43] dark:text-[#D4AF37] dark:hover:text-[#F9E79F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Digital Menu</span>
          </Link>
        </div>

        {/* Dish Showcase Area */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Authentic Photography */}
              <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto min-h-[350px] lg:min-h-[500px] bg-[#F5F0E6] dark:bg-black">
                <Image
                  src={dish.image}
                  alt={t(dish.name)}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-black via-transparent to-transparent lg:hidden" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/90 dark:bg-black/90 border border-[#22C55E] flex items-center justify-center rounded p-1 shadow-md">
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                  </div>
                  {dish.isSignature && (
                    <span className="flex items-center gap-1 bg-[#174D35] text-white dark:bg-[#D4AF37] dark:text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>Signature</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Culinary Details */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider">
                      {category ? t(category.name) : "Speciality"}
                    </span>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 text-xs text-[#174D35] hover:text-[#225E43] dark:text-[#D4AF37] dark:hover:text-[#F9E79F] transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copied ? "Link Copied!" : "Share"}</span>
                    </button>
                  </div>

                  <div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292D29] dark:text-white mb-1">
                      {t(dish.name)}
                    </h1>
                    <p className="text-sm text-[#174D35] dark:text-[#D4AF37] font-semibold">{dish.name.mr}</p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-3xl font-bold text-[#174D35] dark:text-[#F9E79F]">₹{dish.price}</span>
                    {dish.priceStatus === "verified" ? (
                      <span className="text-xs text-[#22C55E] flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Price</span>
                      </span>
                    ) : (
                      <span className="text-xs text-[#6D756D] bg-[#F5F0E6] dark:text-[#9DA4B0] dark:bg-black px-2 py-0.5 rounded border border-[#E7E2D6] dark:border-[#1c2028]">
                        Provisional Demo Rate
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#292D29] dark:text-[#C9CDD5] leading-relaxed">
                    {t(dish.fullDescription) || t(dish.shortDescription)}
                  </p>

                  {/* Attributes */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {dish.servingSize && (
                      <div className="bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-3 rounded-xl flex items-center gap-2.5">
                        <Heart className="w-4 h-4 text-[#E07A2B]" />
                        <div>
                          <p className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] uppercase font-bold">Portion</p>
                          <p className="text-xs font-semibold text-[#292D29] dark:text-white">{dish.servingSize}</p>
                        </div>
                      </div>
                    )}

                    {dish.preparationTimeMinutes && (
                      <div className="bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] p-3 rounded-xl flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#174D35] dark:text-[#D4AF37]" />
                        <div>
                          <p className="text-[10px] text-[#6D756D] dark:text-[#9DA4B0] uppercase font-bold">Prep Time</p>
                          <p className="text-xs font-semibold text-[#292D29] dark:text-white">{dish.preparationTimeMinutes} minutes</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ingredients */}
                  {dish.ingredients && dish.ingredients.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-2">
                        Authentic Ingredients
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {dish.ingredients.map((ing, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] text-[#292D29] dark:text-[#E2E8F0] font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Call to Order/Dine In */}
                <div className="pt-6 border-t border-[#E7E2D6] dark:border-[#1c2028] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#6D756D] dark:text-[#9DA4B0]">
                    <p className="font-semibold text-[#292D29] dark:text-white">Pure Veg Kitchen</p>
                    <p>Prepared fresh on order at Hotel Sunny Point</p>
                  </div>

                  <a
                    href={`tel:${restaurant.settings.primaryPhone}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123C29] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black uppercase tracking-wider transition-colors shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Restaurant</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Dishes from same category */}
        {relatedDishes.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#292D29] dark:text-white mb-6">
              More from {category ? t(category.name) : "This Category"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedDishes.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/dish/${rel.slug}`}
                  className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] hover:border-[#174D35] dark:hover:border-[#D4AF37]/50 rounded-2xl p-4 flex items-center gap-4 group shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F5F0E6] dark:bg-black shrink-0">
                    <Image
                      src={rel.image}
                      alt={t(rel.name)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-[#292D29] dark:text-white text-sm truncate group-hover:text-primary dark:group-hover:text-[#D4AF37] transition-colors">
                      {t(rel.name)}
                    </h4>
                    <p className="text-xs text-[#174D35] dark:text-[#F9E79F] font-bold mt-0.5">₹{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
