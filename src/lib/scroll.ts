/**
 * Scrolls to a target, going through Lenis when it's running so the motion
 * matches the rest of the page. Falls back to native scrolling when Lenis
 * is absent (reduced-motion visitors, or before hydration).
 */
export function scrollToTarget(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;

  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;

  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1 });
  } else {
    el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }
}

/**
 * Locks/unlocks page scroll used by the lightbox and mobile menu.
 *
 * Idempotent on purpose: the callers fire `false` more than once for a single
 * lock (state effect, click handler, unmount cleanup), and unlocking twice
 * used to re-run the restore below against a scroll position that had already
 * moved on.
 */
let lockedScrollY: number | null = null;

export function setScrollLocked(locked: boolean) {
  if (typeof window === "undefined") return;

  const lenis = window.__lenis;
  const root = document.documentElement;

  if (locked) {
    if (lockedScrollY !== null) return;
    lockedScrollY = window.scrollY;
    lenis?.stop();
    root.style.overflow = "hidden";
  } else {
    if (lockedScrollY === null) return;
    const restore = lockedScrollY;
    lockedScrollY = null;
    root.style.overflow = "";
    lenis?.start();
    // Some mobile browsers clamp the offset while the document is
    // unscrollable, so closing the overlay would drop the reader at the top
    // of the page and replay every entrance on the way back down.
    if (Math.abs(window.scrollY - restore) > 1) {
      window.scrollTo(0, restore);
    }
  }
}
