import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Aurora } from "@/components/effects/Aurora";
import { NoiseTexture } from "@/components/effects/NoiseTexture";
import { FloatingElements } from "@/components/effects/FloatingElements";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://yusraateeq.vercel.app";

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Yusra Ateeq | Agentic AI Engineer & Full Stack Developer",
    template: "%s | Yusra Ateeq",
  },
  description:
    "Yusra Ateeq — Agentic AI Engineer & Full Stack Developer based in Karachi, Pakistan. Building intelligent software with Next.js, React, TypeScript, LangChain, and cloud infrastructure.",
  keywords: [
    "Yusra Ateeq",
    "Agentic AI Engineer",
    "Full Stack Developer",
    "AI Developer Pakistan",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "LangChain",
    "RAG",
    "AI Agents",
    "MCP",
    "Node.js",
    "Python",
    "Cloud Engineer",
    "DevOps",
    "AWS",
    "Portfolio",
    "Karachi",
    "Pakistan",
    "Freelance Developer",
    "Web Developer Karachi",
    "SaaS Developer",
    "OpenAI",
    "Generative AI",
  ],
  authors: [{ name: "Yusra Ateeq", url: BASE_URL }],
  creator: "Yusra Ateeq",
  publisher: "Yusra Ateeq",

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Yusra Ateeq Portfolio",
    locale: "en_US",
    title: "Yusra Ateeq | Agentic AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software powered by Agentic AI, Full Stack Engineering, Cloud Infrastructure and Modern UI Design.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Yusra Ateeq — Agentic AI Engineer & Full Stack Developer",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@yusraateeq",
    creator: "@yusraateeq",
    title: "Yusra Ateeq | Agentic AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software powered by Agentic AI, Full Stack Engineering, Cloud Infrastructure and Modern UI Design.",
    images: [`${BASE_URL}/og-image.png`],
  },

  // ── Robots ────────────────────────────────────────────────────────────────
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

  // ── Verification (fill in after verifying in Google/Bing Search Console) ──
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  //   yandex: "YOUR_YANDEX_TOKEN",
  // },

  // ── App / PWA hints ───────────────────────────────────────────────────────
  applicationName: "Yusra Ateeq Portfolio",
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

// ── JSON-LD Structured Data ─────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Yusra Ateeq",
      url: BASE_URL,
      image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/profile.jpeg`,
        width: 400,
        height: 400,
      },
      jobTitle: "Agentic AI Engineer & Full Stack Developer",
      description:
        "Agentic AI Engineer and Full Stack Developer based in Karachi, Pakistan. Specializing in Next.js, React, TypeScript, LangChain, AI Agents, and cloud infrastructure.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      email: "yusraateeq112@gmail.com",
      telephone: "+923162166336",
      sameAs: [
        "https://github.com/yusraateeq",
        "https://www.linkedin.com/in/yusra-ateeq-00797a2b1",
        "https://www.instagram.com/ateeq.yusra",
      ],
      knowsAbout: [
        "Agentic AI",
        "LangChain",
        "RAG",
        "AI Agents",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "AWS",
        "Cloud Computing",
        "DevOps",
        "Full Stack Development",
        "UI/UX Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Yusra Ateeq Portfolio",
      description:
        "Official portfolio of Yusra Ateeq — Agentic AI Engineer & Full Stack Developer.",
      author: { "@id": `${BASE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Yusra Ateeq | Agentic AI Engineer & Full Stack Developer",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#person` },
      description:
        "Portfolio showcasing AI engineering, full stack development, cloud infrastructure, and UI/UX design projects.",
      inLanguage: "en-US",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#services`,
      name: "Yusra Ateeq — Development Services",
      provider: { "@id": `${BASE_URL}/#person` },
      serviceType: [
        "Agentic AI Development",
        "Full Stack Web Development",
        "Cloud Deployment",
        "DevOps Setup",
        "SaaS Platform Development",
        "UI/UX Design",
      ],
      areaServed: "Worldwide",
      url: BASE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to speed up Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Theme color for browser chrome */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        {/* Geo tags */}
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi" />
        <meta name="geo.position" content="24.8607;67.0011" />
        <meta name="ICBM" content="24.8607, 67.0011" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-zinc-100">
        <Providers>
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <Aurora />
          <NoiseTexture />
          <FloatingElements />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
