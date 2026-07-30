"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Sparkles, Mail } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { HeroBackground } from "@/components/backgrounds/HeroBackground";
import { MagneticButton } from "@/components/effects/MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!typingRef.current) return;
    const text = "Agentic AI, Full Stack Engineering, Cloud Infrastructure and Modern UI Design.";
    let index = 0;
    typingRef.current.textContent = "";
    const interval = setInterval(() => {
      if (index < text.length) {
        if (typingRef.current) typingRef.current.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { icon: SiGithub, href: "https://github.com/yusraateeq", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/yusra-ateeq-00797a2b1", label: "LinkedIn" },
    { icon: SiInstagram, href: "https://www.instagram.com/ateeq.yusra", label: "Instagram" },
    { icon: Mail, href: "mailto:yusraateeq112@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-transparent to-black/80 z-[1]" />

      {/* Floating social icons */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 3.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4"
      >
        {socials.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, x: 3 }}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300"
            aria-label={s.label}
          >
            <s.icon className="w-4 h-4" />
          </motion.a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-purple-500/50 to-transparent mx-auto mt-2" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Profile image with ring animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 2.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-8"
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 p-[2px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-black" />
            </motion.div>
            <div className="absolute inset-[3px] rounded-full overflow-hidden">
              <Image
                src="/profile.jpeg"
                alt="Yusra Ateeq"
                fill
                sizes="144px"
                className="object-cover"
                priority
              />
            </div>
            <motion.div
              className="absolute -inset-4 rounded-full border border-purple-500/20"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 backdrop-blur-sm">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={14} />
            </motion.span>
            Agentic AI Engineer & Full Stack Developer
          </span>
        </motion.div>

        {/* Heading with split letter animation */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 3.0 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 overflow-hidden"
        >
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 3.0, ease: [0.76, 0, 0.24, 1] }}
            className="inline-block text-zinc-400 font-light"
          >
            Hi, I'm
          </motion.span>
          <br />
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 3.2, ease: [0.76, 0, 0.24, 1] }}
            className="inline-block text-white"
          >
            Yusra <span className="text-purple-400 gradient-text">Ateeq</span>
          </motion.span>
        </motion.h1>

        {/* Animated subtitle with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.5, ease: [0.76, 0, 0.24, 1] }}
          className="mb-4"
        >
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            I build intelligent software powered by
            <br />
            <span ref={typingRef} className="text-purple-300" />
            {typingDone && <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-purple-400">|</motion.span>}
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.8 }}
          className="text-sm text-zinc-500 mb-10 italic flex items-center gap-2"
        >
          <span className="w-8 h-px bg-purple-500/50" />
          Building tomorrow with AI
          <span className="w-8 h-px bg-purple-500/50" />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.0, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton>
            <button
              onClick={scrollToContact}
              className="group relative px-8 py-3 bg-purple-600 text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:bg-purple-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's Work Together
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown size={16} />
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </button>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={scrollToAbout}
              className="group relative px-8 py-3 rounded-full font-medium overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 text-zinc-300 group-hover:text-white transition-colors">
                About Me
              </span>
              <div className="absolute inset-0 rounded-full border border-zinc-700 group-hover:border-purple-500/50 transition-all duration-300" />
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-zinc-700 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-purple-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
