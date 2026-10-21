import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/api/client";

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const baseUrl = getBackendBaseUrl();
    if (!baseUrl) {
      return new NextResponse("Backend service not configured", { status: 500 });
    }

    const { path } = await context.params;
    if (!path || path.length === 0) {
      return new NextResponse("Bad Request: Missing path", { status: 400 });
    }

    const imageSubPath = path.join("/");
    const targetUrl = `${baseUrl}/uploads/${imageSubPath}`;

    const backendRes = await fetch(targetUrl);

    if (!backendRes.ok) {
      return new NextResponse("Image not found", { status: backendRes.status });
    }

    const contentType =
      backendRes.headers.get("content-type") || "application/octet-stream";

    return new NextResponse(backendRes.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error: any) {
    console.error("[uploads-proxy] Failed to stream image from backend:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
