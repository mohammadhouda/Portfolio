"use client";

interface SectionLabelProps {
  label: string;
  lineNumber?: number;
}

export default function SectionLabel({ label, lineNumber }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {lineNumber !== undefined && (
        <span
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.7rem",
            opacity: 0.4,
            userSelect: "none",
          }}
        >
          {String(lineNumber).padStart(2, "0")}
        </span>
      )}
      <span
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "var(--accent)", opacity: 0.7 }}>{"//"} </span>
        {label}
      </span>
    </div>
  );
}
