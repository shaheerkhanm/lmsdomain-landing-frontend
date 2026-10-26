// Central admin login settings (docs/central-login-api.md, "Setup").
// Server only: read from process.env at request time and passed to client
// components as props, so one Docker image runs on staging and production.

export interface CentralLoginConfig {
  centralUrl: string;
  recaptchaSiteKey: string;
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

// The local fake API lives under this path on the dev server; real central
// domains are origin-only.
const LOCAL_MOCK_PATH = "/api/dev/central-mock";

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

// null = feature off: /login keeps the plain button to the app login URL.
export function getCentralLoginConfig(): CentralLoginConfig | null {
  const centralUrl = parseCentralUrl(process.env.LMS_CENTRAL_URL);
  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY?.trim();
  if (!centralUrl || !recaptchaSiteKey) return null;

  return { centralUrl, recaptchaSiteKey };
}
