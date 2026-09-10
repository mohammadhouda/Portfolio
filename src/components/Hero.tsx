"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { scrollToTarget } from "../lib/scroll";
import { profile, timeline } from "../lib/profile";

const current = timeline.find((t) => t.current);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll("[data-hero]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        // Let the webfont land first; animating display type mid-swap
        // makes the headline visibly jump.
        delay: 0.12,
      });

      // fromTo throughout, never from(). The wrappers carry an inline
      // opacity:0 to prevent a pre-hydration flash, and a from() tween
      // records its END value from whatever the element reads as at init —
      // which is that same 0. The result is an element that animates from
      // invisible to invisible. Stating both ends removes the ambiguity.
      tl.set(el.querySelectorAll("[data-hero]"), { opacity: 1 })
        .fromTo(
          "[data-hero-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4 },
          0
        )
        .fromTo(
          "[data-hero-meta] > * > *",
          { yPercent: 120 },
          { yPercent: 0, duration: 1, stagger: 0.08 },
          0.1
        )
        .fromTo(
          "[data-hero-line]",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.3, stagger: 0.09 },
          0.2
        )
        .fromTo(
          "[data-hero-lead]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          0.7
        )
        .fromTo(
          "[data-hero-foot] > *",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.85
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="shell flex min-h-svh flex-col justify-between pt-28 pb-10 md:pt-36 md:pb-14"
    >
      {/* ── Masthead ─────────────────────────────────────────── */}
      <div>
        <div
          data-hero
          data-hero-meta
          className="mb-4 flex items-baseline justify-between gap-6"
          style={{ opacity: 0 }}
        >
          <span className="t-meta line-mask text-fg-3">
            <span className="block">Portfolio Selected Work</span>
          </span>
          <span className="t-meta line-mask text-right text-fg-3">
            <span className="block">
              {profile.location} · {profile.timezone}
            </span>
          </span>
        </div>

        <div data-hero data-hero-rule className="rule" style={{ opacity: 0 }} />
      </div>

      {/* ── Statement ────────────────────────────────────────── */}
      <div className="grid-12 items-end py-14 md:py-20">
        <h1
          data-hero
          className="t-display col-span-full text-fg lg:col-span-8"
          style={{ opacity: 0, fontSize: "clamp(2.5rem, 8.6vw, 7.75rem)" }}
        >
          <span className="line-mask">
            <span data-hero-line className="block">
              Software
            </span>
          </span>
          <span className="line-mask">
            {/* The accent sits on the second word rather than on a colour
                swash or a glow the only chromatic moment in the hero. */}
            <span data-hero-line className="block text-accent">
              Engineer
            </span>
          </span>
        </h1>

        <p
          data-hero
          data-hero-lead
          className="t-lead col-span-full mt-10 max-w-[34ch] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:mb-3"
          style={{ opacity: 0 }}
        >
          I build AI agents, enterprise integrations, and the backends that
          hold under load.
        </p>
      </div>

      {/* ── Footer strip ─────────────────────────────────────── */}
      <div>
        <div data-hero data-hero-rule className="rule mb-5" style={{ opacity: 0 }} />

        <div
          data-hero
          data-hero-foot
          className="grid-12 gap-y-5"
          style={{ opacity: 0 }}
        >
          <div className="col-span-full sm:col-span-6 lg:col-span-4">
            <p className="t-meta mb-1.5 text-fg-4">Currently</p>
            <p className="text-[0.9rem] leading-snug text-fg">
              {current ? `${current.role}, ${current.org}` : profile.role}
            </p>
          </div>

          <div className="col-span-full sm:col-span-6 lg:col-span-3">
            <p className="t-meta mb-1.5 text-fg-4">Availability</p>
            <p className="flex items-center gap-2 text-[0.9rem] leading-snug text-fg">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              Open to new roles
            </p>
          </div>

          <div className="col-span-full flex flex-wrap items-end gap-3 lg:col-span-5 lg:justify-end">
            <button
              onClick={() => scrollToTarget("#work")}
              className="button-primary group cursor-pointer"
            >
              <span>Selected Work</span>
              <svg
                width="14"
                height="20"
                viewBox="0 0 14 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
                className="transition-transform duration-500 ease-out group-hover:translate-y-1"
              >
                <path d="M7 0v18M1 12l6 6 6-6" />
              </svg>
            </button>
            <a href={profile.cv} download className="button-secondary">
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
