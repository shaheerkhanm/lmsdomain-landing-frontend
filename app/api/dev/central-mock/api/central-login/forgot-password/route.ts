import { delay, errors, hasRecaptcha, json, mockEnabled, notFound, preflight, readJson, validateEmail } from "../../../_lib/mock";

export const dynamic = "force-dynamic";

export const OPTIONS = preflight;

export function GET() {
  return notFound();
}

export async function POST(request: Request) {
  if (!mockEnabled()) return notFound();
  await delay();

  const body = await readJson(request);
  const emailError = validateEmail(body?.email);
  if (!body || emailError) return errors.validation(request, { email: emailError ?? ["Enter your email address."] });

  if (!hasRecaptcha(body)) return errors.recaptcha(request);
  if ((body.email as string).trim().toLowerCase() === "down@test.dev") return errors.unavailable(request);

  // Always "sent", whether or not the email exists (contract, "Forgot password")
  return json(request, {
    status: "sent",
    message: "If this email belongs to an academy admin, we've sent a link to reset the password.",
  });
}
