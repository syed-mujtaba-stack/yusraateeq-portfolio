"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { experiences, internships } from "@/lib/data";
import { Building2, Calendar, ChevronRight } from "lucide-react";

const allExp = [
  ...experiences.map((e) => ({ ...e, type: "work" as const, color: "#a855f7" })),
  ...internships.map((e) => ({ ...e, type: "internship" as const, color: "#6366f1" })),
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experience"
      className="relative py-28 lg:py-36 overflow-hidden bg-[#050505]"
      ref={ref}
    >
      {/* Static background — replaces animated blobs for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Large decorative number */}
      <div className="absolute top-0 left-0 text-[22vw] font-black text-white/[0.02] leading-none select-none pointer-events-none pl-4 pt-2">
        03
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-purple-500" />
          <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">Experience</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              Journey
            </span>
          </h2>
        </motion.div>

        {/* Desktop: Side-by-side panel layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">

          {/* Left — Timeline navigation */}
          <div className="col-span-4 relative">
            {/* Vertical line */}
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute left-3.5 top-3 w-px bg-gradient-to-b from-purple-500 via-purple-500/40 to-transparent"
              style={{ height: `${allExp.length * 100}px` }}
            />

            <div className="space-y-4">
              {allExp.map((exp, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  onClick={() => setActive(i)}
                  className={`relative pl-10 pr-4 py-4 text-left w-full rounded-xl transition-all duration-300 group ${
                    active === i
                      ? "bg-purple-500/10 border border-purple-500/30"
                      : "border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2 top-5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    active === i
                      ? "bg-purple-500 border-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                      : "bg-black border-zinc-600"
                  }`} />

                  <p className={`text-sm font-semibold transition-colors ${active === i ? "text-purple-200" : "text-zinc-300"}`}>
                    {exp.role}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{exp.company}</p>
                  {exp.period && (
                    <p className="text-[10px] text-zinc-600 mt-1 flex items-center gap-1">
                      <Calendar size={9} /> {exp.period}
                    </p>
                  )}
                  <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all ${active === i ? "opacity-100" : "opacity-0"}`}>
                    <ChevronRight size={14} className="text-purple-400" />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right — Detail panel */}
          <div className="col-span-8">
            {allExp.map((exp, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : 20 }}
                transition={{ duration: 0.4 }}
                className={`${active === i ? "block" : "hidden"} relative p-8 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.04] to-fuchsia-500/[0.02] overflow-hidden`}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Building2 size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-purple-300 text-sm mt-0.5">{exp.company}</p>
                    {exp.period && (
                      <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                        <Calendar size={10} /> {exp.period}
                      </p>
                    )}
                  </div>
                  <span className={`ml-auto text-[10px] px-3 py-1 rounded-full ${
                    exp.type === "work"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/20"
                      : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                  }`}>
                    {exp.type === "work" ? "Full-time" : "Internship"}
                  </span>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((desc, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: j * 0.08 }}
                      className="flex items-start gap-3 text-zinc-400 text-sm"
                    >
                      <div className="w-1 h-1 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      {desc}
                    </motion.li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex gap-2 mt-6 pt-5 border-t border-white/[0.05]">
                  {["Client Relations", "Strategy", "Engineering"].map((t) => (
                    <span key={t} className="text-[10px] px-3 py-1 rounded-full bg-white/[0.04] text-zinc-500 border border-white/[0.06]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="lg:hidden space-y-6">
          {allExp.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative pl-8 border-l border-purple-500/30"
            >
              <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-black" />
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                <p className="text-purple-300 text-sm">{exp.company}</p>
                {exp.period && <p className="text-xs text-zinc-500 mt-1">{exp.period}</p>}
                <ul className="mt-3 space-y-2">
                  {exp.description.map((d, j) => (
                    <li key={j} className="text-zinc-400 text-sm flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Curved SVG divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16" fill="none">
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" fill="#0a0a1a" />
        </svg>
      </div>
    </section>
  );
}
