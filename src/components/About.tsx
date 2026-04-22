"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

const stack = {
  Backend: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "Redis", "Firebase", "Socket.io", "REST APIs"],
  Frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  "Tools & Cloud": ["Git", "Docker", "AWS", "jest", "Supertest", "Supabase", "PM2", "Postman", "Puppeteer"],
  "AI & Tooling": ["Claude", "AI-assisted development", "Prompt engineering"],
};

const stackIcons: Record<string, string> = {
  Backend: "λ",
  Frontend: "◇",
  "Tools & Cloud": "⬡",
  "AI & Tooling": "◎",
};

function Chip({ label, index }: { label: string; index: number }) {
  return (
    <span
      className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/[0.04] border border-accent/[0.1] rounded font-mono text-[0.75rem] text-muted tracking-[0.02em] transition-all duration-300 cursor-default hover:border-accent/50 hover:text-accent hover:bg-accent/[0.1] hover:shadow-[0_0_16px_rgba(34,197,94,0.06)]"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <span className="opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-300 text-accent text-[0.6rem]">
        ›
      </span>
      {label}
    </span>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4 border border-white/[0.04] rounded-lg bg-white/[0.01]">
      <span className="font-mono text-[1.4rem] font-bold text-fg tracking-tight">{value}</span>
      <span className="font-mono text-[0.6rem] text-muted/50 tracking-[0.12em] uppercase">{label}</span>
    </div>
  );
}

export default function About() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="about" className="py-28 px-8 max-w-300 mx-auto">
      <ScrollReveal>
        <SectionLabel label="about" lineNumber={2} />
      </ScrollReveal>

      <div className="about-grid">
        {/* ── Bio column ── */}
        <div>
          <ScrollReveal delay={0.1}>
            {/* Decorative comment */}
            <p className="font-mono text-[0.65rem] text-muted/25 tracking-[0.15em] uppercase mb-5 select-none">
              {"/* who I am */"}
            </p>

          <p className="text-[1.05rem] leading-[1.85] text-muted mb-6">
            Backend-focused Software Engineer with hands-on experience building
            production-grade REST APIs, scalable multi-tenant platforms, and
            distributed systems. Strong expertise in{" "}
            <span className="text-fg font-medium">Node.js</span>,{" "}
            <span className="text-fg font-medium">Express</span>,{" "}
            <span className="text-fg font-medium">PostgreSQL</span>,
            Prisma, and Redis. I specialize in designing secure auth flows,
            background job pipelines, and 
            <span className="text-fg font-medium"> robust testing suites using Jest & Supertest</span>.
          </p>

            <p className="text-[1.05rem] leading-[1.85] text-muted mb-6">
              Comfortable across the full stack with Next.js, React, and TypeScript.
              CS graduate from{" "}
              <span className="text-fg font-medium">Arab Open University</span>{" "}
              <span className="text-muted/40 font-mono text-[0.8rem]">(GPA 3.4)</span>,
              former Backend Developer at{" "}
              <span className="text-fg font-medium">Ishtari Group</span>.
              Based in{" "}
              <span className="text-fg font-medium">Lebanon</span>.
            </p>

            <p className="text-[1.05rem] leading-[1.85] text-muted mb-10">
              I integrate AI coding assistants as
              a core part of my workflow to ship faster without cutting corners on
              quality.
            </p>
          </ScrollReveal>

          {/* ── Credential strip ── */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center gap-3 px-4 py-3 border border-accent/[0.12] rounded-md bg-accent/[0.03] w-fit">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-accent/[0.12] text-accent text-[0.7rem] font-mono font-bold">
                ✓
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[0.78rem] text-accent tracking-[0.02em]">
                  AWS Cloud Practitioner
                </span>
                <span className="font-mono text-[0.6rem] text-muted/40 tracking-[0.06em]">
                  Certified · Amazon Web Services
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Quick stats ── */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-3 gap-3 mt-8 max-w-sm">
              <StatCard value="3.4" label="GPA" />
              <StatCard value="10+" label="Projects" />
            </div>
          </ScrollReveal>
        </div>

        {/* ── Stack column ── */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col gap-7">
            {/* Stack header */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[0.6rem] text-muted/20 tracking-wider select-none mt-3">
                {Object.values(stack).flat().length} tools
              </span>
            </div>

            {(Object.entries(stack) as [string, string[]][]).map(
              ([category, items]) => (
                <div
                  key={category}
                  className="group/cat"
                  onMouseEnter={() => setActiveCategory(category)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      className={`font-mono text-[0.7rem] transition-colors duration-300 ${
                        activeCategory === category
                          ? "text-accent"
                          : "text-muted/30"
                      }`}
                    >
                      {stackIcons[category]}
                    </span>
                    <p className="font-mono text-[0.7rem] text-muted tracking-[0.12em] uppercase m-0 opacity-50 group-hover/cat:opacity-90 group-hover/cat:text-fg transition-all duration-300">
                      {category}
                    </p>
                    <span className="flex-1 h-px bg-white/[0.04] group-hover/cat:bg-accent/[0.12] transition-colors duration-500" />
                    <span className="font-mono text-[0.6rem] text-muted/20 group-hover/cat:text-muted/40 transition-colors duration-300">
                      {items.length}
                    </span>
                  </div>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 pl-5">
                    {items.map((item, i) => (
                      <Chip key={item} label={item} index={i} />
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