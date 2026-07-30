"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp, Mail, MapPin } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FooterBackground } from "@/components/backgrounds/FooterBackground";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.05] overflow-hidden bg-[#050505]">
      <FooterBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg font-medium text-white mb-2">
              Yusra<span className="text-purple-400">.</span>
            </p>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Agentic AI Engineer & Full Stack Developer building intelligent software powered by AI, cloud, and modern UI.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-4">Connect</p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              {[
                { icon: SiGithub, href: "https://github.com/yusraateeq" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/yusra-ateeq-00797a2b1" },
                { icon: SiInstagram, href: "https://www.instagram.com/ateeq.yusra" },
              ].map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-purple-300 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                >
                  <link.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact & Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-right"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:from-purple-500/30 hover:to-fuchsia-500/30 transition-all duration-300 ml-auto mb-4"
            >
              <ArrowUp size={18} />
            </motion.button>
            <p className="text-xs text-zinc-600">
              Nazimabad, Karachi, Pakistan
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-zinc-600 flex items-center gap-1">
            © {new Date().getFullYear()} Yusra Ateeq. Built with <Heart size={10} className="text-purple-400" /> and caffeine.
          </p>
          <p className="text-xs text-zinc-700">
            Agentic AI · Full Stack · Cloud · DevOps
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
