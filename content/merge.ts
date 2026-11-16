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


/**
 * FAQ answers: plain text with optional links written as [text](/path) or
 * [text](https://…). Everything else is escaped, so no HTML gets through.
 */
export function linkedAnswerHtml(text: string): string {
  const raw = String(text || "");
  // No link: return the text as is (the FAQ shows text without "<" as plain text)
  if (!/\[[^\]]+\]\((\/|https:\/\/)/.test(raw)) return raw.replace(/</g, "‹");
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return escaped.replace(
    /\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g,
    (_m, label: string, href: string) => `<a href="${href}" class="text-[#6C4BFF] underline underline-offset-2">${label}</a>`
  );
}
