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
          background: "#f0714a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 20,
          color: "#0e0e10",
          letterSpacing: "-0.06em",
          fontWeight: 800,
          paddingBottom: 2,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
