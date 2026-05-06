import type { NodeDetail } from "./nodeData";

export const nodeDetails: Record<string, NodeDetail> = {
  "frontend": {
    title: "Next.js Frontend",
    subtitle: "Chat UI · Upload · Structured Answer Renderer",
    tooltip: "Chat interface with drag-and-drop upload, 1-second job polling, and typed card rendering for structured JSON answers.",
    detail:
      "Two main UX flows: document upload and question answering. UploadDrop calls POST /api/upload then polls /api/upload/jobs/:id every second while the ingestion pipeline runs, surfacing live status messages (e.g., 'Embedding chunks...').\n\nAnswers are rendered by StructuredAnswer.tsx which maps over the JSON sections array and renders typed cards: key_facts as label/value grids, table as striped HTML tables, timeline as vertical timelines, list as bulleted lists, and parties as role + company cards.",
    color: "#f9a8d4",
  },
  "express-api": {
    title: "Express API",
    subtitle: "REST · /api/upload · /api/ask · /api/documents",
    tooltip: "Thin REST layer — validates requests, enqueues BullMQ jobs, returns 202 immediately. No synchronous AI calls on the request path.",
    detail:
      "Every heavy operation returns 202 and enqueues a job. Clients poll /api/ask/jobs/:id and /api/upload/jobs/:id for updates and final results.\n\nKey endpoints: POST /api/upload (multipart file upload), POST /api/ask (enqueue question), GET /api/documents (list ingested files), DELETE /api/documents (cascade delete with chunks + extracted_values), POST/GET/DELETE /api/conversations.",
    color: "#fbbf24",
  },
  "bullmq-redis": {
    title: "BullMQ + Redis",
    subtitle: "upload-queue · ask-queue · job progress",
    tooltip: "Two BullMQ queues backed by Redis — one for document ingestion, one for Q&A. Job progress updates are stored in Redis and polled by the frontend.",
    detail:
      "upload-queue processes document ingestion jobs (each file is one job, sequential stages inside the worker). ask-queue processes question-answering jobs with concurrency: 3 — three questions can run in parallel.\n\nJob.updateProgress() writes live status strings to Redis during ingestion (e.g., 'Parsing PDF...', 'Generating embeddings...'). The /api/upload/jobs/:id endpoint reads this progress so the frontend can show a live status indicator.",
    color: "#f87171",
  },
  "ingestion-pipeline": {
    title: "Ingestion Pipeline",
    subtitle: "7 stages · parse → chunk → embed → classify → profile → extract → store",
    tooltip: "7-stage async pipeline that transforms uploaded files into searchable vectors and structured SQL rows — both written to PostgreSQL.",
    detail:
      "1. Parse: pdf-parse for PDFs (page-by-page, coordinate-based line reconstruction, max 50 pages); exceljs for Excel (section-aware, auto-detects header rows and section groupings)\n2. Chunk: token-bounded splits (~800 tokens text, ~500 tokens tables) with 75-token smart overlap (last paragraph / last 2 rows)\n3. Embed: text-embedding-3-small → 1,536-dim vectors, batched 100 at a time, stored via pgvector\n4. Classify: gpt-4o-mini reads first 2 chunks → extracts documentType, projectName, currency, parties, summary\n5. Profile: second LLM pass → full DocumentProfile JSONB with keyCategories, queryHints, suggestedTools, sheetProfiles\n6. Extract: Excel uses LLM schema inference once then deterministic regex per row (zero tokens/row); PDFs use gpt-4o-mini per page, 5 concurrent\n7. Store: Drizzle ORM writes all three tables; cascade deletes keep everything in sync",
    color: "#34d399",
  },
  "qa-agent": {
    title: "Q&A Agent",
    subtitle: "gpt-4o-mini · 5 tools · max 5 iterations",
    tooltip: "Agent loop: system prompt loads document inventory, model picks a tool, tool runs SQL, result returned. Repeats up to 5 times then synthesizes structured JSON.",
    detail:
      "System prompt includes the full document inventory (from JSONB profiles) so the model knows what files are loaded and what tools are suggested per document. Each loop iteration: model calls a tool → tool executes SQL → result returned as function output → model decides to call another tool or synthesize the answer.\n\nCritical design constraint: the agent never does arithmetic. All calculations go through compute_result. This means every number in the final answer is fetched from SQL or computed by a tool — zero hallucinated figures. Debug output logs each loop: tools called, duration per LLM call, total wall time.",
    color: "#60a5fa",
  },
  "agent-tools": {
    title: "5 Agent Tools",
    subtitle: "get_document_info · search_documents · query_values · aggregate_values · compute_result",
    tooltip: "Five flexible SQL tools that cover all question types. Each translates a natural language intent into a parameterized database query.",
    detail:
      "get_document_info: list all documents, fetch section breakdown, or summarize content.\n\nsearch_documents: pgvector cosine similarity search on the chunks table — embeds the query at runtime and finds semantically matching chunks.\n\nquery_values: filtered retrieval from extracted_values by type (cost, date, quantity, party, status), category, numeric range, unit, or raw value filter.\n\naggregate_values: SUM/COUNT/AVG/MAX/MIN over extracted_values, grouped by sheet, section, document, or category. Type aliases (budget → budget + budgeted_cost + contract_value) ensure consistent results regardless of extraction path.\n\ncompute_result: all arithmetic — sum, difference, ratio, apply_rate (VAT/markup), unit_rate (cost÷quantity).",
    color: "#38bdf8",
  },
  "openai": {
    title: "OpenAI",
    subtitle: "text-embedding-3-small · gpt-4o-mini",
    tooltip: "Two models: text-embedding-3-small for 1,536-dim semantic vectors; gpt-4o-mini for document classification, profiling, PDF extraction, and agent tool selection.",
    detail:
      "text-embedding-3-small runs at three points: chunk embedding during ingestion (batched), query embedding for semantic search (search_documents tool), and category term embedding for semantic category matching (resolving user's 'MEP' or 'electrical' to actual sheet names via cosine distance < 0.65).\n\ngpt-4o-mini handles: document classification (type, parties, currency from first 2 chunks), document profiling (queryHints, suggestedTools, sheetProfiles as JSONB), per-page PDF value extraction (5 concurrent), Excel column schema inference (once per file), and agent tool selection in the Q&A loop.",
    color: "#a78bfa",
  },
  "postgres-pgvector": {
    title: "PostgreSQL + pgvector",
    subtitle: "HNSW index · documents · chunks · extracted_values",
    tooltip: "PostgreSQL stores all data: document metadata (JSONB profile), chunk text with 1,536-dim embeddings (HNSW index), and structured extracted values for SQL queries.",
    detail:
      "Three main tables: documents (id, file metadata, profile JSONB, meta_* columns), chunks (id, document_id, content, embedding vector, page_number, sheet_name, section_title, chunk_type), extracted_values (id, document_id, type, label, raw_value, numeric_value, date_value, unit, context, sheet_name).\n\nThe HNSW index on chunks.embedding enables fast approximate nearest-neighbor search — the search_documents tool queries this for semantic search. Cascade deletes (ON DELETE CASCADE on foreign keys) mean deleting a document automatically removes all its chunks and extracted_values in a single SQL statement.",
    color: "#22c55e",
  },
};

