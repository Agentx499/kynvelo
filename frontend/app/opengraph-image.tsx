import { ImageResponse } from "next/og";

export const alt = "Kynvelo — the operating system for modern fitness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Generated at build time from the mark, so the social card can never drift
   out of sync with the brand. v1 pointed Open Graph at kynvelo-hero-banner.jpg
   (a 733 KB square JPG) which cropped badly at 1200x630.

   Uses the default font stack deliberately: loading Barlow Condensed here
   would mean a network fetch during the build for a 1200x630 raster nobody
   reads closely. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050608",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="52" height="52" viewBox="0 0 100 100">
            <path
              d="M22 2 H44 V38 L86 2 H100 L56 50 L100 98 H86 L44 62 V98 H14 Z"
              fill="#C6FF00"
            />
          </svg>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#F7F8F8",
              letterSpacing: 6,
            }}
          >
            KYNVELO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              color: "#F7F8F8",
            }}
          >
            <span>The operating system</span>
            <span style={{ color: "#C6FF00" }}>for modern fitness.</span>
          </div>
          <div style={{ fontSize: 27, color: "#A8AEB8", maxWidth: 880 }}>
            Attendance you can act on. Renewals that collect themselves.
            Training that actually gets logged.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 72, height: 3, background: "#C6FF00" }} />
          <div style={{ fontSize: 21, color: "#7A8290", letterSpacing: 1 }}>
            kynvelo.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
