"use client";

import Image from "next/image";
import Parallax from "./motion/Parallax";
import type { Project } from "../lib/projects";

/**
 * A project's visual slot.
 *
 * When there's no screenshot, this renders a typographic plate rather than a
 * grey "no preview" box — the stack set on a sunk paper ground reads as a
 * deliberate composition instead of a hole in the layout.
 */
export default function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const src = project.images?.[0];

  if (!src) {
    return (
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface">
        <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
          <span className="t-meta text-fg-4">{project.tag}</span>

          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {project.stack.slice(0, 7).map((tech) => (
              <span
                key={tech}
                className="font-display text-[clamp(1rem,2.1vw,1.7rem)] font-bold uppercase leading-tight tracking-[-0.03em] text-fg-3"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="t-meta text-fg-4">{project.year}</span>
        </div>
      </div>
    );
  }

  return (
    <Parallax amount={8} className="relative aspect-[3/2] w-full bg-surface">
      <Image
        src={src}
        alt={`${project.title} interface`}
        fill
        sizes="(max-width: 900px) 100vw, 45vw"
        priority={priority}
        className="object-cover object-top"
      />
    </Parallax>
  );
}
