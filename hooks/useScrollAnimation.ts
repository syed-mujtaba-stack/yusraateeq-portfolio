"use client";

import { useEffect, useRef, useState } from "react";
import type { Target, TargetAndTransition, VariantLabels } from "framer-motion";

type AnimationVariant =
  | "fadeUp"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "rotateIn"
  | "flipIn"
  | "clipIn"
  | "blurIn"
  | "skewIn"
  | "bounceIn";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  variant?: AnimationVariant;
}

const variantStyles: Record<AnimationVariant, { init: Target; animate: TargetAndTransition }> = {
  fadeUp: {
    init: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    init: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    init: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    init: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    init: { opacity: 0, rotate: -15, scale: 0.9 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
  },
  flipIn: {
    init: { opacity: 0, rotateX: 90 },
    animate: { opacity: 1, rotateX: 0 },
  },
  clipIn: {
    init: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
  },
  blurIn: {
    init: { opacity: 0, filter: "blur(20px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
  skewIn: {
    init: { opacity: 0, skewY: 8, y: 40 },
    animate: { opacity: 1, skewY: 0, y: 0 },
  },
  bounceIn: {
    init: { opacity: 0, y: 120, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
  },
};

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", variant = "fadeUp" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const { init, animate } = variantStyles[variant];

  return { ref, inView, init: init as Target, animate: animate as TargetAndTransition };
}
