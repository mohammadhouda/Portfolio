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
    <div className="flex flex-col h-full">
      {/* Method + URL bar */}
      <div className="flex items-center gap-[0.6rem] px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-border rounded-md mb-4">
        <span
          className="px-[0.55rem] py-[0.2rem] rounded font-mono text-[0.65rem] font-bold tracking-[0.07em] shrink-0"
          style={{ background: mc.bg, color: mc.color }}
        >
          {endpoint.method}
        </span>
        <span className="font-mono text-[0.8rem] text-muted overflow-hidden text-ellipsis whitespace-nowrap">
          {endpoint.url}
        </span>
      </div>

      {/* Description */}
      <p className="font-mono text-[0.72rem] text-muted opacity-60 mb-4 leading-[1.5]">
        {endpoint.description}
      </p>

      {/* Body editor — only for POST */}
      {endpoint.method === "POST" && (
        <div className="flex-1 flex flex-col mb-4">
          <p className="font-mono text-[0.65rem] text-muted tracking-widest uppercase opacity-[0.45] mb-2">
            Request body
          </p>
          <textarea
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            spellCheck={false}
            className="flex-1 min-h-35 bg-[rgba(0,0,0,0.25)] border border-border rounded-md px-3 py-3 font-mono text-[0.78rem] text-fg leading-[1.7] resize-y outline-none transition-[border-color] duration-150 focus:border-[rgba(34,197,94,0.35)]"
          />
        </div>
      )}

      {/* Run button */}
      <button
        onClick={onRun}
        disabled={loading}
        className={`flex items-center justify-center gap-2 px-5 py-[0.7rem] border border-[rgba(34,197,94,0.3)] rounded-md text-accent font-mono text-[0.82rem] tracking-[0.06em] transition-[background,box-shadow] duration-150 w-full ${
          loading
            ? "bg-[rgba(34,197,94,0.08)] cursor-not-allowed"
            : "bg-[rgba(34,197,94,0.12)] cursor-pointer hover:bg-[rgba(34,197,94,0.18)] hover:shadow-[0_0_16px_rgba(34,197,94,0.15)]"
        }`}
      >
        {loading ? (
          <>
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-[pulse_0.8s_ease-in-out_infinite]" />
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
      </button>
    </div>
  );
}
