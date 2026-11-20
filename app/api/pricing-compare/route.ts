import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { loadAdminPricingV2 } from "@/lib/api/content";
import { applyCentralPlans, loadCentralPlans } from "@/lib/api/central-plans";
import { computePlanPricing, type PricingCurrency, type PricingV2Data } from "@/config/pricing";

/*
 * Admin > Pricing > "Compare with API": the plans as visitors would see them from Admin > Pricing
 * and from the central plans API, side by side. Called server to server by the admin with the
 * shared CMS_REVALIDATE_SECRET; changes nothing. The API is read fresh (no 5-minute cache).
 */
export const dynamic = "force-dynamic";

function secretMatches(provided: unknown, expected: string): boolean {
  if (typeof provided !== "string") return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

type Shown = {
  name: string;
  active: boolean;
  order: number;
  custom: boolean;
  prices: Record<PricingCurrency, { monthly: number | null; yearly: number | null; label: string }>;
  limits: { learners: number | "Custom"; seats: number | "Custom"; storageGb: number | "Custom"; bandwidthGb: number | "Custom" };
};

function shown(data: PricingV2Data): { trialDays: number; tax: Record<PricingCurrency, string>; plans: Record<string, Shown> } {
  const plans: Record<string, Shown> = {};
  for (const p of data.plans) {
    const price = (cur: PricingCurrency) => {
      const c = computePlanPricing(p, cur, data.annualMode, data.monthsFree, data.currencies?.[cur]?.taxLabel || "");
      return { monthly: p.isCustom ? null : c.monthly, yearly: p.isCustom ? null : c.yearly, label: p.isCustom ? "" : c.yearlySavingsLabel };
    };
    plans[p.slug] = {
      name: p.name,
      active: p.active !== false,
      order: p.sortOrder,
      custom: Boolean(p.isCustom),
      prices: { INR: price("INR"), USD: price("USD") },
      limits: { learners: p.limits.activeLearners, seats: p.limits.teamSeats, storageGb: p.limits.storageGb, bandwidthGb: p.limits.bandwidthGbPerMonth },
    };
  }
  return { trialDays: data.trialDays, tax: { INR: data.currencies.INR.taxLabel, USD: data.currencies.USD.taxLabel }, plans };
}

export async function POST(request: Request) {
  const expected = process.env.CMS_REVALIDATE_SECRET;
  if (!expected) return NextResponse.json({ message: "Not configured" }, { status: 503 });
  let body: { secret?: unknown } = {};
  try {
    body = await request.json();
  } catch {}
  if (!secretMatches(body.secret, expected)) return NextResponse.json({ message: "Invalid secret" }, { status: 401 });

  const [admin, central] = await Promise.all([loadAdminPricingV2(), loadCentralPlans(true)]);
  const apiIds = (central.data?.plans || []).map((p) => String(p.id).toLowerCase());
  const adminIds = admin.plans.map((p) => p.slug.toLowerCase());
  return NextResponse.json(
    {
      checkedAt: new Date().toISOString(),
      admin: shown(admin),
      api: central.data ? shown(applyCentralPlans(admin, central.data)) : null,
      apiProblem: central.problem || null,
      apiUpdatedAt: central.data?.updated_at || null,
      onlyInApi: apiIds.filter((id) => !adminIds.includes(id)),
      onlyInAdmin: central.data ? adminIds.filter((id) => !apiIds.includes(id)) : [],
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
