"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data";

const categories = ["All", "Languages", "Frontend", "Backend", "Databases", "AI", "DevOps", "Cloud", "CMS", "Design"];

const categoryColors: Record<string, string> = {
  Languages: "#a855f7",
  Frontend: "#d946ef",
  Backend: "#6366f1",
  Databases: "#0ea5e9",
  AI: "#f97316",
  DevOps: "#10b981",
  Cloud: "#3b82f6",
  CMS: "#ec4899",
  Design: "#8b5cf6",
};

// Precomputed organic scatter positions (avoid runtime random for SSR safety)
const positions = [
  { x: 0, y: 0, r: 0 }, { x: 12, y: -8, r: -3 }, { x: -10, y: 5, r: 2 },
  { x: 5, y: 12, r: -1 }, { x: -15, y: -5, r: 4 }, { x: 8, y: -14, r: -2 },
  { x: -6, y: 10, r: 1 }, { x: 14, y: 6, r: -4 }, { x: -12, y: -10, r: 3 },
  { x: 3, y: 15, r: -2 }, { x: -8, y: -12, r: 1 }, { x: 11, y: -3, r: -3 },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = activeCategory === "All" ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 lg:py-36 overflow-hidden bg-[#0a0a1a]" ref={ref}>

      {/* Static radial glow — no animation cost */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(168,85,247,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-0 left-0 w-1/2 h-1/2 opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse at 30% 20%, #a855f7, transparent 60%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-[0.03]"
          style={{ background: "radial-gradient(ellipse at 70% 80%, #d946ef, transparent 60%)" }}
        />
      </div>

      {/* Large section number */}
      <div className="absolute top-0 right-0 text-[22vw] font-black text-white/[0.018] leading-none select-none pointer-events-none pr-4 pt-2">
        05
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-purple-500" />
          <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">Skills</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              Proficiency
            </span>
          </h2>
          <p className="text-zinc-500 mt-3 text-sm max-w-lg">
            {skills.length} technologies across {categories.length - 1} domains
          </p>
        </motion.div>

        {/* Category filter — floating pill tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="skillCategoryPill"
                  className="absolute inset-0 rounded-full bg-purple-600 border border-purple-400/40 shadow-lg shadow-purple-500/30"
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills — Asymmetric scattered layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {filtered.map((skill, i) => {
              const pos = positions[i % positions.length];
              const color = categoryColors[skill.category] || "#a855f7";
              return (
                <motion.div
                  key={`${skill.name}-${skill.category}`}
                  layout
                  initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: pos.r, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.02, ease: [0.76, 0, 0.24, 1] }}
                  whileHover={{ scale: 1.12, rotate: 0, y: -6, zIndex: 10 }}
                  className="relative group cursor-default"
                  style={{ zIndex: i % 3 === 0 ? 2 : 1 }}
                >
                  <div
                    className="px-4 py-2 rounded-2xl border text-sm font-medium transition-all duration-200 bg-black/60 backdrop-blur-sm"
                    style={{
                      borderColor: `${color}22`,
                      color: "#e4e4e7",
                    }}
                  >
                    {/* Category color dot */}
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                      style={{ background: color }}
                    />
                    {skill.name}
                  </div>
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
                    style={{ background: `${color}20` }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-zinc-600 text-center py-16">No skills in this category.</p>
        )}

        {/* Floating category legend */}
        {activeCategory === "All" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-14 pt-10 border-t border-white/[0.04] flex flex-wrap gap-4"
          >
            {Object.entries(categoryColors).map(([cat, color]) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                {cat}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Diagonal SVG divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-10 md:h-14" fill="none">
          <path d="M0,50 L1440,0 L1440,50 Z" fill="#0e0515" />
        </svg>
      </div>
    </section>
  );
}
