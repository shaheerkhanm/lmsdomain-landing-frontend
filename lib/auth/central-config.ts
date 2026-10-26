// Central admin login settings (docs/central-login-api.md, "Setup").
// Server only: read at request time and passed to client components as props,
// so one Docker image runs on staging and production.
//
// Admin Settings > App links win over server env, except for the domain
// allow-list: the form sends admin passwords to the central URL, so a URL is
// only used when its host is on CENTRAL_LOGIN_ALLOWED_DOMAINS (server env,
// never editable from the admin).

import { getSiteSettings } from "@/lib/api/content";

export interface CentralLoginConfig {
  centralUrl: string;
  recaptchaSiteKey: string;
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);
const DEFAULT_ALLOWED_DOMAINS = "lmsdomain.com,lmsdomain.online";
const SITE_KEY_RE = /^[A-Za-z0-9_-]{20,80}$/;

// The local fake API lives under this path on the dev server; real central
// domains are origin-only.
const LOCAL_MOCK_PATH = "/api/dev/central-mock";

/** Format only: https origin (http: for localhost / 127.0.0.1), or the local fake API path. */
export function parseCentralUrl(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const isLocal = LOCAL_HOSTS.has(url.hostname);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocal)) return null;
  if (url.username || url.password || url.search || url.hash) return null;

  const path = url.pathname.replace(/\/+$/, "");
  if (path && !(isLocal && path === LOCAL_MOCK_PATH)) return null;

  return `${url.origin}${path}`;
}

export function allowedDomains(): string[] {
  const raw = process.env.CENTRAL_LOGIN_ALLOWED_DOMAINS?.trim() || DEFAULT_ALLOWED_DOMAINS;
  return raw
    .split(",")
    .map((d) => d.trim().toLowerCase().replace(/^\.+/, ""))
    .filter(Boolean);
}

/** The host itself or a subdomain of an allowed domain; localhost only under next dev. */
export function isAllowedHost(hostname: string, domains: string[] = allowedDomains()): boolean {
  if (LOCAL_HOSTS.has(hostname)) return process.env.NODE_ENV === "development";
  return domains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
}

/** Format checks plus the allow-list; null = not usable. */
export function resolveCentralUrl(raw: string | undefined): string | null {
  const centralUrl = parseCentralUrl(raw);
  if (!centralUrl) return null;
  return isAllowedHost(new URL(centralUrl).hostname) ? centralUrl : null;
}

// One warning per rejected host per server process, host only (never the full value)
const warnedHosts = new Set<string>();
function warnRejectedSetting(raw: string) {
  let host = "(not a URL)";
  try {
    host = new URL(raw).host || host;
  } catch {}
  if (warnedHosts.has(host)) return;
  warnedHosts.add(host);
  console.warn(
    `[central-login] Admin setting lmsCentralUrl rejected (host: ${host}): not https or not on CENTRAL_LOGIN_ALLOWED_DOMAINS. Using LMS_CENTRAL_URL.`,
  );
}

/**
 * null = feature off: /login keeps the plain button to the app login URL.
 * Order: admin switch off → off; URL from admin (if valid and allowed) else env;
 * site key from admin (if well-formed) else env; on only when switched on (or,
 * while the backend has no switch, when LMS_CENTRAL_URL is set) and both resolved.
 */
export async function getCentralLoginConfig(): Promise<CentralLoginConfig | null> {
  const settings = await getSiteSettings();
  const enabled = settings.centralLoginEnabled;
  if (enabled === false) return null;

  let centralUrl: string | null = null;
  if (settings.lmsCentralUrl) {
    centralUrl = resolveCentralUrl(settings.lmsCentralUrl);
    if (!centralUrl) warnRejectedSetting(settings.lmsCentralUrl);
  }
  centralUrl ??= resolveCentralUrl(process.env.LMS_CENTRAL_URL);

  const adminKey = settings.recaptchaSiteKey?.trim();
  const recaptchaSiteKey =
    adminKey && SITE_KEY_RE.test(adminKey) ? adminKey : process.env.RECAPTCHA_SITE_KEY?.trim() || null;

  const switchedOn = enabled === true || (enabled === undefined && !!process.env.LMS_CENTRAL_URL?.trim());
  if (!switchedOn || !centralUrl || !recaptchaSiteKey) return null;

  return { centralUrl, recaptchaSiteKey };
}
