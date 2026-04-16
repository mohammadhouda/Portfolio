"use client";

import Link from "next/link";
import ArchitectureExplorerLoader from "./architecture/ArchitectureExplorerLoader";
import type { Project } from "../lib/projects";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="max-w-300 mx-auto pt-32 px-8 pb-24">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-[0.4rem] font-mono text-[0.75rem] text-muted no-underline tracking-[0.04em] mb-12 opacity-60 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-accent"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 6H2M6 2L2 6l4 4" />
        </svg>
        back_to_projects
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="font-mono text-[0.7rem] text-accent tracking-widest uppercase mb-3 opacity-80">
          {project.tag}
        </p>

        <h1
          className="font-mono font-bold tracking-[-0.03em] text-fg mb-6 leading-[1.1]"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          {project.title}
        </h1>

        <p className="text-[1rem] leading-[1.8] text-muted max-w-170 mb-6">
          {project.longDescription}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-[0.4rem] mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-[0.6rem] py-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded font-mono text-[0.72rem] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* External links */}
        {(project.links?.github || project.links?.live) && (
          <div className="flex gap-4 flex-wrap mb-8">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[0.45rem] px-4 py-[0.55rem] bg-surface border border-border rounded-md font-mono text-[0.78rem] text-muted no-underline tracking-[0.04em] transition-[border-color,color] duration-200 hover:border-[rgba(34,197,94,0.35)] hover:text-accent"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[0.45rem] px-4 py-[0.55rem] bg-surface border border-border rounded-md font-mono text-[0.78rem] text-muted no-underline tracking-[0.04em] transition-[border-color,color] duration-200 hover:border-[rgba(34,197,94,0.35)] hover:text-accent"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                Live Site
              </a>
            )}
          </div>
        )}
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="mb-14">
          <p className="font-mono text-[0.7rem] text-muted tracking-[0.12em] uppercase mb-5 opacity-50">
            <span className="text-accent opacity-70">{"//"} </span>
            engineering highlights
          </p>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-[0.92rem] leading-[1.7] text-muted">
                <span className="text-accent font-mono text-[0.75rem] mt-[0.2rem] shrink-0 opacity-70">
                  →
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Architecture Explorer */}
      {project.hasArchitecture && (
        <div>
          <p className="font-mono text-[0.7rem] text-muted tracking-[0.12em] uppercase mb-5 opacity-50">
            <span className="text-accent opacity-70">{"//"} </span>
            architecture explorer
          </p>
          <ArchitectureExplorerLoader />
        </div>
      )}
    </main>
  );
}
