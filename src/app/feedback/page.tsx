"use client";

import React, { useState } from "react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { useRestaurant } from "@/context/RestaurantContext";
import { Star, MessageSquareQuote, CheckCircle2, Send, ExternalLink } from "lucide-react";

export default function FeedbackPage() {
  const { restaurant, t, submitFeedback } = useRestaurant();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [foodQualityRating, setFoodQualityRating] = useState(5);
  const [tasteRating, setTasteRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [overallRating, setOverallRating] = useState(5);
  const [comment, setComment] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submittedOffline, setSubmittedOffline] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
    setIsSubmitting(true);
    await submitFeedback({
      restaurantId: restaurant.id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim() || undefined,
      tableNumber: tableNumber.trim() || undefined,
      foodQualityRating,
      tasteRating,
      serviceRating,
      cleanlinessRating,
      overallRating,
      comment: comment.trim() || undefined,
    });
    setIsSubmitting(false);
    setSubmittedOffline(isOffline);
    setSubmitted(true);
  };

  const StarRatingInput = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-[#E7E2D6] dark:border-[#1c2028] gap-2">
      <span className="text-xs font-medium text-[#292D29] dark:text-[#C9CDD5]">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => onChange(star)}
            className="p-1 text-gray-300 dark:text-gray-600 hover:text-[#D4AF37] focus:outline-none hover:scale-125 active:scale-90 transition-all duration-150"
            aria-label={`${star} star rating`}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                star <= value ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] dark:bg-black text-[#292D29] dark:text-[#F5F5F5] pb-16 md:pb-0 transition-colors duration-200">
      <Header />

      <main className="flex-1 pb-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-[#F5F0E6] to-[#FAF9F3] dark:from-black dark:to-black border-b border-[#E7E2D6] dark:border-[#1c2028] py-14 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D35]/10 border border-[#174D35]/20 text-[#174D35] dark:bg-[#D4AF37]/10 dark:border-[#D4AF37]/30 dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>{t({ en: "Guest Experience", mr: "ग्राहक अनुभव" })}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292D29] dark:text-white tracking-tight">
              {t({ en: "Your Feedback Matters", mr: "आपला बहुमूल्य अभिप्राय" })}
            </h1>

            <p className="text-xs sm:text-sm text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed">
              {t({
                en: "Help us preserve our legacy and continue perfecting our flavors. Your reviews go directly to the restaurant management.",
                mr: "आमच्या पदार्थांची गुणवत्ता आणि सेवेचा दर्जा आणखी उत्तम करण्यासाठी कृपया आपले मत नोंदवा.",
              })}
            </p>
          </div>
        </section>

        {/* Feedback Form Card */}
        <section className="max-w-xl mx-auto px-4 sm:px-6 pt-12">
          {submitted ? (
            <div className="bg-white dark:bg-black border border-[#22C55E]/40 rounded-3xl p-8 sm:p-10 shadow-sm dark:shadow-2xl text-center space-y-6 transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E] flex items-center justify-center mx-auto text-[#22C55E]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">
                  Thank You, {customerName}!
                </h3>
                <p className="text-xs text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed max-w-md mx-auto">
                  {submittedOffline
                    ? "Your feedback has been securely preserved on your device offline. It is safely recorded and will automatically synchronize with restaurant administration."
                    : "Your feedback has been received and saved into our administration management records. We truly value your patronage at Hotel Sunny Point."}
                </p>
              </div>

              {/* Optional Google Review Redirect */}
              <div className="pt-4 border-t border-[#E7E2D6] dark:border-[#1c2028] space-y-3">
                <p className="text-xs text-[#6D756D] dark:text-[#C9CDD5]">
                  Would you like to share your review on Google as well?
                </p>
                <a
                  href={restaurant.settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#F5F0E6] dark:bg-black hover:bg-[#EAE4D7] dark:hover:bg-[#111111] text-[#174D35] dark:text-[#D4AF37] border border-[#E7E2D6] dark:border-[#1c2028] transition-colors"
                >
                  <span>Review Hotel Sunny Point on Google</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setCustomerName("");
                  setComment("");
                }}
                className="text-xs text-[#6D756D] dark:text-[#9DA4B0] hover:text-[#174D35] dark:hover:text-white underline transition-colors"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-2xl space-y-6 transition-colors"
            >
              {/* Customer Contact Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white placeholder-[#9DA4B0] dark:placeholder-[#6B7280] outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98234XXXXX"
                      className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white placeholder-[#9DA4B0] dark:placeholder-[#6B7280] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1.5">
                      Table / Section (Optional)
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 4 / AC Hall"
                      className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white placeholder-[#9DA4B0] dark:placeholder-[#6B7280] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 5 Rating Criteria */}
              <div className="pt-2">
                <h4 className="text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-2">
                  Rate Your Experience (1 - 5 Stars)
                </h4>
                <div className="bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-2xl p-4 space-y-1 transition-colors">
                  <StarRatingInput
                    label="Food Quality"
                    value={foodQualityRating}
                    onChange={setFoodQualityRating}
                  />
                  <StarRatingInput
                    label="Taste & Authenticity"
                    value={tasteRating}
                    onChange={setTasteRating}
                  />
                  <StarRatingInput
                    label="Staff Hospitality & Service"
                    value={serviceRating}
                    onChange={setServiceRating}
                  />
                  <StarRatingInput
                    label="Cleanliness & Ambience"
                    value={cleanlinessRating}
                    onChange={setCleanlinessRating}
                  />
                  <StarRatingInput
                    label="Overall Experience"
                    value={overallRating}
                    onChange={setOverallRating}
                  />
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-xs font-semibold text-[#174D35] dark:text-[#D4AF37] uppercase tracking-wider mb-1.5">
                  Your Comments or Suggestions
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you loved or how we can improve your next visit..."
                  className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-[#292D29] dark:text-white placeholder-[#9DA4B0] dark:placeholder-[#6B7280] outline-none leading-relaxed transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Submitting..." : "Submit Confidential Feedback"}</span>
              </button>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
