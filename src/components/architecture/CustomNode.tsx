"use client";

import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { nodeColor, nodeColorAlpha } from "./palette";
import type { NodeDetail } from "./nodeData";

interface CustomNodeProps {
  data: NodeDetail;
  selected?: boolean;
}

export default function CustomNode({ data, selected }: CustomNodeProps) {
  const [hovered, setHovered] = useState(false);
  const color = nodeColor(data.color);
  const active = selected || hovered;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative min-w-50 max-w-55 cursor-pointer bg-surface-2 px-4 py-3 transition-[border-color,background-color] duration-200"
      style={{
        border: `1px solid ${active ? color : "rgba(255, 255, 255, 0.12)"}`,
        background: selected ? nodeColorAlpha(data.color, 0.1) : undefined,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: color, width: 5, height: 5, border: "none" }}
      />

      {/* A category bar rather than a glowing dot. */}
      <div className="mb-2.5 h-0.5 w-6" style={{ background: color }} />

      <p className="m-0 text-[0.82rem] leading-tight font-medium text-fg">
        {data.title}
      </p>

      {/* fg-3, not fg-4: against --surface-2 the lightest step drops below
          the 4.5:1 contrast floor. */}
      <p className="mt-1 m-0 font-mono text-[0.62rem] leading-snug text-fg-3">
        {data.subtitle}
      </p>

      {hovered && (
        <div
          className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-1000 w-60 -translate-x-1/2 border border-rule bg-base px-3 py-2"
          style={{ boxShadow: "0 8px 28px rgba(0, 0, 0, 0.6)" }}
        >
          <p className="m-0 text-[0.75rem] leading-relaxed text-fg-2">
            {data.tooltip}
          </p>
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
