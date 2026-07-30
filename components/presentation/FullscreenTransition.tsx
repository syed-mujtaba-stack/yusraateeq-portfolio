"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  isFullscreen: boolean;
}

export function FullscreenTransition({ isFullscreen }: Props) {
  const prevRef = useRef<boolean | null>(null);
  // "flash" increments every time we want to show the overlay, giving
  // AnimatePresence a unique key so it re-mounts and plays the animation.
  const [flash, setFlash] = useState<{ id: number; entering: boolean } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Skip the very first render (null → false/true on mount)
    if (prevRef.current === null) {
      prevRef.current = isFullscreen;
      return;
    }
    if (prevRef.current === isFullscreen) return;

    const entering = isFullscreen;
    prevRef.current = isFullscreen;

    setFlash({ id: Date.now(), entering });

    // Auto-dismiss after 2.2 s
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setFlash(null), 2200);
  }, [isFullscreen]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const label = flash?.entering ? "Presentation Mode" : "Exiting Presentation";
  const sublabel = flash?.entering
    ? "Press F or ESC to exit · Double-tap on mobile"
    : "Welcome back";

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          key={flash.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          style={{ willChange: "opacity" }}
        >
          {/* Radial vignette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.2) 0%, rgba(0,0,0,0.75) 100%)",
            }}
          />

          {/* Corner brackets */}
          {[
            "top-6 left-6 border-t border-l",
            "top-6 right-6 border-t border-r",
            "bottom-6 left-6 border-b border-l",
            "bottom-6 right-6 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.05 }}
              className={`absolute w-10 h-10 border-purple-500/60 ${cls}`}
            />
          ))}

          {/* Central label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="relative z-10 flex flex-col items-center gap-3 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center"
            >
              {flash.entering ? (
                /* expand icon */
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              ) : (
                /* compress icon */
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                </svg>
              )}
            </motion.div>

            <p className="text-white text-xl font-semibold tracking-wide">{label}</p>
            <p className="text-zinc-400 text-xs tracking-[0.15em] uppercase">{sublabel}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
