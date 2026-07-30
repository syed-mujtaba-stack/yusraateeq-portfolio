"use client";

import NextImage, { ImageProps } from "next/image";

interface ProtectedImageProps extends Omit<ImageProps, "draggable"> {
  /** Show a subtle branding watermark. Default true. */
  watermark?: boolean;
  /** Text for the watermark. Defaults to "© Yusra Ateeq" */
  watermarkText?: string;
}

/**
 * Drop-in replacement for next/image that adds:
 * - draggable=false
 * - pointer-events: none (CSS global) — overridable with className="interactive"
 * - onContextMenu prevention
 * - onDragStart prevention
 * - Optional transparent watermark overlay
 */
export function ProtectedImage({
  watermark = true,
  watermarkText = "© Yusra Ateeq",
  className = "",
  style,
  ...props
}: ProtectedImageProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ display: "inline-block", width: "100%", height: "100%", ...style }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <NextImage
        {...props}
        draggable={false}
        className={className}
        // pointer-events handled via CSS globally; interactive class re-enables
        style={{ pointerEvents: "none", userSelect: "none", WebkitUserSelect: "none" }}
      />

      {/* Transparent branding watermark */}
      {watermark && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-end justify-end p-2 pointer-events-none select-none"
        >
          <span
            className="text-[9px] font-medium tracking-widest uppercase"
            style={{
              color: "rgba(255,255,255,0.18)",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              letterSpacing: "0.2em",
            }}
          >
            {watermarkText}
          </span>
        </div>
      )}

      {/* Invisible blocking overlay — stops right-click > Save Image */}
      <div
        className="absolute inset-0 pointer-events-auto select-none"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{ background: "transparent", zIndex: 1 }}
      />
    </div>
  );
}
