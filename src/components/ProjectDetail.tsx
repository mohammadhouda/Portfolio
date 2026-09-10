"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Reveal from "./motion/Reveal";
import SplitReveal from "./motion/SplitReveal";
import Rule from "./motion/Rule";
import Lightbox from "./Lightbox";
import ArchitectureExplorerLoader from "./architecture/ArchitectureExplorerLoader";
import type { Project } from "../lib/projects";

export default function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const images = project.images ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="shell pt-28 pb-16 md:pt-36">
      {/* ── Back ── */}
      <Reveal y={12} className="mb-14">
        <Link
          href="/#work"
          className="group t-meta inline-flex items-center gap-3 text-ink-3 transition-colors duration-300 hover-fine:hover:text-accent"
        >
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
            className="transition-transform duration-500 ease-out group-hover:-translate-x-1.5"
          >
            <path d="M20 5H2M6 1L2 5l4 4" />
          </svg>
          <span className="link-undraw">All work</span>
        </Link>
      </Reveal>

      {/* ── Masthead ── */}
      <header className="mb-20 md:mb-28">
        <Reveal y={14} className="mb-4 flex items-baseline justify-between gap-6">
          <span className="t-meta text-accent">{project.tag}</span>
          <span className="t-meta text-ink-4">{project.year}</span>
        </Reveal>

        <Rule className="mb-10" />

        <SplitReveal
          as="h1"
          className="t-display mb-12 max-w-[14ch] text-ink"
          style={{ fontSize: "clamp(2.75rem, 9vw, 8rem)" }}
        >
          {project.title}
        </SplitReveal>

        <div className="grid-12 gap-y-10">
          <Reveal y={20} className="col-span-full lg:col-span-7">
            <p className="t-body max-w-[62ch]">{project.longDescription}</p>
          </Reveal>

          <div className="col-span-full lg:col-span-4 lg:col-start-9">
            {project.metrics && (
              <Reveal y={20} className="mb-10">
                <p className="t-meta mb-5 text-ink-4">At a glance</p>
                <div className="flex flex-col gap-5">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex items-baseline gap-4">
                      <span className="font-display text-[1.9rem] leading-none text-ink">
                        {m.value}
                      </span>
                      <span className="t-meta text-ink-3">{m.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal y={20}>
              <p className="t-meta mb-4 text-ink-4">Built with</p>
              <p className="font-mono text-[0.75rem] leading-relaxed text-ink-2">
                {project.stack.join("  ·  ")}
              </p>
            </Reveal>

            {(project.links?.github || project.links?.live) && (
              <Reveal y={20} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-meta link-draw text-ink transition-colors duration-300 hover-fine:hover:text-accent"
                  >
                    Source ↗
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-meta link-draw text-ink transition-colors duration-300 hover-fine:hover:text-accent"
                  >
                    Live site ↗
                  </a>
                )}
              </Reveal>
            )}
          </div>
        </div>
      </header>

      {/* ── Screenshots ── */}
      {images.length > 0 && (
        <section className="mb-20 md:mb-28">
          <Reveal y={14} className="mb-6 flex items-baseline justify-between">
            <p className="t-meta text-ink-4">Interface</p>
            <p className="t-meta text-ink-4">
              {String(images.length).padStart(2, "0")} views
            </p>
          </Reveal>

          <Rule className="mb-8" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src, i) => (
              <Reveal key={src} y={26} delay={i * 0.06}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden bg-paper-sunk p-0"
                  style={{ aspectRatio: "16 / 10" }}
                  aria-label={`Open ${project.title} screenshot ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="t-meta absolute bottom-3 left-3 bg-paper px-2 py-1 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Highlights ── */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="mb-20 md:mb-28">
          <Reveal y={14} className="mb-6">
            <p className="t-meta text-ink-4">Engineering notes</p>
          </Reveal>

          <Rule />

          <ol>
            {project.highlights.map((h, i) => (
              <Reveal key={i} y={16} as="li">
                <div className="grid-12 gap-y-2 py-6">
                  <span className="t-meta col-span-2 text-accent lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="col-span-full text-[0.95rem] leading-relaxed text-ink-2 md:col-span-6 lg:col-span-9">
                    {h}
                  </p>
                </div>
                <Rule />
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {/* ── Architecture ── */}
      {project.hasArchitecture && (
        <section className="mb-20 md:mb-28">
          <Reveal y={14} className="mb-6 flex items-baseline justify-between">
            <p className="t-meta text-ink-4">Architecture</p>
            <p className="t-meta text-ink-4">Interactive — click any node</p>
          </Reveal>

          <Rule className="mb-8" />

          <ArchitectureExplorerLoader slug={project.slug} />
        </section>
      )}

      {/* ── Next project ── */}
      <section>
        <Rule className="mb-8" />
        <Reveal y={18}>
          <Link href={`/projects/${next.slug}`} className="group block py-6">
            <p className="t-meta mb-4 text-ink-4">Next project</p>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="t-h2 text-ink transition-colors duration-300 group-hover:text-accent">
                {next.title}
              </h2>
              <span className="t-meta text-ink-3">{next.tag}</span>
            </div>
          </Link>
        </Reveal>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          title={project.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </main>
  );
}
