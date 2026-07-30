"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Download, Sparkles, MapPin, GraduationCap, Briefcase, Code2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const floatingStats = [
  { value: "2+", label: "Years Exp", x: "70%", y: "10%", delay: 0 },
  { value: "20+", label: "Projects", x: "80%", y: "55%", delay: 0.1 },
  { value: "15+", label: "Clients", x: "60%", y: "82%", delay: 0.2 },
  { value: "5+", label: "Stacks", x: "85%", y: "28%", delay: 0.3 },
];

const tags = ["Agentic AI", "Full Stack", "Cloud", "DevOps", "UI/UX", "Business Strategy"];

const highlights = [
  { icon: MapPin, value: "Karachi, Pakistan" },
  { icon: GraduationCap, value: "BBA @ Ziauddin" },
  { icon: Briefcase, value: "2+ Yrs Full Stack" },
  { icon: Code2, value: "AI & Cloud Focus" },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!statsInView || !statsRef.current) return;
    const counters = statsRef.current.querySelectorAll<HTMLElement>(".counter");
    counters.forEach((el) => {
      const target = parseInt(el.dataset.target || "0");
      gsap.fromTo(
        el,
        { textContent: 0 },
        { textContent: target, duration: 2, ease: "power3.out", snap: { textContent: 1 } }
      );
    });
  }, [statsInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#08041a]"
    >
      {/* Static gradient background — no animated blurs to save GPU */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-20%] w-[120%] h-[50%] opacity-[0.08]"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7, transparent)",
            transform: "rotate(-15deg)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[60%] opacity-[0.05]"
          style={{
            background: "linear-gradient(315deg, #6d28d9, #7c3aed, transparent)",
            transform: "rotate(-15deg)",
            filter: "blur(100px)",
          }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Large section number behind content */}
      <div className="absolute top-0 right-0 text-[25vw] font-black text-white/[0.02] leading-none select-none pointer-events-none pr-4 pt-4">
        02
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 lg:py-36">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-purple-500" />
          <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">About Me</span>
        </motion.div>

        {/* Main asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left — Text content */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-8"
            >
              Dedicated<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-600">
                Full Stack
              </span>
              <br />
              <span className="text-zinc-500 font-light text-4xl md:text-5xl">Developer</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl"
            >
              I have <span className="text-purple-300 font-medium">2+ years</span> of experience in modern web technologies,
              specializing in AI-powered applications. I combine technical expertise with business knowledge
              through my <span className="text-purple-300 font-medium">Bachelor of Business Administration</span>.
            </motion.p>

            {/* Tags — flowing not uniform */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-12"
            >
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 cursor-default"
                >
                  <Sparkles size={9} />
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Info rows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {highlights.map((item) => (
                <div
                  key={item.value}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                >
                  <item.icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-sm text-zinc-300">{item.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow"
            >
              <Download size={15} />
              Download Resume
            </motion.a>
          </div>

          {/* Right — Profile + floating stat chips */}
          <div className="lg:col-span-5 relative h-[480px] lg:h-[560px]" ref={statsRef}>

            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: -2 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-[5%] top-[5%] w-[78%] aspect-[3/4] rounded-3xl overflow-hidden"
            >
              {/* Purple gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-purple-800 p-[2px] z-10 pointer-events-none" />
              <div className="absolute inset-[2px] rounded-3xl overflow-hidden z-10">
                <Image
                  src="/profile.jpeg"
                  alt="Yusra Ateeq"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Floating stat chips — scattered organically */}
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + stat.delay, ease: [0.76, 0, 0.24, 1] }}
                className="absolute z-20 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-black/60 backdrop-blur-xl border border-purple-500/30 shadow-xl shadow-purple-500/10"
                style={{ left: stat.x, top: stat.y, transform: "translate(-50%,-50%)" }}
              >
                <span className="counter text-xl font-black text-white" data-target={parseInt(stat.value)}>{stat.value}</span>
                <span className="text-[9px] text-zinc-400 mt-0.5">{stat.label}</span>
              </motion.div>
            ))}

            {/* Open to work badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute z-20 bottom-[5%] right-[2%] flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-green-500/30"
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-white font-medium">Open to Work</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SVG wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20" fill="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#050505" />
        </svg>
      </div>
    </section>
  );
}
