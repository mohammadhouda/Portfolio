import type { NodeDetail } from "./nodeData";

/**
 * Raise — multi-tenant fundraising platform.
 * Source: docs/Raise/{architecture,ai,background-jobs,documents,security}.md
 */
export const nodeDetails: Record<string, NodeDetail> = {
  "web-app": {
    title: "React Web App",
    subtitle: "Founder workspace · Reviewer portal · Vite",
    tooltip:
      "One React app serves two audiences that never share an auth path: the founder workspace on cookie sessions, and the tokenized reviewer data room.",
    detail:
      "packages/web is a React + Vite SPA. It holds both the founder workspace UI (investor CRM, pipeline, rounds, tasks, chat, documents) and the external reviewer portal, switched by route.\n\nIts view of the API is generated, not hand-written: packages/api/openapi.yaml runs through openapi-typescript into packages/web/src/lib/api-types.ts. That generation step is the boundary that stops the frontend from depending on backend internals — an endpoint change isn't done until the YAML and the generated types both are.\n\nOne authenticated EventSource per signed-in user carries notifications and team chat; the client treats events as invalidation signals and refetches PostgreSQL-backed queries, so a dropped or duplicated message is self-healing.",
    color: "#f9a8d4",
  },
  "reviewer-auth": {
    title: "Reviewer Access Path",
    subtitle: "Link token → email OTP → scoped session",
    tooltip:
      "External reviewers get a completely separate authentication path: a tokenized data-room link, email OTP, and a session that can only reach /reviewer-portal/*.",
    detail:
      "Founders and their team use cookie sessions with role-based permissions. External reviewers never touch that path. They open a tokenized link, verify by email OTP, and receive a separate session — separate cookie, separate table — enforced by requireReviewerSession and scoped to portal routes only.\n\nThis is a hard boundary in the security model, not a permission tier: a reviewer credential cannot address a workspace route at all, so a bug in workspace RBAC can't widen reviewer access.",
    color: "#a78bfa",
  },
  "api": {
    title: "Express API",
    subtitle: "server.ts → app.ts · REST · SSE · health",
    tooltip:
      "REST, auth, SSE, and health probes. Enqueues jobs but runs no BullMQ processors — the worker is a separate process built from the same package.",
    detail:
      "The request path for a startup-scoped route is a fixed middleware chain: authenticate (access-token cookie + a live refresh-token family) → validate params → requireMember (an active StartupMember for that exact startup) → requirePermission (role holds resource:action) → validate body/query → controller → service.\n\nTenant isolation is enforced twice on purpose. Middleware checks membership and permission; services still select through composite keys like startupId_id. Middleware alone leaves a service one refactor away from an unscoped findUnique({ id }); scoping alone leaks the difference between \"forbidden\" and \"not found\".\n\nErrors raised as createError(message, status, code) unwind to one error middleware that emits the shared envelope. Optional integrations are gated at boot by validateEnv(), which collects every problem and exits with the list.",
    color: "#fbbf24",
  },
  "worker": {
    title: "BullMQ Worker",
    subtitle: "8 queues · scheduled tasks · separate process",
    tooltip:
      "A separate process that runs every BullMQ processor and serves no HTTP. Recurring maintenance rides the same queues as a repeatable job.",
    detail:
      "Eight queues, each with concurrency chosen by what the job is bound by: email (10, IO-bound), document-processing (2, provider-bound), document-rasterize (1, CPU-bound — would starve the rest), embeddings (5, provider rate limits), ai-analysis (2), calendar-sync (3, Google quota is per-project), gmail-log-retry (5), scheduled-tasks (1).\n\nEvery job must be idempotent — retries, restarts, and multiple consumers are normal. Techniques in use: delete-then-write inside a transaction, upsert on a natural key, fixed jobId for dedup, and generation checks for staleness.\n\nThe six periodic maintenance tasks are not a separate mechanism. Each is a BullMQ Job Scheduler (upsertJobScheduler) whose schedule lives in Redis, so exactly one instance is produced per due tick regardless of replica count. registerScheduledTasks() runs once at worker boot and is a safe idempotent upsert.",
    color: "#f87171",
  },
  "ai-copilot": {
    title: "AI Copilot",
    subtitle: "RAG · propose-only tools · grounded + cited",
    tooltip:
      "A grounded conversational copilot plus rubric-scored pitch-deck analysis. The model is treated as untrusted input that happens to be useful — it can never write.",
    detail:
      "Three rules hold the boundary. Capabilities are derived from the caller's role — a tool the caller can't back with a permission is never offered to the model, so it can't appear in prompt context. The model can never write: anything that would change state is created as a proposal a human approves, and approval re-checks the permission the manual action needs. Answers are grounded — retrieved chunks are scoped to the startup and the caller's document permissions, and citations point at the chunk that justified each claim.\n\nSubmitting a prompt and reading the response are separate requests: the POST persists the message and claims the run in a Redis run-registry (TTL + 8s heartbeat); the SSE GET attaches to it. That split is what makes reconnect, multi-tab, and cross-replica resume work. A bounded Redis replay buffer lets a reconnect landing on another replica resume mid-generation.\n\nRetrieval runs a pgvector cosine search over document_chunks with SET LOCAL hnsw.iterative_scan = 'relaxed_order', because the HNSW index is global across tenants and a small corpus would otherwise lose real matches before the startup_id filter applies.",
    color: "#60a5fa",
  },
  "postgres": {
    title: "PostgreSQL + pgvector",
    subtitle: "Transactional data · audit trail · vector(1536)",
    tooltip:
      "Everything transactional, the audit trail, and document_chunks.embedding as vector(1536) for pgvector similarity search — all in one database.",
    detail:
      "Prisma (packages/api/prisma/schema.prisma) is the schema of record. A user can belong to several startup workspaces; nearly all business data belongs to exactly one startup, and queries reach it through composite keys such as startupId_id so a query cannot escape its tenant.\n\ndocument_chunks.embedding is a raw vector(1536) column with an HNSW index — not a native Prisma type, so it's added by SQL migration. Retrieval is filtered to the startup and to versions with processing_status = 'ready'.\n\nAll API replicas must share one PostgreSQL instance: rate limits, realtime fan-out, and AI run ownership all depend on shared state. Migrations run as a release step before the new API serves traffic.",
    color: "#22c55e",
  },
  "redis": {
    title: "Redis",
    subtitle: "BullMQ · rate limits · pub/sub · run registry",
    tooltip:
      "One Redis instance carries BullMQ (including repeatable schedules), distributed rate limits, realtime pub/sub, AI run ownership, and local upload tokens.",
    detail:
      "Redis is the bus between processes. An in-process map is correct for one API instance and wrong the moment there are two, so realtime fan-out, rate-limit buckets, and the AI run registry all live here. Tests and REALTIME_BUS=memory fall back to the in-process implementation.\n\nBullMQ queues default to three attempts with exponential backoff. The recurring maintenance schedule itself lives in Redis via BullMQ's Job Scheduler API — there is no cron inside any process.\n\nThe run registry moves three facts into Redis so they hold across replicas: is this run alive (TTL key + 8s heartbeat), how many runs does this user have (self-healing set vs the TTL keys, so AI_CONCURRENT_STREAMS_PER_USER isn't silently multiplied by replica count), and cancel (pub/sub, so a cancel landing on replica B reaches the AbortController on A).",
    color: "#fb923c",
  },
  "storage": {
    title: "Object Storage",
    subtitle: "Supabase Storage · local fallback · signed paths",
    tooltip:
      "Document bytes and rasterized page images. Supabase Storage in production; a token-gated local directory when Supabase is unconfigured.",
    detail:
      "Uploads are split into three phases so the API never proxies file bytes: the API validates MIME and size, creates Document + DocumentVersion (pending_upload) and a signed upload target; the browser PUTs bytes straight to storage; a confirm call HEADs the object, flips the version to processing, and enqueues document-processing and document-rasterize.\n\nPrivate document bytes are never served by a plain URL — access is a signed, short-lived path. Avatars are the deliberate exception: a profile photo lives in a separate public bucket because it is meant to be publicly renderable.\n\nA tab that closes mid-upload leaves a pending_upload row nothing else revisits; the stale-document-upload-cleanup schedule deletes those after an hour.",
    color: "#38bdf8",
  },
  "providers": {
    title: "External Providers",
    subtitle: "OpenAI · LlamaParse · Resend · Google",
    tooltip:
      "OpenAI for embeddings and chat, LlamaParse for document parsing beyond text/plain, Resend for email, Google for Calendar / Gmail / sign-in. Each gated at boot.",
    detail:
      "Feature gating happens at boot, not at call time. AI chat and analysis need AI_ENABLED plus OPENAI_API_KEY; Google Calendar/Gmail needs all three of GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_TOKEN_ENCRYPTION_KEY; Sign in with Google needs only GOOGLE_CLIENT_ID; document parsing beyond text/plain needs LLAMA_CLOUD_API_KEY. A partially configured group is a boot error on purpose.\n\nThe worker owns most provider calls: LlamaParse parsing, OpenAI embeddings, pitch-deck analysis, Resend delivery, and Google Calendar pulls into interaction logs. calendar-sync concurrency is kept low because Google quota is per project, not per connection — low concurrency stops many connections from bursting it.",
    color: "#34d399",
  },
};

