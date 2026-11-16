import {
  academiesFor,
  delay,
  errors,
  hasRecaptcha,
  issueSelectionToken,
  json,
  mockEnabled,
  notFound,
  preflight,
  readJson,
  redirectBody,
  validateEmail,
} from "../../_lib/mock";

export const dynamic = "force-dynamic";

export const OPTIONS = preflight;

export function GET() {
  return notFound();
}

export async function POST(request: Request) {
  if (!mockEnabled()) return notFound();
  await delay();

  const body = await readJson(request);
  if (!body) return errors.validation(request, { email: ["Enter your email address."], password: ["Enter your password."] });

  const fields: Record<string, string[]> = {};
  const emailError = validateEmail(body.email);
  if (emailError) fields.email = emailError;
  if (typeof body.password !== "string" || body.password.length === 0) fields.password = ["Enter your password."];
  if (Object.keys(fields).length) return errors.validation(request, fields);

  if (!hasRecaptcha(body)) return errors.recaptcha(request);

  const email = (body.email as string).trim().toLowerCase();
  if (email === "locked@test.dev") return errors.tooMany(request);
  if (email === "down@test.dev") return errors.unavailable(request);
  if (body.password === "wrong") return errors.credentials(request);
  if (email === "suspended@test.dev") return errors.suspended(request);

  const academies = academiesFor(request);
  if (email === "one@test.dev") return json(request, redirectBody(request, academies[0]));
  if (email === "two@test.dev") {
    return json(request, {
      status: "choose",
      selection_token: issueSelectionToken(),
      expires_in: 300,
      academies,
    });
  }

  return errors.credentials(request);
}
