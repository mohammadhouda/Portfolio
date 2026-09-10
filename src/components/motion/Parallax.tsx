"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

interface ParallaxProps {
  children: ReactNode;
  /**
   * How far the inner element drifts across the full scroll pass, as a
   * percentage of its own height. Negative moves it up (faster than scroll).
   */
  amount?: number;
  className?: string;
}

/**
 * Scroll-linked drift for imagery.
 *
 * The child is scaled slightly larger than its frame so the drift never
 * exposes an empty edge, and the frame clips it. `scrub` ties the tween
 * directly to scroll position rather than firing a fixed-duration
 * animation, so it tracks the pointer exactly.
 */
export default function Parallax({
  children,
  amount = 12,
  className,
}: ParallaxProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameEl = frame.current;
    const innerEl = inner.current;
    if (!frameEl || !innerEl) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerEl,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: frameEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, frameEl);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={frame} className={`overflow-hidden ${className ?? ""}`}>
      <div
        ref={inner}
        className="relative h-full w-full"
        // Oversize so the drift never exposes an edge. The overhang per side
        // is exactly the peak translation, so add 2% of slack to absorb
        // sub-pixel rounding rather than flashing a sliver of background.
        style={{ scale: 1 + amount / 100 + 0.02 }}
      >
        {children}
      </div>
    </div>
  );
}
