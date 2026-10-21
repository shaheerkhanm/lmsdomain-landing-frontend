import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    const { secret, tag } = await request.json();
    const expectedSecret = process.env.CMS_REVALIDATE_SECRET || "lmsdomain_secret_revalidate_2026";

    if (secret !== expectedSecret) {
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
