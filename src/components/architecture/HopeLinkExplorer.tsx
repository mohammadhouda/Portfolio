"use client";

import Explorer from "./Explorer";
import { initialNodes, initialEdges, nodeDetails } from "./nodeData";

export default function HopeLinkExplorer() {
  return (
    <Explorer
      nodes={initialNodes}
      edges={initialEdges}
      details={nodeDetails}
      minZoom={0.4}
    />
  );
}
