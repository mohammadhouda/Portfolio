"use client";

import Explorer from "./Explorer";
import { initialNodes, initialEdges, nodeDetails } from "./ragCrawlerNodeData";

export default function RagCrawlerExplorer() {
  return (
    <Explorer
      nodes={initialNodes}
      edges={initialEdges}
      details={nodeDetails}
      minZoom={0.3}
    />
  );
}
