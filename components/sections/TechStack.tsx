"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython,
  SiDocker, SiFirebase, SiMongodb, SiPostgresql, SiRedis, SiThreedotjs,
  SiFigma, SiSanity, SiCloudinary, SiGithubactions,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TechStackBackground } from "@/components/backgrounds/TechStackBackground";
import { TextReveal } from "@/components/effects/TextReveal";

const techItems = [
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, name: "TailwindCSS", color: "#06B6D4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: FaAws, name: "AWS", color: "#FF9900" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiRedis, name: "Redis", color: "#DC382D" },
  { icon: SiThreedotjs, name: "Three.js", color: "#ffffff" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiSanity, name: "Sanity", color: "#F97316" },
  { icon: SiCloudinary, name: "Cloudinary", color: "#3448C5" },
  { icon: SiGithubactions, name: "GitHub Actions", color: "#2088FF" },
];

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="techstack" className="relative py-32 px-6 overflow-hidden bg-[#1A082B]">
      <TechStackBackground />
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4 block">Tech Stack</span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-bold text-white">
            Technologies I <span className="text-zinc-400 font-light">Work With</span>
          </TextReveal>
        </motion.div>

        {/* Marquee Row 1 */}
        <div className="overflow-hidden mb-6">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 w-max"
          >
            {[...techItems, ...techItems].map((tech, i) => (
              <motion.div
                key={`${tech.name}-${i}`}
                whileHover={{ scale: 1.15, y: -6 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-purple-500/[0.05] hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] transition-all duration-300 cursor-default min-w-[100px]"
              >
                <tech.icon className="w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]" style={{ color: tech.color }} />
                <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Marquee Row 2 (Reversed) */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 w-max"
          >
            {[...techItems].reverse().concat([...techItems].reverse()).map((tech, i) => (
              <motion.div
                key={`rev-${tech.name}-${i}`}
                whileHover={{ scale: 1.15, y: -6 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-purple-500/[0.05] hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] transition-all duration-300 cursor-default min-w-[100px]"
              >
                <tech.icon className="w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]" style={{ color: tech.color }} />
                <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
