"use client";

import { useCanvasBackground, drawGradientCircle } from "@/hooks/useCanvasBackground";

export function AboutBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.0008;

      ctx.save();
      ctx.globalAlpha = 0.06;
      for (let x = 0; x < w; x += 3) {
        const y = h * 0.5
          + Math.sin(x * 0.005 + t * 0.3) * 40
          + Math.sin(x * 0.008 + t * 0.2) * 20
          + Math.sin(x * 0.012 + t * 0.15) * 10;
        ctx.fillStyle = "#c084fc";
        ctx.fillRect(x, y, 2, h - y);
      }
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.04;
      for (let x = 0; x < w; x += 4) {
        const y = h * 0.45
          + Math.sin(x * 0.004 + t * 0.25) * 35
          + Math.cos(x * 0.007 + t * 0.18) * 25;
        ctx.fillStyle = "#a855f7";
        ctx.fillRect(x, y, 1, h - y);
      }
      ctx.restore();

      drawGradientCircle(ctx, w * 0.25 + Math.sin(t * 0.2) * 30, h * 0.3 + Math.cos(t * 0.15) * 20, 200, ["#a855f744", "#a855f700"], 0.08);
      drawGradientCircle(ctx, w * 0.75 + Math.cos(t * 0.18) * 25, h * 0.6 + Math.sin(t * 0.12) * 20, 250, ["#7c3aed44", "#7c3aed00"], 0.06);
      drawGradientCircle(ctx, w * 0.5 + Math.sin(t * 0.1) * 40, h * 0.8 + Math.cos(t * 0.08) * 15, 180, ["#c084fc33", "#c084fc00"], 0.05);

      for (let i = 0; i < 5; i++) {
        const bx = w * (0.15 + ((i * 0.18 + Math.sin(t * 0.05 + i * 0.5) * 0.03) % 0.7));
        const by = h * (0.2 + ((i * 0.15 + Math.cos(t * 0.04 + i * 0.6) * 0.03) % 0.6));
        ctx.save();
        ctx.globalAlpha = 0.06;
        for (let j = 0; j < 6; j++) {
          const angle = (j / 6) * Math.PI * 2 + t * 0.02 * (i % 2 === 0 ? 1 : -1);
          const rx = bx + Math.cos(angle) * (10 + Math.sin(t * 0.03 + i + j) * 5);
          const ry = by + Math.sin(angle) * (8 + Math.cos(t * 0.03 + i + j) * 4);
          ctx.fillStyle = i % 2 === 0 ? "#c084fc" : "#a855f7";
          ctx.beginPath();
          ctx.arc(rx, ry, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
