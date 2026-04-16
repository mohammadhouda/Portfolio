"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "../lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="group relative overflow-hidden bg-surface border border-border rounded-[10px] px-10 py-9 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.06)] will-change-[transform,opacity]"
    >
      {/* ── Hover glow overlay ── */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.04)_0%,transparent_60%)]" />

      {/* ── Top row: tag + index ── */}
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="block w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(34,197,94,0.4)] transition-all duration-500" />
          <p className="font-mono text-[0.68rem] text-accent tracking-[0.1em] uppercase m-0 opacity-80">
            {project.tag}
          </p>
        </div>

        <span className="font-mono text-[0.6rem] text-muted/15 select-none tracking-wider group-hover:text-muted/30 transition-colors duration-500">
          {"//  "}{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── Title ── */}
      <h3
        className="relative font-mono font-bold tracking-[-0.03em] text-fg mb-4 leading-[1.15] group-hover:text-accent transition-colors duration-500"
        style={{ fontSize: "clamp(1.35rem, 3vw, 1.75rem)" }}
      >
        {project.title}
      </h3>

      {/* ── Description ── */}
      <p className="relative text-[0.95rem] leading-[1.8] text-muted max-w-160 mb-7">
        {project.description}
      </p>

      {/* ── Divider ── */}
      <div className="relative flex items-center gap-3 mb-6">
        <span className="block flex-1 h-px bg-white/[0.04] group-hover:bg-accent/[0.1] transition-colors duration-700" />
        <span className="font-mono text-[0.55rem] text-muted/20 tracking-[0.15em] uppercase select-none">
          stack
        </span>
        <span className="block flex-1 h-px bg-white/[0.04] group-hover:bg-accent/[0.1] transition-colors duration-700" />
      </div>

      {/* ── Stack pills ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.04 } },
          hidden: {},
        }}
        className="relative flex flex-wrap gap-2 mb-8"
      >
        {project.stack.map((tech) => (
          <motion.span
            key={tech}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded font-mono text-[0.7rem] text-muted/70 tracking-[0.02em] transition-all duration-300 hover:border-accent/30 hover:text-accent/80 hover:bg-accent/[0.05]"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* ── Links row ── */}
      <div className="relative flex items-center gap-6 flex-wrap">
        {/* Case study — primary action */}
        <Link
          href={`/projects/${project.slug}`}
          className="group/link inline-flex items-center gap-2 px-4 py-2 bg-accent/[0.06] border border-accent/20 rounded font-mono text-[0.76rem] text-accent no-underline tracking-[0.04em] transition-all duration-300 hover:bg-accent/[0.12] hover:border-accent/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)]"
        >
          case_study
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-300 group-hover/link:translate-x-0.5"
          >
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </Link>

        {/* Separator */}
        {(project.links?.github || project.links?.live) && (
          <span className="w-px h-4 bg-white/[0.06]" />
        )}

        {/* GitHub */}
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/gh inline-flex items-center gap-2 font-mono text-[0.76rem] text-muted/50 no-underline tracking-[0.04em] transition-all duration-300 hover:text-fg"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transition-transform duration-300 group-hover/gh:scale-110"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            github
          </a>
        )}

        {/* Live site */}
        {project.links?.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/live inline-flex items-center gap-2 font-mono text-[0.76rem] text-muted/50 no-underline tracking-[0.04em] transition-all duration-300 hover:text-fg"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover/live:scale-110"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            live_site
          </a>
        )}
      </div>
    </motion.article>
  );
}