"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  detected: boolean;
  onDismiss: () => void;
}

export function DevToolsOverlay({ detected, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {detected && (
        <>
          {/* Blur backdrop */}
          <motion.div
            key="devtools-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[300] bg-black/60"
            onClick={onDismiss}
          />

          {/* Card */}
          <motion.div
            key="devtools-card"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[301] flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto relative max-w-sm w-full mx-6 p-8 rounded-3xl bg-zinc-900/95 border border-purple-500/30 shadow-2xl shadow-purple-500/10 text-center overflow-hidden">

              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

              {/* Animated lock icon */}
              <motion.div
                animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-5"
              >
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </motion.div>

              <h3 className="text-white text-lg font-semibold mb-2">
                This portfolio is protected.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Content on this page is the intellectual property of Yusra Ateeq and may not be reproduced without permission.
              </p>

              <div className="flex items-center gap-2 justify-center text-xs text-zinc-600">
                <span className="w-4 h-px bg-zinc-700" />
                <span>yusraateeq.vercel.app</span>
                <span className="w-4 h-px bg-zinc-700" />
              </div>

              {/* Dismiss */}
              <button
                onClick={onDismiss}
                className="mt-5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Dismiss
              </button>

              {/* Corner decoration */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
