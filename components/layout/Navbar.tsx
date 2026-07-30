"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScroll = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
    setHidden(latest > lastScroll.current && latest > 200);
    lastScroll.current = latest;

    const sections = navLinks.map((l) => l.href.replace("#", ""));
    for (const section of sections.reverse()) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(section);
          break;
        }
      }
    }
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.04] shadow-lg shadow-purple-500/5"
            : "bg-gradient-to-b from-black/50 to-transparent"
        )}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20 max-w-7xl mx-auto">
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="text-lg font-medium tracking-tight relative group"
          >
            <span className="text-white group-hover:text-purple-200 transition-colors">YUSRA</span>
            <span className="text-purple-400">.</span>
            <motion.div
              className="absolute -inset-2 rounded-lg bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"
            />
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm tracking-wide transition-all duration-300 rounded-lg",
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                )}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/[0.06] rounded-lg border border-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-500/20 hover:border-purple-500/40 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black/90 flex items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { delay: i * 0.08, ease: [0.76, 0, 0.24, 1] },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.9, transition: { delay: i * 0.04 } }}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-3xl font-medium transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-purple-300"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
