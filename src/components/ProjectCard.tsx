"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "../lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
        borderRadius: "10px",
        padding: "2rem 2.5rem",
        boxShadow: hovered ? "0 0 28px rgba(34,197,94,0.08)" : "none",
        transition: "border-color 0.25s, box-shadow 0.25s",
        position: "relative",
        overflow: "hidden",
        willChange: "transform, opacity",
      }}
    >
      {/* Line number decoration */}
      <span
        style={{
          position: "absolute",
          top: "2rem",
          right: "2.5rem",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.65rem",
          color: "var(--text-secondary)",
          opacity: 0.2,
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Tag */}
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

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontWeight: 700,
          fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.75,
          color: "var(--text-secondary)",
          maxWidth: "640px",
          marginBottom: "1.5rem",
        }}
      >
        {project.description}
      </p>

      {/* Stack pills — stagger animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}
      >
        {project.stack.map((tech) => (
          <motion.span
            key={tech}
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.3 }}
            style={{
              display: "inline-block",
              padding: "0.25rem 0.6rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "4px",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.72rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.02em",
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* Links row */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
        {/* Case study */}
        <Link
          href={`/projects/${project.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.78rem",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            opacity: 0.85,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
        >
          case_study
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </Link>

        {/* GitHub */}
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              opacity: 0.6,
              transition: "opacity 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "1";
              el.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "0.6";
              el.style.color = "var(--text-secondary)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
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
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              opacity: 0.6,
              transition: "opacity 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "1";
              el.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "0.6";
              el.style.color = "var(--text-secondary)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
