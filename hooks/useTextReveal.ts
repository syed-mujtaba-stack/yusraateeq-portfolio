"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("reveal", "0.76, 0, 0.24, 1");

export function useTextReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lines = el.querySelectorAll(".reveal-line");
    lines.forEach((line) => {
      const content = line.textContent;
      line.textContent = "";
      const wrapper = document.createElement("span");
      wrapper.className = "inline-block overflow-hidden";
      const inner = document.createElement("span");
      inner.className = "inline-block";
      inner.textContent = content;
      wrapper.appendChild(inner);
      line.appendChild(wrapper);

      gsap.fromTo(
        inner,
        { y: "100%", rotate: 5 },
        {
          y: 0,
          rotate: 0,
          duration: 1.2,
          delay,
          ease: "reveal",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [delay]);

  return ref;
}
