import {
  academiesFor,
  consumeSelectionToken,
  delay,
  errors,
  json,
  mockEnabled,
  notFound,
  preflight,
  readJson,
  redirectBody,
  selectionTokenValid,
} from "../../../_lib/mock";

export const dynamic = "force-dynamic";

export const OPTIONS = preflight;

export function GET() {
  return notFound();
}

export async function POST(request: Request) {
  if (!mockEnabled()) return notFound();
  await delay();

  const body = await readJson(request);
  const token = body?.selection_token;
  const academyId = body?.academy_id;

  const fields: Record<string, string[]> = {};
  if (typeof token !== "string" || !token) fields.selection_token = ["The selection token is required."];
  if (typeof academyId !== "string" || !academyId) fields.academy_id = ["Choose an academy."];
  if (Object.keys(fields).length) return errors.validation(request, fields);

  if (!selectionTokenValid(token as string)) return errors.expired(request);

  const academy = academiesFor(request).find((a) => a.id === academyId);
  if (!academy) return errors.invalidSelection(request);

  consumeSelectionToken(token as string);
  return json(request, redirectBody(request, academy));
}
