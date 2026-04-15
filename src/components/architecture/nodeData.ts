export interface NodeDetail extends Record<string, unknown> {
  title: string;
  subtitle: string;
  tooltip: string;
  detail: string;
  color: string;
}

export const nodeDetails: Record<string, NodeDetail> = {
  "admin-portal": {
    title: "Admin Portal",
    subtitle: "admin.hopelink.com",
    tooltip: "Central management hub for platform-wide config, user/charity review, and audit trails.",
    detail:
      "Handles platform settings, user and charity management, registration request review, verification workflows, audit log, API key management, and reports. Powered by role middleware only ADMIN tokens can reach these routes.\n\nKey feature: every admin action is logged with userId, IP, action type, and target full audit trail.",
    color: "#a78bfa",
  },
  "charity-portal": {
    title: "Charity Portal",
    subtitle: "charity.hopelink.com",
    tooltip: "Where charities manage projects, review applications, and issue volunteer certificates.",
    detail:
      "CHARITY-role portal for opportunity CRUD, application review (approve/decline), volunteer ratings, bulk certificate issuance, analytics dashboard, real-time room management, and volunteer roster.\n\nTwo-hop aggregation for project-level application counts is solved with a raw LEFT JOIN utility shared across both charity and admin portals.",
    color: "#60a5fa",
  },
  "user-portal": {
    title: "User Portal",
    subtitle: "app.hopelink.com",
    tooltip: "Volunteer-facing portal with a match-ranked opportunity feed powered by pre-computed scores.",
    detail:
      "USER-role portal for the match-ranked opportunity feed, application management, volunteer rooms, certificates, experience history, preferences, notifications, and community feed.\n\nThe feed is powered by VolunteerMatchScore an indexed junction table written by BullMQ workers. Every page of results is a fast B-tree scan, not a full table scan.",
    color: "#34d399",
  },
  "nextjs-frontend": {
    title: "Next.js Frontend",
    subtitle: "Subdomain routing · Shared components",
    tooltip: "Middleware-based subdomain routing one codebase, three separate portal UXs.",
    detail:
      "A single Next.js app serves all three portals. Next.js middleware reads the subdomain from the request host and renders the correct portal layout and routes. All portals share a component library, reducing duplication while maintaining isolated UX contexts.\n\nThis approach avoids the complexity of three separate deployments while keeping portal logic clean at the component level.",
    color: "#f9a8d4",
  },
  "express-api": {
    title: "Express API",
    subtitle: ":5000 · admin/ charity/ user/ public/",
    tooltip: "One server, four route namespaces, role middleware enforcing isolation at every protected route.",
    detail:
      "All three portals share one Express server. Routes are organized into /api/admin, /api/charity, /api/user, and /api/public namespaces. Role middleware (restrictTo) sits at the top of every protected router.\n\nEvery controller is wrapped with asyncHandler no try/catch boilerplate. Services throw {status, message} objects; the wrapper normalizes them. BullMQ worker starts in the same process on server startup.",
    color: "#fbbf24",
  },
  "prisma-postgres": {
    title: "Prisma + PostgreSQL",
    subtitle: "ORM · Migrations · tsvector search",
    tooltip: "Prisma as the ORM with raw SQL where needed enum casts, upserts, and two-hop aggregations.",
    detail:
      "Prisma handles migrations, type-safe queries, and most CRUD. Raw SQL fills the gaps: INSERT ... ON CONFLICT DO UPDATE for idempotent score writes, LEFT JOIN for cross-relation counts, and explicit ::\"City\" / ::\"Category\" enum casts in $queryRawUnsafe (missing casts cause 'operator does not exist' runtime errors).\n\nKey table: VolunteerMatchScore with @@index([volunteerId, score(sort: Desc)]) turns ORDER BY score into a B-tree scan.",
    color: "#22c55e",
  },
  "supabase-storage": {
    title: "Supabase Storage",
    subtitle: "File uploads · service_role key",
    tooltip: "File storage using Supabase with the service_role key pattern bypasses RLS for server-side uploads.",
    detail:
      "Charity and user file uploads (profile photos, certificates, documents) go through Supabase Storage. The API uses the service_role key to bypass Row Level Security uploads are authorized at the API level via JWT/role checks before reaching the storage client.\n\nThe Supabase anon key is kept in config but never used for server-to-storage communication.",
    color: "#38bdf8",
  },
  "notifications": {
    title: "Notifications System",
    subtitle: "EventEmitter · Broadcast to admins",
    tooltip: "Node.js EventEmitter for decoupled in-app notifications emitted on key lifecycle events.",
    detail:
      "A thin event emitter layer decouples notification logic from business logic. Key events: NGO registration submissions broadcast to all admins, opportunity status changes, application updates, and certificate issuance.\n\nNotifications are stored in the DB (Notification model) and fetched via /api/user/notifications. The emitter pattern means services don't need to know about notification logic they just emit.",
    color: "#fb923c",
  },
  "bullmq-worker": {
    title: "BullMQ Worker",
    subtitle: "Upstash Redis · concurrency: 5",
    tooltip: "Background job queue that moves expensive match-score computation off the request path entirely.",
    detail:
      "BullMQ v5 requires raw ioredis connection options REDIS_URL is parsed into a config object so Queue and Worker each create their own dedicated connections (the correct BullMQ pattern).\n\nTwo job types: score:volunteer (re-scores all OPEN opportunities for one volunteer) and score:opportunity (scores all volunteers against one opportunity). Jobs use stable jobIds for deduplication rapid profile saves don't stack duplicates.",
    color: "#f87171",
  },
};

