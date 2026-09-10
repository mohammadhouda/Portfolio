import type { CSSProperties } from "react";

/**
 * The node data files carry colors picked for the old dark theme — bright
 * pastels that all but disappear against paper. Rather than rewriting both
 * data files (and re-picking colors every time one is edited), translate at
 * render time into tones that hold their contrast on a light ground.
 */
const LIGHT_EQUIVALENT: Record<string, string> = {
  "#22c55e": "#2f7d4f", // green
  "#34d399": "#27786a", // emerald
  "#38bdf8": "#1e6b91", // sky
  "#60a5fa": "#2f5da8", // blue
  "#a78bfa": "#6a4da8", // violet
  "#f87171": "#b0432b", // red -> site accent
  "#f9a8d4": "#a34677", // pink
  "#fbbf24": "#8e6410", // amber
  "#fb923c": "#a35a1f", // orange
};

/** Ink-safe version of a node color. Unknown values pass through. */
export function inkColor(color: string): string {
  return LIGHT_EQUIVALENT[color.toLowerCase()] ?? color;
}

/** Same color at a given alpha, for edges, fills, and hover states. */
export function inkColorAlpha(color: string, alpha: number): string {
  const hex = inkColor(color).replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Recolors an edge's stroke, which the data files hardcode for dark. */
export function inkEdgeStyle(style?: CSSProperties): CSSProperties {
  return {
    ...style,
    stroke: "rgba(22, 21, 15, 0.28)",
    strokeWidth: style?.strokeWidth ?? 1.5,
  };
}
