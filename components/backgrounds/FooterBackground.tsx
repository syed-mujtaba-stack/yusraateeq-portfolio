"use client";

import { useCanvasBackground, drawStar } from "@/hooks/useCanvasBackground";

export function FooterBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.001;

      for (let i = 0; i < 120; i++) {
        const x = ((i * 37) % w);
        const y = ((i * 53) % h);
        const twinkle = 0.2 + Math.sin(t * 0.5 + i * 1.7) * 0.2;
        drawStar(ctx, x, y, 0.3 + (i % 5) * 0.2, twinkle * 0.5);
      }

      ctx.save();
      ctx.globalAlpha = 0.02;
      const nebula = ctx.createRadialGradient(w * 0.7, h * 0.3, 0, w * 0.7, h * 0.3, 200);
      nebula.addColorStop(0, "#c084fc");
      nebula.addColorStop(0.5, "#a855f7");
      nebula.addColorStop(1, "transparent");
      ctx.fillStyle = nebula;
      ctx.beginPath();
      ctx.arc(w * 0.7, h * 0.3, 200, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      const auroraGrad = ctx.createLinearGradient(0, h * 0.2, 0, h);
      auroraGrad.addColorStop(0, "transparent");
      auroraGrad.addColorStop(0.2, "rgba(168,85,247,0.02)");
      auroraGrad.addColorStop(0.5, "rgba(124,58,237,0.015)");
      auroraGrad.addColorStop(1, "transparent");
      ctx.fillStyle = auroraGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.015;
      const moonGrad = ctx.createRadialGradient(w * 0.85, h * 0.15, 5, w * 0.85, h * 0.15, 60);
      moonGrad.addColorStop(0, "rgba(192,132,252,0.15)");
      moonGrad.addColorStop(1, "transparent");
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(w * 0.85, h * 0.15, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
