"use client";

import { useEffect, useRef } from "react";

export function NoiseTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Draw at a small fixed size then tile via CSS background
    // This is vastly cheaper than filling the full viewport every frame
    const TILE = 256;
    canvas.width = TILE;
    canvas.height = TILE;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    let timer: ReturnType<typeof setInterval>;

    const draw = () => {
      const imageData = ctx.createImageData(TILE, TILE);
      const data = imageData.data;
      // Use a simple LCG PRNG instead of Math.random() — ~3× faster
      let seed = Date.now() & 0xffff;
      for (let i = 0; i < data.length; i += 4) {
        // LCG: next = (a * seed + c) % m
        seed = (seed * 1664525 + 1013904223) & 0xffffffff;
        const noise = (seed >>> 24); // 0-255
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 25; // slightly reduced opacity
      }
      ctx.putImageData(imageData, 0, 0);
    };

    draw();
    // Refresh noise at ~8fps — imperceptible flicker, much lower CPU
    timer = setInterval(draw, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        opacity: 0.35,
        mixBlendMode: "overlay",
        // Tile the 256×256 canvas across the viewport — no resize needed
        width: "100vw",
        height: "100vh",
        imageRendering: "pixelated",
        willChange: "transform",
      }}
    />
  );
}
