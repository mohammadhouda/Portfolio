"use client";

import Explorer from "./Explorer";
import { initialNodes, initialEdges, nodeDetails } from "./docAgentNodeData";

export default function DocAgentExplorer() {
  return (
    <Explorer
      nodes={initialNodes}
      edges={initialEdges}
      details={nodeDetails}
      minZoom={0.3}
    />
  );
}
