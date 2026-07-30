"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/lib/data";
import { GraduationCap, BookOpen, Calendar } from "lucide-react";
import { EducationBackground } from "@/components/backgrounds/EducationBackground";
import { TextReveal } from "@/components/effects/TextReveal";

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#1A082B] to-[#0D0A1A]">
      <EducationBackground />
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16"
        >
          <span className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4 block">Education</span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-bold text-white">
            Academic <span className="text-zinc-400 font-light">Background</span>
          </TextReveal>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-[23px] top-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent"
          />

          <div className="space-y-10">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -60, scale: 0.95 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.25, ease: [0.76, 0, 0.24, 1] }}
                className="relative pl-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.25, type: "spring" }}
                  className="absolute left-[14px] top-2 w-[19px] h-[19px] rounded-full bg-purple-500/50 border-[3px] border-black"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-purple-500/[0.02] border border-white/[0.06] hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.04)] transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <GraduationCap size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <span className="text-xs text-purple-400 tracking-[0.1em] uppercase flex items-center gap-1">
                        <Calendar size={10} /> {edu.period}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{edu.degree}</h3>
                  <p className="text-purple-300 text-sm mb-2 flex items-center gap-1">
                    <BookOpen size={12} /> {edu.institution}
                  </p>
                  {edu.description && (
                    <p className="text-zinc-400 text-sm mt-3">{edu.description}</p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
