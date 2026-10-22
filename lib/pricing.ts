// ============================================================================
// Price formatting (shared by server mapping and client cards)
// Currency is resolved per plan on the server (see resolvePlanCurrency in
// lib/api/content.ts); this file only formats an amount in that currency.
// ============================================================================

import type { PlanCurrency } from "@/types/content";

export const DEFAULT_PRICING_CURRENCY = "INR";

// Valid ISO 4217 code that Intl can format, upper-cased; otherwise undefined.
export function normalizeCurrencyCode(code: unknown): string | undefined {
  if (typeof code !== "string") return undefined;
  const upper = code.trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(upper)) return undefined;
  try {
    new Intl.NumberFormat("en", { style: "currency", currency: upper });
    return upper;
  } catch {
    return undefined;
  }
}

// Indian grouping (₹1,23,456) for INR, US grouping otherwise, unless a locale is given.
export function localeForCurrency(code: string, locale?: string): string {
  if (locale) {
    try {
      new Intl.NumberFormat(locale);
      return locale;
    } catch {
      // fall through to the default for this currency
    }
  }
  return code === "INR" ? "en-IN" : "en-US";
}

// e.g. 3699 INR → [{currency "₹"}, {integer "3"}, {group ","}, {integer "699"}]
export function formatPriceParts(amount: number, currency: PlanCurrency): Intl.NumberFormatPart[] {
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).formatToParts(amount);
}
