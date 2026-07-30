"use client";

import { useCanvasBackground } from "@/hooks/useCanvasBackground";

export function ProjectsBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.001;

      for (let i = 0; i < 10; i++) {
        const x = ((i * 120 + t * 12 * (i % 2 === 0 ? 1 : -1)) % (w + 80)) - 40;
        const y = ((i * 80 + t * 6 * (i % 2 === 0 ? -1 : 1)) % (h + 80)) - 40;
        const pw = 50 + ((i * 13) % 30);
        const ph = 35 + ((i * 11) % 25);
        const alpha = 0.015 + Math.sin(t * 0.04 + i * 0.6) * 0.01;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = "#1a1a2e";
        ctx.strokeStyle = i % 3 === 0 ? "#c084fc" : "#a855f7";
        ctx.lineWidth = 0.5;
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(x, y, pw, ph, 3);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.018;
      for (let i = 0; i < 3; i++) {
        const sx = ((i * 200 + t * 6) % (w + 100)) - 50;
        const spot = ctx.createRadialGradient(sx, h * 0.3, 0, sx, h * 0.3, 100 + i * 40);
        spot.addColorStop(0, "#a855f7");
        spot.addColorStop(1, "transparent");
        ctx.fillStyle = spot;
        ctx.beginPath();
        ctx.arc(sx, h * 0.3, 100 + i * 40, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.015;
      const fog = ctx.createRadialGradient(w / 2, h * 0.7, 0, w / 2, h * 0.7, 300);
      fog.addColorStop(0, "#7c3aed");
      fog.addColorStop(1, "transparent");
      ctx.fillStyle = fog;
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.7, 300, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
