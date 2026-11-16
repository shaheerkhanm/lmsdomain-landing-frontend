"use client";

import React from "react";

/** Last-resort error page. It replaces the root layout, so it uses inline styles only. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif", background: "#fff", color: "#0A0A0B" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "32px 16px" }}>
          <div style={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
            <div
              aria-hidden="true"
              style={{
                borderRadius: 28,
                background: "radial-gradient(120% 90% at 20% 0%, rgba(108,75,255,0.45), transparent 60%), #0B0A12",
                padding: "48px 24px",
                color: "#fff",
                fontSize: 96,
                fontWeight: 600,
                letterSpacing: "-0.06em",
                lineHeight: 1,
              }}
            >
              Oops
            </div>
            <h1 style={{ margin: "32px 0 0", fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em" }}>Something went wrong</h1>
            <p style={{ margin: "12px auto 0", maxWidth: 380, fontSize: 17, lineHeight: 1.55, color: "#52525B" }}>
              The page hit an unexpected error. Please reload, or come back in a moment.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => reset()}
                style={{ cursor: "pointer", border: 0, borderRadius: 999, background: "#0A0A0B", color: "#fff", padding: "12px 24px", fontSize: 15, fontWeight: 600 }}
              >
                Reload page
              </button>
              <a href="/" style={{ borderRadius: 999, background: "#F4F5F8", color: "#0A0A0B", padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                Back to home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
