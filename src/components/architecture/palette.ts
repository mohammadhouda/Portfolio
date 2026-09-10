import type { CSSProperties } from "react";

/**
 * The node data files carry per-node category colors. They were picked for a
 * dark ground, so on this theme they pass through essentially unchanged —
 * only lightly desaturated so eight simultaneous hues read as one family
 * rather than as a highlighter set.
 */
const TONED: Record<string, string> = {
  "#22c55e": "#4ade80", // green
  "#34d399": "#5eead4", // emerald
  "#38bdf8": "#7dd3fc", // sky
  "#60a5fa": "#93b8fb", // blue
  "#a78bfa": "#c4b5fd", // violet
  "#f87171": "#fca5a5", // red
  "#f9a8d4": "#f9c0dd", // pink
  "#fbbf24": "#fcd34d", // amber
  "#fb923c": "#fdba74", // orange
};

/** Theme-appropriate version of a node color. Unknown values pass through. */
export function nodeColor(color: string): string {
  return TONED[color.toLowerCase()] ?? color;
}

/** Same color at a given alpha, for fills and selected states. */
export function nodeColorAlpha(color: string, alpha: number): string {
  const hex = nodeColor(color).replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Normalises edge strokes. The data files hardcode a green tint per edge;
 * a single neutral stroke keeps the diagram readable when eight node colors
 * are already competing for attention.
 */
export function edgeStyle(style?: CSSProperties): CSSProperties {
  return {
    ...style,
    stroke: "rgba(255, 255, 255, 0.22)",
    strokeWidth: style?.strokeWidth ?? 1.5,
  };
}
