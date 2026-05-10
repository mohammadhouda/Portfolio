"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function CameraIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      <path d="M9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9z" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const hasImages = project.images && project.images.length > 0;
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} bg-surface border border-border rounded-[10px] overflow-hidden pointer-fine:transition-[border-color,box-shadow] pointer-fine:duration-300 pointer-fine:hover:border-accent/30 pointer-fine:hover:shadow-[0_0_32px_rgba(34,197,94,0.07)]`}
    >
      {/* ── Image side ── */}
      <div className="relative md:w-[46%] h-60 md:h-auto shrink-0 overflow-hidden border-b border-white/5 md:border-b-0">
        <div
          className="image-fade absolute inset-0"
          style={{ "--x-start": isEven ? "-36px" : "36px" } as React.CSSProperties}
        >
          {hasImages ? (
            <Image
              src={project.images![0]}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 46vw"
              className="object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-linear-to-br from-white/2.5 via-transparent to-accent/1.5" />
              <div
                className="absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <CameraIcon size={24} className="text-white/20" />
                  <span className="font-mono text-[0.52rem] text-white/15 tracking-[0.18em] uppercase select-none">
                    no preview
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Edge blend gradient — only on desktop */}
        <div
          className={`absolute inset-y-0 w-20 pointer-events-none hidden md:block ${
            isEven
              ? "right-0 bg-linear-to-r from-transparent to-surface/80"
              : "left-0 bg-linear-to-l from-transparent to-surface/80"
          }`}
        />
      </div>

      {/* ── Content side ── */}
      <div className="flex-1 flex flex-col px-8 py-8 md:px-10 md:py-10">
        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="block w-1.5 h-1.5 rounded-full bg-accent/50" />
            <p className="font-mono text-[0.68rem] text-accent tracking-widest uppercase m-0 opacity-80">
              {project.tag}
            </p>
          </div>
          <span className="font-mono text-[0.6rem] text-muted/20 select-none tracking-wider">
            {"//  "}{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-mono font-bold tracking-[-0.03em] text-fg mb-4 leading-[1.15] pointer-fine:group-hover:text-accent pointer-fine:transition-colors pointer-fine:duration-300"
          style={{ fontSize: "clamp(1.35rem, 3vw, 1.75rem)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[0.95rem] leading-[1.8] text-muted mb-7">
          {project.description}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block flex-1 h-px bg-white/5" />
          <span className="font-mono text-[0.55rem] text-muted/25 tracking-[0.15em] uppercase select-none">
            stack
          </span>
          <span className="block flex-1 h-px bg-white/5" />
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="inline-block px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded font-mono text-[0.7rem] text-muted/70 tracking-[0.02em]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links row — pushed to bottom */}
        <div className="flex items-center gap-6 flex-wrap mt-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2 px-4 py-2 bg-accent/[0.06] border border-accent/20 rounded font-mono text-[0.76rem] text-accent no-underline tracking-[0.04em] pointer-fine:transition-[background-color,border-color,box-shadow] pointer-fine:duration-300 pointer-fine:hover:bg-accent/[0.12] pointer-fine:hover:border-accent/40 pointer-fine:hover:shadow-[0_0_20px_rgba(34,197,94,0.08)]"
          >
            case_study
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="pointer-fine:transition-transform pointer-fine:duration-300 pointer-fine:group-hover/link:translate-x-0.5"
            >
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </Link>

          {(project.links?.github || project.links?.live) && (
            <span className="w-px h-4 bg-white/[0.06]" />
          )}

          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.76rem] text-muted/50 no-underline tracking-[0.04em] pointer-fine:transition-colors pointer-fine:duration-300 pointer-fine:hover:text-fg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              github
            </a>
          )}

          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.76rem] text-muted/50 no-underline tracking-[0.04em] pointer-fine:transition-colors pointer-fine:duration-300 pointer-fine:hover:text-fg"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              live_site
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
