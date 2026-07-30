"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { blogPosts } from "@/lib/data";
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { BlogBackground } from "@/components/backgrounds/BlogBackground";
import { TextReveal } from "@/components/effects/TextReveal";

const categoryColors: Record<string, string> = {
  "Building Intelligent Agents with LangChain": "from-purple-500/20 to-blue-500/20",
  "Modern Full Stack Architecture Patterns": "from-emerald-500/20 to-teal-500/20",
  "The Future of Agentic AI in Business": "from-orange-500/20 to-rose-500/20",
};

export function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const categories = ["AI", "Architecture", "Business"];

  return (
    <section id="blog" className="relative py-32 px-6 overflow-hidden bg-gradient-to-r from-[#1A082B] to-[#0D0D1A]">
      <BlogBackground />
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16"
        >
          <span className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4 block">Blog</span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-bold text-white">Latest <span className="text-zinc-400 font-light">Articles</span></TextReveal>
        </motion.div>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
              whileHover={{ y: -4 }}
              className="group relative block rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Featured image area */}
              <div className={`h-40 bg-gradient-to-br ${categoryColors[post.title] || "from-purple-500/10 to-fuchsia-500/10"} flex items-center justify-center relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="flex items-center gap-2 text-xs text-purple-300 bg-black/30 px-3 py-1.5 rounded-full border border-purple-500/20">
                  <BookOpen size={12} /> Article
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readingTime}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span className="flex items-center gap-1 text-purple-400">
                    <Tag size={11} />
                    {categories[i]}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>

                <span className="inline-flex items-center gap-1 text-xs text-purple-400 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight size={12} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
