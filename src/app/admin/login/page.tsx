"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRestaurant } from "@/context/RestaurantContext";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { ShieldCheck, Lock, ArrowRight, Eye, EyeOff, AlertCircle, KeyRound, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { restaurant } = useRestaurant();
  const [email, setEmail] = useState("admin@hotelsunnypoint.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      // Get configured password or fallback to 1995 default
      const savedPassword =
        typeof window !== "undefined"
          ? localStorage.getItem("sunny_point_admin_password") || "SunnyPoint1995!"
          : "SunnyPoint1995!";

      if (password === savedPassword) {
        if (typeof window !== "undefined") {
          localStorage.setItem("sunny_point_admin_auth", "true");
          sessionStorage.setItem("sunny_point_admin_auth", "true");
        }
        setLoading(false);
        router.push("/admin");
      } else {
        setLoading(false);
        setErrorMsg("Incorrect password. Please verify your credentials or check with the owner.");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F3] dark:bg-black flex flex-col items-center justify-center p-4 relative transition-colors duration-200">
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <Link
          href="/"
          className="text-xs font-semibold text-[#6D756D] hover:text-[#174D35] dark:text-[#9DA4B0] dark:hover:text-[#D4AF37] transition-colors"
        >
          ← Return to Website
        </Link>
        <ThemeSwitcher variant="icon" />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] rounded-3xl p-8 shadow-sm dark:shadow-2xl space-y-6 transition-colors">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#174D35] dark:border-[#D4AF37] mx-auto shadow-md">
            <Image
              src={restaurant.settings.logoUrl}
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-[#292D29] dark:text-white">
              Sunny Point Admin
            </h1>
            <p className="text-xs text-[#174D35] dark:text-[#D4AF37] font-semibold tracking-wider uppercase">
              Management & Operations Portal
            </p>
          </div>
        </div>

        {/* Security / Default credentials notice */}
        <div className="bg-[#F5F0E6] dark:bg-black border border-[#E7E2D6] dark:border-[#D4AF37]/30 rounded-2xl p-4 text-xs space-y-2 text-[#6D756D] dark:text-[#C9CDD5] transition-colors">
          <div className="flex items-center gap-1.5 font-bold text-[#174D35] dark:text-[#D4AF37]">
            <KeyRound className="w-4 h-4" />
            <span>Secure Owner Authentication</span>
          </div>
          <p className="text-[11px] text-[#6D756D] dark:text-[#9DA4B0] leading-relaxed">
            Authorized management access only. Passwords can be customized anytime inside <strong>Admin &gt; Restaurant Settings</strong>.
          </p>
          <div className="pt-1 flex items-center justify-between text-[10px] text-[#174D35] dark:text-[#D4AF37] font-mono bg-white/70 dark:bg-black/30 p-2 rounded-lg">
            <span>Default Password:</span>
            <span className="font-bold">SunnyPoint1995!</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#6D756D] dark:text-[#9DA4B0] uppercase tracking-wider">
                Admin Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                placeholder="Enter admin password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAF9F3] dark:bg-black border border-[#E7E2D6] dark:border-[#1c2028] focus:border-[#174D35] dark:focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 pr-10 text-xs text-[#292D29] dark:text-white outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold bg-[#174D35] hover:bg-[#123E2A] text-white dark:bg-[#D4AF37] dark:hover:bg-[#B89324] dark:text-black uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <p className="text-[11px] text-[#6D756D] dark:text-[#6B7280]">
            Hotel Sunny Point • Bhadrawati (Est. 1995)
          </p>
        </div>
      </div>
    </div>
  );
}
