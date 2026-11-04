"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRestaurant } from "@/context/RestaurantContext";
import { ShieldCheck, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { restaurant } = useRestaurant();
  const [email, setEmail] = useState("admin@hotelsunnypoint.com");
  const [password, setPassword] = useState("SunnyPoint1965!");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#12151C] border border-[#2A3140] rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] mx-auto shadow-lg">
            <Image
              src={restaurant.settings.logoUrl}
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-white">Sunny Point Admin</h1>
            <p className="text-xs text-[#D4AF37] font-medium">Restaurant Administration Portal</p>
          </div>
        </div>

        {/* Demo Credentials Notice */}
        <div className="bg-[#171A21] border border-[#D4AF37]/30 rounded-2xl p-4 text-xs space-y-1.5 text-[#C9CDD5]">
          <div className="flex items-center gap-1.5 font-bold text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4" />
            <span>Demonstration Access</span>
          </div>
          <p className="text-[11px] text-[#9DA4B0]">
            Pre-configured for evaluation. Click Sign In to manage live menu items and prices.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0F1115] border border-[#2A3140] focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9DA4B0] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0F1115] border border-[#2A3140] focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#B89324] text-[#0F1115] uppercase tracking-wider transition-colors shadow-lg disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-[#9DA4B0] hover:text-[#D4AF37]">
            ← Return to Customer Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
