"use client";

import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import CustomNode from "./CustomNode";
import { initialNodes, initialEdges, nodeDetails } from "./docAgentNodeData";
import type { NodeDetail } from "./nodeData";

const nodeTypes = { customNode: CustomNode };

export default function DocAgentArchitectureExplorer() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    setSelectedNode(
      selectedNode?.title === nodeDetails[node.id]?.title
        ? null
        : nodeDetails[node.id] ?? null
    );
  }, [selectedNode]);

  return (
    <div className="relative h-145 rounded-[10px] overflow-hidden border border-border bg-bg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        attributionPosition="bottom-left"
        style={{ background: "var(--bg)" }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.04)" />
        <Controls style={{ display: "flex", flexDirection: "column", gap: "4px" }} />
      </ReactFlow>

      {!selectedNode && (
        <div className="absolute bottom-3 right-3 font-mono text-[0.65rem] text-muted opacity-40 pointer-events-none">
          hover to preview · click for details
        </div>
      )}

      {selectedNode && (
        <div
          className="absolute top-0 right-0 bottom-0 w-80 overflow-y-auto p-6 backdrop-blur-sm"
          style={{
            background: "rgba(10,10,15,0.97)",
            borderLeft: `1px solid ${selectedNode.color}25`,
          }}
        >
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-4 right-4 bg-transparent border-none text-muted cursor-pointer text-[1.1rem] leading-none px-1.5 py-0.5 rounded transition-colors duration-150 hover:text-fg"
            aria-label="Close panel"
          >
            ×
          </button>

          <div
            className="w-8 h-0.75 rounded mb-4"
            style={{
              background: selectedNode.color,
              boxShadow: `0 0 8px ${selectedNode.color}60`,
            }}
          />

          <h3 className="font-mono font-bold text-[0.95rem] text-fg m-0 mb-[0.3rem] tracking-[-0.01em]">
            {selectedNode.title}
          </h3>

          <p
            className="font-mono text-[0.65rem] opacity-75 m-0 mb-5 tracking-[0.04em]"
            style={{ color: selectedNode.color }}
          >
            {selectedNode.subtitle}
          </p>

          {selectedNode.detail.split("\n\n").map((para, i) => (
            <p
              key={i}
              className={`text-[0.82rem] leading-[1.75] text-muted ${i > 0 ? "mt-3" : "m-0"}`}
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
