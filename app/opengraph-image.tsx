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
          background: "#0e0e10",
          color: "#f2f1ee",
          padding: "64px 72px",
          fontFamily: "Helvetica, Arial, sans-serif",
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
            color: "#a5a29b",
            borderBottom: "1px solid rgba(255,255,255,0.14)",
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
              fontSize: 138,
              lineHeight: 0.84,
              letterSpacing: "-0.05em",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            Software
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 138,
              lineHeight: 0.84,
              letterSpacing: "-0.05em",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#f0714a",
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
            color: "#c9c6bf",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 22,
          }}
        >
          <span style={{ maxWidth: 780 }}>
            AI agents, enterprise integrations, and backends that hold under
            load.
          </span>
          <span style={{ color: "#f0714a" }}>mohammadhouda.dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
