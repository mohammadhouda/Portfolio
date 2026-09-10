import { ImageResponse } from "next/og";
import { profile } from "../src/lib/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time so the social card always matches the site's
 * current design and copy, instead of a checked-in PNG that goes stale.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f0ea",
          color: "#16150f",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 20,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6f6a5e",
            borderBottom: "1px solid rgba(22,21,15,0.16)",
            paddingBottom: 22,
          }}
        >
          <span>{profile.name}</span>
          <span>{profile.location}</span>
        </div>

        {/* Statement */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
            }}
          >
            Software
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              fontStyle: "italic",
            }}
          >
            Engineer
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 22,
            color: "#4a463d",
            borderTop: "1px solid rgba(22,21,15,0.16)",
            paddingTop: 22,
          }}
        >
          <span style={{ maxWidth: 780 }}>
            AI agents, enterprise integrations, and backends that hold under
            load.
          </span>
          <span style={{ color: "#b0432b" }}>mohammadhouda.dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
