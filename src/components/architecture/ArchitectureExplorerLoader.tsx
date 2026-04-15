"use client";

import dynamic from "next/dynamic";

function Skeleton() {
  return (
    <div
      style={{
        height: "580px",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          opacity: 0.4,
        }}
      >
        loading diagram...
      </p>
    </div>
  );
}

const ArchitectureExplorer = dynamic(
  () => import("./ArchitectureExplorer"),
  { ssr: false, loading: () => <Skeleton /> }
);

export default function ArchitectureExplorerLoader() {
  return <ArchitectureExplorer />;
}
