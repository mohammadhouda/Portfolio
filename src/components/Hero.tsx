"use client";

import { motion } from "framer-motion";
import TerminalSnippet from "./TerminalSnippet";
import SectionLabel from "./SectionLabel";
import ScrollReveal from "./ScrollReveal";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
});

export default function Hero() {
  const handleScroll = () => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 2rem 4rem",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Top label */}
        <motion.div {...fadeUp(0.1)} style={{ marginBottom: "1.5rem" }}>
          <ScrollReveal>
              <SectionLabel label="Based In Lebanon" lineNumber={1} />
          </ScrollReveal>
        </motion.div>

        {/* Main layout: name left, intro right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="hero-grid"
        >
          {/* Left: name + title + terminal */}
          <div>
            <motion.h1
              {...fadeUp(0.2)}
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontWeight: 700,
                fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Mohammad Houda
              <span className="cursor-blink" style={{ marginLeft: "4px" }} />
            </motion.h1>

            <motion.p
              {...fadeUp(0.35)}
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.9rem",
                color: "var(--accent)",
                marginTop: "1rem",
                marginBottom: "2.5rem",
                letterSpacing: "0.04em",
              }}
            >
              Software Engineer · Backend Focus
            </motion.p>

            <motion.div {...fadeUp(0.5)}>
              <TerminalSnippet />
            </motion.div>
          </div>

          {/* Right: intro + CTA */}
          <motion.div
            {...fadeUp(0.4)}
            style={{
              paddingTop: "1.5rem",
            }}
          >
            <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
              maxWidth: "420px",
              marginBottom: "2.5rem",
            }}
            >
            Backend-focused Software Engineer with hands-on experience building
            production-grade REST APIs, scalable multi-tenant platforms, and
            distributed systems. Strong in{" "}
            <span style={{ color: "var(--text-primary)" }}>
              Node.js, Express, PostgreSQL
            </span>{" "}
            and Redis with a full-stack reach via Next.js and TypeScript.
            Based in{" "}
            <span style={{ color: "var(--text-primary)" }}>Tripoli, Lebanon</span>.
            </p>

            <motion.button
              onClick={handleScroll}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "transparent",
                border: "1px solid var(--accent)",
                borderRadius: "6px",
                color: "var(--accent)",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.82rem",
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "background 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(34,197,94,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px rgba(34,197,94,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              view_projects
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
