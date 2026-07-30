"use client";

import { useRef, useEffect } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number; life: number;
}

interface CanvasBGConfig {
  onInit?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  onFrame: (ctx: CanvasRenderingContext2D, w: number, h: number, time: number, dt: number) => void;
  onResize?: (w: number, h: number) => void;
  /** Target frames per second. Default 30 — halves CPU cost vs 60fps */
  fps?: number;
}

export function createParticle(x: number, y: number, opts?: Partial<Particle>): Particle {
  return {
    x, y,
    vx: opts?.vx ?? (Math.random() - 0.5) * 0.5,
    vy: opts?.vy ?? (Math.random() - 0.5) * 0.5,
    size: opts?.size ?? Math.random() * 2 + 0.5,
    alpha: opts?.alpha ?? Math.random() * 0.5 + 0.3,
    life: opts?.life ?? 1,
  };
}

export function useCanvasBackground(config: CanvasBGConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let visible = true;
    let raf: number;
    let lastFrameTime = 0;
    const targetFps = configRef.current.fps ?? 30;
    const fpsInterval = 1000 / targetFps;

    const resize = () => {
      // Cap DPR at 1 for background canvases — huge perf win on retina screens
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      configRef.current.onInit?.(ctx, w, h);
      configRef.current.onResize?.(w, h);
    };

    // Pause animation when canvas is not visible in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    resize();

    // Debounced resize to avoid thrashing on window resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);

      if (!visible || reducedMotion) return;

      const elapsed = now - lastFrameTime;
      if (elapsed < fpsInterval) return; // fps cap

      // Snap to the frame boundary to avoid drift
      lastFrameTime = now - (elapsed % fpsInterval);

      const dt = Math.min(elapsed, 50); // clamp dt to 50ms max
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      configRef.current.onFrame(ctx, w, h, now, dt);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return canvasRef;
}

export function drawGradientCircle(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  colors: [string, string],
  alpha = 0.15
) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(1, colors[1]);
  ctx.fillStyle = grad;
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

export function drawGlowLine(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  color: string, alpha = 0.15, width = 1
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, size: number,
  alpha: number, color = "#a855f7"
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
