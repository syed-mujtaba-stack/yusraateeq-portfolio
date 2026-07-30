"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Lenis as LenisProvider } from "@/components/lenis-provider";
import { PresentationProvider } from "@/components/presentation/PresentationProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <LenisProvider>
          {/* Presentation mode + content protection — no visible UI unless active */}
          <PresentationProvider />
          {children}
        </LenisProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
