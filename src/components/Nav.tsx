"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { scrollToTarget, setScrollLocked } from "../lib/scroll";
import { profile } from "../lib/profile";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Contact", href: "#contact" },
];

interface NavProps {
  /** Project pages have no in-page sections, so links route home instead. */
  standalone?: boolean;
}

export default function Nav({ standalone = false }: NavProps) {
  const barRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  /* Bar background fades in once scrolled past the hero's first screenful.
     Driven by a direct GSAP tween on scroll rather than React state, so
     scrolling never triggers a re-render. */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const bg = bar.querySelector<HTMLElement>("[data-nav-bg]");
    if (!bg) return;

    if (prefersReducedMotion()) {
      gsap.set(bg, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            start: "top top",
            end: "+=120",
            scrub: true,
          },
        }
      );
    }, bar);

    return () => ctx.revert();
  }, []);

  /* Mobile panel: lock scroll while open, stagger the links in. */
  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;

    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelectorAll("[data-panel-item]"),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.06,
        }
      );
    }, panel);

    return () => ctx.revert();
  }, [open]);

  /* Close on Escape, and release the scroll lock if we unmount while open. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => setScrollLocked(false), []);

  const go = (href: string) => {
    setOpen(false);
    if (standalone) {
      // On a project page there are no in-page sections to scroll to, so
      // route home and let the hash land on the right one.
      router.push(`/${href}`);
      return;
    }
    scrollToTarget(href);
  };

  return (
    <>
      <header
        ref={barRef}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          data-nav-bg
          className="absolute inset-0 border-b border-rule bg-paper/85 backdrop-blur-md"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        <div className="shell relative flex h-16 items-center justify-between md:h-18">
          <Link
            href="/"
            className="t-meta text-ink transition-colors duration-300 hover-fine:hover:text-accent"
            aria-label={`${profile.name} — home`}
          >
            <span className="font-medium">Mohammad Houda</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="t-meta cursor-pointer border-0 bg-transparent p-0 text-ink-3 transition-colors duration-300 hover-fine:hover:text-ink"
              >
                {l.label}
              </button>
            ))}
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="t-meta link-draw text-accent"
            >
              CV
            </a>
          </nav>

          <button
            className="relative z-10 flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-[5px] border-0 bg-transparent md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className="block h-px w-5 bg-ink transition-transform duration-300 ease-out"
              style={{
                transform: open ? "translateY(3px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-5 bg-ink transition-transform duration-300 ease-out"
              style={{
                transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {open && (
        <div
          ref={panelRef}
          className="fixed inset-0 z-40 flex flex-col justify-center bg-paper px-[var(--gutter)] md:hidden"
        >
          <nav aria-label="Mobile">
            {links.map((l) => (
              <div key={l.href} className="line-mask">
                <button
                  data-panel-item
                  onClick={() => go(l.href)}
                  className="t-h2 block w-full cursor-pointer border-0 bg-transparent p-0 text-left text-ink"
                >
                  {l.label}
                </button>
              </div>
            ))}
          </nav>

          <div className="mt-14 flex flex-col gap-2">
            <div className="line-mask">
              <a
                data-panel-item
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta block text-accent"
              >
                Curriculum Vitae ↗
              </a>
            </div>
            <div className="line-mask">
              <span data-panel-item className="t-meta block text-ink-4">
                {profile.location}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
