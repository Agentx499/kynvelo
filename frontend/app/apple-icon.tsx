import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* iOS ignores transparency and composites onto white, so this ships a solid
   obsidian ground rather than a transparent PNG. */
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
          background: "#050608",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 100 100">
          <path
            d="M22 2 H44 V38 L86 2 H100 L56 50 L100 98 H86 L44 62 V98 H14 Z"
            fill="#C6FF00"
          />
        </svg>
      </div>
    ),
    size
  );
}
