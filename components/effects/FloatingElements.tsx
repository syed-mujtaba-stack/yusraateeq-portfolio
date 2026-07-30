"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// Precomputed static values — avoids hydration mismatch from Math.random() on mount
// and prevents re-generating on every render
const STATIC_ELEMENTS: FloatingElement[] = [
  { id: 0, x: 8,  y: 12, size: 3, duration: 18, delay: 0,   opacity: 0.12 },
  { id: 1, x: 25, y: 55, size: 2, duration: 22, delay: 1.5, opacity: 0.18 },
  { id: 2, x: 72, y: 20, size: 4, duration: 17, delay: 3,   opacity: 0.10 },
  { id: 3, x: 88, y: 70, size: 2, duration: 25, delay: 0.8, opacity: 0.15 },
  { id: 4, x: 45, y: 85, size: 3, duration: 20, delay: 2.2, opacity: 0.12 },
  { id: 5, x: 60, y: 40, size: 2, duration: 23, delay: 4,   opacity: 0.20 },
];

export function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  // Only render after client mount to avoid SSR/hydration issues
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {STATIC_ELEMENTS.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full bg-purple-500"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.size,
            height: el.size,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -25, 0, 18, 0],
            x: [0, 15, -15, 8, 0],
            opacity: [el.opacity, el.opacity * 1.8, el.opacity],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
