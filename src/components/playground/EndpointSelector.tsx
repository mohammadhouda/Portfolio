"use client";

import type { Endpoint } from "./ApiPlayground";

interface EndpointSelectorProps {
  endpoints: Endpoint[];
  selected: Endpoint;
  onSelect: (e: Endpoint) => void;
}

const METHOD_COLORS: Record<string, { bg: string; color: string }> = {
  GET:  { bg: "rgba(34,197,94,0.15)",  color: "#22c55e" },
  POST: { bg: "rgba(96,165,250,0.15)", color: "#60a5fa" },
};

export default function EndpointSelector({ endpoints, selected, onSelect }: EndpointSelectorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      {endpoints.map((ep) => {
        const isActive = ep.id === selected.id;
        const mc = METHOD_COLORS[ep.method] ?? METHOD_COLORS.GET;

        return (
          <button
            key={ep.id}
            onClick={() => onSelect(ep)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.6rem 0.75rem",
              background: isActive ? "rgba(34,197,94,0.06)" : "transparent",
              border: `1px solid ${isActive ? "rgba(34,197,94,0.2)" : "transparent"}`,
              borderRadius: "6px",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s, border-color 0.15s",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }
            }}
          >
            {/* Method badge */}
            <span
              style={{
                padding: "0.15rem 0.45rem",
                borderRadius: "3px",
                background: mc.bg,
                color: mc.color,
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                flexShrink: 0,
              }}
            >
              {ep.method}
            </span>

            {/* URL */}
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.75rem",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                letterSpacing: "0.01em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {ep.url}
            </span>
          </button>
        );
      })}
    </div>
  );
}
