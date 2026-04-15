"use client";

import type { Endpoint } from "./ApiPlayground";

const METHOD_COLORS: Record<string, { bg: string; color: string }> = {
  GET:  { bg: "rgba(34,197,94,0.15)",  color: "#22c55e" },
  POST: { bg: "rgba(96,165,250,0.15)", color: "#60a5fa" },
};

interface RequestPanelProps {
  endpoint: Endpoint;
  body: string;
  onBodyChange: (val: string) => void;
  onRun: () => void;
  loading: boolean;
}

export default function RequestPanel({ endpoint, body, onBodyChange, onRun, loading }: RequestPanelProps) {
  const mc = METHOD_COLORS[endpoint.method] ?? METHOD_COLORS.GET;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Method + URL bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.75rem 1rem",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            padding: "0.2rem 0.55rem",
            borderRadius: "4px",
            background: mc.bg,
            color: mc.color,
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.07em",
            flexShrink: 0,
          }}
        >
          {endpoint.method}
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {endpoint.url}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.72rem",
          color: "var(--text-secondary)",
          opacity: 0.6,
          marginBottom: "1rem",
          lineHeight: 1.5,
        }}
      >
        {endpoint.description}
      </p>

      {/* Body editor — only for POST */}
      {endpoint.method === "POST" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", marginBottom: "1rem" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.65rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: "0.5rem",
            }}
          >
            Request body
          </p>
          <textarea
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1,
              minHeight: "140px",
              background: "rgba(0,0,0,0.25)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0.75rem",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.78rem",
              color: "var(--text-primary)",
              lineHeight: 1.7,
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(34,197,94,0.35)")}
            onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "var(--border)")}
          />
        </div>
      )}

      {/* Run button */}
      <button
        onClick={onRun}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.7rem 1.25rem",
          background: loading ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.12)",
          border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: "6px",
          color: "var(--accent)",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.82rem",
          letterSpacing: "0.06em",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.15s, box-shadow 0.15s",
          width: "100%",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(34,197,94,0.18)";
            el.style.boxShadow = "0 0 16px rgba(34,197,94,0.15)";
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = loading ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.12)";
          el.style.boxShadow = "none";
        }}
      >
        {loading ? (
          <>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--accent)",
                animation: "pulse 0.8s ease-in-out infinite",
              }}
            />
            running...
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
              <polygon points="2,1 12,6.5 2,12" />
            </svg>
            Run
          </>
        )}
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      </button>
    </div>
  );
}
