// Deprecated: All backend communication is routed through lib/api/client.ts
// Kept for backward compatibility if dynamically imported.
import { getBackendBaseUrl } from "@/lib/api/client";

export const BACKEND_URL = getBackendBaseUrl();
