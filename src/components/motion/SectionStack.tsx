"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";

/**
 * Section-level scroll choreography: as you reach the end of a section it
 * pins briefly and recedes scaling down and dimming while the next
 * section slides up and covers it.
 *
 * How the layering works: GSAP's pin switches the outgoing panel to
 * `position: fixed` inside a spacer. Everything after that spacer keeps
 * scrolling in normal flow, so the next panel travels up over the pinned
 * one on its own. Two things make that read as depth rather than as a
 * glitch:
 *
 *   1. Every panel is opaque (`background: var(--bg)`), so the incoming one
 *      fully occludes the receding one.
 *   2. Panels get an ascending z-index. A fixed element paints above static
 *      siblings regardless of DOM order, so without this the pinned panel
 *      would sit on top of the section meant to cover it.
 *
 * The transform goes on an inner element, never on the panel itself pin
 * writes position and inset onto the panel, and a transform there would
 * also create a containing block that breaks the fixed positioning.
 */
export default function SectionStack({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    // Below this width the pin costs more than it gives: the transition eats
    // a large share of a short viewport, and mobile browsers resize on
    // address-bar show/hide, which invalidates pin measurements constantly.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel", el);

      panels.forEach((panel, i) => {
        panel.style.zIndex = String(i + 1);

        // The last panel has nothing to recede behind.
        if (i === panels.length - 1) return;

        const inner = panel.querySelector<HTMLElement>(".panel-inner");
        if (!inner) return;

        ScrollTrigger.create({
          trigger: panel,
          // Begin the moment the panel's bottom edge reaches the bottom of
          // the viewport i.e. the moment you've finished reading it.
          start: "bottom bottom",
          // One viewport of scroll: exactly the distance the incoming
          // panel needs to travel from the bottom edge to full cover.
          end: "+=100%",
          pin: true,
          // The whole point. With pinSpacing:true GSAP inserts a spacer the
          // length of the pin, so the outgoing panel dims against empty
          // space and the next one only appears afterwards. With it false no
          // space is added, so the next panel scrolls straight up over the
          // pinned one which is the overlap this effect is made of.
          pinSpacing: false,
          // A little scrub smoothing so the recede lags the wheel slightly
          // and feels weighted rather than mechanically linked.
          scrub: 0.6,
          invalidateOnRefresh: true,
          animation: gsap.to(inner, {
            scale: 0.9,
            opacity: 0.32,
            ease: "none",
          }),
        });
      });

      return () => {
        panels.forEach((p) => {
          p.style.zIndex = "";
        });
      };
    });

    return () => mm.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}

/**
 * One section in the stack. `id` lands on the panel so in-page nav still
 * scrolls to the right place once pin spacers have shifted the layout.
 */
export function Panel({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="panel scroll-mt-24">
      <div className="panel-inner">{children}</div>
    </section>
  );
}