export const initialNodes = [
  // Portals (top row)
  {
    id: "admin-portal",
    type: "customNode",
    position: { x: 60, y: 40 },
    data: nodeDetails["admin-portal"],
  },
  {
    id: "charity-portal",
    type: "customNode",
    position: { x: 340, y: 40 },
    data: nodeDetails["charity-portal"],
  },
  {
    id: "user-portal",
    type: "customNode",
    position: { x: 620, y: 40 },
    data: nodeDetails["user-portal"],
  },

  // Frontend (middle)
  {
    id: "nextjs-frontend",
    type: "customNode",
    position: { x: 340, y: 220 },
    data: nodeDetails["nextjs-frontend"],
  },

  // API (center)
  {
    id: "express-api",
    type: "customNode",
    position: { x: 340, y: 400 },
    data: nodeDetails["express-api"],
  },

  // Services (bottom row)
  {
    id: "prisma-postgres",
    type: "customNode",
    position: { x: 60, y: 580 },
    data: nodeDetails["prisma-postgres"],
  },
  {
    id: "supabase-storage",
    type: "customNode",
    position: { x: 340, y: 580 },
    data: nodeDetails["supabase-storage"],
  },
  {
    id: "notifications",
    type: "customNode",
    position: { x: 620, y: 580 },
    data: nodeDetails["notifications"],
  },
  {
    id: "bullmq-worker",
    type: "customNode",
    position: { x: 620, y: 400 },
    data: nodeDetails["bullmq-worker"],
  },
];

export const initialEdges = [
  // Portals → Frontend
  {
    id: "admin-frontend",
    source: "admin-portal",
    target: "nextjs-frontend",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.3)", strokeWidth: 1.5 },
  },
  {
    id: "charity-frontend",
    source: "charity-portal",
    target: "nextjs-frontend",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.3)", strokeWidth: 1.5 },
  },
  {
    id: "user-frontend",
    source: "user-portal",
    target: "nextjs-frontend",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.3)", strokeWidth: 1.5 },
  },

  // Frontend → API
  {
    id: "frontend-api",
    source: "nextjs-frontend",
    target: "express-api",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.5)", strokeWidth: 2 },
  },

  // API → services
  {
    id: "api-prisma",
    source: "express-api",
    target: "prisma-postgres",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.35)", strokeWidth: 1.5 },
  },
  {
    id: "api-supabase",
    source: "express-api",
    target: "supabase-storage",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.35)", strokeWidth: 1.5 },
  },
  {
    id: "api-notifications",
    source: "express-api",
    target: "notifications",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.35)", strokeWidth: 1.5 },
  },
  {
    id: "api-bullmq",
    source: "express-api",
    target: "bullmq-worker",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.35)", strokeWidth: 1.5 },
  },

  // BullMQ → Prisma (worker writes scores)
  {
    id: "bullmq-prisma",
    source: "bullmq-worker",
    target: "prisma-postgres",
    animated: true,
    style: { stroke: "rgba(248,113,113,0.35)", strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
];
