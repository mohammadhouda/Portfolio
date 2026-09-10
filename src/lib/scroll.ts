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
    lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.25 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Locks/unlocks page scroll used by the lightbox and mobile menu. */
export function setScrollLocked(locked: boolean) {
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;

  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
