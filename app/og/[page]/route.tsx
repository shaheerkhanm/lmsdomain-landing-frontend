// ============================================================================
// /og/<page>: default 1200 x 630 share image (logo + page title, no claims).
// Used for pages without their own image in Admin > SEO and without a default
// share image in Site identity. See lib/og.ts.
// ============================================================================

import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { OG_PAGES, verifiedTitle } from "@/lib/og";

export const runtime = "nodejs";

// The D of the logo, from the generated icon (public/ ships with the standalone build)
const MARK_PATH = readFileSync(path.join(process.cwd(), "public", "icons", "icon.svg"), "utf8").match(/<path d="([^"]+)"/)?.[1] || "";

export async function GET(request: Request, context: { params: Promise<{ page: string }> }) {
  const { page } = await context.params;
  if (!OG_PAGES[page]) return new Response("Not found", { status: 404 });
  const url = new URL(request.url);
  const title = verifiedTitle(page, url.searchParams.get("t"), url.searchParams.get("s"));
  const fontSize = title.length > 60 ? 56 : title.length > 34 ? 66 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F3F1FD 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="72" height="72" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="14" fill="#161616" />
            <g transform="translate(13.6, 11.9) scale(0.14)">
              <path d={MARK_PATH} transform="translate(-461.76, 0)" fill="#FFFFFF" />
            </g>
          </svg>
          <div style={{ display: "flex", fontSize: "36px", fontWeight: 700, color: "#13112D", letterSpacing: "-0.5px" }}>LMS Domain</div>
        </div>
        <div style={{ display: "flex", fontSize: `${fontSize}px`, fontWeight: 700, color: "#161616", lineHeight: 1.12, letterSpacing: "-1.5px", maxWidth: "1000px" }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", width: "120px", height: "8px", borderRadius: "8px", background: "#5341D6" }} />
          <div style={{ display: "flex", fontSize: "26px", color: "#6B6F76" }}>lmsdomain.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" } }
  );
}
