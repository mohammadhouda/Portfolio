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
    <div className="flex flex-col gap-[0.35rem]">
      {endpoints.map((ep) => {
        const isActive = ep.id === selected.id;
        const mc = METHOD_COLORS[ep.method] ?? METHOD_COLORS.GET;

        return (
          <button
            key={ep.id}
            onClick={() => onSelect(ep)}
            className={`flex items-center gap-[0.6rem] px-3 py-[0.6rem] border rounded-md cursor-pointer text-left transition-[background,border-color] duration-150 w-full ${
              isActive
                ? "bg-[rgba(34,197,94,0.06)] border-[rgba(34,197,94,0.2)]"
                : "bg-transparent border-transparent hover:bg-[rgba(255,255,255,0.03)]"
            }`}
          >
            {/* Method badge */}
            <span
              className="px-[0.45rem] py-[0.15rem] rounded-[3px] font-mono text-[0.62rem] font-bold tracking-[0.06em] shrink-0"
              style={{ background: mc.bg, color: mc.color }}
            >
              {ep.method}
            </span>

            {/* URL */}
            <span
              className={`font-mono text-[0.75rem] tracking-[0.01em] overflow-hidden text-ellipsis whitespace-nowrap ${
                isActive ? "text-fg" : "text-muted"
              }`}
            >
              {ep.url}
            </span>
          </button>
        );
      })}
    </div>
  );
}
