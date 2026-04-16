"use client";

interface SectionLabelProps {
  label: string;
  lineNumber?: number;
}

export default function SectionLabel({ label, lineNumber }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {lineNumber !== undefined && (
        <span className="font-mono text-[0.7rem] text-muted opacity-40 select-none">
          {String(lineNumber).padStart(2, "0")}
        </span>
      )}
      <span className="font-mono text-[0.75rem] text-muted tracking-[0.12em] uppercase">
        <span className="text-accent opacity-70">{"//"} </span>
        {label}
      </span>
    </div>
  );
}
