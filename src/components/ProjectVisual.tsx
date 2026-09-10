import Image from "next/image";
import Link from "next/link";
import type { Project } from "../lib/projects";

export default function ProjectVisual({ project }: { project: Project }) {
  const src = project.images?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-preview group block"
      aria-label={`Explore ${project.title} case study`}
    >
      <div className="preview-toolbar" aria-hidden="true">
        <span className="flex gap-1.5"><i /><i /><i /></span>
        <span className="truncate">{project.title} / Preview</span>
        <span className="text-accent">↗</span>
      </div>
      <div className="preview-stage">
        {src ? (
          <div className="preview-screen">
            <Image
              src={src}
              alt={`${project.title} interface`}
              fill
              sizes="(max-width: 767px) 90vw, (max-width: 1440px) 43vw, 620px"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex aspect-[2/1] flex-wrap content-center gap-3 p-6">
            {project.stack.slice(0, 7).map((tech) => (
              <span key={tech} className="tech-chip">{tech}</span>
            ))}
          </div>
        )}
      </div>
      <div className="preview-caption">
        <span>{project.tag}</span>
        <span className="shrink-0 text-fg transition-colors group-hover:text-accent">Explore project ↗</span>
      </div>
    </Link>
  );
}
