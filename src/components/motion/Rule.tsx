"use client";

import { useRef, useEffect } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

/**
 * A hairline that draws itself in from the left when it enters view.
 * Hairlines carry the grid in this design, so animating them is what makes
 * the layout feel constructed rather than merely faded-in.
 */
export default function Rule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref} className={`rule ${className}`} aria-hidden="true" />;
}
