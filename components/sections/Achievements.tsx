"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/lib/data";
import { Trophy, Sparkles, TrendingUp } from "lucide-react";
import { TextReveal } from "@/components/effects/TextReveal";
import gsap from "gsap";

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-32 px-6 overflow-hidden bg-gradient-to-r from-[#1A082B] to-[#0D0D1A]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16"
        >
          <span className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4 block">Achievements</span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-bold text-white">Milestones & <span className="text-zinc-400 font-light">Recognition</span></TextReveal>
        </motion.div>

        <div className="space-y-6">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2, ease: [0.76, 0, 0.24, 1] }}
              whileHover={{ x: 5 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-purple-500/[0.01] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-700" />
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  animate={inView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0"
                >
                  <Trophy className="w-6 h-6 text-purple-400" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">{achievement.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">{achievement.year}</span>
                  </div>
                  <p className="text-zinc-400 text-sm">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
