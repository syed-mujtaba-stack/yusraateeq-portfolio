"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function TextReveal({ children, className = "", as: Tag = "h2", delay = 0 }: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const split = new SplitText(el, { type: "chars" });
    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 30, rotateX: -20 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1, ease: "power3.out",
        stagger: { each: 0.015, from: "start" },
        delay,
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      }
    );
    return () => split.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
