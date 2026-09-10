"use client";

import Explorer from "./Explorer";
import { initialNodes, initialEdges, nodeDetails } from "./raiseNodeData";

export default function RaiseExplorer() {
  return (
    <Explorer
      nodes={initialNodes}
      edges={initialEdges}
      details={nodeDetails}
      minZoom={0.3}
    />
  );
}
