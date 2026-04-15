const START_TIME = Date.now();

export async function GET() {
  const uptimeMs = Date.now() - START_TIME;
  const uptimeSec = Math.floor(uptimeMs / 1000);
  const hours = Math.floor(uptimeSec / 3600);
  const minutes = Math.floor((uptimeSec % 3600) / 60);
  const seconds = uptimeSec % 60;

  return Response.json({
    status: "ok",
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    region: process.env.VERCEL_REGION ?? "local",
  });
}
