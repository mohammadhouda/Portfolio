export async function GET() {
  const stack = {
    backend: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "Redis", "Firebase", "Socket.io", "REST APIs"],
    frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    tools_and_cloud: ["Git", "Docker", "AWS", "Supabase", "PM2", "Postman", "Puppeteer"],
    ai_and_tooling: ["Claude", "Cursor", "AI-assisted development", "Prompt engineering"],
  };

  return Response.json({ success: true, stack });
}
