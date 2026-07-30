"use client";

import { useEffect, useRef } from "react";

export function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let time = 0;
    let lastFrameTime = 0;
    const FPS = 24;
    const fpsInterval = 1000 / FPS;

    // Draw at half resolution then CSS-scale up — huge fill-rate saving
    const SCALE = 0.5;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * SCALE);
      canvas.height = Math.floor(window.innerHeight * SCALE);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);

      const elapsed = now - lastFrameTime;
      if (elapsed < fpsInterval) return;
      lastFrameTime = now - (elapsed % fpsInterval);

      time += 0.003;
      const { width: w, height: h } = canvas;

      ctx.clearRect(0, 0, w, h);

      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      const hue1 = 270 + Math.sin(time * 0.5) * 20;
      const hue2 = 290 + Math.sin(time * 0.3 + 1) * 15;
      const hue3 = 250 + Math.sin(time * 0.4 + 2) * 10;

      gradient.addColorStop(0, `hsla(${hue1}, 80%, 60%, 0.15)`);
      gradient.addColorStop(0.3, `hsla(${hue2}, 70%, 70%, 0.10)`);
      gradient.addColorStop(0.6, `hsla(${hue3}, 60%, 50%, 0.08)`);
      gradient.addColorStop(1, `hsla(${hue1 + 30}, 80%, 60%, 0.12)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // 3 wave bands — reduced lineWidth for perf
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const yOffset = Math.cos(time * 0.7 + i) * h * 0.1;

        for (let x = 0; x < w; x += 3) {
          const y =
            h * (0.3 + i * 0.15) +
            Math.sin(x * 0.006 + time * 2 + i) * 20 +
            Math.sin(x * 0.014 + time * 1.3 + i * 2) * 10 +
            yOffset;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${hue1 + i * 20}, 80%, 70%, 0.07)`;
        ctx.lineWidth = 20 + Math.sin(time + i) * 5;
        ctx.stroke();
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.6,
        willChange: "transform",
        imageRendering: "pixelated",
      }}
    />
  );
}
