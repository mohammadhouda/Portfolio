export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return Response.json(
      { success: false, error: "name is required" },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return Response.json(
      { success: false, error: "a valid email is required" },
      { status: 400 }
    );
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return Response.json(
      { success: false, error: "message must be at least 10 characters" },
      { status: 400 }
    );
  }

  return Response.json({
    success: true,
    message: "Message received",
    received: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      preview: message.trim().slice(0, 60) + (message.trim().length > 60 ? "..." : ""),
    },
  });
}
