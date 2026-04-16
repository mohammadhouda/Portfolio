import { notFound } from "next/navigation";
import { getProject, projects } from "../../../src/lib/projects";
import Navbar from "../../../src/components/Navbar";
import ProjectDetail from "../../../src/components/ProjectDetail";
import type { Metadata } from "next";

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

  const url = `https://mohammadhouda.dev/projects/${slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Mohammad Houda`,
      description: project.description,
      url,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Mohammad Houda`,
      description: project.description,
      images: ["/og-image.png"],
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

  return (
    <>
      <Navbar />
      <ProjectDetail project={project} />
    </>
  );
}
