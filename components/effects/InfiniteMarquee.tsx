"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InfiniteMarqueeProps {
  items: ReactNode[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function InfiniteMarquee({
  items,
  direction = "left",
  speed = 20,
  className = "",
}: InfiniteMarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{
          x: direction === "left" ? [0, -50 * items.length] : [-50 * items.length, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-8"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
