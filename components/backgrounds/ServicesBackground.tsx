"use client";

import { useCanvasBackground } from "@/hooks/useCanvasBackground";

export function ServicesBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.0008;

      for (let i = 0; i < 6; i++) {
        const x = w * (0.12 + ((i * 0.14 + Math.sin(t * 0.04 + i * 0.6) * 0.04) % 0.76));
        const y = h * (0.15 + ((i * 0.12 + Math.cos(t * 0.03 + i * 0.5) * 0.04) % 0.7));
        const size = 25 + Math.sin(t * 0.04 + i * 0.8) * 8;
        const alpha = 0.02 + Math.sin(t * 0.05 + i * 0.3) * 0.015;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.strokeStyle = i % 2 === 0 ? "#a855f7" : "#c084fc";
        ctx.lineWidth = 1;
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 10;
        ctx.translate(x, y);
        ctx.rotate(t * 0.015 + i * 0.4);
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size * 1.2, size * 0.15);
        ctx.stroke();
        ctx.restore();
      }

      const sweepX = ((t * 40) % (w + 80)) - 40;
      ctx.save();
      ctx.globalAlpha = 0.03;
      const sweep = ctx.createLinearGradient(sweepX - 30, 0, sweepX + 30, 0);
      sweep.addColorStop(0, "transparent");
      sweep.addColorStop(0.5, "rgba(192,132,252,0.4)");
      sweep.addColorStop(1, "transparent");
      ctx.fillStyle = sweep;
      ctx.fillRect(sweepX - 30, 0, 60, h);
      ctx.restore();

      for (let i = 0; i < 15; i++) {
        const px = ((i * 73 + (t * 10 * (i % 2 === 0 ? 1 : -1)) % (w + 10)) % (w + 10)) - 5;
        const py = ((i * 43 + (t * 6 * (i % 2 === 0 ? -1 : 1)) % (h + 10)) % (h + 10)) - 5;
        ctx.save();
        ctx.globalAlpha = 0.02 + Math.sin(t * 0.02 + i * 0.5) * 0.01;
        ctx.fillStyle = "#c084fc";
        ctx.shadowColor = "#c084fc";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
