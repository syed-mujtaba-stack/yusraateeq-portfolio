"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, GitCommit, Users, TrendingUp, Activity } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { TextReveal } from "@/components/effects/TextReveal";
import gsap from "gsap";

export function GitHubStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView || !countersRef.current) return;
    const counters = countersRef.current.querySelectorAll(".gh-counter");
    counters.forEach((c) => {
      const target = parseInt(c.getAttribute("data-target") || "0");
      gsap.fromTo(c, { textContent: 0 }, { textContent: target, duration: 2, ease: "power3.out", snap: { textContent: 1 } });
    });
  }, [inView]);

  const stats = [
    { icon: Star, value: 12, suffix: "+", label: "Stars", color: "#eab308" },
    { icon: GitFork, value: 8, suffix: "+", label: "Forks", color: "#22c55e" },
    { icon: GitCommit, value: 500, suffix: "+", label: "Contributions", color: "#a855f7" },
    { icon: Users, value: 10, suffix: "+", label: "Collaborators", color: "#3b82f6" },
  ];

  return (
    <section id="github" className="relative py-32 px-6 overflow-hidden bg-[#0D0A1A]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4 block">Open Source</span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-bold text-white">GitHub <span className="text-zinc-400 font-light">Activity</span></TextReveal>
        </motion.div>

        <div ref={countersRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-purple-500/[0.02] border border-white/[0.06] hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.06)] transition-all duration-500 text-center overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <stat.icon className="w-6 h-6 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center justify-center gap-1">
                <span className="gh-counter" data-target={stat.value}>0</span>
                <span>{stat.suffix}</span>
              </p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://github.com/yusraateeq"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/[0.1] text-zinc-300 hover:from-purple-500/10 hover:to-fuchsia-500/10 hover:border-purple-500/30 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300"
          >
            <SiGithub className="w-[18px] h-[18px]" />
            View GitHub Profile
            <TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
