"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, CustomEase, TextPlugin);

CustomEase.create("premium", "0.76, 0, 0.24, 1");
CustomEase.create("bounce", "0.68, -0.55, 0.265, 1.55");
CustomEase.create("smooth", "0.25, 0.1, 0.25, 1");

export const splitText = (element: string | Element, delay = 0) => {
  const el = typeof element === "string" ? document.querySelector(element) : element;
  if (!el) return;

  const chars = el.textContent?.split("") || [];
  el.textContent = "";
  chars.forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    el.appendChild(span);
  });

  return gsap.fromTo(
    el.children,
    { y: "100%", opacity: 0, rotate: 15 },
    {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.8,
      stagger: 0.03,
      delay,
      ease: "premium",
    }
  );
};

export const revealFromBottom = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { y: 120, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      delay,
      ease: "premium",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const staggerCards = (container: string, children: string, staggerAmount = 0.12) => {
  return gsap.fromTo(
    `${container} ${children}`,
    { y: 80, opacity: 0, scale: 0.9 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.9,
      stagger: staggerAmount,
      ease: "premium",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const horizontalReveal = (element: string | Element, fromRight = false) => {
  return gsap.fromTo(
    element,
    { x: fromRight ? 200 : -200, opacity: 0, skewX: fromRight ? -5 : 5 },
    {
      x: 0,
      opacity: 1,
      skewX: 0,
      duration: 1,
      ease: "premium",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const scaleReveal = (element: string | Element) => {
  return gsap.fromTo(
    element,
    { scale: 0.5, opacity: 0, rotate: -5 },
    {
      scale: 1,
      opacity: 1,
      rotate: 0,
      duration: 1,
      ease: "bounce",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const parallaxImage = (element: string | Element, speed = 0.3) => {
  return gsap.to(element, {
    y: `${speed * 100}%`,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const counterAnimation = (element: string | Element, target: number, duration = 2) => {
  return gsap.fromTo(
    element,
    { textContent: 0 },
    {
      textContent: target,
      duration,
      ease: "premium",
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const createTimeline = () => {
  return gsap.timeline({ defaults: { ease: "premium", duration: 0.8 } });
};
