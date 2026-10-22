// ============================================================================
// Server-Only API Client
// Standardizes communication with the LMS backend service
// ============================================================================

export class ApiError extends Error {
  endpoint: string;
  status: number;
  data: any;

  constructor(endpoint: string, status: number, data: any) {
    super(`API Error [${status}] at ${endpoint}: ${JSON.stringify(data)}`);
    this.name = "ApiError";
    this.endpoint = endpoint;
    this.status = status;
    this.data = data;
  }
}

let hasLoggedMissingBackendUrl = false;

export function getBackendBaseUrl(): string {
  let url = process.env.BACKEND_URL || process.env.BACKEND_INTERNAL_URL;

  // When developing on host machine (outside Docker), 'backend:3000' is the Docker-internal
  // container address which cannot resolve. Map to host port 5201 if on macOS or Windows host.
  if (
    url &&
    (url.includes("://backend:3000") || url === "http://backend:3000") &&
    (process.platform === "darwin" || process.platform === "win32")
  ) {
    url = "http://127.0.0.1:5201";
  }

  if (!url) {
    if (!hasLoggedMissingBackendUrl && typeof window === "undefined") {
      console.error(
        "[lib/api/client] CRITICAL: Neither BACKEND_URL nor BACKEND_INTERNAL_URL is set in environment variables. Backend requests will fail."
      );
      hasLoggedMissingBackendUrl = true;
    }
    return "";
  }

  return url.replace(/\/$/, "");
}

export interface FetchApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
  headers?: Record<string, string>;
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
  timeoutMs?: number;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchApiOptions = {}
): Promise<T> {
  const baseUrl = getBackendBaseUrl();
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  if (!baseUrl) {
    throw new ApiError(
      normalizedEndpoint,
      500,
      "BACKEND_URL is not configured on the server."
    );
  }

  const url = `${baseUrl}${normalizedEndpoint}`;
  const method = options.method || "POST";
  const timeoutMs = options.timeoutMs ?? 8000;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const nextOptions: Record<string, any> = {};
  if (options.revalidate !== undefined) {
    nextOptions.revalidate = options.revalidate;
  }
  if (options.tags && options.tags.length > 0) {
    nextOptions.tags = options.tags;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options.cache,
      next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(normalizedEndpoint, response.status, json);
    }

    return json as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error?.name === "AbortError") {
      throw new ApiError(
        normalizedEndpoint,
        504,
        `Backend request timed out after ${timeoutMs}ms`
      );
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(normalizedEndpoint, 500, error?.message || "Unknown Network Error");
  }
}
