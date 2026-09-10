export interface Project {
  slug: string;
  title: string;
  /** Short category line, e.g. "Multi-tenant SaaS". */
  tag: string;
  /** Displayed as the period on the index, e.g. "2026". */
  year: string;
  /** Featured projects get a full row + case study. Others go to the archive. */
  featured: boolean;
  description: string;
  longDescription: string;
  stack: string[];
  /** Two or three numbers that make the scale of the work concrete. */
  metrics?: { value: string; label: string }[];
  hasArchitecture?: boolean;
  images?: string[];
  links?: {
    github?: string;
    live?: string;
  };
  highlights?: string[];
}

export const projects: Project[] = [
  {
    slug: "raise",
    title: "Raise",
    tag: "Multi-Tenant AI Fundraising Platform",
    year: "2026",
    featured: true,
    images: ["/raise-2.png", "/raise-3.png", "/raise-1.png"],
    description:
      "A fundraising SaaS where startups run their whole raise — investor CRM, pipelines, commitments, tasks, secure document sharing — with an AI copilot that answers questions about their own documents and cites where each answer came from.",
    longDescription:
      "Raise is a multi-tenant fundraising platform built around six workflows startups actually run during a raise: investor CRM, pipeline tracking, commitments, tasks, secure document sharing, and team collaboration. The engineering weight sits in two places. First, tenant isolation: every query is scoped to a startup, enforced at the database access layer rather than trusted to callers, with fine-grained RBAC on top and a separate restricted authentication path for outside reviewers who should see documents but not the rest of the workspace. Second, the AI copilot: fundraising documents are parsed with LlamaParse, embedded into pgvector, and retrieved to answer contextual questions with citations so an answer can always be traced back to a page. Everything slow runs off the request path through BullMQ and streams back over SSE.",
    stack: [
      "TypeScript",
      "React",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "OpenAI",
      "pgvector",
      "LlamaParse",
      "Supabase",
    ],
    metrics: [
      { value: "6", label: "Core workflows" },
      { value: "2", label: "Isolated auth paths" },
      { value: "SSE", label: "Real-time delivery" },
    ],
    hasArchitecture: true,
    highlights: [
      "Tenant isolation enforced twice: role middleware plus services that select through composite keys like startupId_id, so a stray findUnique({ id }) still can't cross tenants",
      "External reviewers run on a separate auth path entirely — link token, email OTP, separate cookie and table — that can only reach /reviewer-portal/*",
      "AI copilot treats the model as untrusted input: it can never write, only propose actions a human approves, and approval re-checks the permission the manual action needs",
      "Grounded RAG over pgvector with hnsw.iterative_scan = 'relaxed_order', because the HNSW index is global across tenants and a small corpus would otherwise lose real matches",
      "Prompt submit and response read are separate requests; a Redis run registry (TTL + 8s heartbeat) makes reconnect, multi-tab, and cross-replica resume work",
      "API and worker are separate processes from one package; eight BullMQ queues plus six recurring maintenance jobs run as Redis-native repeatable schedules",
      "Three-phase uploads so the API never proxies file bytes — signed target, direct PUT to storage, confirm — with private bytes served only through short-lived signed paths",
    ],
  },
  {
    slug: "rag-crawler",
    title: "Distributed RAG Crawler",
    tag: "Web Crawler & Search Engine",
    year: "2026",
    featured: true,
    images: ["/rag-crawler-1.png", "/rag-crawler-2.png", "/rag-crawler-3.png"],
    description:
      "A queue-based crawler and search engine that partitions scraping, discovery, and indexing into three independently scalable workloads, then answers questions over what it found using hybrid retrieval and grounded generation.",
    longDescription:
      "A distributed crawling and indexing system built to be operated, not just demoed. Scraping, link discovery, and indexing run as three separate BullMQ queues so each can scale on its own bottleneck discovery is cheap and wide, rendering is expensive and narrow. Six reliability controls keep it from being the kind of crawler that gets a domain blocked: robots.txt enforcement, per-domain rate limiting, retry with backoff, dead-letter queues for poison jobs, content hashing to skip unchanged pages, and page versioning so history isn't lost on re-crawl. On the retrieval side, PostgreSQL full-text search and pgvector HNSW embeddings run in parallel and are fused with Reciprocal Rank Fusion, which beats either strategy alone on queries that mix exact terms with fuzzy intent. The question-answering API returns grounded answers with citations over SSE.",
    stack: [
      "Node.js",
      "Fastify",
      "Next.js",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "pgvector",
      "Cheerio",
      "Playwright",
      "OpenAI",
    ],
    metrics: [
      { value: "3", label: "Independent queues" },
      { value: "6", label: "Reliability controls" },
      { value: "RRF", label: "Hybrid retrieval fusion" },
    ],
    hasArchitecture: true,
    highlights: [
      "Three independently scalable BullMQ queues split scraping, discovery, and indexing so each scales against its own bottleneck",
      "Six crawler reliability controls: robots.txt enforcement, per-domain rate limiting, retry/backoff, dead-letter queues, content hashing, and page versioning",
      "Content hashing skips re-indexing unchanged pages; page versioning preserves history across re-crawls",
      "Hybrid retrieval fuses PostgreSQL full-text search with pgvector HNSW embeddings through Reciprocal Rank Fusion",
      "Cheerio for static pages, Playwright only where JS rendering is actually required keeps the expensive path narrow",
      "Heading-aware chunking and table extraction preserve document structure that naive fixed-size chunking destroys",
      "Grounded question-answering API returns citations with every answer and streams over SSE",
    ],
  },
  {
    slug: "doc-agent",
    title: "DocAgent",
    tag: "AI Document Intelligence",
    year: "2025",
    featured: true,
    images: ["/docagent-1.png", "/docagent-2.png", "/docagent-3.png"],
    description:
      "Construction documents BOQs, contracts, specs, schedules turned into a queryable system. Ask a question in plain language, get a cited structured answer where every number came from SQL rather than from the model.",
    longDescription:
      "DocAgent transforms raw construction documents into an intelligent query system. Files flow through a 7-stage async pipeline parse, chunk, embed, classify, profile, extract, store producing both semantic search vectors and structured SQL extractions. An AI agent with 5 flexible tools then answers business questions: aggregating costs, comparing budgets against actuals, listing line items, or searching document text. Every number in an answer is fetched from SQL and never fabricated; the agent does no arithmetic itself. Document profiles stored as JSONB supply per-document query hints and tool suggestions that guide the agent's strategy, and answers render as typed cards tables, timelines, fact grids, party cards so the frontend can stay predictable while the questions stay open-ended.",
    stack: [
      "Next.js",
      "TypeScript",
      "Express",
      "Node.js",
      "OpenAI",
      "PostgreSQL",
      "pgvector",
      "BullMQ",
      "Redis",
      "Drizzle ORM",
    ],
    metrics: [
      { value: "7", label: "Pipeline stages" },
      { value: "5", label: "Agent tools" },
      { value: "1,536", label: "Embedding dimensions" },
    ],
    hasArchitecture: true,
    highlights: [
      "7-stage ingestion pipeline (parse → chunk → embed → classify → profile → extract → store) runs fully async via BullMQ + Redis, so the UI stays responsive throughout",
      "Semantic search via pgvector HNSW index over 1,536-dim OpenAI embeddings finds meaning across documents, not just keyword matches",
      "Deterministic Excel extraction: the LLM infers a column schema once, then regex processes every row zero tokens per row after the first pass",
      "The agent picks between 5 tools per question and offloads all arithmetic to compute_result, so no number in an answer is ever hallucinated",
      "A unified JSONB document profile stores AI-generated query hints and suggested tools, giving the agent a per-document strategy",
      "Semantic category matching embeds user terms and resolves them to the nearest sheet or section name by cosine distance, handling abbreviations, synonyms, and typos",
      "Structured JSON answers render as typed UI cards (key_facts, table, timeline, list, parties) a predictable shape over open-ended questions",
    ],
  },
  {
    slug: "hopelink",
    title: "Hope Link",
    tag: "Humanitarian Platform",
    year: "2025",
    featured: true,
    images: ["/hopelink-1.png", "/hopelink-2.png", "/hopelink-3.png"],
    description:
      "A multi-portal platform connecting NGOs, charities, and volunteers across Lebanon, with a personalized opportunity feed whose ranking is pre-computed by background workers so every page of results stays a fast index scan.",
    longDescription:
      "Hope Link is a full-stack multi-portal platform built to connect NGOs, charities, and volunteers across Lebanon. Three isolated role contexts Admin, Charity, and Volunteer run under a single Express server with role middleware enforcing access at the route level. The signature engineering problem was making a personalized opportunity ranking that stays fast as both sides of the marketplace grow: scores are pre-computed by a BullMQ background worker and written to an indexed junction table, which turns every paginated feed request into a B-tree scan instead of a full table scan plus sort.",
    stack: [
      "Next.js",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "BullMQ",
      "Redis",
      "Socket.io",
    ],
    metrics: [
      { value: "3", label: "Isolated role portals" },
      { value: "B-tree", label: "Feed reads, not full scans" },
      { value: "100%", label: "Core endpoint test coverage" },
    ],
    hasArchitecture: true,
    links: {
      github: "https://github.com/mohammadhouda/hopelink-api",
    },
    highlights: [
      "Match scores pre-computed by BullMQ + Upstash Redis workers move expensive ranking entirely off the request path",
      "Family-based JWT refresh token rotation with theft detection reusing a revoked token invalidates every session in the family",
      "Jest + Supertest suite using factory patterns to mock Prisma models, covering core API endpoints",
      "Three isolated role contexts (Admin / Charity / Volunteer) share one Express server with middleware-enforced access",
      "Socket.io chat rooms tied to the volunteer application lifecycle: created on approval, closed when the opportunity ends",
      "Idempotent score writes via INSERT ... ON CONFLICT DO UPDATE, safe under BullMQ job retries",
    ],
  },
  {
    slug: "shopify-automation",
    title: "Shopify Checkout Automation",
    tag: "Browser Automation",
    year: "2025",
    featured: false,
    images: ["/shopify-1.png", "/shopify-2.png", "/shopify-3.png"],
    description:
      "End-to-end Shopify checkout automation in Puppeteer product selection, address fill, hCaptcha solving, proxy routing, and payment submission across two separate store flows.",
    longDescription:
      "A Puppeteer-based automation that completes a full Shopify checkout in under 15 seconds. Built against real e-commerce automation obstacles: Shopify's bot protections, hCaptcha challenges, Shadow DOM card fields, and US-only shipping restrictions. Two separate flows kith.com with proxy and captcha solving, and ShopNiceKicks with an Electron desktop GUI. Task speed is logged in real time from cart to payment confirmation.",
    stack: ["Node.js", "Puppeteer", "2Captcha API", "Oxylabs Proxy", "Electron"],
    links: {
      github: "https://github.com/mohammadhouda/shopify-automation",
    },
    highlights: [
      "hCaptcha solved dynamically through the 2Captcha API using interactive element injection no sitekey required",
      "Oxylabs US proxy spoofs location to unlock US-only Shopify shipping options from Lebanon",
      "Shadow DOM card fields reached via page.evaluateHandle() and native querySelector, bypassing iframe isolation",
      "Switching the trigger from load to DOMContentLoaded measurably improved checkout reliability and speed",
      "Electron GUI for the ShopNiceKicks flow, with terminal progress logging and per-task timing",
    ],
  },
  {
    slug: "clinic-assistant",
    title: "Clinic Assistant",
    tag: "AI Healthcare Automation",
    year: "2026",
    featured: false,
    description:
      "A WhatsApp assistant for clinics that books appointments and answers patient questions, querying real schedule data before it responds so it can't invent availability. In active development.",
    longDescription:
      "Clinic Assistant brings WhatsApp automation to healthcare practices. Patients message the clinic's number and the assistant handles the conversation end to end checking doctor availability, booking, answering common questions, and sending confirmations. The DB-first design is the point: the assistant queries real schedule data before it responds, so it can't fabricate an open slot. Currently in active development.",
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "WhatsApp Business API",
      "Claude API",
      "Redis",
    ],
    highlights: [
      "DB-first design: the assistant queries real appointment slots before confirming anything, so availability is never hallucinated",
      "Full conversation flow over WhatsApp booking, rescheduling, cancellation, and patient FAQ",
      "Claude API for intent classification and natural-language response generation",
      "Redis-backed session state keeps conversation context across messages",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archivedProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
