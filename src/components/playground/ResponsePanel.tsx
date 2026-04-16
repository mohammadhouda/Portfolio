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
    <div className="flex flex-col h-full min-h-80">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-3 min-h-7">
        <div className="flex items-center gap-[0.6rem]">
          {status !== null && (() => {
            const sc = STATUS_COLOR(status);
            return (
              <span
                className="px-[0.55rem] py-[0.15rem] rounded font-mono text-[0.68rem] font-bold tracking-[0.04em]"
                style={{ background: sc.bg, color: sc.color }}
              >
                {status} {STATUS_TEXT[status] ?? ""}
              </span>
            );
          })()}
          {time !== null && (
            <span className="font-mono text-[0.68rem] text-muted opacity-50">
              {time}ms
            </span>
          )}
        </div>

        {response && (
          <button
            onClick={handleCopy}
            className={`flex items-center gap-[0.3rem] bg-transparent border-none cursor-pointer font-mono text-[0.68rem] px-[0.4rem] py-[0.2rem] transition-[color,opacity] duration-150 ${
              copied ? "text-accent opacity-100" : "text-muted opacity-[0.45]"
            }`}
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
      <div className="flex-1 bg-[rgba(0,0,0,0.25)] border border-border rounded-md px-4 py-[0.85rem] overflow-auto relative">
        {loading ? (
          <div className="flex items-center gap-2 h-full min-h-20">
            <span className="font-mono text-[0.78rem] text-muted opacity-40">fetching</span>
            <span className="cursor-blink" />
          </div>
        ) : response ? (
          <JsonHighlighter json={response} />
        ) : (
          <div className="flex items-center h-full min-h-20">
            <span className="font-mono text-[0.75rem] text-muted opacity-30">
              {"// response will appear here"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
