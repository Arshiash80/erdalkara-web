import { ImageResponse } from "next/og";

// Apple touch icon — clay monogram on cream, rounded by iOS.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#bb6a4a",
          color: "#f7f2e9",
          fontSize: 92,
          fontWeight: 600,
          fontFamily: "Georgia, serif",
          letterSpacing: 2,
        }}
      >
        EK
      </div>
    ),
    size,
  );
}
