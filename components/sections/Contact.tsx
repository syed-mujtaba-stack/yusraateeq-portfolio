"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle, Calendar, MessageSquare } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { icon: SiGithub, href: "https://github.com/yusraateeq", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/yusra-ateeq-00797a2b1", label: "LinkedIn" },
  { icon: SiInstagram, href: "https://www.instagram.com/ateeq.yusra", label: "Instagram" },
];

// Static constellation dot positions (no random to avoid hydration issues)
const constellationDots = [
  { x: 15, y: 20 }, { x: 35, y: 45 }, { x: 55, y: 15 }, { x: 70, y: 60 },
  { x: 20, y: 70 }, { x: 45, y: 80 }, { x: 80, y: 30 }, { x: 60, y: 85 },
  { x: 10, y: 50 }, { x: 90, y: 55 }, { x: 40, y: 30 }, { x: 75, y: 10 },
  { x: 25, y: 90 }, { x: 50, y: 50 }, { x: 85, y: 75 },
];

// Constellation lines connecting nearby dots
const constellationLines = [
  [0, 2], [2, 6], [6, 9], [1, 4], [4, 5], [5, 7], [3, 6], [8, 1], [10, 2], [11, 6],
];

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-[#050505]" ref={ref}>

      {/* Large decorative number */}
      <div className="absolute bottom-0 right-0 text-[22vw] font-black text-white/[0.015] leading-none select-none pointer-events-none pr-4 pb-0">
        09
      </div>

      {/* Split layout */}
      <div className="relative flex flex-col lg:flex-row min-h-screen">

        {/* LEFT PANEL — Dark void with constellation */}
        <div className="relative lg:w-[45%] bg-black flex flex-col justify-between p-10 lg:p-16 overflow-hidden">

          {/* Constellation SVG background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {constellationLines.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={constellationDots[a].x}
                y1={constellationDots[a].y}
                x2={constellationDots[b].x}
                y2={constellationDots[b].y}
                stroke="rgba(168,85,247,0.1)"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, delay: 1 + i * 0.15 }}
              />
            ))}
            {constellationDots.map((dot, i) => (
              <motion.circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r="0.6"
                fill="rgba(168,85,247,0.4)"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? {
                  opacity: [0, 0.6, 0.2, 0.7, 0.3],
                  scale: [0, 1, 0.8, 1, 0.9],
                } : {}}
                transition={{ duration: 3, delay: 0.5 + i * 0.1, repeat: Infinity, repeatType: "mirror" }}
              />
            ))}
          </svg>

          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(168,85,247,0.06)_0%,transparent_70%)] pointer-events-none" />

          {/* Glowing vertical divider on right edge */}
          <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-12"
            >
              <div className="w-8 h-px bg-purple-500" />
              <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">Contact</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6">
                Let's<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                  Talk
                </span>
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed max-w-xs">
                Have a project in mind? Let's build something extraordinary together.
              </p>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 space-y-4"
            >
              <a href="mailto:yusraateeq112@gmail.com"
                className="flex items-center gap-3 group text-zinc-500 hover:text-purple-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Mail size={13} className="text-purple-400" />
                </div>
                <span className="text-sm">yusraateeq112@gmail.com</span>
              </a>
              <a href="tel:+923162166336"
                className="flex items-center gap-3 group text-zinc-500 hover:text-purple-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Phone size={13} className="text-purple-400" />
                </div>
                <span className="text-sm">+92 316 2166336</span>
              </a>
              <div className="flex items-center gap-3 text-zinc-500">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <MapPin size={13} className="text-purple-400" />
                </div>
                <span className="text-sm">Nazimabad, Karachi, Pakistan</span>
              </div>
            </motion.div>
          </div>

          {/* Social links & availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative z-10"
          >
            {/* Available badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-zinc-400">Available for opportunities</span>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ y: -4, scale: 1.12 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-zinc-500 hover:text-purple-300 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                >
                  <link.icon className="w-4 h-4" />
                </motion.a>
              ))}
              <motion.a
                href="#"
                whileHover={{ y: -4 }}
                className="flex items-center gap-1.5 px-4 h-10 rounded-xl bg-white/[0.03] border border-white/[0.07] text-xs text-zinc-500 hover:text-purple-300 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
              >
                <Calendar size={12} /> Schedule
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT PANEL — Glass form */}
        <div className="relative lg:w-[55%] bg-[#0a0518] flex items-center justify-center p-8 lg:p-16">

          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(168,85,247,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 w-full max-w-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <MessageSquare className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Send a Message</h3>
                <p className="text-xs text-zinc-500">I'll get back within 24 hours</p>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-purple-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-zinc-400 text-sm">Thank you! I'll review your message and get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name", placeholder: "Your Name", type: "text" },
                  { name: "email", placeholder: "Your Email", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <div className={`relative rounded-xl border transition-all duration-300 ${
                      focusedField === field.name
                        ? "border-purple-500/50 bg-purple-500/[0.04] shadow-[0_0_20px_rgba(168,85,247,0.08)]"
                        : errors[field.name]
                        ? "border-red-500/50 bg-white/[0.02]"
                        : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                    }`}>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => { setFormData({ ...formData, [field.name]: e.target.value }); setErrors({ ...errors, [field.name]: "" }); }}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-5 py-4 bg-transparent text-white placeholder-zinc-600 text-sm focus:outline-none"
                      />
                    </div>
                    {errors[field.name] && (
                      <p className="text-xs text-red-400 mt-1 pl-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}

                <div>
                  <div className={`relative rounded-xl border transition-all duration-300 ${
                    focusedField === "message"
                      ? "border-purple-500/50 bg-purple-500/[0.04] shadow-[0_0_20px_rgba(168,85,247,0.08)]"
                      : errors.message
                      ? "border-red-500/50 bg-white/[0.02]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                  }`}>
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-5 py-4 bg-transparent text-white placeholder-zinc-600 text-sm focus:outline-none resize-none"
                    />
                  </div>
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1 pl-1">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                >
                  <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
