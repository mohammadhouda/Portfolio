"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

const stack = {
  Backend: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "Redis", "Firebase", "Socket.io", "REST APIs"],
  Frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  "Tools & Cloud": ["Git", "Docker", "AWS", "Supabase", "PM2", "Postman", "Puppeteer"],
  "AI & Tooling": ["Claude", "AI-assisted development", "Prompt engineering"],
};

function Chip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.3rem 0.7rem",
        background: "rgba(34,197,94,0.06)",
        border: "1px solid rgba(34,197,94,0.15)",
        borderRadius: "4px",
        fontFamily: "var(--font-jetbrains)",
        fontSize: "0.75rem",
        color: "var(--text-secondary)",
        letterSpacing: "0.02em",
        transition: "border-color 0.2s, color 0.2s, background 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(34,197,94,0.4)";
        el.style.color = "var(--accent)";
        el.style.background = "rgba(34,197,94,0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(34,197,94,0.15)";
        el.style.color = "var(--text-secondary)";
        el.style.background = "rgba(34,197,94,0.06)";
      }}
    >
      {label}
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "6rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <ScrollReveal>
        <SectionLabel label="about" lineNumber={2} />
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Bio */}
        <ScrollReveal delay={0.1}>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
            }}
          >
            Backend-focused Software Engineer with hands-on experience building
            production-grade REST APIs, scalable multi-tenant platforms, and
            distributed systems. Strong expertise in Node.js, Express, PostgreSQL,
            Prisma, and Redis with practical experience designing secure auth flows,
            background job pipelines, and real-time features using Socket.io.
          </p>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
            }}
          >
            Comfortable across the full stack with Next.js, React, and TypeScript.
            CS graduate from{" "}
            <span style={{ color: "var(--text-primary)" }}>
              Arab Open University
            </span>{" "}
            (GPA 3.4), former Backend Developer at{" "}
            <span style={{ color: "var(--text-primary)" }}>Ishtari Group</span>.
            Based in{" "}
            <span style={{ color: "var(--text-primary)" }}>Tripoli, Lebanon</span>.
          </p>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
            }}
          >
            <span
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.8rem",
              }}
            >
              AWS Cloud Practitioner
            </span>{" "}
            certified. I integrate AI coding assistants Claude, Qwen as
            a core part of my workflow to ship faster without cutting corners on
            quality.
          </p>
        </ScrollReveal>

        {/* Stack */}
        <ScrollReveal delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {(Object.entries(stack) as [string, string[]][]).map(
              ([category, items]) => (
                <div key={category}>
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.7rem",
                      color: "var(--text-secondary)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                      opacity: 0.6,
                    }}
                  >
                    {category}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                    }}
                  >
                    {items.map((item) => (
                      <Chip key={item} label={item} />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}
