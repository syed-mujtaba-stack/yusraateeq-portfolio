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

export const metadata: Metadata = {
  title: "Yusra Ateeq | Agentic AI Engineer & Full Stack Developer",
  description:
    "Yusra Ateeq — Agentic AI Engineer, Full Stack Developer, Cloud & DevOps Enthusiast. Building intelligent software powered by AI, modern web engineering, and cloud infrastructure.",
  keywords: [
    "Yusra Ateeq",
    "Agentic AI",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Cloud Engineer",
    "DevOps",
    "Portfolio",
    "Karachi",
    "Pakistan",
  ],
  authors: [{ name: "Yusra Ateeq" }],
  creator: "Yusra Ateeq",
  openGraph: {
    title: "Yusra Ateeq | Agentic AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software powered by Agentic AI, Full Stack Engineering, Cloud Infrastructure and Modern UI Design.",
    url: "https://yusraateeq.vercel.app",
    siteName: "Yusra Ateeq Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yusra Ateeq | Agentic AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software powered by Agentic AI, Full Stack Engineering, Cloud Infrastructure and Modern UI Design.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
