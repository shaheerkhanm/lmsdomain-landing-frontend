// ============================================================================
// /og/<page>: default 1200 x 630 share image (WhatsApp, LinkedIn, X, Slack...).
// Dark brand panel: logo, page headline, three real selling points and a
// product window. Used for pages without their own image in Admin > SEO and
// without a default share image in Site identity. See lib/og.ts.
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

function dataUrl(...p: string[]): string {
  const buf = read(...p);
  return buf ? `data:image/png;base64,${buf.toString("base64")}` : "";
}

/** Headline for the home image; other pages use their own title. */
const HOME_HEADLINE = "Run your academy on your own website";
const POINTS = ["0% commission", "Your own domain", "Any currency"];

export async function GET(request: Request, context: { params: Promise<{ page: string }> }) {
  const { page } = await context.params;
  if (!OG_PAGES[page]) return new Response("Not found", { status: 404 });
  const url = new URL(request.url);
  const title = page === "home" ? HOME_HEADLINE : verifiedTitle(page, url.searchParams.get("t"), url.searchParams.get("s"));
  const fontSize = title.length > 56 ? 52 : title.length > 36 ? 62 : 72;

  const logo = dataUrl("public", "brand", "logo-wordmark-dark.png");
  const fonts = [
    { name: "Urbanist", file: "urbanist-latin-600-normal.woff", weight: 600 as const },
    { name: "Urbanist", file: "urbanist-latin-700-normal.woff", weight: 700 as const },
    { name: "Inter", file: "inter-latin-500-normal.woff", weight: 500 as const },
  ]
    .map((f) => ({ ...f, data: read("public", "fonts", "og", f.file) }))
    .filter((f) => f.data)
    .map((f) => ({ name: f.name, data: f.data as Buffer, weight: f.weight, style: "normal" as const }));

  const stat = (label: string, value: string, note: string) => (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "16px 18px", borderRadius: 14, background: "#F6F6F9" }}>
      <div style={{ display: "flex", fontSize: 15, color: "#71717A", fontFamily: "Inter" }}>{label}</div>
      <div style={{ display: "flex", marginTop: 6, fontSize: 30, fontWeight: 700, color: "#0A0A0B", fontFamily: "Urbanist" }}>{value}</div>
      <div style={{ display: "flex", marginTop: 4, fontSize: 13, color: "#15803D", fontFamily: "Inter" }}>{note}</div>
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0B0A12",
          fontFamily: "Inter",
        }}
      >
        {/* brand gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 6% 0%, rgba(108,75,255,0.6) 0%, rgba(108,75,255,0) 48%), radial-gradient(circle at 100% 100%, rgba(47,91,255,0.42) 0%, rgba(47,91,255,0) 50%)",
          }}
        />

        {/* left: copy */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640, padding: "64px 0 60px 72px", position: "relative" }}>
          {logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={logo} width={246} height={40} style={{ width: 246, height: 40 }} />
          ) : (
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#fff", fontFamily: "Urbanist" }}>lmsdomain</div>
          )}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Urbanist",
                fontWeight: 600,
                fontSize,
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 24, lineHeight: 1.45, color: "rgba(255,255,255,0.68)" }}>
              Courses, live classes, tests and payments in one platform.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {POINTS.map((p) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.07)",
                  fontSize: 18,
                  whiteSpace: "nowrap",
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                <div style={{ display: "flex", width: 8, height: 8, borderRadius: 8, background: "#8B6CFF" }} />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* right: product window, bleeding off the edge */}
        <div
          style={{
            position: "absolute",
            left: 712,
            top: 92,
            width: 600,
            display: "flex",
            flexDirection: "column",
            borderRadius: 22,
            background: "#FFFFFF",
            boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 20px", borderBottom: "1px solid #EFEFF3" }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: "#FF5F57" }} />
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: "#FEBC2E" }} />
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: "#28C840" }} />
            <div style={{ display: "flex", marginLeft: 14, padding: "6px 14px", borderRadius: 999, background: "#F4F5F8", fontSize: 14, color: "#71717A" }}>
              learn.youracademy.com
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "22px 24px 26px" }}>
            <div style={{ display: "flex", fontSize: 15, color: "#71717A" }}>Northwind Academy</div>
            <div style={{ display: "flex", marginTop: 2, fontSize: 28, fontWeight: 700, color: "#0A0A0B", fontFamily: "Urbanist" }}>Overview</div>
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              {stat("Active learners", "2,418", "+12% this month")}
              {stat("Revenue", "$18,240", "0% commission")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 14, padding: "16px 18px", borderRadius: 14, background: "#F6F6F9" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: "#71717A" }}>
                <div style={{ display: "flex" }}>Enrolments, last 7 days</div>
                <div style={{ display: "flex", color: "#0A0A0B" }}>412</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 92, marginTop: 14 }}>
                {[38, 54, 46, 66, 58, 88, 74].map((h, i) => (
                  <div key={i} style={{ display: "flex", flex: 1, height: `${h}%`, borderRadius: 6, background: i === 5 ? "#6C4BFF" : "#DCDCE3" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
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
