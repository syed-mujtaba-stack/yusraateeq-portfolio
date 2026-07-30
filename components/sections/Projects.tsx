"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

// Color accents for each project
const projectColors = ["#a855f7", "#d946ef", "#6366f1", "#0ea5e9"];
const projectBgs = [
  "from-purple-500/10 via-fuchsia-500/5 to-transparent",
  "from-fuchsia-500/10 via-purple-500/5 to-transparent",
  "from-indigo-500/10 via-purple-500/5 to-transparent",
  "from-sky-500/10 via-indigo-500/5 to-transparent",
];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section
      id="projects"
      className="relative py-28 lg:py-36 overflow-hidden bg-[#080313]"
      ref={ref}
    >
      {/* Orbiting glow rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 rounded-full border border-purple-500/5" />
          <div className="absolute inset-[60px] rounded-full border border-fuchsia-500/5" />
          <div className="absolute inset-[120px] rounded-full border border-purple-500/5" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        >
          <div className="absolute inset-0 rounded-full border border-purple-500/[0.04]" />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Large decorative number */}
      <div className="absolute top-0 right-0 text-[22vw] font-black text-white/[0.018] leading-none select-none pointer-events-none pr-4 pt-2">
        07
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
          <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">Projects</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              Work
            </span>
          </motion.h2>
          <motion.a
            href="https://github.com/yusraateeq"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-300 transition-colors"
          >
            <SiGithub className="w-4 h-4" /> View All on GitHub <ArrowUpRight size={13} />
          </motion.a>
        </div>

        {/* FEATURED PROJECT — full-width hero */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="group relative rounded-3xl overflow-hidden border border-purple-500/20 mb-8"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${projectBgs[0]} pointer-events-none`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_80%_50%,rgba(168,85,247,0.1)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[340px]">

            {/* Left — Text */}
            <div className="flex flex-col justify-center p-8 md:p-12 relative">
              {/* Large project number */}
              <div className="absolute top-4 left-8 text-[8rem] font-black text-white/[0.04] leading-none select-none pointer-events-none">
                01
              </div>

              <div className="relative z-10">
                <span className="text-[10px] text-purple-300 tracking-[0.25em] uppercase mb-4 block">Featured Project</span>
                <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-purple-100 transition-colors mb-4">
                  {featured.title}
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-6 max-w-sm">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-5">
                  {featured.liveUrl && (
                    <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 text-white text-xs font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20">
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                  {featured.githubUrl && (
                    <a href={featured.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-zinc-400 hover:text-purple-300 transition-colors">
                      <SiGithub className="w-4 h-4" /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right — Visual preview */}
            <div className="relative hidden lg:flex items-center justify-center p-8 overflow-hidden">
              {/* Floating code mockup */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-sm"
              >
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl shadow-purple-500/10">
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <div className="ml-3 flex-1 h-4 rounded-full bg-white/[0.04] flex items-center px-2">
                      <span className="text-[8px] text-zinc-600">{featured.title}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2.5">
                    {["🤖 Agent initialized", "⚡ Processing request...", "📊 Analyzing data...", "✅ Task completed"].map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.4 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <p className="text-[10px] font-mono text-zinc-400">{line}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="px-4 pb-4">
                    <div className="h-1 rounded-full bg-purple-500/20 overflow-hidden">
                      <motion.div
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ring decorations */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full border border-purple-500/[0.08]" />
              </div>
            </div>
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </motion.div>

        {/* REST — Compact horizontal rows */}
        <div className="space-y-0 border border-white/[0.04] rounded-2xl overflow-hidden">
          {rest.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-white/[0.04] last:border-b-0 transition-all duration-300 cursor-default ${
                hoveredRow === i ? "bg-purple-500/[0.04]" : "bg-transparent"
              }`}
            >
              {/* Hover left accent */}
              <motion.div
                animate={{ height: hoveredRow === i ? "100%" : "0%" }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-purple-500 to-fuchsia-500"
              />

              <div className="flex items-center gap-5 flex-1 min-w-0">
                {/* Project number */}
                <span className="text-2xl font-black text-white/[0.08] w-8 flex-shrink-0">
                  {String(i + 2).padStart(2, "0")}
                </span>

                {/* Color dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-150"
                  style={{ background: projectColors[i + 1] }}
                />

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm truncate hidden sm:block">{project.description}</p>
                </div>
              </div>

              {/* Tags — revealed on hover desktop */}
              <AnimatePresence>
                {hoveredRow === i && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:flex flex-wrap gap-1.5"
                  >
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/15">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-4 flex-shrink-0">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-purple-300 transition-colors">
                    <SiGithub className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-purple-300 transition-colors">
                    <ExternalLink size={14} />
                  </a>
                )}
                <motion.div animate={{ x: hoveredRow === i ? 4 : 0 }}>
                  <ArrowRight size={14} className="text-zinc-700 group-hover:text-purple-400 transition-colors" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16" fill="none">
          <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="#050505" />
        </svg>
      </div>
    </section>
  );
}
