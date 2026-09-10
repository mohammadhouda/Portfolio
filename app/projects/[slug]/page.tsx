import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "../../../src/lib/projects";
import { profile } from "../../../src/lib/profile";
import Nav from "../../../src/components/Nav";
import Footer from "../../../src/components/Footer";
import ProjectDetail from "../../../src/components/ProjectDetail";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `${profile.site}/projects/${slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${profile.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  // Wrap around so the last project points back at the first.
  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${profile.site}/projects/${slug}`,
    author: { "@type": "Person", name: profile.name, url: profile.site },
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav standalone />
      <ProjectDetail project={project} next={next} />
      <Footer />
    </>
  );
}
