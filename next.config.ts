import type { NextConfig } from "next";
import path from "path";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  output: isGithubPages ? "export" : "standalone",
  basePath: isGithubPages ? "/Hotel-Sunny-Point" : "",
  assetPrefix: isGithubPages ? "/Hotel-Sunny-Point" : undefined,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    unoptimized: isGithubPages ? true : false,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
  ...(isGithubPages
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                {
                  key: "X-DNS-Prefetch-Control",
                  value: "on",
                },
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
                {
                  key: "X-Frame-Options",
                  value: "SAMEORIGIN",
                },
                {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
                },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=(self)",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
