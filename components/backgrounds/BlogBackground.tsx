"use client";

import { useCanvasBackground, drawGradientCircle } from "@/hooks/useCanvasBackground";

export function BlogBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.0008;

      drawGradientCircle(ctx, w * 0.2 + Math.sin(t * 0.04) * 15, h * 0.15 + Math.sin(t * 0.03) * 10, 150, ["#a855f722", "#a855f700"], 0.025);
      drawGradientCircle(ctx, w * 0.8 + Math.cos(t * 0.035) * 15, h * 0.85 + Math.cos(t * 0.025) * 10, 180, ["#7c3aed22", "#7c3aed00"], 0.03);
      drawGradientCircle(ctx, w * 0.5 + Math.sin(t * 0.02) * 20, h * 0.5 + Math.cos(t * 0.015) * 15, 200, ["#c084fc11", "#c084fc00"], 0.015);

      ctx.save();
      ctx.globalAlpha = 0.008;
      for (let i = 0; i < 6; i++) {
        const y = h * (0.1 + i * 0.14) + Math.sin(t * 0.004 + i * 0.6) * 8;
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = 0; x < w; x += 3) {
          const yy = y + Math.sin(x * 0.015 + t * 0.004 + i * 0.8) * 6;
          x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      for (let i = 0; i < 15; i++) {
        const x = ((i * 61 + (t * 6 * (i % 2 === 0 ? 1 : -1)) % (w + 15)) % (w + 15)) - 7;
        const y = ((i * 43 + (t * 4 * (i % 2 === 0 ? -1 : 1)) % (h + 15)) % (h + 15)) - 7;
        ctx.globalAlpha = 0.015 + Math.sin(t * 0.012 + i * 0.4) * 0.008;
        ctx.fillStyle = "#c084fc";
        ctx.beginPath();
        ctx.arc(x, y, 0.8 + Math.sin(t * 0.015 + i * 0.5) * 0.4, 0, Math.PI * 2);
        ctx.fill();
        const driftX = Math.sin(t * 0.008 + i * 0.9) * 15;
        const driftY = Math.cos(t * 0.01 + i * 0.7) * 12;
        ctx.globalAlpha *= 0.5;
        ctx.beginPath();
        ctx.arc(x + driftX, y + driftY, 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
