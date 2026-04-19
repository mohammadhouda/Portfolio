import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: "#0a0a0f",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        fontWeight: 700,
        fontSize: 19,
        color: "#22c55e",
        letterSpacing: "-0.04em",
      }}
    >
      MH
    </div>,
    { width: 32, height: 32 }
  );
}
