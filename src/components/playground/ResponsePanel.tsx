"use client";

import { useState } from "react";
import JsonHighlighter from "./JsonHighlighter";

interface ResponsePanelProps {
  response: string | null;
  status: number | null;
  time: number | null;
  loading: boolean;
}

const STATUS_COLOR = (s: number) => {
  if (s >= 200 && s < 300) return { bg: "rgba(34,197,94,0.12)",  color: "#22c55e" };
  if (s >= 400 && s < 500) return { bg: "rgba(251,146,60,0.12)", color: "#fb923c" };
  return                          { bg: "rgba(248,113,113,0.12)", color: "#f87171" };
};

const STATUS_TEXT: Record<number, string> = {
  200: "OK", 201: "Created", 400: "Bad Request",
  401: "Unauthorized", 403: "Forbidden", 404: "Not Found", 500: "Server Error",
};

export default function ResponsePanel({ response, status, time, loading }: ResponsePanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "320px",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
          minHeight: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {status !== null && (() => {
            const sc = STATUS_COLOR(status);
            return (
              <span
                style={{
                  padding: "0.15rem 0.55rem",
                  borderRadius: "4px",
                  background: sc.bg,
                  color: sc.color,
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                {status} {STATUS_TEXT[status] ?? ""}
              </span>
            );
          })()}
          {time !== null && (
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.68rem",
                color: "var(--text-secondary)",
                opacity: 0.5,
              }}
            >
              {time}ms
            </span>
          )}
        </div>

        {response && (
          <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.68rem",
              color: copied ? "var(--accent)" : "var(--text-secondary)",
              opacity: copied ? 1 : 0.45,
              transition: "color 0.15s, opacity 0.15s",
              padding: "0.2rem 0.4rem",
            }}
          >
            {copied ? (
              <>✓ copied</>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Response body */}
      <div
        style={{
          flex: 1,
          background: "rgba(0,0,0,0.25)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          padding: "0.85rem 1rem",
          overflow: "auto",
          position: "relative",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              height: "100%",
              minHeight: "80px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                opacity: 0.4,
              }}
            >
              fetching
            </span>
            <span className="cursor-blink" />
          </div>
        ) : response ? (
          <JsonHighlighter json={response} />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              minHeight: "80px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                opacity: 0.3,
              }}
            >
              {"// response will appear here"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
