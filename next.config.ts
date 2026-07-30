import type { NextConfig } from "next";

const BASE_URL = "https://yusraateeq.vercel.app";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow remote images if needed (Sanity, Cloudinary, etc.)
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  experimental: {
    mdxRs: true,
  },

  // ── Security & SEO headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Clickjacking protection
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // XSS protection (legacy browsers)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Referrer policy — full URL for same-origin, origin only for cross-origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unused APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // HSTS — tell browsers to always use HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Cache public images for 30 days
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  // ── Redirects — redirect www → non-www for canonical consistency ──────
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.yusraateeq.vercel.app` }],
        destination: `${BASE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
