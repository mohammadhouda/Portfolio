"use client";

import { useState, useCallback, memo } from "react";
import EndpointSelector from "./EndpointSelector";
import RequestPanel from "./RequestPanel";
import ResponsePanel from "./ResponsePanel";

// Memoize panels so they don't re-render on unrelated state changes
const MemoEndpointSelector = memo(EndpointSelector);
const MemoRequestPanel = memo(RequestPanel);
const MemoResponsePanel = memo(ResponsePanel);
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";

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

const MIN_DELAY = 320; // artificial delay for anticipation

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
    <section
      id="api"
      style={{
        padding: "6rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <ScrollReveal>
        <SectionLabel label="api" lineNumber={5} />
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.72rem",
            color: "var(--text-secondary)",
            opacity: 0.45,
            marginBottom: "2rem",
            letterSpacing: "0.02em",
          }}
        >
          {"// live endpoints — hit them for real"}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        {/* Main playground card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.75rem 1.25rem",
              borderBottom: "1px solid var(--border)",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
            <span
              style={{
                marginLeft: "0.75rem",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.68rem",
                color: "var(--text-secondary)",
                opacity: 0.4,
              }}
            >
              api-playground
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr 1fr",
              minHeight: "420px",
            }}
            className="playground-grid"
          >
            {/* Endpoint list */}
            <div
              style={{
                borderRight: "1px solid var(--border)",
                padding: "1rem 0.75rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.62rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                  marginBottom: "0.6rem",
                  paddingLeft: "0.5rem",
                }}
              >
                Endpoints
              </p>
              <MemoEndpointSelector
                endpoints={ENDPOINTS}
                selected={selected}
                onSelect={handleSelect}
              />
            </div>

            {/* Request panel */}
            <div
              style={{
                borderRight: "1px solid var(--border)",
                padding: "1.25rem",
              }}
            >
              <MemoRequestPanel
                endpoint={selected}
                body={body}
                onBodyChange={setBody}
                onRun={handleRun}
                loading={loading}
              />
            </div>

            {/* Response panel */}
            <div style={{ padding: "1.25rem" }}>
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