export const initialNodes = [
  {
    id: "frontend",
    type: "customNode",
    position: { x: 320, y: 40 },
    data: nodeDetails["frontend"],
  },
  {
    id: "express-api",
    type: "customNode",
    position: { x: 320, y: 220 },
    data: nodeDetails["express-api"],
  },
  {
    id: "bullmq-redis",
    type: "customNode",
    position: { x: 320, y: 400 },
    data: nodeDetails["bullmq-redis"],
  },
  {
    id: "ingestion-pipeline",
    type: "customNode",
    position: { x: 40, y: 580 },
    data: nodeDetails["ingestion-pipeline"],
  },
  {
    id: "qa-agent",
    type: "customNode",
    position: { x: 600, y: 580 },
    data: nodeDetails["qa-agent"],
  },
  {
    id: "agent-tools",
    type: "customNode",
    position: { x: 600, y: 760 },
    data: nodeDetails["agent-tools"],
  },
  {
    id: "openai",
    type: "customNode",
    position: { x: 40, y: 760 },
    data: nodeDetails["openai"],
  },
  {
    id: "postgres-pgvector",
    type: "customNode",
    position: { x: 320, y: 940 },
    data: nodeDetails["postgres-pgvector"],
  },
];

export const initialEdges = [
  {
    id: "frontend-api",
    source: "frontend",
    target: "express-api",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.5)", strokeWidth: 2 },
  },
  {
    id: "api-bullmq",
    source: "express-api",
    target: "bullmq-redis",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.5)", strokeWidth: 2 },
  },
  {
    id: "bullmq-ingestion",
    source: "bullmq-redis",
    target: "ingestion-pipeline",
    animated: true,
    style: { stroke: "rgba(52,211,153,0.4)", strokeWidth: 1.5 },
  },
  {
    id: "bullmq-agent",
    source: "bullmq-redis",
    target: "qa-agent",
    animated: true,
    style: { stroke: "rgba(96,165,250,0.4)", strokeWidth: 1.5 },
  },
  {
    id: "ingestion-openai",
    source: "ingestion-pipeline",
    target: "openai",
    animated: true,
    style: { stroke: "rgba(167,139,250,0.4)", strokeWidth: 1.5 },
  },
  {
    id: "ingestion-postgres",
    source: "ingestion-pipeline",
    target: "postgres-pgvector",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.35)", strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "agent-tools-edge",
    source: "qa-agent",
    target: "agent-tools",
    animated: true,
    style: { stroke: "rgba(56,189,248,0.4)", strokeWidth: 1.5 },
  },
  {
    id: "agent-openai",
    source: "qa-agent",
    target: "openai",
    animated: true,
    style: { stroke: "rgba(167,139,250,0.35)", strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
  {
    id: "tools-postgres",
    source: "agent-tools",
    target: "postgres-pgvector",
    animated: true,
    style: { stroke: "rgba(34,197,94,0.4)", strokeWidth: 1.5 },
  },
  {
    id: "openai-postgres",
    source: "openai",
    target: "postgres-pgvector",
    animated: true,
    style: { stroke: "rgba(167,139,250,0.3)", strokeWidth: 1.5, strokeDasharray: "4 2" },
  },
];
