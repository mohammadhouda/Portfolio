"use client";

import { motion } from "framer-motion";
import TerminalSnippet from "./TerminalSnippet";
import SectionLabel from "./SectionLabel";
import ScrollReveal from "./ScrollReveal";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero() {
  const handleScroll = () => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex items-center pt-24 px-8 pb-16 max-w-300 mx-auto w-full min-h-svh"
    >
      {/* Decorative elements — isolated so they can't affect layout */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Atmospheric grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Glow accent */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative w-full z-10">
        {/* Status line */}
        <motion.div {...fadeUp(0.05)} className="mb-8">
          <ScrollReveal>
            <SectionLabel label="Based In Lebanon" lineNumber={1} />
          </ScrollReveal>
        </motion.div>

        {/* Two-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: identity + terminal */}
          <div>
            <motion.h1
              {...fadeUp(0.15)}
              className="font-mono font-bold leading-[0.95] tracking-[-0.04em] text-fg m-0"
              style={{ fontSize: "clamp(3.2rem, 7.5vw, 5.5rem)" }}
            >
              <span className="block">Mohammad</span>
              <span className="block mt-1">
                Houda
                {/* Pure CSS cursor — no JS animation loop */}
                <span className="cursor-blink ml-2" />
              </span>
            </motion.h1>

            <motion.div {...fadeUp(0.3)} className="mt-5 mb-10 flex items-center gap-3">
              <span className="block w-8 h-px bg-accent/50" />
              <p className="font-mono text-[0.8rem] text-accent tracking-[0.08em] uppercase m-0">
                Software Engineer · Full-Stack Reach
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.45)}>
              <TerminalSnippet />
            </motion.div>
          </div>

          {/* Right: intro + CTA */}
          <motion.div {...fadeUp(0.35)} className="relative lg:pl-12">
            {/* Vertical divider — desktop only */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px">
              <span className="block w-full h-full bg-white/[0.06]" />
              <span className="absolute top-0 left-0 w-full h-12 bg-accent/40" />
            </div>

            <p className="font-mono text-[0.65rem] text-muted/30 tracking-[0.15em] uppercase mb-4 select-none">
              {"/* what I build */"}
            </p>

            <p className="text-[1.05rem] leading-[1.8] text-muted max-w-[42ch] mb-10">
              I design the systems behind the product auth flows, job pipelines,
              real-time features, and APIs that hold under load. I ship fast
              without cutting corners, and I reach into the frontend
              when the work calls for it.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <motion.button
                onClick={handleScroll}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-accent/[0.08] border border-accent/60 rounded-md text-accent font-mono text-[0.8rem] tracking-[0.06em] cursor-pointer pointer-fine:transition-[background-color,border-color,box-shadow] pointer-fine:duration-300 pointer-fine:hover:bg-accent/[0.14] pointer-fine:hover:border-accent pointer-fine:hover:shadow-[0_0_30px_rgba(34,197,94,0.12)]"
              >
                view_projects
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="pointer-fine:transition-transform pointer-fine:duration-300 pointer-fine:group-hover:translate-x-1"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom status bar */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-20 flex items-center gap-6 font-mono text-[0.65rem] text-muted/30 tracking-[0.1em] uppercase select-none"
        >
          <span className="flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-accent/70 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
            available for work
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">UTC+3</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">v2.0</span>
        </motion.div>
      </div>
    </section>
  );
}
