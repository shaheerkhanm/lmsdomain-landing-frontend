// ============================================================================
// /og/<page>: default 1200 x 630 share image (logo + page title, no claims).
// Used for pages without their own image in Admin > SEO and without a default
// share image in Site identity. See lib/og.ts.
// ============================================================================

import { ImageResponse } from "next/og";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { OG_PAGES, verifiedTitle } from "@/lib/og";
import { getSiteIdentity } from "@/lib/siteIdentity";
import { getBackendBaseUrl } from "@/lib/api/client";

export const runtime = "nodejs";

function getDefaultWordmarkDataUrl(): string {
  try {
    const p = path.join(process.cwd(), "public", "brand", "logo-wordmark.png");
    if (existsSync(p)) {
      const buf = readFileSync(p);
      return `data:image/png;base64,${buf.toString("base64")}`;
    }
  } catch (e) {
    console.warn("[og] failed to read default wordmark:", e);
  }
  return "";
}

async function getWordmarkDataUrl(): Promise<string> {
  try {
    const identity = await getSiteIdentity().catch(() => ({} as import("@/lib/siteIdentity").SiteIdentity));
    if (identity.logoLight) {
      const src = identity.logoLight.startsWith("/")
        ? `${getBackendBaseUrl()}${identity.logoLight}`
        : identity.logoLight;
      const res = await fetch(src, {
        next: { revalidate: 300, tags: ["site-identity"] },
      });
      if (res.ok) {
        const ct = res.headers.get("content-type") || "image/png";
        const buf = Buffer.from(await res.arrayBuffer());
        return `data:${ct};base64,${buf.toString("base64")}`;
      }
    }
  } catch (err) {
    console.warn("[og] failed to load custom logoLight, using default:", err);
  }
  return getDefaultWordmarkDataUrl();
}

export async function GET(request: Request, context: { params: Promise<{ page: string }> }) {
  const { page } = await context.params;
  if (!OG_PAGES[page]) return new Response("Not found", { status: 404 });
  const url = new URL(request.url);
  const title = verifiedTitle(page, url.searchParams.get("t"), url.searchParams.get("s"));
  const fontSize = title.length > 60 ? 56 : title.length > 34 ? 66 : 80;

  const logoDataUrl = await getWordmarkDataUrl();

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
        <div style={{ display: "flex", alignItems: "center" }}>
          {logoDataUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={logoDataUrl}
              height="48"
              style={{ height: "48px", objectFit: "contain" }}
            />
          ) : (
            <div style={{ fontSize: "36px", fontWeight: 700, color: "#161616" }}>LMS Domain</div>
          )}
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
