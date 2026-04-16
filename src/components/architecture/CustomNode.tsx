"use client";

import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import type { NodeDetail } from "./nodeData";

interface CustomNodeProps {
  data: NodeDetail;
  selected?: boolean;
}

export default function CustomNode({ data, selected }: CustomNodeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-surface rounded-lg px-4 py-3 min-w-50 max-w-55 transition-[border-color,box-shadow] duration-200 cursor-pointer relative"
      style={{
        border: `1px solid ${
          selected ? data.color : hovered ? `${data.color}55` : "rgba(255,255,255,0.07)"
        }`,
        boxShadow: selected
          ? `0 0 20px ${data.color}30`
          : hovered
          ? `0 0 12px ${data.color}18`
          : "none",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.color, width: 6, height: 6, border: "none", opacity: 0.5 }}
      />

      {/* Color dot */}
      <div
        className="w-1.5 h-1.5 rounded-full mb-2"
        style={{ background: data.color, boxShadow: `0 0 6px ${data.color}80` }}
      />

      <p className="font-mono font-bold text-[0.78rem] text-fg m-0 tracking-[-0.01em] leading-[1.3]">
        {data.title}
      </p>

      <p className="font-mono text-[0.62rem] text-muted mt-1 m-0 opacity-65 leading-[1.4]">
        {data.subtitle}
      </p>

      {/* Hover tooltip */}
      {hovered && (
        <div
          className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-60 z-[1000] pointer-events-none rounded-md px-3 py-[0.6rem]"
          style={{
            background: "rgba(10,10,15,0.97)",
            border: `1px solid ${data.color}40`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${data.color}15`,
          }}
        >
          <p className="font-sans text-[0.78rem] text-muted m-0 leading-[1.6]">
            {data.tooltip}
          </p>
          {/* Arrow */}
          <div
            className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 rotate-45 w-2 h-2"
            style={{
              background: "rgba(10,10,15,0.97)",
              border: `1px solid ${data.color}40`,
              borderTop: "none",
              borderLeft: "none",
            }}
          />
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.color, width: 6, height: 6, border: "none", opacity: 0.5 }}
      />
    </div>
  );
}
