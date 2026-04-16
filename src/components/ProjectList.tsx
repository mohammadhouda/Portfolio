import { projects } from "../lib/projects";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

export default function ProjectList() {
  return (
    <section id="projects" className="py-24 px-8 max-w-300 mx-auto">
      <ScrollReveal>
        <SectionLabel label="projects" lineNumber={3} />
      </ScrollReveal>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
