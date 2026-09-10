"use client";

import dynamic from "next/dynamic";

/**
 * React Flow is ~130KB and only ever appears far below the fold on the
 * project pages, so it loads on demand rather than in the page bundle.
 */
function Skeleton() {
  return (
    <div className="flex h-[34rem] items-center justify-center border border-rule bg-surface md:h-[36rem]">
      <p className="t-meta text-fg-4">Loading diagram…</p>
    </div>
  );
}

const explorers: Record<string, ReturnType<typeof dynamic>> = {
  hopelink: dynamic(() => import("./HopeLinkExplorer"), {
    ssr: false,
    loading: Skeleton,
  }),
  "doc-agent": dynamic(() => import("./DocAgentExplorer"), {
    ssr: false,
    loading: Skeleton,
  }),
  raise: dynamic(() => import("./RaiseExplorer"), {
    ssr: false,
    loading: Skeleton,
  }),
  "rag-crawler": dynamic(() => import("./RagCrawlerExplorer"), {
    ssr: false,
    loading: Skeleton,
  }),
};

export default function ArchitectureExplorerLoader({ slug }: { slug: string }) {
  const Explorer = explorers[slug];
  return Explorer ? <Explorer /> : null;
}
