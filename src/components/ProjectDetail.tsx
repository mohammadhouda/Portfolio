"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import ArchitectureExplorerLoader from "./architecture/ArchitectureExplorerLoader";
import type { Project } from "../lib/projects";

function CameraIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      <path d="M9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9z" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

function Lightbox({
  images,
  index,
  onClose,
}: {
  images: string[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const hasPrev = current > 0;
  const hasNext = current < images.length - 1;

  const prev = useCallback(() => { if (hasPrev) setCurrent((c) => c - 1); }, [hasPrev]);
  const next = useCallback(() => { if (hasNext) setCurrent((c) => c + 1); }, [hasNext]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={onClose}
    >
      {/* Image container — stop propagation so clicking image doesn't close */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current]}
          alt={`Screenshot ${current + 1}`}
          className="max-w-[90vw] max-h-[85vh] rounded-lg object-contain"
          style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8)" }}
        />

        {/* Counter */}
        {images.length > 1 && (
          <span className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 font-mono text-[0.65rem] text-white/40 tracking-widest">
            {current + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Prev arrow */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="fixed left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/60 transition-[background,border-color,color] duration-150 hover:bg-white/[0.12] hover:border-white/25 hover:text-white cursor-pointer"
          aria-label="Previous image"
        >
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2L4 6l4 4" />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="fixed right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/60 transition-[background,border-color,color] duration-150 hover:bg-white/[0.12] hover:border-white/25 hover:text-white cursor-pointer"
          aria-label="Next image"
        >
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 2l4 4-4 4" />
          </svg>
        </button>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/60 text-lg leading-none transition-[background,border-color,color] duration-150 hover:bg-white/[0.12] hover:border-white/25 hover:text-white cursor-pointer"
        aria-label="Close lightbox"
      >
        ×
      </button>
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const hasImages = project.images && project.images.length > 0;
  const gallerySlots = hasImages ? project.images! : [null, null, null];
  const realImages = project.images ?? [];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

      {/* ── Screenshot Gallery ── */}
      <div className="mb-14">
        <p className="font-mono text-[0.7rem] text-muted tracking-[0.12em] uppercase mb-5 opacity-50">
          <span className="text-accent opacity-70">{"//"} </span>
          screenshots
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallerySlots.map((src, i) => (
            <div
              key={i}
              className={`relative rounded-lg overflow-hidden ${
                src
                  ? "border border-border cursor-zoom-in group/img"
                  : "border border-dashed border-white/[0.1]"
              }`}
              style={{ aspectRatio: "16/9" }}
              onClick={() => src && setLightboxIndex(i)}
            >
              {src ? (
                <>
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.03]"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-white opacity-0 group-hover/img:opacity-80 transition-opacity duration-300 drop-shadow-lg"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-white/[0.02] flex flex-col items-center justify-center gap-3">
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <CameraIcon size={22} className="text-white/20 relative z-10" />
                  <span className="font-mono text-[0.58rem] text-white/15 tracking-[0.2em] uppercase relative z-10 select-none">
                    screenshot {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
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
          <ArchitectureExplorerLoader slug={project.slug} />
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={realImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </main>
  );
}
