import { projects } from "../lib/projects";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

export default function ProjectList() {
  return (
    <section
      id="projects"
      style={{
        padding: "6rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <ScrollReveal>
        <SectionLabel label="projects" lineNumber={3} />
      </ScrollReveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
