import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("custom", "0.76, 0, 0.24, 1");

export const animateIn = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay,
      ease: "custom",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const staggerChildren = (
  container: string | Element,
  children: string,
  staggerAmount = 0.1
) => {
  return gsap.fromTo(
    `${container} ${children}`,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: staggerAmount,
      ease: "custom",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const scaleIn = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay,
      ease: "custom",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const revealText = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { y: "100%", rotation: 5 },
    {
      y: 0,
      rotation: 0,
      duration: 1.2,
      delay,
      ease: "custom",
    }
  );
};

export const parallaxScroll = (
  element: string | Element,
  distance = 100
) => {
  return gsap.to(element, {
    y: distance,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};
