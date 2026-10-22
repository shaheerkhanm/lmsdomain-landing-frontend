import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";

function secretMatches(provided: unknown, expected: string): boolean {
  if (typeof provided !== "string") return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  // No fallback: without a configured secret the endpoint is disabled.
  const expectedSecret = process.env.CMS_REVALIDATE_SECRET;
  if (!expectedSecret) {
    console.error("[api/revalidate] CMS_REVALIDATE_SECRET is not set; revalidation is disabled.");
    return NextResponse.json({ message: "Revalidation is not configured" }, { status: 503 });
  }

  try {
    const { secret, tag } = await request.json();

    if (!secretMatches(secret, expectedSecret)) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
    }

    if (!tag) {
      return NextResponse.json({ message: "Missing tag to revalidate" }, { status: 400 });
    }

    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "Revalidation failed" }, { status: 500 });
  }
}
