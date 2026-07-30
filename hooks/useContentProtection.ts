"use client";

import { useEffect } from "react";

/**
 * Attaches browser-side content protection.
 * Note: This is a deterrent layer — screenshots and view-source
 * cannot be blocked by JavaScript. This stops casual copying.
 */
export function useContentProtection() {
  useEffect(() => {
    // ── Context menu ──────────────────────────────────────────────
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    // ── Text selection / drag ─────────────────────────────────────
    const onSelectStart = (e: Event) => e.preventDefault();
    const onDragStart = (e: DragEvent) => e.preventDefault();
    const onDrop = (e: DragEvent) => e.preventDefault();

    // ── Keyboard shortcuts ────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const key = e.key.toLowerCase();

      // Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+A, Ctrl+S, Ctrl+P, Ctrl+U
      if (ctrl && ["c", "x", "v", "a", "s", "p", "u"].includes(key)) {
        e.preventDefault();
        return;
      }
      // Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
      if (ctrl && shift && ["i", "c", "j"].includes(key)) {
        e.preventDefault();
        return;
      }
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
    };

    // ── Image long-press save on mobile (touch events) ────────────
    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        // Prevent default prevents the long-press context menu on iOS/Android
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("drop", onDrop);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("drop", onDrop);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchstart", onTouchStart);
    };
  }, []);
}
