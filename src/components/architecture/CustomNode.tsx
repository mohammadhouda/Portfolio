"use client";

import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { inkColor, inkColorAlpha } from "./palette";
import type { NodeDetail } from "./nodeData";

interface CustomNodeProps {
  data: NodeDetail;
  selected?: boolean;
}

export default function CustomNode({ data, selected }: CustomNodeProps) {
  const [hovered, setHovered] = useState(false);
  const color = inkColor(data.color);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative min-w-50 max-w-55 cursor-pointer bg-paper-raised px-4 py-3 transition-[border-color,background-color] duration-200"
      style={{
        border: `1px solid ${
          selected || hovered ? color : "rgba(22, 21, 15, 0.18)"
        }`,
        background: selected ? inkColorAlpha(data.color, 0.06) : undefined,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: color, width: 5, height: 5, border: "none" }}
      />

      {/* Category bar rather than a glowing dot — reads on paper. */}
      <div className="mb-2.5 h-0.5 w-6" style={{ background: color }} />

      <p className="m-0 text-[0.82rem] leading-tight font-medium text-ink">
        {data.title}
      </p>

      <p className="mt-1 m-0 font-mono text-[0.62rem] leading-snug text-ink-3">
        {data.subtitle}
      </p>

      {hovered && (
        <div
          className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-[1000] w-60 -translate-x-1/2 bg-ink px-3 py-2"
          style={{ boxShadow: "0 6px 24px rgba(22, 21, 15, 0.22)" }}
        >
          <p className="m-0 text-[0.75rem] leading-relaxed text-paper">
            {data.tooltip}
          </p>
          <div
            className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink"
            aria-hidden="true"
          />
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: color, width: 5, height: 5, border: "none" }}
      />
    </div>
  );
}
