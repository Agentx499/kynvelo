"use client";

import { useEffect } from "react";

/* Fires when the root layout itself throws, which means fonts, globals.css and
   every provider are unavailable. Styling is therefore inline and the html and
   body tags are re-declared, since this replaces the root layout entirely. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050608",
          color: "#F7F8F8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <svg width="32" height="32" viewBox="0 0 100 100" aria-hidden="true">
            <path
              d="M22 2 H44 V38 L86 2 H100 L56 50 L100 98 H86 L44 62 V98 H14 Z"
              fill="#C6FF00"
            />
          </svg>
          <h1
            style={{
              fontSize: 34,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "28px 0 12px",
            }}
          >
            Kynvelo failed to start.
          </h1>
          <p style={{ color: "#A8AEB8", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
            The application shell could not load. Reloading usually clears it.
          </p>
          {error.digest && (
            <p
              style={{
                color: "#7A8290",
                fontSize: 13,
                fontFamily: "ui-monospace, monospace",
                marginTop: 20,
              }}
            >
              Reference: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: 28,
              height: 44,
              padding: "0 20px",
              border: 0,
              borderRadius: 6,
              background: "#C6FF00",
              color: "#050608",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
