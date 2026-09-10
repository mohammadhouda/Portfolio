"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once at module scope. Importing from here anywhere in the app
// guarantees ScrollTrigger is available without each component repeating
// the registration. registerPlugin is idempotent, and the module only
// evaluates once, so repeat imports cost nothing.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
