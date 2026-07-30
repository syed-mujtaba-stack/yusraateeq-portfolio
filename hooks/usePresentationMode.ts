"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CURSOR_HIDE_DELAY = 3000; // ms of inactivity before cursor hides

export function usePresentationMode(isFullscreen: boolean) {
  const [cursorHidden, setCursorHidden] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Add/remove the "presentation" class on <html> so CSS can respond globally
  useEffect(() => {
    const root = document.documentElement;
    if (isFullscreen) {
      root.classList.add("presentation-mode");
    } else {
      root.classList.remove("presentation-mode");
      setCursorHidden(false);
    }
    return () => root.classList.remove("presentation-mode");
  }, [isFullscreen]);

  // Hide cursor after inactivity, show again on move
  const resetCursorTimer = useCallback(() => {
    if (!isFullscreen) return;
    setCursorHidden(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCursorHidden(true), CURSOR_HIDE_DELAY);
  }, [isFullscreen]);

  useEffect(() => {
    if (!isFullscreen) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setCursorHidden(false);
      return;
    }

    // Start the timer immediately on entering presentation mode
    resetCursorTimer();

    window.addEventListener("mousemove", resetCursorTimer, { passive: true });
    window.addEventListener("mousedown", resetCursorTimer, { passive: true });
    window.addEventListener("keydown", resetCursorTimer, { passive: true });
    window.addEventListener("touchstart", resetCursorTimer, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", resetCursorTimer);
      window.removeEventListener("mousedown", resetCursorTimer);
      window.removeEventListener("keydown", resetCursorTimer);
      window.removeEventListener("touchstart", resetCursorTimer);
    };
  }, [isFullscreen, resetCursorTimer]);

  // Apply cursor style to body
  useEffect(() => {
    document.body.style.cursor =
      isFullscreen && cursorHidden ? "none" : "";
  }, [isFullscreen, cursorHidden]);

  return { cursorHidden };
}
