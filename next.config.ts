import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // AliExpress CDN — au cas où on charge directement depuis là
      { protocol: "https", hostname: "ae01.alicdn.com" },
      { protocol: "https", hostname: "ae02.alicdn.com" },
      { protocol: "https", hostname: "ae03.alicdn.com" },
      { protocol: "https", hostname: "ae04.alicdn.com" },
      // Unsplash / Pexels — pour les visuels stock
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
