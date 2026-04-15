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
      style={{
        background: "var(--surface)",
        border: `1px solid ${
          selected
            ? data.color
            : hovered
            ? `${data.color}55`
            : "rgba(255,255,255,0.07)"
        }`,
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        minWidth: "200px",
        maxWidth: "220px",
        boxShadow: selected
          ? `0 0 20px ${data.color}30`
          : hovered
          ? `0 0 12px ${data.color}18`
          : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: data.color,
          width: 6,
          height: 6,
          border: "none",
          opacity: 0.5,
        }}
      />

      {/* Color dot */}
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: data.color,
          marginBottom: "0.5rem",
          boxShadow: `0 0 6px ${data.color}80`,
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontWeight: 700,
          fontSize: "0.78rem",
          color: "var(--text-primary)",
          margin: 0,
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        {data.title}
      </p>

      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.62rem",
          color: "var(--text-secondary)",
          margin: "0.25rem 0 0",
          opacity: 0.65,
          lineHeight: 1.4,
        }}
      >
        {data.subtitle}
      </p>

      {/* Hover tooltip */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(10,10,15,0.97)",
            border: `1px solid ${data.color}40`,
            borderRadius: "6px",
            padding: "0.6rem 0.75rem",
            width: "240px",
            zIndex: 1000,
            pointerEvents: "none",
            boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${data.color}15`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-satoshi, system-ui)",
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {data.tooltip}
          </p>
          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "8px",
              height: "8px",
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
        style={{
          background: data.color,
          width: 6,
          height: 6,
          border: "none",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
