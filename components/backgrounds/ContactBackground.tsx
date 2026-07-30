"use client";

import { useRef, useEffect } from "react";
import { useCanvasBackground, drawGlowLine } from "@/hooks/useCanvasBackground";

export function ContactBackground() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.001;
      const cx = w / 2 + (mouseRef.current.x - 0.5) * 20;
      const cy = h / 2 + (mouseRef.current.y - 0.5) * 20;

      const nodes = 24;
      const pts: { x: number; y: number; r: number }[] = [];

      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 + t * 0.004;
        const radius = Math.min(w, h) * 0.22 + ((i * 37) % 50);
        pts.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius * 0.55,
          r: 1.5 + ((i * 11) % 3),
        });
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            const alpha = (1 - d / 160) * 0.06;
            drawGlowLine(ctx, pts[i].x, pts[i].y, pts[j].x, pts[j].y, "#a855f7", alpha, (1 - d / 160) * 1.5);
          }
        }
      }

      for (const p of pts) {
        ctx.save();
        ctx.globalAlpha = 0.2 + Math.sin(t * 0.025 + p.x * 0.005) * 0.15;
        ctx.fillStyle = "#c084fc";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + Math.sin(t * 0.04 + p.x * 0.01) * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (let i = 0; i < 8; i++) {
        const angle = t * 0.015 + i * 0.785;
        const radius = 40 + i * 22;
        const ox = cx + Math.cos(angle) * radius;
        const oy = cy + Math.sin(angle) * radius * 0.45;
        ctx.save();
        ctx.globalAlpha = 0.03;
        ctx.fillStyle = "#a855f7";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(ox, oy, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.015;
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 30 + Math.sin(t * 0.015) * 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
