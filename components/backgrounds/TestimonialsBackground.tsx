"use client";

import { useCanvasBackground, drawGradientCircle } from "@/hooks/useCanvasBackground";

export function TestimonialsBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.0008;

      for (let i = 0; i < 10; i++) {
        const cx = w * (0.1 + ((i * 0.08 + Math.sin(t * 0.03 + i * 0.5) * 0.03) % 0.8));
        const cy = h * (0.1 + ((i * 0.09 + Math.cos(t * 0.04 + i * 0.6) * 0.03) % 0.8));
        const r = 15 + ((i * 13) % 25) + Math.sin(t * 0.04 + i * 0.3) * 4;
        drawGradientCircle(ctx, cx, cy, r, ["#c084fc44", "#c084fc00"], 0.025 + Math.sin(t * 0.03 + i) * 0.01);

        ctx.save();
        ctx.globalAlpha = 0.015 + Math.sin(t * 0.02 + i * 0.4) * 0.008;
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.02;
      for (let x = 0; x < w; x += 3) {
        const y = h * 0.5 + Math.sin(x * 0.008 + t * 0.02) * 25 + Math.sin(x * 0.015 + t * 0.012) * 12;
        ctx.fillStyle = "#c084fc";
        ctx.fillRect(x, y, 2, h - y);
      }
      ctx.restore();

      for (let i = 0; i < 6; i++) {
        const hx = w * (0.1 + ((i * 0.15 + Math.sin(t * 0.02 + i * 0.7) * 0.02) % 0.8));
        const hy = h * (0.2 + ((i * 0.13 + Math.cos(t * 0.025 + i * 0.5) * 0.02) % 0.6));
        ctx.save();
        ctx.globalAlpha = 0.02;
        for (let j = 0; j < 8; j++) {
          const a = (j / 8) * Math.PI * 2 + t * 0.015;
          const px = hx + Math.cos(a) * (4 + Math.sin(t * 0.01 + j) * 2);
          const py = hy + Math.sin(a) * (4 + Math.cos(t * 0.01 + j) * 2);
          ctx.fillStyle = "#c084fc";
          ctx.beginPath();
          ctx.arc(px, py, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
