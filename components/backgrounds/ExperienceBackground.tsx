"use client";

import { useCanvasBackground } from "@/hooks/useCanvasBackground";

export function ExperienceBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.001;
      const cx = w * 0.5;

      ctx.save();
      ctx.globalAlpha = 0.04;
      for (let i = 0; i < 8; i++) {
        const x = cx + Math.sin(t * 0.15 + i * 0.8) * 250;
        ctx.strokeStyle = i % 2 === 0 ? "#a855f7" : "#c084fc";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.quadraticCurveTo(x + Math.sin(t * 0.1 + i) * 40, h * 0.5, x + Math.sin(t * 0.12 + i * 2) * 60, h);
        ctx.stroke();
      }
      ctx.restore();

      const grad = ctx.createLinearGradient(cx, 0, cx, h);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.15, "rgba(168,85,247,0.03)");
      grad.addColorStop(0.5, "rgba(192,132,252,0.06)");
      grad.addColorStop(0.85, "rgba(168,85,247,0.03)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(cx - 2, 0, 4, h);

      ctx.save();
      for (let i = 0; i < 50; i++) {
        const py = ((i / 50) * h + t * 60) % h;
        const offset = Math.sin(py * 0.008 + t * 0.5) * 25;
        const alpha = 0.06 + Math.sin(py * 0.004 + t * 1.5) * 0.04;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = i % 3 === 0 ? "#c084fc" : "#a855f7";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(cx + offset, py, 1.5 + Math.sin(py * 0.005 + t * 2) * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
