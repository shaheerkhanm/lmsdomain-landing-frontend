import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/api/client";

export async function POST(request: Request) {
  try {
    const baseUrl = getBackendBaseUrl();
    if (!baseUrl) {
      return NextResponse.json(
        { status: false, message: "Backend URL is not configured on server." },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Forward exact payload to backend: name, organizationName, phoneNumber, email, subject, type
    const backendRes = await fetch(`${baseUrl}/api/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json().catch(() => null);

    return NextResponse.json(data ?? { status: backendRes.ok }, {
      status: backendRes.status,
    });
  } catch (error: any) {
    console.error("[api/enquiry] Failed to forward enquiry to backend:", error);
    return NextResponse.json(
      { status: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
