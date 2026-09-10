import Link from "next/link";
import SectionHead from "./SectionHead";
import Reveal from "./motion/Reveal";
import SplitReveal from "./motion/SplitReveal";
import Rule from "./motion/Rule";
import ProjectVisual from "./ProjectVisual";
import { featuredProjects, archivedProjects, type Project } from "../lib/projects";

function FeaturedRow({ project, index }: { project: Project; index: number }) {
  // Alternate which side the visual sits on. The column spans stay on the
  // same 12-column grid either way, so the rhythm changes without the
  // structure loosening.
  const visualFirst = index % 2 === 1;

  return (
    <article className="grid-12 gap-y-8 py-14 md:py-20">
      {/* ── Visual ── */}
      <Reveal
        y={36}
        className={`col-span-full md:col-span-6 ${
          visualFirst ? "lg:col-span-6" : "lg:col-span-6 lg:col-start-7"
        } ${visualFirst ? "md:order-1" : "md:order-2"}`}
      >
        <ProjectVisual project={project} priority={index === 0} />
      </Reveal>

      {/* ── Text ── */}
      <div
        className={`col-span-full flex flex-col md:col-span-6 ${
          visualFirst ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5"
        } ${visualFirst ? "md:order-2" : "md:order-1"} md:justify-center`}
      >
        <Reveal y={18} className="mb-5 flex items-baseline justify-between gap-4">
          <span className="t-meta text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="t-meta text-fg-4">{project.year}</span>
        </Reveal>

        <SplitReveal
          as="h3"
          className="t-display mb-3 text-fg"
          style={{ fontSize: "clamp(2rem, 4.4vw, 3.5rem)" }}
        >
          {project.title}
        </SplitReveal>

        <Reveal y={16} delay={0.05}>
          <p className="t-meta mb-6 text-fg-3">{project.tag}</p>
          <p className="t-body mb-8 max-w-[46ch]">{project.description}</p>
        </Reveal>

        {project.metrics && (
          <Reveal y={16} delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-[1.9rem] font-bold leading-none tracking-[-0.03em] text-fg">
                    {m.value}
                  </p>
                  <p className="t-meta mt-1.5 text-fg-4">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal y={16} delay={0.15}>
          <p className="mb-8 font-mono text-[0.7rem] leading-relaxed text-fg-3">
            {project.stack.join("  ·  ")}
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={`/projects/${project.slug}`}
              className="group t-meta flex items-center gap-3 text-fg transition-colors duration-300 hover-fine:hover:text-accent"
            >
              <span className="link-undraw">Read the case study</span>
              <svg
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
                className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
              >
                <path d="M0 5h18M14 1l4 4-4 4" />
              </svg>
            </Link>

            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta link-draw text-fg-3 transition-colors duration-300 hover-fine:hover:text-fg"
              >
                Source ↗
              </a>
            )}

            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta link-draw text-fg-3 transition-colors duration-300 hover-fine:hover:text-fg"
              >
                Live ↗
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function ArchiveRow({ project }: { project: Project }) {
  return (
    <Reveal y={14}>
      <Link
        href={`/projects/${project.slug}`}
        className="group grid-12 items-baseline gap-y-2 py-5 transition-colors duration-300 hover-fine:hover:text-accent"
      >
        <span className="t-meta col-span-2 text-fg-4 lg:col-span-1">
          {project.year}
        </span>
        <span className="t-h3 col-span-full text-fg transition-colors duration-300 group-hover:text-accent md:col-span-4 lg:col-span-4">
          {project.title}
        </span>
        <span className="t-meta col-span-full text-fg-3 md:col-span-6 lg:col-span-5">
          {project.tag}
        </span>
        <span
          className="col-span-full hidden text-right lg:col-span-2 lg:block"
          aria-hidden="true"
        >
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="ml-auto text-fg-4 transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-accent"
          >
            <path d="M0 5h18M14 1l4 4-4 4" />
          </svg>
        </span>
      </Link>
      <Rule />
    </Reveal>
  );
}

export default function Work() {
  return (
    <section className="shell py-24 md:py-32">
      <SectionHead
        index="01"
        label="Selected Work"
        note={`${featuredProjects.length} projects`}
      />

      <div className="divide-y divide-rule-soft">
        {featuredProjects.map((project, i) => (
          <FeaturedRow key={project.slug} project={project} index={i} />
        ))}
      </div>

      {archivedProjects.length > 0 && (
        <div className="mt-20 md:mt-28">
          <Reveal y={14} className="mb-6">
            <p className="t-meta text-fg-4">Also built</p>
          </Reveal>
          <Rule />
          {archivedProjects.map((project) => (
            <ArchiveRow key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
