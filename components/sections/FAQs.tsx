"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/data";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQsBackground } from "@/components/backgrounds/FAQsBackground";
import { TextReveal } from "@/components/effects/TextReveal";

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faqs" className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#050505] to-[#0A0A1A]">
      <FAQsBackground />
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4 block">FAQs</span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-bold text-white">Frequently Asked <span className="text-zinc-400 font-light">Questions</span></TextReveal>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] overflow-hidden hover:border-purple-500/20 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                    openIndex === i ? "bg-purple-500/20" : "bg-white/[0.03]"
                  )}>
                    <HelpCircle size={14} className={cn(
                      "transition-colors duration-300",
                      openIndex === i ? "text-purple-400" : "text-zinc-500"
                    )} />
                  </div>
                  <span className="text-sm text-white font-medium">{faq.question}</span>
                </div>
                <ChevronDown size={16} className={cn(
                  "text-zinc-500 transition-transform duration-300 flex-shrink-0",
                  openIndex === i && "rotate-180 text-purple-400"
                )} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-16">
                      <p className="text-zinc-400 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
            <MessageCircle size={14} className="text-purple-400" />
            Still have questions? <a href="#contact" className="text-purple-400 hover:text-purple-300 transition-colors">Contact me</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
