// Local fake of the central admin login API (docs/central-login-api.md), for
// building the /login form and taking screenshots. Disabled (404) unless
// NODE_ENV is "development" AND CENTRAL_LOGIN_MOCK=true. Never logs bodies.

import { randomBytes } from "node:crypto";

export const MOCK_BASE_PATH = "/api/dev/central-mock";

// Contract, "Setup": local origins only.
const ALLOWED_ORIGINS = new Set(["http://localhost:3001", "http://127.0.0.1:3001"]);

const DELAY_MS = 400;
// 20 seconds instead of the real 5 minutes, so expiry is quick to test.
const SELECTION_TTL_MS = 20_000;

export function mockEnabled(): boolean {
  return process.env.NODE_ENV === "development" && process.env.CENTRAL_LOGIN_MOCK === "true";
}

export function notFound(): Response {
  return new Response("Not Found", { status: 404, headers: { "Content-Type": "text/plain" } });
}

export function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, DELAY_MS));
}

function corsHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = { Vary: "Origin" };
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, Accept";
    headers["Access-Control-Max-Age"] = "600";
  }
  return headers;
}

export function json(request: Request, body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return Response.json(body, { status, headers: { ...corsHeaders(request), "Cache-Control": "no-store", ...extra } });
}

export async function preflight(request: Request): Promise<Response> {
  if (!mockEnabled()) return notFound();
  await delay();
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return typeof body === "object" && body !== null && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

// ----------------------------------------------------------------------------
// Error bodies (texts from the contract's error table)
// ----------------------------------------------------------------------------

export function error(request: Request, status: number, code: string, message: string, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}): Response {
  return json(request, { status: "error", code, message, ...extra }, status, headers);
}

export const errors = {
  validation: (request: Request, fields: Record<string, string[]>) =>
    error(request, 422, "validation_failed", "Please check the highlighted fields.", { errors: fields }),
  recaptcha: (request: Request) =>
    error(request, 422, "recaptcha_failed", "Please confirm you're not a robot and try again."),
  credentials: (request: Request) => error(request, 422, "invalid_credentials", "Incorrect email or password."),
  suspended: (request: Request) =>
    error(request, 403, "academy_suspended", "This academy is currently unavailable. Please contact support."),
  expired: (request: Request) => error(request, 422, "selection_expired", "That took too long. Please log in again."),
  invalidSelection: (request: Request) => error(request, 422, "invalid_selection", "Please log in again."),
  tooMany: (request: Request) =>
    error(request, 429, "too_many_attempts", "Too many attempts. Try again in 15 minutes.", { retry_after: 900 }, { "Retry-After": "900" }),
  unavailable: (request: Request) =>
    error(request, 503, "service_unavailable", "We can't sign you in right now. Please try again shortly."),
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: unknown): string[] | null {
  if (typeof value !== "string" || !value.trim()) return ["Enter your email address."];
  if (value.length > 255 || !EMAIL_RE.test(value.trim())) return ["Enter a valid email address."];
  return null;
}

export function hasRecaptcha(body: Record<string, unknown>): boolean {
  return typeof body.recaptcha_token === "string" && body.recaptcha_token.trim().length > 0;
}

// ----------------------------------------------------------------------------
// Fake accounts and academies
// ----------------------------------------------------------------------------

// next dev reports request.url as localhost; use the Host the browser called.
function originOf(request: Request): string {
  const host = request.headers.get("host");
  return host ? `http://${host}` : new URL(request.url).origin;
}

export function academiesFor(request: Request) {
  const origin = originOf(request);
  return [
    { id: "acme", name: "Acme Academy", logo_url: `${origin}/icons/icon-192.png`, domain: "acme.lmsdomain.com" },
    { id: "globex", name: "Globex IELTS", logo_url: null, domain: "learn.globex.in" },
  ];
}

export function redirectBody(request: Request, academy: { id: string; name: string; logo_url: string | null }) {
  return {
    status: "redirect",
    redirect: {
      url: `${originOf(request)}${MOCK_BASE_PATH}/handoff`,
      token: randomBytes(32).toString("base64url"),
      expires_in: 60,
    },
    academy: { id: academy.id, name: academy.name, logo_url: academy.logo_url },
  };
}

// Selection tokens: "<random>.<issued-at ms>". Used ones are remembered on
// globalThis so the set is shared by the route modules in one dev server.
const globalStore = globalThis as typeof globalThis & { __centralMockUsedSelections?: Set<string> };
const usedSelections = (globalStore.__centralMockUsedSelections ??= new Set<string>());

export function issueSelectionToken(): string {
  return `${randomBytes(24).toString("base64url")}.${Date.now()}`;
}

/** false = malformed, expired or already used. */
export function selectionTokenValid(token: string): boolean {
  const issuedAt = Number(token.split(".")[1]);
  if (!Number.isFinite(issuedAt) || usedSelections.has(token)) return false;
  return Date.now() - issuedAt <= SELECTION_TTL_MS;
}

export function consumeSelectionToken(token: string): void {
  usedSelections.add(token);
}
