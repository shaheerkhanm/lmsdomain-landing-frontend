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
  const email = (body.email as string).trim().toLowerCase();
  if (email === "down@test.dev") return errors.unavailable(request);
  // Not in the contract (it answers "sent" over its limits): this 429 exists only
  // so the form's too_many_attempts handling can be seen and tested.
  if (email === "locked@test.dev") return errors.tooMany(request);

  // Always "sent", whether or not the email exists (contract, "Forgot password")
  return json(request, {
    status: "sent",
    message: "If this email belongs to an academy admin, we've sent a link to reset the password.",
  });
}
