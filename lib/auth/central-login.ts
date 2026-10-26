// Browser client for the central admin login API (docs/central-login-api.md).
// Use only from client components. centralUrl comes from getCentralLoginConfig()
// on the server, passed in as a prop; this module never reads process.env.
//
// Never log, store or send to analytics anything that goes through here:
// passwords, reCAPTCHA tokens, selection tokens, handoff tokens, academy lists.

// ----------------------------------------------------------------------------
// Types (contract sections 1, 2, Errors, Forgot password)
// ----------------------------------------------------------------------------

export interface CentralRedirect {
  url: string;
  token: string;
  expires_in: number;
}

export interface CentralRedirectAcademy {
  id: string;
  name: string;
  logo_url: string | null;
}

export interface CentralAcademy extends CentralRedirectAcademy {
  domain: string;
}

export interface CentralRedirectResponse {
  status: "redirect";
  redirect: CentralRedirect;
  /** Always sent per the contract; optional so a missing one still hands off ("your academy"). */
  academy?: CentralRedirectAcademy;
}

export interface CentralChooseResponse {
  status: "choose";
  selection_token: string;
  expires_in: number;
  academies: CentralAcademy[];
}

export interface CentralForgotPasswordResponse {
  status: "sent";
  message: string;
}

export type CentralLoginResponse = CentralRedirectResponse | CentralChooseResponse;

export type CentralErrorCode =
  | "validation_failed"
  | "recaptcha_failed"
  | "invalid_credentials"
  | "academy_suspended"
  | "selection_expired"
  | "invalid_selection"
  | "too_many_attempts"
  | "service_unavailable";

export interface CentralLoginError {
  code: CentralErrorCode;
  message: string;
  /** validation_failed only: messages per field, as in the API's `errors`. */
  fieldErrors?: Record<string, string[]>;
  /** too_many_attempts only: seconds, from the body's `retry_after`. */
  retryAfter?: number;
}

export type CentralResult<T> = { ok: true; data: T } | { ok: false; error: CentralLoginError };

// ----------------------------------------------------------------------------
// Error mapping
// ----------------------------------------------------------------------------

// "Show the user" column of the contract's error table.
const ERROR_TEXT: Record<CentralErrorCode, string> = {
  validation_failed: "Please check the highlighted fields.",
  recaptcha_failed: "Please confirm you're not a robot and try again.",
  invalid_credentials: "Incorrect email or password.",
  academy_suspended: "This academy is currently unavailable. Please contact support.",
  selection_expired: "That took too long. Please log in again.",
  invalid_selection: "Please log in again.",
  too_many_attempts: "Too many attempts. Please try again later.",
  service_unavailable: "We can't sign you in right now. Please try again shortly.",
};

const TIMEOUT_MS = 15_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isErrorCode(value: unknown): value is CentralErrorCode {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(ERROR_TEXT, value);
}

/** Per-page overrides for the fallback texts (used only when the API sends no message). */
export type ErrorText = Partial<Record<CentralErrorCode, string>>;

// /forgot-password: "sign you in" doesn't fit a reset link
export const RESET_ERROR_TEXT: ErrorText = {
  service_unavailable: "We can't send the reset link right now. Please try again shortly.",
};

export function centralErrorMessage(code: CentralErrorCode, text: ErrorText = {}): string {
  return text[code] ?? ERROR_TEXT[code];
}

export function serviceUnavailable(text: ErrorText = {}): CentralLoginError {
  return { code: "service_unavailable", message: centralErrorMessage("service_unavailable", text) };
}

export function retryAfterMinutes(seconds: number): number {
  return Math.max(1, Math.ceil(seconds / 60));
}

function readFieldErrors(value: unknown): Record<string, string[]> | undefined {
  if (!isRecord(value)) return undefined;
  const out: Record<string, string[]> = {};
  for (const [field, messages] of Object.entries(value)) {
    if (!Array.isArray(messages)) continue;
    const strings = messages.filter(isString);
    if (strings.length) out[field] = strings;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Turns an error body into a CentralLoginError. Unknown or malformed → service_unavailable. */
export function toCentralError(body: unknown, text: ErrorText = {}): CentralLoginError {
  if (!isRecord(body) || body.status !== "error" || !isErrorCode(body.code)) {
    return serviceUnavailable(text);
  }

  const code = body.code;
  const error: CentralLoginError = {
    code,
    message: isString(body.message) ? body.message : centralErrorMessage(code, text),
  };

  if (code === "validation_failed") {
    const fieldErrors = readFieldErrors(body.errors);
    if (fieldErrors) error.fieldErrors = fieldErrors;
  }

  if (code === "too_many_attempts") {
    const seconds = body.retry_after;
    if (typeof seconds === "number" && Number.isFinite(seconds) && seconds > 0) {
      const minutes = retryAfterMinutes(seconds);
      error.retryAfter = seconds;
      error.message = `Too many attempts. Try again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`;
    }
  }

  return error;
}

// ----------------------------------------------------------------------------
// Response shape checks: a 200 that doesn't match the contract is treated as
// service_unavailable rather than half-handled.
// ----------------------------------------------------------------------------

function isRedirect(value: unknown): value is CentralRedirect {
  return isRecord(value) && isString(value.url) && isString(value.token) && typeof value.expires_in === "number";
}

function isRedirectAcademy(value: unknown): value is CentralRedirectAcademy {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.name) &&
    (value.logo_url === null || typeof value.logo_url === "string")
  );
}

