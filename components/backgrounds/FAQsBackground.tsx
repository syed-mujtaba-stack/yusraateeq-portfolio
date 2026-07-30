"use client";

import { useCanvasBackground } from "@/hooks/useCanvasBackground";

export function FAQsBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.0008;

      for (let i = 0; i < 25; i++) {
        const x = ((i * 43 + t * 2 * (i % 2 === 0 ? 1 : -1)) % (w + 8)) - 4;
        const y = ((i * 29 + t * 1.5 * (i % 2 === 0 ? -1 : 1)) % (h + 8)) - 4;
        ctx.save();
        ctx.globalAlpha = 0.03 + Math.sin(t * 0.015 + i * 0.4) * 0.015;
        ctx.fillStyle = "#c084fc";
        ctx.beginPath();
        ctx.arc(x, y, 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.02;
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 3) {
          const y = h * 0.5 + Math.sin(x * 0.006 + t * 0.002 + i * Math.PI) * 12;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
