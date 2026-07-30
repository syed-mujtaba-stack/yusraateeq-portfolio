"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/lib/data";
import { Brain, Zap, Code2, Globe, Cloud, Palette, Server, Settings2, Gauge, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain, Zap, Code2, Globe, Cloud, Palette, Server, Settings2, Gauge,
};

// Geometric accent variants — each card gets a different one
const accents = [
  // Top-left triangle
  <svg key="tri" className="absolute top-0 left-0 w-16 h-16 text-purple-500/10" viewBox="0 0 64 64" fill="currentColor"><path d="M0 0 L64 0 L0 64 Z" /></svg>,
  // Top-right orb
  <div key="orb" className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-fuchsia-500/10 blur-xl" />,
  // Diagonal band
  <div key="band" className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-purple-500/40 via-fuchsia-500/20 to-transparent" />,
  // Bottom corner glow
  <div key="glow" className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-purple-600/10 blur-2xl" />,
  // Center dots
  <div key="dots" className="absolute top-4 right-4 grid grid-cols-2 gap-1 opacity-20">
    {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-purple-400" />)}
  </div>,
  // Top shine line
  <div key="shine" className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />,
  // Bottom arc
  <div key="arc" className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-purple-500/10 blur-xl rounded-full" />,
  // Left border glow
  <div key="lborder" className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-purple-500/60 via-purple-500/20 to-transparent" />,
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-28 lg:py-36 overflow-hidden bg-[#0e0515]" ref={ref}>

      {/* Static gradient background — no animated transforms */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-30%] left-[-10%] w-[70%] h-[80%] opacity-[0.06]"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, transparent)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] opacity-[0.05]"
          style={{ background: "linear-gradient(315deg, #d946ef, #a855f7, transparent)", filter: "blur(60px)" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Large decorative number */}
      <div className="absolute top-0 left-0 text-[22vw] font-black text-white/[0.018] leading-none select-none pointer-events-none pl-4 pt-2">
        06
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
          <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">Services</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
          >
            What I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              Deliver
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-500 text-sm max-w-xs lg:text-right"
          >
            End-to-end solutions from ideation to production deployment
          </motion.p>
        </div>

        {/* Bento Grid — asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 grid-rows-auto gap-4">

          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            const isHovered = hovered === i;
            const accent = accents[i % accents.length];

            // Bento sizing: first card double-wide, others varied
            const sizeClass =
              i === 0 ? "md:col-span-6 lg:col-span-5 lg:row-span-2" :
              i === 1 ? "md:col-span-3 lg:col-span-4" :
              i === 2 ? "md:col-span-3 lg:col-span-3" :
              i === 3 ? "md:col-span-4 lg:col-span-3 lg:col-start-6" :
              i === 4 ? "md:col-span-2 lg:col-span-4" :
              i === 5 ? "md:col-span-6 lg:col-span-5 lg:col-start-4" :
              i === 6 ? "md:col-span-3 lg:col-span-4" :
              i === 7 ? "md:col-span-3 lg:col-span-4" :
              "md:col-span-6 lg:col-span-4";

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-default group
                  ${sizeClass}
                  ${i === 0
                    ? "p-8 border-purple-500/25 bg-gradient-to-br from-purple-500/[0.07] to-fuchsia-500/[0.03]"
                    : "p-6 border-white/[0.06] bg-white/[0.02] hover:border-purple-500/25 hover:bg-purple-500/[0.03]"
                  }
                `}
              >
                {/* Unique geometric accent per card */}
                {accent}

                {/* Hover glow */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.06] via-fuchsia-500/[0.03] to-transparent pointer-events-none"
                />

                <div className="relative z-10">
                  <motion.div
                    animate={isHovered ? { scale: 1.15, rotate: 8 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 border border-purple-500/20 mb-5
                      ${i === 0 ? "w-16 h-16" : "w-12 h-12"}
                    `}
                  >
                    <Icon className={`text-purple-400 ${i === 0 ? "w-8 h-8" : "w-6 h-6"}`} />
                  </motion.div>

                  <h3 className={`font-bold text-white group-hover:text-purple-100 transition-colors mb-3
                    ${i === 0 ? "text-2xl" : "text-lg"}
                  `}>
                    {service.title}
                  </h3>

                  <p className={`text-zinc-400 leading-relaxed mb-5
                    ${i === 0 ? "text-base max-w-xs" : "text-sm"}
                  `}>
                    {service.description}
                  </p>

                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    className="flex items-center gap-1.5 text-xs text-purple-400 group-hover:text-purple-300"
                  >
                    Explore <ArrowRight size={11} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Jagged SVG divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-8 md:h-12" fill="none">
          <path d="M0,40 L120,10 L240,35 L360,5 L480,30 L600,8 L720,32 L840,6 L960,28 L1080,4 L1200,26 L1320,8 L1440,30 L1440,40 Z" fill="#080313" />
        </svg>
      </div>
    </section>
  );
}
