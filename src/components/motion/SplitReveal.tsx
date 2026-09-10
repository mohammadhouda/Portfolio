"use client";

import { useRef, useEffect, type ElementType, type ReactNode } from "react";
import { gsap, EASE_EXPO, prefersReducedMotion } from "../../lib/gsap";
import { splitLines, type SplitResult } from "../../lib/splitLines";

interface SplitRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Fire immediately on mount instead of waiting for scroll (hero use). */
  immediate?: boolean;
  start?: string;
  [key: string]: unknown;
}

/**
 * Headline reveal: text is split into lines, each line masked, then slid up
 * into view on a stagger. This is the signature move of the design — it is
 * used only on section headlines, never on body copy.
 *
 * Re-splits on resize because line breaks change with width; the split is
 * debounced and skipped when the width hasn't actually changed (mobile
 * browsers fire resize on address-bar show/hide).
 */
export default function SplitReveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  immediate = false,
  start = "top 88%",
  ...rest
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split: SplitResult | null = null;
    let lastWidth = window.innerWidth;
    let raf = 0;

    const build = () => {
      split?.revert();
      split = splitLines(el);
      gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        split.lines,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.15,
          delay,
          ease: EASE_EXPO,
          stagger: 0.075,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start, once: true } }),
          onComplete: () => {
            if (split) gsap.set(split.lines, { willChange: "auto" });
          },
        }
      );
    };

    // Wait for webfonts — splitting against fallback metrics produces the
    // wrong line breaks and the reveal snaps when the real font swaps in.
    const ctx = gsap.context(() => {
      if (document.fonts?.status === "loaded") build();
      else document.fonts?.ready.then(build);
    }, el);

    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        split?.revert();
        split = splitLines(el);
        // Past the entrance — land straight in the final position.
        gsap.set(split.lines, { yPercent: 0 });
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      ctx.revert();
      split?.revert();
    };
  }, [delay, immediate, start]);

  return (
    <Tag ref={ref} data-reveal="" data-reveal-lines="" className={className} {...rest}>
      {children}
    </Tag>
  );
}
