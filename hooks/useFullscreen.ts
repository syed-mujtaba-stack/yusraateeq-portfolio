"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const doubleTapRef = useRef<number>(0);

  const enter = useCallback(async () => {
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) await (el as any).webkitRequestFullscreen();
      else if ((el as any).mozRequestFullScreen) await (el as any).mozRequestFullScreen();
      else if ((el as any).msRequestFullscreen) await (el as any).msRequestFullscreen();
    } catch {
      // Browser blocked fullscreen (e.g. iframe sandbox) — fail silently
    }
  }, []);

  const exit = useCallback(async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if ((document as any).webkitExitFullscreen) await (document as any).webkitExitFullscreen();
      else if ((document as any).mozCancelFullScreen) await (document as any).mozCancelFullScreen();
      else if ((document as any).msExitFullscreen) await (document as any).msExitFullscreen();
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    if (isFullscreen) exit();
    else enter();
  }, [isFullscreen, enter, exit]);

  // Sync state with native fullscreen changes (e.g. ESC key)
  useEffect(() => {
    const onChange = () => {
      const full =
        !!document.fullscreenElement ||
        !!(document as any).webkitFullscreenElement ||
        !!(document as any).mozFullScreenElement ||
        !!(document as any).msFullscreenElement;
      setIsFullscreen(full);
    };

    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    document.addEventListener("mozfullscreenchange", onChange);
    document.addEventListener("MSFullscreenChange", onChange);

    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
      document.removeEventListener("mozfullscreenchange", onChange);
      document.removeEventListener("MSFullscreenChange", onChange);
    };
  }, []);

  // Desktop: "F" key toggles fullscreen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      // Don't intercept when user is typing in an input
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Mobile: double-tap anywhere
  useEffect(() => {
    const DOUBLE_TAP_MS = 300;
    const onTouch = () => {
      const now = Date.now();
      if (now - doubleTapRef.current < DOUBLE_TAP_MS) {
        enter();
        doubleTapRef.current = 0;
      } else {
        doubleTapRef.current = now;
      }
    };
    window.addEventListener("touchend", onTouch, { passive: true });
    return () => window.removeEventListener("touchend", onTouch);
  }, [enter]);

  return { isFullscreen, enter, exit, toggle };
}
