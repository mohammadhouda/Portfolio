"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../../lib/gsap";

/** A short hero exit; long content sections stay in normal document flow. */
export default function SectionStack({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const hero = el.querySelector("#hero .panel-inner");
      if (!hero) return;
      gsap.to(hero, {
        y: -55,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: el.querySelector("#hero"),
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => mm.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}

export function Panel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div id={id} className="panel scroll-mt-20">
      <div className="panel-inner">{children}</div>
    </div>
  );
}
