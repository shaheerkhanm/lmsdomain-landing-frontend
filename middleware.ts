import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Keep environment detection lightweight and self-contained for Edge / Node runtime
function isProductionSite(): boolean {
  const envVal = process.env.SITE_ENV?.trim().toLowerCase();
  if (envVal === "production") return true;
  if (envVal === "staging" || envVal === "development") return false;

  const rawUrl = process.env.SITE_URL?.trim();
  if (!rawUrl) return false;
  try {
    return new URL(rawUrl).origin === "https://lmsdomain.com";
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!isProductionSite()) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    "/((?!_next/static|_next/image).*)",
  ],
};
