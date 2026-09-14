"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once at module scope. Importing from here anywhere in the app
// guarantees ScrollTrigger is available without each component repeating
// the registration. registerPlugin is idempotent, and the module only
// evaluates once, so repeat imports cost nothing.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Mobile browsers fire `resize` every time the URL bar slides in or out,
  // and anything that stops the page scrolling — the menu overlay, the
  // lightbox — makes them slide it back. ScrollTrigger's default response is
  // a full refresh, which remeasures every trigger against a viewport height
  // that is only transiently that size and fires pending `once: true`
  // reveals early, behind the overlay. This ignores height-only resizes on
  // touch devices; a real orientation change still changes the width and
  // still refreshes.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Shared easing so every animation on the site moves the same way. */
export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
