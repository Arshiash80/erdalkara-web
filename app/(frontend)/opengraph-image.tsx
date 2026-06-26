import { ImageResponse } from "next/og";

// Default social share image for the site (homepage + any frontend route
// without its own). Brand wordmark on the warm cream theme.
export const alt = "Erdal Kara Hair Design — Men's Barber in Bursa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f2e9",
          color: "#2c2620",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* top: eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9c5238",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
          }}
        >
          <div style={{ width: 46, height: 2, background: "#bb6a4a" }} />
          Bursa · Since 2008
        </div>

        {/* middle: wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, lineHeight: 1, letterSpacing: 2 }}>
            ERDAL KARA
          </div>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 14,
              textTransform: "uppercase",
              color: "#6f6456",
              marginTop: 18,
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 500,
            }}
          >
            Hair Design
          </div>
        </div>

        {/* bottom: rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "#3a332b",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#bb6a4a">
            <path d="M12 2l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.98 6.1 20.17l1.13-6.57L2.45 8.94l6.6-.96L12 2z" />
          </svg>
          4.9 on Google · 1,000+ reviews · Men&apos;s Barber
        </div>
      </div>
    ),
    size,
  );
}
