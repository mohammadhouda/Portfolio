"use client";

import { useRef, useEffect, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "../../lib/gsap";

interface RevealProps {
  children: ReactNode;
  /** Element to render. Defaults to div. */
  as?: ElementType;
  className?: string;
  /** Seconds to wait after the trigger fires. */
  delay?: number;
  /** Distance in px to travel upward. 0 for a pure fade. */
  y?: number;
  variant?: "rise" | "left" | "right" | "scale" | "wipe" | "fade";
  /** Stagger direct children instead of animating the wrapper itself. */
  stagger?: number;
  /** Viewport position that fires the animation. */
  start?: string;
  [key: string]: unknown;
}

/**
 * One-shot entrances with different directions and a shared motion rhythm.
 * Completed triggers are removed, and animation frames do not render React.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 26,
  variant = "rise",
  stagger,
  start = "top 85%",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const targets =
      stagger !== undefined ? Array.from(el.children) : el;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Wrapper must be visible when we're staggering its children;
      // globals.css hides it by default to prevent a flash.
      if (stagger !== undefined) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          // Stay within the smallest mobile gutter while the entrance runs.
          x: variant === "left" ? -16 : variant === "right" ? 16 : 0,
          y: variant === "rise" ? y : 0,
          scale: variant === "scale" ? 0.94 : 1,
          ...(variant === "wipe" ? { clipPath: "inset(0 100% 0 0)" } : {}),
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          ...(variant === "wipe" ? { clipPath: "inset(0 0% 0 0)" } : {}),
          duration: 0.9,
          delay,
          ease: EASE,
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start, once: true },
          // Drop the compositing hint once we're done painting.
          onComplete: () => gsap.set(targets, { clearProps: "transform,willChange,clipPath" }),
        }
      );
    }, el);

    return () => mm.revert();
  }, [delay, y, stagger, start, variant]);

  // The wrapper always carries data-reveal so CSS hides it before GSAP
  // runs. In stagger mode the effect reveals the wrapper first, then
  // animates the children in from behind it so there's no flash either way.
  return (
    <Tag ref={ref} data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Standalone hook version for cases where an extra wrapper element would
 * break a layout (grid children, table rows, flex measurements).
 */
export function useReveal<T extends HTMLElement>(
  options: { delay?: number; y?: number; start?: string } = {}
) {
  const ref = useRef<T>(null);
  const { delay = 0, y = 26, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: EASE,
          scrollTrigger: { trigger: el, start, once: true },
          onComplete: () => gsap.set(el, { willChange: "auto" }),
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, start]);

  return ref;
}

export { ScrollTrigger };
