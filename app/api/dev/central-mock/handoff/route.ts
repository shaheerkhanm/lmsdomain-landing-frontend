import { delay, mockEnabled, notFound } from "../_lib/mock";

export const dynamic = "force-dynamic";

export function GET() {
  return notFound();
}

// Stands in for an academy's /auth/handoff: receives the form post from
// goToAcademy() and shows only the token's length, never the token.
export async function POST(request: Request) {
  if (!mockEnabled()) return notFound();
  await delay();

  let length = 0;
  try {
    const token = (await request.formData()).get("token");
    if (typeof token === "string") length = token.length;
  } catch {
    // Not a form post: report length 0
  }

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Fake academy</title></head>
<body style="font-family: system-ui, sans-serif; padding: 2rem;">
<h1>Fake academy: handoff received</h1>
<p>Token length: ${length}</p>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
