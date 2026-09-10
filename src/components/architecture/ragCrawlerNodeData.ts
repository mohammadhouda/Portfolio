import type { NodeDetail } from "./nodeData";

/**
 * Distributed RAG Crawler — queue-coordinated scraper + hybrid search + RAG.
 * Source: docs/scrape/{architecture,how-it-works,chunking-strategy}.md
 */
export const nodeDetails: Record<string, NodeDetail> = {
  "web": {
    title: "Next.js Web",
    subtitle: "Public search / ask · operator admin panel",
    tooltip:
      "App Router UI. Public search is server-rendered with no client JS; ask streams SSE via fetch(); admin is gated by an httpOnly cookie and talks to the API through a same-origin proxy.",
    detail:
      "Public, no auth: / (search bar + source cards), /search (keyword/semantic/hybrid toggle and source filter, all server-rendered — filtering is plain <Link>s with query params), /ask (client component consuming the SSE stream via fetch() + manual parsing, since EventSource can't send a POST body), /page/[id] (version snapshot with scroll-to-highlight for a cited chunk).\n\nAdmin is gated by an httpOnly admin_token cookie checked in middleware.ts. Because the cookie is httpOnly, live-polling counters go through a same-origin Route Handler proxy that reads the cookie server-side — the token never reaches client JS. Mutations (create source, start crawl, retry job) are Server Actions for the same reason.",
    color: "#f9a8d4",
  },
  "api": {
    title: "Fastify API",
    subtitle: "REST + SSE · Zod-validated · auto OpenAPI",
    tooltip:
      "Every route is Zod-validated on request and response, and the schema doubles as the source for the generated OpenAPI document. Admin routes check a static bearer token.",
    detail:
      "Routes: /search (keyword/semantic/hybrid), /ask (RAG Q&A, SSE), /pages and /pages/:id/versions (raw pages + full version history), /sources and /sources/:id/crawl (admin: enqueue a scrape job for the seed URL), /admin/queues and /admin/dlq (per-queue counts, failed jobs, retry).\n\n@fastify/swagger builds the OpenAPI doc straight from the Zod schemas. Admin routes sit behind a requireAdmin preHandler checking a static ADMIN_TOKEN.\n\n/ask's SSE response is written by hand (reply.hijack() + reply.raw.write) rather than through a plugin, because Fastify's SSE story requires bypassing onSend hooks — including the CORS plugin — so Access-Control-Allow-Origin is set manually before the stream starts.",
    color: "#fbbf24",
  },
  "rag": {
    title: "Retrieval + RAG",
    subtitle: "keyword · semantic · hybrid (RRF) → SSE answer",
    tooltip:
      "Three search modes over one index. Hybrid fuses keyword and vector result lists with Reciprocal Rank Fusion; /ask runs the selected mode, builds one shared prompt, and streams the completion token by token.",
    detail:
      "keyword: Postgres full-text search against a generated, GIN-indexed tsvector column. semantic: pgvector cosine similarity (vector_cosine_ops, HNSW-indexed) against the embedded query. hybrid (default): Reciprocal Rank Fusion of both lists, score = Σ 1/(60 + rank) with the standard RRF constant, because cosine distance and ts_rank aren't on comparable scales.\n\n/ask (packages/rag/ask.ts) runs the selected mode, builds a single shared prompt (packages/rag/prompt.ts — no ad-hoc prompts anywhere else), and streams the GPT-5.5 completion over SSE (citations → token* → done/error). The model must answer only from the numbered sources and cite every claim with [n]; the citations returned to the client are built from the same retrieved-chunk list the prompt was constructed from, so a citation can never point outside the retrieval set.",
    color: "#60a5fa",
  },
  "redis": {
    title: "Redis / BullMQ",
    subtitle: "scrape · discover · index queues + DLQ",
    tooltip:
      "All cross-worker coordination lives here, not in a crawl framework's in-process queue. Three queues, retries with backoff, a dead-letter queue, the robots.txt cache, and per-domain rate-limit buckets.",
    detail:
      "Crawl frameworks like Crawlee ship an in-process request queue that isn't shared across containers — using it for coordination would make horizontal scaling impossible. Here the fetch layer is deliberately thin and BullMQ owns all coordination, retries, backoff, and the DLQ.\n\nEvery queue uses 5 attempts with exponential backoff (2s → 4s → 8s → 16s → 32s). Jobs that exhaust retries land in BullMQ's failed state and are visible and retryable from /admin/dlq — nothing fails silently.\n\ndiscover jobs use jobId = sha256(url), so concurrently-discovered duplicate links collapse into one scrape job without a DB round trip. The robots.txt cache is a Redis key with a 24h TTL; per-domain rate limiting is a token bucket in Redis.",
    color: "#fb923c",
  },
  "scrape-worker": {
    title: "scrape worker",
    subtitle: "fetch one URL · clean · version",
    tooltip:
      "Each job fetches exactly one URL — fetch + Cheerio for static pages, or a shared headless Chromium for JS-rendered ones — then hands discovered links back as a discover job.",
    detail:
      "Per job: robots.txt check (Redis cache) → per-domain token-bucket rate limit → fetch. Static pages use fetch + Cheerio; JS pages use one shared Chromium per worker process with a fresh context per fetch, picked by Source.renderJs.\n\nContent pipeline: rawHtml → strip <table> elements → @mozilla/readability (falls back to raw body extraction for listing/catalog pages it can't parse) → Turndown + GFM → cleanedMd. Tables are extracted separately (Cheerio → array-of-objects JSON) and stored in PageVersion.tables.\n\nTwo dedup rules: contentHash = sha256(cleanedMd) is compared against the page's latest version — an unchanged re-crawl only bumps lastSeenAt. A changed or new page gets a new PageVersion row (version incremented; history is never overwritten), then enqueues a discover job for its links and an index job for the new version.",
    color: "#34d399",
  },
  "discover-worker": {
    title: "discover worker",
    subtitle: "filter + dedup links → scrape jobs",
    tooltip:
      "Takes the links a scrape job found, applies scope and depth filters, and enqueues one scrape job per surviving URL with jobId = sha256(url).",
    detail:
      "The discover queue exists so link expansion doesn't block a fetch. A scrape worker hands off its raw link list immediately; the discover worker does the filtering — same-domain scope, max-depth ceiling, exclusion patterns — and enqueues the survivors.\n\nEach enqueued scrape job carries jobId = sha256(url). BullMQ then collapses duplicates itself: two discover workers that surface the same link concurrently produce one scrape job, with no database round trip to check whether the URL was already seen.",
    color: "#38bdf8",
  },
  "index-worker": {
    title: "index worker",
    subtitle: "chunk → embed → upsert Chunk + vector",
    tooltip:
      "Splits a new PageVersion's markdown into chunks, batch-embeds them, and upserts Chunk rows with their pgvector embedding — after deleting the previous version's chunks so only the latest is searchable.",
    detail:
      "cleanedMarkdown → split on #/##/### headings (heading retained as chunk metadata) → per section, recursive character split with js-tiktoken token counting (chunkSize 800 tokens, overlap 150) → tables become their own ChunkType.TABLE chunks, prefixed with a caption line and bypassing the text splitter → OpenAI text-embedding-3-small, batched → upsert into Chunk via raw SQL (pgvector's vector(1536) isn't a native Prisma type) with a generated tsvector column for keyword search.\n\nRe-indexing on a new PageVersion calls clearChunksForVersions first, so only the latest version is ever searchable; older versions stay in Postgres for the diff viewer but drop out of search and RAG.",
    color: "#f87171",
  },
  "openai": {
    title: "OpenAI",
    subtitle: "text-embedding-3-small · GPT-5.5",
    tooltip:
      "text-embedding-3-small produces the 1,536-dim chunk and query vectors; GPT-5.5 writes the grounded /ask answer, streamed token by token.",
    detail:
      "text-embedding-3-small runs at two points: batch-embedding chunks during indexing, and embedding the query at search time for semantic and hybrid modes.\n\nGPT-5.5 is only reached by /ask, through the one shared prompt. It's instructed to answer strictly from the numbered sources and cite every claim with [n]; the completion is streamed straight to the browser over SSE. All external I/O that can transiently fail — OpenAI included — is wrapped in the queue's own retry/backoff rather than ad-hoc try/catch per call site.",
    color: "#a78bfa",
  },
  "postgres": {
    title: "PostgreSQL + pgvector",
    subtitle: "Source → Page → PageVersion → Chunk",
    tooltip:
      "One database for both halves of the system. Full version history per page, a generated tsvector for keyword search, and an HNSW pgvector index for semantic search.",
    detail:
      "Schema: Source (1) → Page (N, unique by URL) → PageVersion (N, @@unique([pageId, version]), full raw HTML + cleaned markdown + extracted tables per version) → Chunk (N, cascades on version delete; carries the pgvector embedding, a generated tsvector, and a ChunkType of PROSE | TABLE | CODE | LIST).\n\nembedding and content_tsv are added by raw-SQL migration, not modeled in schema.prisma (Prisma has no native pgvector type). Running prisma migrate dev against a populated database detects them as drift and offers to drop them — deployments always use prisma migrate deploy.\n\nIngestion and serving are decoupled through this database and never talk directly: you can crawl while people search, and newly crawled pages appear in results as they finish indexing.",
    color: "#22c55e",
  },
};

