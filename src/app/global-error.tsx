"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0F1115", color: "#F5F5F5", fontFamily: "sans-serif", margin: 0, padding: "40px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ maxWidth: 480, textAlign: "center", border: "1px solid #2A3140", borderRadius: 16, padding: "32px 24px", backgroundColor: "#171A21" }}>
          <h2 style={{ color: "#D4AF37", fontSize: 24, margin: "0 0 12px 0" }}>Hotel Sunny Point</h2>
          <h3 style={{ fontSize: 18, margin: "0 0 8px 0" }}>Service Interruption</h3>
          <p style={{ color: "#9DA4B0", fontSize: 13, lineHeight: 1.5, margin: "0 0 24px 0" }}>
            A core rendering exception occurred. You can attempt to restore the digital menu session below.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: "#D4AF37",
              color: "#0F1115",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Reload Session
          </button>
        </div>
      </body>
    </html>
  );
}
