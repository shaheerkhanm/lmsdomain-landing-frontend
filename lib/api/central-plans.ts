// ============================================================================
// Central plans API (the LMS app's own plan list): prices, limits, trial and
// tax labels. Used when Admin > Pricing > "Pricing: Plans and prices source"
// is set to "api". Server only: the key never reaches the browser.
//   LMS_PLANS_API_URL  default https://lmsdomain.site/api/public/plans
//   LMS_PLANS_API_KEY  sent as "Authorization: Bearer <key>"
// The API's plans are matched to Admin > Pricing plans by id (= plan slug).
// Plan texts (tagline, who it's for, feature list, comparison table) stay in
// Admin > Pricing. Any failure falls back to the admin's pricing.
// ============================================================================

import type { PlanLimits, PricingV2Data } from "@/config/pricing";

type Money = { monthly?: number | null; yearly?: number | null } | null | undefined;
interface CentralPlan {
  id: string;
  name?: string;
  active?: boolean;
  sort_order?: number;
  is_custom?: boolean;
  prices?: { INR?: Money; USD?: Money } | null;
  limits?: Record<string, number | string> | null;
}
export interface CentralPlansResponse {
  version?: number;
  updated_at?: string;
  trial_days?: number;
  currencies?: { INR?: { tax_label?: string }; USD?: { tax_label?: string } };
  plans?: CentralPlan[];
}

const DEFAULT_URL = "https://lmsdomain.site/api/public/plans";

/** The API's response, or null (no key, error, timeout or bad shape). Cached for 5 minutes. */
export async function fetchCentralPlans(): Promise<CentralPlansResponse | null> {
  const key = (process.env.LMS_PLANS_API_KEY || "").trim();
  if (!key) return null;
  try {
    const res = await fetch(process.env.LMS_PLANS_API_URL || DEFAULT_URL, {
      headers: { Accept: "application/json", Authorization: `Bearer ${key}` },
      next: { revalidate: 300, tags: ["pricing", "central-plans"] },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as CentralPlansResponse;
    return Array.isArray(json?.plans) && json.plans.length ? json : null;
  } catch {
    return null;
  }
}

const num = (v: unknown): number | null => (typeof v === "number" && isFinite(v) && v >= 0 ? v : null);
const limit = (v: unknown, fallback: number | "Custom"): number | "Custom" =>
  typeof v === "number" && isFinite(v) ? v : typeof v === "string" && /custom/i.test(v) ? "Custom" : fallback;

/** Admin > Pricing with the API's prices, limits, order, trial and tax labels laid over it (by plan id). */
export function applyCentralPlans(base: PricingV2Data, api: CentralPlansResponse): PricingV2Data {
  const byId = new Map((api.plans || []).filter((p) => p && p.id).map((p) => [String(p.id).toLowerCase(), p]));
  const plans = base.plans.map((plan) => {
    const c = byId.get(plan.slug.toLowerCase());
    if (!c) return plan;
    const custom = c.is_custom === true || !c.prices;
    const inr = c.prices?.INR || null;
    const usd = c.prices?.USD || null;
    const limits: PlanLimits = {
      activeLearners: limit(c.limits?.active_learners, plan.limits.activeLearners),
      teamSeats: limit(c.limits?.team_seats, plan.limits.teamSeats),
      storageGb: limit(c.limits?.storage_gb, plan.limits.storageGb),
      bandwidthGbPerMonth: limit(c.limits?.bandwidth_gb_month, plan.limits.bandwidthGbPerMonth),
    };
    return {
      ...plan,
      name: (c.name || "").trim() || plan.name,
      active: c.active !== false,
      sortOrder: typeof c.sort_order === "number" ? c.sort_order : plan.sortOrder,
      isCustom: custom,
      priceMonthly: custom ? { INR: null, USD: null } : { INR: num(inr?.monthly), USD: num(usd?.monthly) },
      priceYearly: custom ? undefined : { INR: num(inr?.yearly), USD: num(usd?.yearly) },
      // Keeps "Save up to N%" labels in step with the exact yearly prices
      annualDiscountPercent:
        !custom && num(inr?.monthly) && num(inr?.yearly)
          ? Math.max(0, Math.round((1 - (inr!.yearly as number) / ((inr!.monthly as number) * 12)) * 100))
          : plan.annualDiscountPercent,
      limits,
    };
  });
  return {
    ...base,
    trialDays: typeof api.trial_days === "number" ? api.trial_days : base.trialDays,
    currencies: {
      INR: { taxLabel: api.currencies?.INR?.tax_label || base.currencies.INR.taxLabel },
      USD: { taxLabel: api.currencies?.USD?.tax_label || base.currencies.USD.taxLabel },
    },
    plans,
  };
}
