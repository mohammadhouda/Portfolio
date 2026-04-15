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
import { initialNodes, initialEdges, nodeDetails } from "./nodeData";
import type { NodeDetail } from "./nodeData";

const nodeTypes = { customNode: CustomNode };

export default function ArchitectureExplorer() {
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
    <div
      style={{
        position: "relative",
        height: "580px",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.4}
        maxZoom={1.5}
        attributionPosition="bottom-left"
        style={{ background: "var(--bg)" }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(255,255,255,0.04)"
        />
        <Controls
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        />
      </ReactFlow>

      {/* Hint */}
      {!selectedNode && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.65rem",
            color: "var(--text-secondary)",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        >
          hover to preview · click for details
        </div>
      )}

      {/* Side panel */}
      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "320px",
            background: "rgba(10,10,15,0.97)",
            borderLeft: `1px solid ${selectedNode.color}25`,
            padding: "1.5rem",
            overflowY: "auto",
            backdropFilter: "blur(8px)",
          }}
        >
          <button
            onClick={() => setSelectedNode(null)}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "1.1rem",
              lineHeight: 1,
              padding: "2px 6px",
              borderRadius: "4px",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
            }
            aria-label="Close panel"
          >
            ×
          </button>

          {/* Color accent bar */}
          <div
            style={{
              width: "32px",
              height: "3px",
              background: selectedNode.color,
              borderRadius: "2px",
              marginBottom: "1rem",
              boxShadow: `0 0 8px ${selectedNode.color}60`,
            }}
          />

          <h3
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "var(--text-primary)",
              margin: "0 0 0.3rem",
              letterSpacing: "-0.01em",
            }}
          >
            {selectedNode.title}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.65rem",
              color: selectedNode.color,
              opacity: 0.75,
              margin: "0 0 1.25rem",
              letterSpacing: "0.04em",
            }}
          >
            {selectedNode.subtitle}
          </p>

          {selectedNode.detail.split("\n\n").map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                margin: i > 0 ? "0.75rem 0 0" : 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
