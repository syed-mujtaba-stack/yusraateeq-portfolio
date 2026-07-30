"use client";

import { useEffect, type FC, type ReactNode } from "react";

interface LenisProps {
  children: ReactNode;
}

interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
}

export const Lenis: FC<LenisProps> = ({ children }) => {
  useEffect(() => {
    let lenis: LenisInstance | null = null;
    let rafId: number;
    let destroyed = false;

    const initLenis = async () => {
      const LenisClass = (await import("lenis")).default;

      if (destroyed) return; // component unmounted before import resolved

      lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      }) as unknown as LenisInstance;

      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