function isAcademy(value: unknown): value is CentralAcademy {
  return isRedirectAcademy(value) && isRecord(value) && isString(value.domain);
}

function isRedirectResponse(body: Record<string, unknown>): boolean {
  return (
    body.status === "redirect" &&
    isRedirect(body.redirect) &&
    (body.academy === undefined || body.academy === null || isRedirectAcademy(body.academy))
  );
}

function isChooseResponse(body: Record<string, unknown>): boolean {
  return (
    body.status === "choose" &&
    isString(body.selection_token) &&
    typeof body.expires_in === "number" &&
    Array.isArray(body.academies) &&
    body.academies.length > 0 &&
    body.academies.every(isAcademy)
  );
}

function isSentResponse(body: Record<string, unknown>): boolean {
  return body.status === "sent" && isString(body.message);
}

// ----------------------------------------------------------------------------
// Requests
// ----------------------------------------------------------------------------

export async function post(
  centralUrl: string,
  path: string,
  body: unknown,
  text: ErrorText = {},
): Promise<CentralResult<Record<string, unknown>>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${centralUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "omit",
      cache: "no-store",
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      return { ok: false, error: serviceUnavailable(text) };
    }

    if (!res.ok || !isRecord(data) || data.status === "error") {
      return { ok: false, error: toCentralError(data, text) };
    }

    return { ok: true, data };
  } catch {
    // Network failure, CORS refusal or timeout (abort)
    return { ok: false, error: serviceUnavailable(text) };
  } finally {
    clearTimeout(timer);
  }
}

function checked<T>(
  result: CentralResult<Record<string, unknown>>,
  valid: (body: Record<string, unknown>) => boolean,
  text: ErrorText = {},
): CentralResult<T> {
  if (!result.ok) return result;
  return valid(result.data) ? { ok: true, data: result.data as unknown as T } : { ok: false, error: serviceUnavailable(text) };
}

export async function login(
  centralUrl: string,
  { email, password, remember, recaptchaToken }: { email: string; password: string; remember: boolean; recaptchaToken: string },
): Promise<CentralResult<CentralLoginResponse>> {
  const result = await post(centralUrl, "/api/central-login", {
    email: email.trim(),
    password,
    remember,
    recaptcha_token: recaptchaToken,
  });
  return checked(result, (body) => isRedirectResponse(body) || isChooseResponse(body));
}

export async function select(
  centralUrl: string,
  { selectionToken, academyId }: { selectionToken: string; academyId: string },
): Promise<CentralResult<CentralRedirectResponse>> {
  const result = await post(centralUrl, "/api/central-login/select", {
    selection_token: selectionToken,
    academy_id: academyId,
  });
  return checked(result, isRedirectResponse);
}

export async function forgotPassword(
  centralUrl: string,
  { email, recaptchaToken }: { email: string; recaptchaToken: string },
): Promise<CentralResult<CentralForgotPasswordResponse>> {
  const result = await post(
    centralUrl,
    "/api/central-login/forgot-password",
    { email: email.trim(), recaptcha_token: recaptchaToken },
    RESET_ERROR_TEXT,
  );
  return checked(result, isSentResponse, RESET_ERROR_TEXT);
}

// ----------------------------------------------------------------------------
// Handoff (contract section 3)
// ----------------------------------------------------------------------------

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);
const HANDOFF_FORM_ATTR = "data-central-handoff";

/** https: always; http: only while the central URL itself is local. */
export function isAllowedRedirectUrl(redirectUrl: string, centralUrl: string): boolean {
  let target: URL;
  try {
    target = new URL(redirectUrl);
  } catch {
    return false;
  }
  if (target.protocol === "https:") return true;
  if (target.protocol !== "http:") return false;

  try {
    return LOCAL_HOSTS.has(new URL(centralUrl).hostname);
  } catch {
    return false;
  }
}

/**
 * Posts the one-time token to the academy as a real form (full-page navigation).
 * redirect.url is used exactly as returned. Returns an error instead of
 * submitting when the URL fails the check above.
 */
export function goToAcademy(centralUrl: string, redirect: { url: string; token: string }): CentralLoginError | null {
  if (!isString(redirect.token) || !isAllowedRedirectUrl(redirect.url, centralUrl)) {
    return serviceUnavailable();
  }

  try {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = redirect.url;
    form.setAttribute(HANDOFF_FORM_ATTR, "");

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token";
    input.value = redirect.token;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    return null;
  } catch {
    clearHandoffForms();
    return serviceUnavailable();
  }
}

/** Removes handoff forms (and their tokens) left in the DOM, e.g. after a back-forward cache restore. */
export function clearHandoffForms(): void {
  document.querySelectorAll(`form[${HANDOFF_FORM_ATTR}]`).forEach((form) => form.remove());
}
