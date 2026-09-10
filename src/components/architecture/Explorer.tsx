"use client";

import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import CustomNode from "./CustomNode";
import { inkColor, inkEdgeStyle } from "./palette";
import type { NodeDetail } from "./nodeData";

const nodeTypes = { customNode: CustomNode };

interface ExplorerProps {
  nodes: Node[];
  edges: Edge[];
  details: Record<string, NodeDetail>;
  minZoom?: number;
}

/**
 * One explorer for every project. Previously this existed twice, byte-for-byte
 * identical apart from which data module it imported and one zoom value.
 */
export default function Explorer({
  nodes: initialNodes,
  edges: initialEdges,
  details,
  minZoom = 0.4,
}: ExplorerProps) {
  // Edge colors are baked for the old dark theme; restyle once up front.
  const themedEdges = useMemo(
    () => initialEdges.map((e) => ({ ...e, style: inkEdgeStyle(e.style) })),
    [initialEdges]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(themedEdges);
  const [selected, setSelected] = useState<NodeDetail | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const detail = details[node.id] ?? null;
      // Toggle: clicking the open node closes the panel.
      setSelected((prev) => (prev?.title === detail?.title ? null : detail));
    },
    [details]
  );

  return (
    <div className="relative h-[34rem] overflow-hidden border border-rule bg-paper-sunk md:h-[36rem]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={minZoom}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(22, 21, 15, 0.12)"
        />
        <Controls
          showInteractive={false}
          style={{ display: "flex", flexDirection: "column" }}
        />
      </ReactFlow>

      {!selected && (
        <p className="t-meta pointer-events-none absolute right-4 bottom-4 text-ink-4">
          Hover to preview · click for detail
        </p>
      )}

      {selected && (
        <aside
          className="absolute inset-y-0 right-0 w-full overflow-y-auto border-l border-rule bg-paper p-7 sm:w-88"
          data-lenis-prevent
        >
          <button
            onClick={() => setSelected(null)}
            className="t-meta link-draw absolute top-6 right-6 cursor-pointer border-0 bg-transparent p-0 text-ink-3 transition-colors duration-300 hover-fine:hover:text-accent"
            aria-label="Close detail panel"
          >
            Close
          </button>

          <div
            className="mb-5 h-0.5 w-8"
            style={{ background: inkColor(selected.color) }}
          />

          <h3 className="t-h3 mb-2 text-ink">{selected.title}</h3>

          <p
            className="mb-6 font-mono text-[0.68rem] tracking-wide"
            style={{ color: inkColor(selected.color) }}
          >
            {selected.subtitle}
          </p>

          {selected.detail.split("\n\n").map((para, i) => (
            <p
              key={i}
              className={`text-[0.85rem] leading-relaxed text-ink-2 ${
                i > 0 ? "mt-4" : ""
              }`}
            >
              {para}
            </p>
          ))}
        </aside>
      )}
    </div>
  );
}
