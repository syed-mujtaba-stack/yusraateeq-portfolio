"use client";

import { useRef, useEffect } from "react";
import { useCanvasBackground } from "@/hooks/useCanvasBackground";

export function SkillsBackground() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const ref = useCanvasBackground({
    onInit(_ctx, w, h) {},
    onFrame(ctx, w, h, time) {
      const t = time * 0.001;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const nodes = 30;
      const pts: { x: number; y: number; r: number; phase: number }[] = [];

      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 + t * 0.01;
        const radius = 90 + ((i * 73) % 160);
        const xoff = (mx - 0.5) * 25;
        const yoff = (my - 0.5) * 25;
        pts.push({
          x: w / 2 + Math.cos(angle) * radius + xoff,
          y: h / 2 + Math.sin(angle * 1.1) * radius * 0.35 + yoff,
          r: 1.5 + ((i * 17) % 3),
          phase: i * 0.4,
        });
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 130) * 0.12;
            ctx.strokeStyle = "#a855f7";
            ctx.lineWidth = (1 - d / 130) * 1.5;
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      for (const p of pts) {
        const alpha = 0.3 + Math.sin(t + p.phase) * 0.3;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#c084fc";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + Math.sin(t + p.phase) * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.025;
      for (let r = 0; r < 4; r++) {
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 0.5;
        const ringR = 100 + r * 40 + Math.sin(t * 0.08 + r) * 8;
        const xoff = (mx - 0.5) * 15;
        const yoff = (my - 0.5) * 15;
        ctx.beginPath();
        ctx.ellipse(w / 2 + xoff, h / 2 + yoff, ringR, ringR * 0.3, 0, t * 0.015 + r, t * 0.015 + r + Math.PI * 1.8);
        ctx.stroke();
      }
      ctx.restore();

      for (let i = 0; i < 3; i++) {
        const px = ((i * 137 + t * 15) % w);
        const py = h / 2 + Math.sin(t * 0.01 + i * 0.5) * 100;
        ctx.save();
        ctx.globalAlpha = 0.03;
        const pulse = ctx.createRadialGradient(px, py, 0, px, py, 30 + i * 20);
        pulse.addColorStop(0, "#c084fc");
        pulse.addColorStop(1, "transparent");
        ctx.fillStyle = pulse;
        ctx.beginPath();
        ctx.arc(px, py, 30 + i * 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
