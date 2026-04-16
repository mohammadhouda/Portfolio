"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/mohammadhouda",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mohammad-houda",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:contact@mohammadhouda.dev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="pt-24 px-8 pb-32 max-w-300 mx-auto">
      <ScrollReveal>
        <SectionLabel label="contact" lineNumber={6} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2
          className="font-mono font-bold tracking-[-0.03em] text-fg mb-4 leading-[1.15]"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          Let&apos;s build something
          <br />
          <span className="text-accent">together.</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="text-[1rem] text-muted leading-[1.7] max-w-120 mb-10">
          Open to backend/full-stack roles, freelance projects, and interesting
          collaborations. If you&apos;re building something that matters, reach out.
        </p>

        <div className="flex gap-4 flex-wrap">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[1.2rem] py-[0.65rem] bg-surface border border-border rounded-md text-muted no-underline font-mono text-[0.8rem] tracking-[0.04em] transition-[border-color,color,box-shadow] duration-200 hover:border-[rgba(34,197,94,0.35)] hover:text-accent hover:shadow-[0_0_16px_rgba(34,197,94,0.08)]"
            >
              {link.icon}
              {link.label}
            </a>
          ))}

          {/* CV download */}
          <a
            href="/Mohammad.Houda_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-[1.2rem] py-[0.65rem] bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.2)] rounded-md text-accent no-underline font-mono text-[0.8rem] tracking-[0.04em] transition-[background,border-color,box-shadow] duration-200 hover:bg-[rgba(34,197,94,0.12)] hover:border-[rgba(34,197,94,0.4)] hover:shadow-[0_0_16px_rgba(34,197,94,0.1)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 18 15 15" />
            </svg>
            View CV
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