// A vertical spine — web-app → api → redis → postgres — down the centre
// (x: 300), with satellites in the left (x: 0) and right (x: 630) columns.
export const initialNodes = [
  { id: "web-app", type: "customNode", position: { x: 300, y: 40 }, data: nodeDetails["web-app"] },
  { id: "reviewer-auth", type: "customNode", position: { x: 630, y: 40 }, data: nodeDetails["reviewer-auth"] },

  { id: "ai-copilot", type: "customNode", position: { x: 0, y: 250 }, data: nodeDetails["ai-copilot"] },
  { id: "api", type: "customNode", position: { x: 300, y: 250 }, data: nodeDetails["api"] },

  { id: "providers", type: "customNode", position: { x: 0, y: 470 }, data: nodeDetails["providers"] },
  { id: "redis", type: "customNode", position: { x: 300, y: 470 }, data: nodeDetails["redis"] },
  { id: "worker", type: "customNode", position: { x: 630, y: 470 }, data: nodeDetails["worker"] },

  { id: "postgres", type: "customNode", position: { x: 300, y: 690 }, data: nodeDetails["postgres"] },
  { id: "storage", type: "customNode", position: { x: 630, y: 690 }, data: nodeDetails["storage"] },
];

export const initialEdges = [
  {
    id: "web-api",
    source: "web-app",
    target: "api",
    animated: true,
    style: { strokeWidth: 2 },
  },
  {
    id: "reviewer-api",
    source: "reviewer-auth",
    target: "api",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "api-copilot",
    source: "api",
    target: "ai-copilot",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "api-postgres",
    source: "api",
    target: "postgres",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "api-redis",
    source: "api",
    target: "redis",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "api-storage",
    source: "api",
    target: "storage",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "copilot-postgres",
    source: "ai-copilot",
    target: "postgres",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "copilot-providers",
    source: "ai-copilot",
    target: "providers",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "redis-worker",
    source: "redis",
    target: "worker",
    animated: true,
    style: { strokeWidth: 2 },
  },
  {
    id: "worker-postgres",
    source: "worker",
    target: "postgres",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "worker-storage",
    source: "worker",
    target: "storage",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "worker-providers",
    source: "worker",
    target: "providers",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
];
