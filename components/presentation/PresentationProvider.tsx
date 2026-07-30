"use client";

import { useEffect, useRef } from "react";
import { useFullscreen } from "@/hooks/useFullscreen";
import { usePresentationMode } from "@/hooks/usePresentationMode";
import { useContentProtection } from "@/hooks/useContentProtection";
import { useDevToolsDetection } from "@/hooks/useDevToolsDetection";
import { FullscreenTransition } from "./FullscreenTransition";
import { DevToolsOverlay } from "./DevToolsOverlay";

/**
 * Drop this once inside the client component tree (e.g. Providers).
 * It wires all presentation + protection behaviour with zero visible UI
 * unless fullscreen is active or devtools are detected.
 */
export function PresentationProvider() {
  const { isFullscreen } = useFullscreen();
  usePresentationMode(isFullscreen);
  useContentProtection();
  const { detected, dismiss } = useDevToolsDetection();

  // Show a subtle "F for fullscreen" hint on first desktop visit
  const hintShownRef = useRef(false);
  useEffect(() => {
    if (hintShownRef.current) return;
    hintShownRef.current = true;
    // Only on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      const el = document.createElement("div");
      el.id = "fs-hint";
      el.innerHTML = `Press <kbd>F</kbd> for presentation mode`;
      Object.assign(el.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: "9999",
        padding: "8px 14px",
        borderRadius: "999px",
        background: "rgba(0,0,0,0.7)",
        border: "1px solid rgba(168,85,247,0.25)",
        color: "rgba(228,228,231,0.7)",
        fontSize: "11px",
        backdropFilter: "blur(12px)",
        letterSpacing: "0.05em",
        pointerEvents: "none",
        transition: "opacity 0.6s ease",
        opacity: "0",
      });
      document.body.appendChild(el);

      // Fade in
      requestAnimationFrame(() => { el.style.opacity = "1"; });
      // Fade out after 4 s
      setTimeout(() => {
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 700);
      }, 4000);
    }
  }, []);

  return (
    <>
      <FullscreenTransition isFullscreen={isFullscreen} />
      <DevToolsOverlay detected={detected} onDismiss={dismiss} />
    </>
  );
}
