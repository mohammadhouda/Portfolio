import type Lenis from "lenis";

declare global {
  interface Window {
    /**
     * Set by <SmoothScroll />, absent under prefers-reduced-motion.
     *
     * Deliberately not `window.lenis` — the library already augments Window
     * with a `lenis` marker object of a different shape for its dev tools,
     * and redeclaring it produces a type conflict.
     */
    __lenis?: Lenis;
  }
}

export {};
