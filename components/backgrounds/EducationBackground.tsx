"use client";

import { useCanvasBackground } from "@/hooks/useCanvasBackground";

export function EducationBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.0008;
      const cx = w / 2;
      const cy = h / 2;

      const stars: { x: number; y: number }[] = [];
      const count = 70;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t * 0.01;
        const radius = 80 + ((i * 53) % 200);
        stars.push({
          x: cx + Math.cos(angle + i * 0.3) * radius,
          y: cy + Math.sin(angle * 1.2 + i * 0.2) * radius * 0.35,
        });
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 80) * 0.1;
            ctx.strokeStyle = "#a855f7";
            ctx.lineWidth = 0.5;
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      for (const s of stars) {
        const pulse = 0.2 + Math.sin(t * 1.2 + s.x * 0.005 + s.y * 0.005) * 0.2;
        ctx.save();
        ctx.globalAlpha = pulse + 0.1;
        ctx.fillStyle = "#c084fc";
        ctx.shadowColor = "#c084fc";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2 + Math.sin(t + s.x * 0.01) * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (let i = 0; i < 3; i++) {
        const angle = t * 0.015 + i * 2.1;
        const radius = 60 + i * 35;
        ctx.save();
        ctx.globalAlpha = 0.04;
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(cx + Math.cos(angle) * 20, cy + Math.sin(angle) * 10, radius, radius * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.03;
      const moonGrad = ctx.createRadialGradient(cx - w * 0.3, cy - h * 0.3, 10, cx - w * 0.3, cy - h * 0.3, 100);
      moonGrad.addColorStop(0, "#c084fc");
      moonGrad.addColorStop(0.5, "#a855f7");
      moonGrad.addColorStop(1, "transparent");
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(cx - w * 0.3, cy - h * 0.3, 100, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
