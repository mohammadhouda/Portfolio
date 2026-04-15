"use client";

import Link from "next/link";
import ArchitectureExplorerLoader from "./architecture/ArchitectureExplorerLoader";
import type { Project } from "../lib/projects";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "8rem 2rem 6rem",
      }}
    >
      {/* Back link */}
      <Link
        href="/#projects"
        className="project-back-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          textDecoration: "none",
          letterSpacing: "0.04em",
          marginBottom: "3rem",
          opacity: 0.6,
          transition: "opacity 0.2s, color 0.2s",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M10 6H2M6 2L2 6l4 4" />
        </svg>
        back_to_projects
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.7rem",
            color: "var(--accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            opacity: 0.8,
          }}
        >
          {project.tag}
        </p>

        <h1
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            margin: "0 0 1.5rem",
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            maxWidth: "680px",
            marginBottom: "1.5rem",
          }}
        >
          {project.longDescription}
        </p>

        {/* Stack */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginBottom: "1.5rem",
          }}
        >
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                padding: "0.25rem 0.6rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "4px",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* External links */}
        {(project.links?.github || project.links?.live) && (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.55rem 1rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(34,197,94,0.35)";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-secondary)";
                }}
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
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.55rem 1rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(34,197,94,0.35)";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-secondary)";
                }}
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
        <div style={{ marginBottom: "3.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.7rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              opacity: 0.5,
            }}
          >
            <span style={{ color: "var(--accent)", opacity: 0.7 }}>{"//"} </span>
            engineering highlights
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {project.highlights.map((h, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.75rem",
                    marginTop: "0.2rem",
                    flexShrink: 0,
                    opacity: 0.7,
                  }}
                >
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
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.7rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              opacity: 0.5,
            }}
          >
            <span style={{ color: "var(--accent)", opacity: 0.7 }}>{"//"} </span>
            architecture explorer
          </p>
          <ArchitectureExplorerLoader />
        </div>
      )}

      <style>{`
        .project-back-link:hover {
          opacity: 1 !important;
          color: var(--accent) !important;
        }
      `}</style>
    </main>
  );
}
