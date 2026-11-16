// ============================================================================
// /og/<page>: default 1200 x 630 share image (WhatsApp, LinkedIn, X, Slack...).
// A real (faceless) desk photo on the right, dark copy panel on the left, and one real
// piece of the product (today's live classes) overlapping the photo.
// Used for pages without their own image in Admin > SEO and without a default
// share image in Site identity. See lib/og.ts.
// ============================================================================

import { ImageResponse } from "next/og";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { OG_PAGES, verifiedTitle } from "@/lib/og";

export const runtime = "nodejs";

const read = (...p: string[]) => {
  const file = path.join(process.cwd(), ...p);
  return existsSync(file) ? readFileSync(file) : null;
};
const dataUrl = (type: string, ...p: string[]) => {
  const buf = read(...p);
  return buf ? `data:${type};base64,${buf.toString("base64")}` : "";
};

const HOME_HEADLINE = "Run your academy on your own website";
const SUB = "Courses, live classes, tests and payments in one place.";

export async function GET(request: Request, context: { params: Promise<{ page: string }> }) {
  const { page } = await context.params;
  if (!OG_PAGES[page]) return new Response("Not found", { status: 404 });
  const url = new URL(request.url);
  const title = page === "home" ? HOME_HEADLINE : verifiedTitle(page, url.searchParams.get("t"), url.searchParams.get("s"));
  const size = title.length > 40 ? 54 : title.length > 24 ? 62 : 72;

  const logo = dataUrl("image/png", "public", "brand", "logo-wordmark-dark.png");
  const photo = dataUrl("image/jpeg", "public", "og", "og-photo.jpg");
  const live = dataUrl("image/jpeg", "public", "og", "og-live.jpg");
  const fonts = [
    { name: "Urbanist", file: "urbanist-latin-600-normal.woff", weight: 600 as const },
    { name: "Urbanist", file: "urbanist-latin-700-normal.woff", weight: 700 as const },
    { name: "Inter", file: "inter-latin-500-normal.woff", weight: 500 as const },
  ]
    .map((f) => ({ ...f, data: read("public", "fonts", "og", f.file) }))
    .filter((f) => f.data)
    .map((f) => ({ name: f.name, data: f.data as Buffer, weight: f.weight, style: "normal" as const }));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#0B0A12", fontFamily: "Inter" }}>
        {/* photo, right */}
        {photo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={photo} width={760} height={630} style={{ position: "absolute", right: 0, top: 0, width: 760, height: 630, objectFit: "cover", objectPosition: "40% 50%" }} />
        )}
        {/* fade photo into the dark panel */}
        <div
          style={{
            position: "absolute",
            left: 440,
            top: 0,
            width: 360,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(to right, #0B0A12 0%, rgba(11,10,18,0.85) 40%, rgba(11,10,18,0) 100%)",
          }}
        />
        {/* soft brand light, top left */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "radial-gradient(circle at 0% 0%, rgba(108,75,255,0.45) 0%, rgba(108,75,255,0) 42%)",
          }}
        />

        {/* copy */}
        <div style={{ position: "absolute", left: 72, top: 64, bottom: 60, width: 560, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={logo} width={208} height={34} style={{ width: 208, height: 34 }} />
          ) : (
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#fff", fontFamily: "Urbanist" }}>lmsdomain</div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Urbanist", fontWeight: 600, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.035em", color: "#FFFFFF" }}>
              {title}
            </div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 23, lineHeight: 1.45, color: "rgba(255,255,255,0.7)", maxWidth: 470 }}>{SUB}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", padding: "11px 22px", borderRadius: 999, background: "#FFFFFF", color: "#0A0A0B", fontSize: 19, fontFamily: "Urbanist", fontWeight: 700 }}>
              Book a free demo
            </div>
            <div style={{ display: "flex", marginLeft: 8, fontSize: 19, color: "rgba(255,255,255,0.6)" }}>lmsdomain.com</div>
          </div>
        </div>

        {/* real product piece over the photo */}
        {live && (
          <div
            style={{
              position: "absolute",
              right: 48,
              bottom: 44,
              width: 384,
              height: 243,
              display: "flex",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={live} width={384} height={243} style={{ width: 384, height: 243 }} />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
    }
  );
}
