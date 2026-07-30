"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TestimonialsBackground } from "@/components/backgrounds/TestimonialsBackground";
import { TextReveal } from "@/components/effects/TextReveal";

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32 px-6 overflow-hidden bg-[#0D0A1A]">
      <TestimonialsBackground />
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4 block">Testimonials</span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-bold text-white">
            What People <span className="text-zinc-400 font-light">Say</span>
          </TextReveal>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="relative p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-purple-500/[0.02] border border-white/[0.06] backdrop-blur-xl"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + star * 0.1 }}
                  >
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>

              <Quote className="w-10 h-10 text-purple-500/20 mb-4" />

              <p className="text-zinc-200 text-lg leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
                  {testimonials[current].name[0]}
                </div>
                <div>
                  <p className="text-white font-medium">{testimonials[current].name}</p>
                  <p className="text-zinc-500 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/30 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-purple-400 w-6" : "bg-zinc-600 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/30 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
