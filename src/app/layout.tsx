import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { MobileBottomBar } from "@/components/ui/MobileBottomBar";
import { LateNightWhisper } from "@/components/ui/LateNightWhisper";
import { MarigoldConfetti } from "@/components/ui/MarigoldConfetti";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { NetworkStatusBanner } from "@/components/pwa/NetworkStatusBanner";
import { PwaInstallPrompt } from "@/components/pwa/PwaInstallPrompt";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hotelsunnypoint.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hotel Sunny Point — The Taste of Legacy | 100% Pure Veg, Bhadrawati",
    template: "%s | Hotel Sunny Point",
  },
  description:
    "Serving Bhadrawati since 1995. Iconic Masala Dosa, authentic South Indian delicacies, and curated Global Bites in a modern pure vegetarian family restaurant.",
  keywords: [
    "Hotel Sunny Point",
    "Bhadrawati restaurant",
    "pure veg restaurant Bhadrawati",
    "pure veg Chandrapur",
    "best dosa in Bhadrawati",
    "masala dosa 1995",
    "The Taste of Legacy",
    "South Indian food Bhadrawati",
    "Global Bites",
    "family restaurant",
    "Maharashtra 442902",
  ],
  authors: [{ name: "Hotel Sunny Point", url: SITE_URL }],
  creator: "Hotel Sunny Point",
  publisher: "Hotel Sunny Point",
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "mr-IN": "/?lang=mr",
      "hi-IN": "/?lang=hi",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["mr_IN", "hi_IN"],
    url: SITE_URL,
    siteName: "Hotel Sunny Point",
    title: "Hotel Sunny Point — The Taste of Legacy | 100% Pure Veg, Bhadrawati",
    description:
      "Historic culinary landmark serving Bhadrawati since 1995. Pioneers of Dosa culture since 1995. Explore our full digital menu.",
    images: [
      {
        url: "/assets/brand/facade.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Sunny Point Landmark Restaurant Building in Bhadrawati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Sunny Point — Pure Veg Restaurant in Bhadrawati",
    description:
      "Serving authentic South Indian dosas and Global Bites since 1995. Browse full digital menu with live pricing.",
    images: ["/assets/brand/facade.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/brand/logo.jpg",
    apple: "/assets/brand/logo.jpg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1115" },
  ],
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Hotel Sunny Point",
  alternateName: "हॉटेल सनी पॉईंट",
  image: `${SITE_URL}/assets/brand/facade.jpg`,
  logo: `${SITE_URL}/assets/brand/logo.jpg`,
  url: SITE_URL,
  telephone: "+919511724562",
  servesCuisine: [
    "Pure Vegetarian",
    "South Indian",
    "North Indian",
    "Indo-Chinese",
    "Global Bites & Sizzlers",
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road, Near Old Bus Stand",
    addressLocality: "Bhadrawati",
    addressRegion: "Maharashtra",
    postalCode: "442902",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 20.0984,
    longitude: 79.1219,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:30",
      closes: "22:30",
    },
  ],
  hasMenu: `${SITE_URL}/menu`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "38",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
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
            <MarigoldConfetti />
            <LateNightWhisper />
            <NetworkStatusBanner />
            <PwaInstallPrompt />
            <ServiceWorkerRegister />
          </RestaurantProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
