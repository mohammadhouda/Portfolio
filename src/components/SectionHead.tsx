"use client";

import Rule from "./motion/Rule";
import Reveal from "./motion/Reveal";

interface SectionHeadProps {
  index: string;
  label: string;
  /** Optional right-aligned counter or note. */
  note?: string;
}

/**
 * The recurring section marker: an index, a label, a hairline that draws
 * itself in. Replaces the old `// comment` label — the numbering does the
 * same structural job without cosplaying as source code.
 */
export default function SectionHead({ index, label, note }: SectionHeadProps) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal className="mb-3 flex items-baseline justify-between gap-6" y={14}>
        <span className="t-meta text-ink">
          <span className="text-accent">{index}</span>
          <span className="mx-3 text-ink-4">/</span>
          {label}
        </span>
        {note && <span className="t-meta text-ink-4">{note}</span>}
      </Reveal>
      <Rule />
    </div>
  );
}
