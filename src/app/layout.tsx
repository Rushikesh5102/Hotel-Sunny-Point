import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { MobileBottomBar } from "@/components/ui/MobileBottomBar";

export const metadata: Metadata = {
  title: "Hotel Sunny Point — The Taste of Legacy | Pure Veg, Bhadrawati",
  description:
    "Serving Bhadrawati since 1965. Iconic Masala Dosa, authentic South Indian delicacies, and Global Bites in a modern pure vegetarian family restaurant.",
  keywords: [
    "Hotel Sunny Point",
    "Bhadrawati restaurant",
    "pure veg",
    "dosa",
    "masala dosa",
    "The Taste of Legacy",
    "Maharashtra",
    "Chandrapur",
  ],
  authors: [{ name: "Hotel Sunny Point" }],
  icons: {
    icon: "/assets/brand/logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F1115",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Anti-flash inline script: restores saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('sunny_point_theme');
                  var pref = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  if (pref === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-[#D4AF37]/30 selection:text-[#F9E79F]">
        <ThemeProvider>
          <RestaurantProvider>
            {children}
            <MobileBottomBar />
          </RestaurantProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
