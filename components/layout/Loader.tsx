"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="relative">
            {/* Progress bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%", transition: { duration: 2.4, ease: [0.76, 0, 0.24, 1] } }}
              className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />

            {/* Glow behind */}
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
              className="text-center px-8 relative"
            >
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm uppercase tracking-[0.3em] text-zinc-400 font-light"
              >
                Yusra Ateeq
              </motion.p>

              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-4 text-[10px] text-purple-400/60 tracking-[0.2em] uppercase"
              >
                Loading
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
