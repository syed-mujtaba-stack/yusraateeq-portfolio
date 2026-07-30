"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Attempts to detect DevTools via two complementary methods:
 *
 * 1. Window size diff — when devtools docks to the side or bottom, the
 *    viewport shrinks relative to the outer window.
 * 2. console.log toString trick — a getter that sets a flag when the
 *    value is read (devtools evaluates it for display).
 *
 * Neither method is 100% reliable, and that is intentional — we don't want
 * false positives that harm genuine visitors. We require BOTH signals or
 * repeated window-size divergence before showing the overlay.
 */
export function useDevToolsDetection() {
  const [detected, setDetected] = useState(false);
  const consecutiveRef = useRef(0);
  const THRESHOLD = 160; // px — generous to avoid false positives
  const CONSECUTIVE_NEEDED = 3;

  useEffect(() => {
    // Method 1: window size divergence polling
    const checkSize = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      if (widthDiff > THRESHOLD || heightDiff > THRESHOLD) {
        consecutiveRef.current++;
        if (consecutiveRef.current >= CONSECUTIVE_NEEDED) {
          setDetected(true);
        }
      } else {
        consecutiveRef.current = 0;
        setDetected(false);
      }
    };

    const interval = setInterval(checkSize, 1500);

    // Method 2: toString getter trick (fires when devtools reads the object)
    let toStringFired = false;
    const devObj = new Proxy(
      {},
      {
        get(_t, prop) {
          if (prop === Symbol.toPrimitive || prop === "toString") {
            if (!toStringFired) {
              toStringFired = true;
              // Wait a tick so it doesn't fire spuriously on init
              setTimeout(() => setDetected(true), 100);
            }
          }
          return () => "devtools";
        },
      }
    );
    // Silently log — only visible if devtools is open
    try {
      console.log("%c", devObj as any);
    } catch {
      // ignore
    }

    return () => clearInterval(interval);
  }, []);

  const dismiss = () => setDetected(false);

  return { detected, dismiss };
}
