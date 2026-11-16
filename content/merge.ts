// Admin-editable page sections: the admin's `data` over the built-in defaults.
/** Filled-in text wins, non-empty lists replace; anything else keeps the default. */
export function mergeSection<T extends Record<string, unknown>>(base: T, admin: unknown): T {
  if (!admin || typeof admin !== "object" || Array.isArray(admin)) return base;
  const out: Record<string, unknown> = { ...base };
  for (const [key, def] of Object.entries(base)) {
    const v = (admin as Record<string, unknown>)[key];
    if (Array.isArray(def)) {
      if (Array.isArray(v) && v.length) out[key] = v;
    } else if (typeof def === "string") {
      if (typeof v === "string" && v.trim()) out[key] = v.trim();
    }
  }
  return out as T;
}