export const initialNodes = [
  { id: "web", type: "customNode", position: { x: 320, y: 40 }, data: nodeDetails["web"] },

  { id: "rag", type: "customNode", position: { x: 20, y: 240 }, data: nodeDetails["rag"] },
  { id: "api", type: "customNode", position: { x: 320, y: 240 }, data: nodeDetails["api"] },
  { id: "openai", type: "customNode", position: { x: 640, y: 300 }, data: nodeDetails["openai"] },

  { id: "redis", type: "customNode", position: { x: 320, y: 440 }, data: nodeDetails["redis"] },

  { id: "scrape-worker", type: "customNode", position: { x: 20, y: 640 }, data: nodeDetails["scrape-worker"] },
  { id: "discover-worker", type: "customNode", position: { x: 320, y: 640 }, data: nodeDetails["discover-worker"] },
  { id: "index-worker", type: "customNode", position: { x: 640, y: 640 }, data: nodeDetails["index-worker"] },

  { id: "postgres", type: "customNode", position: { x: 320, y: 860 }, data: nodeDetails["postgres"] },
];

export const initialEdges = [
  {
    id: "web-api",
    source: "web",
    target: "api",
    animated: true,
    style: { strokeWidth: 2 },
  },
  {
    id: "api-rag",
    source: "api",
    target: "rag",
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
    id: "rag-postgres",
    source: "rag",
    target: "postgres",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "rag-openai",
    source: "rag",
    target: "openai",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "redis-scrape",
    source: "redis",
    target: "scrape-worker",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "redis-discover",
    source: "redis",
    target: "discover-worker",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "redis-index",
    source: "redis",
    target: "index-worker",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "scrape-redis",
    source: "scrape-worker",
    target: "redis",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "discover-redis",
    source: "discover-worker",
    target: "redis",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "scrape-postgres",
    source: "scrape-worker",
    target: "postgres",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
  {
    id: "index-openai",
    source: "index-worker",
    target: "openai",
    animated: true,
    style: { strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "index-postgres",
    source: "index-worker",
    target: "postgres",
    animated: true,
    style: { strokeWidth: 1.5 },
  },
];
