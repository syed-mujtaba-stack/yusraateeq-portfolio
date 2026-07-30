"use client";

import { useCanvasBackground, drawGradientCircle } from "@/hooks/useCanvasBackground";

export function CertificatesBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.0008;

      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + t * 0.008;
        const len = 120 + Math.sin(t * 0.025 + i * 1.1) * 40;
        ctx.save();
        ctx.globalAlpha = 0.015;
        const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, len);
        grad.addColorStop(0, i % 2 === 0 ? "#c084fc" : "#fbbf24");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(w / 2, h / 2);
        ctx.arc(w / 2, h / 2, len, angle - 0.12, angle + 0.12);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      drawGradientCircle(ctx, w * 0.25 + Math.sin(t * 0.05) * 15, h * 0.7 + Math.cos(t * 0.04) * 10, 160, ["#a855f722", "#a855f700"], 0.03);
      drawGradientCircle(ctx, w * 0.75 + Math.cos(t * 0.045) * 15, h * 0.3 + Math.sin(t * 0.035) * 10, 150, ["#7c3aed22", "#7c3aed00"], 0.025);

      for (let i = 0; i < 8; i++) {
        const x = ((i * 85 + t * 8 * (i % 2 === 0 ? 1 : -1)) % (w + 30)) - 15;
        const y = ((i * 55 + t * 5 * (i % 2 === 0 ? -1 : 1)) % (h + 30)) - 15;
        ctx.save();
        ctx.globalAlpha = 0.015 + Math.sin(t * 0.02 + i * 0.6) * 0.008;
        ctx.fillStyle = i % 2 === 0 ? "#fbbf24" : "#c084fc";
        ctx.shadowColor = i % 2 === 0 ? "#fbbf24" : "#a855f7";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.roundRect(x, y, 18, 24, 2);
        ctx.fill();
        ctx.fillStyle = i % 2 === 0 ? "#fbbf24" : "#a855f7";
        ctx.fillRect(x + 3, y + 4, 12, 2);
        ctx.fillRect(x + 3, y + 9, 9, 2);
        ctx.fillRect(x + 3, y + 14, 11, 2);
        ctx.restore();
      }
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
