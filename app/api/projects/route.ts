import { projects } from "../../../src/lib/projects";

export async function GET() {
  const data = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    tag: p.tag,
    description: p.description,
    stack: p.stack,
    links: p.links ?? null,
  }));

  return Response.json({ success: true, count: data.length, projects: data });
}
