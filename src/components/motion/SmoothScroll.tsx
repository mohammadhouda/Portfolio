"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";

/**
 * Drives Lenis from GSAP's ticker rather than its own rAF loop.
 *
 * Running two independent animation loops is the usual cause of jittery
 * "smooth scroll" sites: Lenis writes a new scroll position on one frame
 * while ScrollTrigger reads the old one on another. Sharing gsap.ticker
 * keeps the read and the write in the same frame.
 *
 * Also exposes the instance on window so anything that needs to scroll
 * programmatically (nav links, back-to-top) can defer to Lenis instead of
 * calling native scrollTo, which Lenis would immediately fight.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Clears the failsafe in layout.tsx that would otherwise strip the `.js`
    // class and un-hide everything, on the assumption motion never loaded.
    document.documentElement.setAttribute("data-motion-ready", "");

    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Slightly overshooting exponential — reads as weighty without
      // feeling laggy on a trackpad.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Never hijack touch scrolling; native momentum is better and
      // synthetic touch scroll is the main accessibility complaint about
      // smooth-scroll libraries.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fonts change text metrics, which moves every trigger boundary.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
