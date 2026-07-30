"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";

export type TransitionVariant =
  | "fadeUp"
  | "scaleIn"
  | "blurIn"
  | "clipReveal"
  | "perspective"
  | "slideLeft"
  | "slideRight"
  | "zoomOut"
  | "rotateIn";

interface Props {
  children: ReactNode;
  variant?: TransitionVariant;
  className?: string;
  id?: string;
  delay?: number;
}

const variants: Record<TransitionVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
  },
  clipReveal: {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } },
  },
  perspective: {
    hidden: { opacity: 0, rotateX: 15, y: 80, transformPerspective: 1000 },
    visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
  },
  zoomOut: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] } },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -6, y: 40 },
    visible: { opacity: 1, rotate: 0, y: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
  },
};

export function SectionTransition({ children, variant = "fadeUp", className = "", id, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[variant]}
      className={`relative overflow-hidden ${className}`}
      style={{ transformOrigin: "center bottom" }}
    >
      {children}
    </motion.section>
  );
}
