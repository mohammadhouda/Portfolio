"use client";

import { useMemo } from "react";

const COLORS = {
  key: "#22c55e",
  string: "#93c5fd",
  number: "#fb923c",
  boolean: "#c084fc",
  null: "#c084fc",
  brace: "#71717a",
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

    if (/\s/.test(ch)) {
      const start = i;
      while (i < json.length && /\s/.test(json[i])) i++;
      push(json.slice(start, i));
      continue;
    }

    if ("{}[]".includes(ch)) { push(ch, COLORS.brace); i++; continue; }
    if (ch === ":") { push(": ", COLORS.brace); i++; continue; }
    if (ch === ",") { push(",", COLORS.comma); i++; continue; }

    if (ch === '"') {
      const start = i;
      i++;
      while (i < json.length && json[i] !== '"') {
        if (json[i] === "\\") i++;
        i++;
      }
      i++;
      const raw = json.slice(start, i);
      let j = i;
      while (j < json.length && /\s/.test(json[j])) j++;
      const isKey = json[j] === ":";
      push(raw, isKey ? COLORS.key : COLORS.string);
      continue;
    }

    if (ch === "-" || /\d/.test(ch)) {
      const start = i;
      if (json[i] === "-") i++;
      while (i < json.length && /[\d.eE+\-]/.test(json[i])) i++;
      push(json.slice(start, i), COLORS.number);
      continue;
    }

    if (json.startsWith("true", i))  { push("true",  COLORS.boolean); i += 4; continue; }
    if (json.startsWith("false", i)) { push("false", COLORS.boolean); i += 5; continue; }
    if (json.startsWith("null", i))  { push("null",  COLORS.null);    i += 4; continue; }

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
    <pre className="m-0 p-0 font-mono text-[0.78rem] leading-[1.7] whitespace-pre-wrap wrap-break-word">
      {tokens}
    </pre>
  );
}
