"use client";

import { useState, useCallback, memo } from "react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import EndpointSelector from "./EndpointSelector";
import RequestPanel from "./RequestPanel";
import ResponsePanel from "./ResponsePanel";

const MemoEndpointSelector = memo(EndpointSelector);
const MemoRequestPanel = memo(RequestPanel);
const MemoResponsePanel = memo(ResponsePanel);

export interface Endpoint {
  id: string;
  method: "GET" | "POST";
  url: string;
  description: string;
  defaultBody?: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    id: "health",
    method: "GET",
    url: "/api/health",
    description: "Classic health check returns server status, uptime, version, and current timestamp.",
  },
  {
    id: "projects",
    method: "GET",
    url: "/api/projects",
    description: "Returns all portfolio projects with title, description, stack, and links.",
  },
  {
    id: "stack",
    method: "GET",
    url: "/api/stack",
    description: "Returns the full tech stack grouped by category: backend, frontend, tools & cloud, AI.",
  },
  {
    id: "contact",
    method: "POST",
    url: "/api/contact",
    description: "Accepts a contact message payload. Validates name, email, and message fields.",
    defaultBody: JSON.stringify({ name: "Jane Doe", email: "jane@example.com", message: "Hey Mohammad, let's work together!" }, null, 2),
  },
];

const MIN_DELAY = 320;

export default function ApiPlayground() {
  const [selected, setSelected] = useState<Endpoint>(ENDPOINTS[0]);
  const [body, setBody] = useState(ENDPOINTS[0].defaultBody ?? "");
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = useCallback((ep: Endpoint) => {
    setSelected(ep);
    setBody(ep.defaultBody ?? "");
    setResponse(null);
    setStatus(null);
    setTime(null);
  }, []);

  const handleRun = useCallback(async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    setTime(null);
    const start = Date.now();
    try {
      const opts: RequestInit = { method: selected.method };
      if (selected.method === "POST") {
        opts.headers = { "Content-Type": "application/json" };
        opts.body = body;
      }
      const [res] = await Promise.all([
        fetch(selected.url, opts),
        new Promise((r) => setTimeout(r, MIN_DELAY)),
      ]);
      const elapsed = Date.now() - start;
      const json = await res.json();
      setStatus(res.status);
      setTime(elapsed);
      setResponse(JSON.stringify(json, null, 2));
    } catch (err) {
      const elapsed = Date.now() - start;
      setStatus(500);
      setTime(elapsed);
      setResponse(JSON.stringify({ error: String(err) }, null, 2));
    } finally {
      setLoading(false);
    }
  }, [selected, body]);

  return (
    <section id="api" className="py-24 px-8 max-w-300 mx-auto">
      <ScrollReveal>
        <SectionLabel label="api" lineNumber={5} />
        <p className="font-mono text-[0.72rem] text-muted opacity-[0.45] mb-8 tracking-[0.02em]">
          {"// live endpoints — hit them for real"}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        {/* Main playground card */}
        <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-5 py-3 border-b border-border bg-[rgba(0,0,0,0.15)]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[0.68rem] text-muted opacity-40">
              api-playground
            </span>
          </div>

          <div className="playground-grid">
            {/* Endpoint list */}
            <div className="border-r border-border px-3 py-4">
              <p className="font-mono text-[0.62rem] text-muted tracking-widest uppercase opacity-40 mb-[0.6rem] pl-2">
                Endpoints
              </p>
              <MemoEndpointSelector
                endpoints={ENDPOINTS}
                selected={selected}
                onSelect={handleSelect}
              />
            </div>

            {/* Request panel */}
            <div className="border-r border-border p-5">
              <MemoRequestPanel
                endpoint={selected}
                body={body}
                onBodyChange={setBody}
                onRun={handleRun}
                loading={loading}
              />
            </div>

            {/* Response panel */}
            <div className="p-5">
              <MemoResponsePanel
                response={response}
                status={status}
                time={time}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
