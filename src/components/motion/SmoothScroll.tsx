"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../../lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    document.documentElement.setAttribute("data-motion-ready", "");
    let disposed = false;
    const mm = gsap.matchMedia();

    // Touch devices keep native scrolling and avoid an always-running ticker.
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        duration: 0.85,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.__lenis = undefined;
      };
    });

    document.fonts?.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      mm.revert();
    };
  }, []);
  return null;
}
