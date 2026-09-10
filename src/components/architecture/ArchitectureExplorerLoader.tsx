"use client";

import dynamic from "next/dynamic";

/**
 * React Flow is ~130KB and only ever appears far below the fold on two
 * project pages, so it loads on demand rather than in the page bundle.
 */
function Skeleton() {
  return (
    <div className="flex h-[34rem] items-center justify-center border border-rule bg-surface md:h-[36rem]">
      <p className="t-meta text-fg-4">Loading diagram…</p>
    </div>
  );
}

const HopeLink = dynamic(() => import("./HopeLinkExplorer"), {
  ssr: false,
  loading: Skeleton,
});

const DocAgent = dynamic(() => import("./DocAgentExplorer"), {
  ssr: false,
  loading: Skeleton,
});

export default function ArchitectureExplorerLoader({ slug }: { slug: string }) {
  if (slug === "doc-agent") return <DocAgent />;
  if (slug === "hopelink") return <HopeLink />;
  return null;
}
