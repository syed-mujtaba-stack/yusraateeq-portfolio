"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { certificates } from "@/lib/data";
import { Award, ExternalLink, X, Shield } from "lucide-react";
import { CertificatesBackground } from "@/components/backgrounds/CertificatesBackground";
import { TextReveal } from "@/components/effects/TextReveal";

export function Certificates() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="certificates" className="relative py-32 px-6 overflow-hidden bg-[#050505]">
      <CertificatesBackground />
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16"
        >
          <span className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4 block">Certificates</span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-bold text-white">Professional <span className="text-zinc-400 font-light">Credentials</span></TextReveal>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.76, 0, 0.24, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelected(i)}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-purple-500/[0.01] border border-white/[0.06] hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.06)] transition-all duration-500 cursor-pointer group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-all duration-700" />
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0"
                >
                  <Shield className="w-6 h-6 text-purple-400" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white font-semibold group-hover:text-purple-200 transition-colors">{cert.title}</h3>
                    <Award size={16} className="text-purple-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-zinc-400 text-sm mt-1">{cert.issuer} · {cert.date}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-purple-400/60 group-hover:text-purple-300 transition-colors">
                    <ExternalLink size={11} /> View Certificate
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full p-8 rounded-2xl bg-zinc-900/90 border border-white/[0.06]"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-purple-500/20 transition-all"
              >
                <X size={16} />
              </button>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-5">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">
                {certificates[selected].title}
              </h3>
              <p className="text-zinc-400 text-sm text-center mb-1">
                {certificates[selected].issuer}
              </p>
              <p className="text-zinc-500 text-xs text-center">{certificates[selected].date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
