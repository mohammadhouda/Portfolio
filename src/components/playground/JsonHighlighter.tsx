"use client";

import { useMemo } from "react";

// Token colors matching the spec
const COLORS = {
  key: "#22c55e",       // accent green
  string: "#93c5fd",    // light blue
  number: "#fb923c",    // amber/orange
  boolean: "#c084fc",   // muted purple
  null: "#c084fc",      // muted purple
  brace: "#71717a",     // muted
  comma: "#71717a",
};

function tokenize(json: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const push = (text: string, color?: string) => {
    nodes.push(
      <span key={key++} style={{ color: color ?? "var(--text-primary)" }}>
        {text}
      </span>
    );
  };

  while (i < json.length) {
    const ch = json[i];

    // Whitespace
    if (/\s/.test(ch)) {
      const start = i;
      while (i < json.length && /\s/.test(json[i])) i++;
      push(json.slice(start, i));
      continue;
    }

    // Braces / brackets / colon / comma
    if ("{}[]".includes(ch)) { push(ch, COLORS.brace); i++; continue; }
    if (ch === ":") { push(": ", COLORS.brace); i++; continue; }
    if (ch === ",") { push(",", COLORS.comma); i++; continue; }

    // String
    if (ch === '"') {
      const start = i;
      i++; // skip opening quote
      while (i < json.length && json[i] !== '"') {
        if (json[i] === "\\") i++; // skip escaped char
        i++;
      }
      i++; // skip closing quote
      const raw = json.slice(start, i);

      // Determine if it's a key (next non-whitespace is ":")
      let j = i;
      while (j < json.length && /\s/.test(json[j])) j++;
      const isKey = json[j] === ":";
      push(raw, isKey ? COLORS.key : COLORS.string);
      continue;
    }

    // Number
    if (ch === "-" || /\d/.test(ch)) {
      const start = i;
      if (json[i] === "-") i++;
      while (i < json.length && /[\d.eE+\-]/.test(json[i])) i++;
      push(json.slice(start, i), COLORS.number);
      continue;
    }

    // true / false / null
    if (json.startsWith("true", i))  { push("true",  COLORS.boolean); i += 4; continue; }
    if (json.startsWith("false", i)) { push("false", COLORS.boolean); i += 5; continue; }
    if (json.startsWith("null", i))  { push("null",  COLORS.null);    i += 4; continue; }

    // Fallback
    push(ch); i++;
  }

  return nodes;
}

export default function JsonHighlighter({ json }: { json: string }) {
  const tokens = useMemo(() => {
    let formatted: string;
    try {
      formatted = JSON.stringify(JSON.parse(json), null, 2);
    } catch {
      formatted = json;
    }
    return tokenize(formatted);
  }, [json]);

  return (
    <pre
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "var(--font-jetbrains)",
        fontSize: "0.78rem",
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {tokens}
    </pre>
  );
}
