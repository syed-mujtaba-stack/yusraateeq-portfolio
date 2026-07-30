"use client";

import { useCanvasBackground } from "@/hooks/useCanvasBackground";

export function TechStackBackground() {
  const ref = useCanvasBackground({
    onFrame(ctx, w, h, time) {
      const t = time * 0.0008;

      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 25; i++) {
        const x = ((i * 50 + t * 25) % (w + 60)) - 30;
        const y = ((i * 35 + t * 12 * (i % 2 === 0 ? 1 : -1)) % (h + 60)) - 30;
        const s = 20 + Math.sin(t * 0.005 + i) * 3;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(t * 0.005 * (i % 2 === 0 ? 1 : -1));
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const a = (j * Math.PI * 2) / 6 - Math.PI / 2;
          const px = s * Math.cos(a);
          const py = s * Math.sin(a);
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      ctx.save();
      ctx.font = "8px monospace";
      ctx.fillStyle = "#c084fc";
      for (let i = 0; i < 15; i++) {
        const x = ((i * 83 + t * 20 * (i % 2 === 0 ? 1 : -1)) % (w + 20)) - 10;
        const y = ((i * 47 + t * 8 * (i % 2 === 0 ? -1 : 1)) % (h + 20)) - 10;
        ctx.globalAlpha = 0.015 + Math.sin(t * 0.005 + i * 0.7) * 0.01;
        ctx.fillText(i % 3 === 0 ? "01" : i % 3 === 1 ? "10" : "11", x, y);
      }
      ctx.restore();

      ctx.save();
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 350);
      grad.addColorStop(0, "#a855f7");
      grad.addColorStop(0.5, "#7c3aed");
      grad.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.015;
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    },
  });

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
