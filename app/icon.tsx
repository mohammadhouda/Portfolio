import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#16150f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontSize: 21,
          color: "#f3f0ea",
          letterSpacing: "-0.03em",
          paddingBottom: 2,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
