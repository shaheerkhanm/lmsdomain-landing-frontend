// ============================================================================
// config/pricing.ts
// Pricing v2 fallback configuration and calculation helpers.
// NOTE: Admin / backend is the source of truth. This file holds seed fallback
// values so that the site never renders empty when the backend is unreachable
// (e.g. during build / docker run).
// ============================================================================

export interface PlanLimits {
  activeLearners: number | "Custom";
  teamSeats: number | "Custom";
  storageGb: number | "Custom";
  bandwidthGbPerMonth: number | "Custom";
}

export interface PlanPriceMonthly {
  INR: number | null;
  USD: number | null;
}

export interface PricingPlanV2 {
  slug: string;
  name: string;
  tagline: string;
  audience: string;
  priceMonthly: PlanPriceMonthly;
  annualDiscountPercent: number;
  limits: PlanLimits;
  features: string[];
  includesPrevious: boolean;
  isPopular: boolean;
  isCustom: boolean;
  sortOrder: number;
  active: boolean;
}

export interface ComparisonRowV2 {
  group: string;
  label: string;
  values: Record<string, boolean | string>;
}

export interface PricingV2Currencies {
  INR: { taxLabel: string };
  USD: { taxLabel: string };
}

export type PricingCurrency = "INR" | "USD";

export interface PricingV2Data {
  annualMode: "monthsFree" | "percent";
  monthsFree: number;
  trialDays: number;
  currencies: PricingV2Currencies;
  plans: PricingPlanV2[];
  comparison: ComparisonRowV2[];
}

export const PRICING_V2_SLUG = "pricing-v2";

/**
 * Fallback values matching backend scripts/insert-pricing-v2.js.
 * Admin is the source of truth.
 */
export const DEFAULT_PRICING_V2: PricingV2Data = {
  annualMode: "monthsFree",
  monthsFree: 2,
  trialDays: 15,
  currencies: {
    INR: { taxLabel: "+ GST" },
    USD: { taxLabel: "+ applicable taxes" },
  },
  plans: [
    {
      slug: "starter",
      name: "Starter",
      tagline: "Launch your academy on your own domain.",
      audience: "Solo educators and new academies",
      priceMonthly: { INR: 3999, USD: 49 },
      annualDiscountPercent: 15,
      limits: {
        activeLearners: 500,
        teamSeats: 3,
        storageGb: 100,
        bandwidthGbPerMonth: 250,
      },
      features: [
        "Your own domain with SSL",
        "0% commission on your sales",
        "Courses, batches and drip release",
        "Zoom live classes",
        "Tests, question banks and certificates",
        "Razorpay, Paytm, Stripe and DOKU checkout",
        "Coupons and GST invoices",
        "Email notifications",
        "Blog and ebooks",
        "Data export",
      ],
      includesPrevious: false,
      isPopular: false,
      isCustom: false,
      sortOrder: 1,
      active: true,
    },
    {
      slug: "growth",
      name: "Growth",
      tagline: "Run live batches and grow your academy.",
      audience: "Coaching institutes running several batches",
      priceMonthly: { INR: 7999, USD: 99 },
      annualDiscountPercent: 20,
      limits: {
        activeLearners: 2000,
        teamSeats: 10,
        storageGb: 300,
        bandwidthGbPerMonth: 1000,
      },
      features: [
        "1:1 Tutor Booking",
        "Bootcamps",
        "SMS notifications",
        "Offline payment approval",
        "B2B GST invoices",
        "Custom fonts and advanced branding",
        "Knowledge Base",
        "Video watermarking",
      ],
      includesPrevious: true,
      isPopular: true,
      isCustom: false,
      sortOrder: 2,
      active: true,
    },
    {
      slug: "pro",
      name: "Pro",
      tagline: "AI and advanced controls for larger academies.",
      audience: "Larger academies and training companies",
      priceMonthly: { INR: 14999, USD: 199 },
      annualDiscountPercent: 20,
      limits: {
        activeLearners: 5000,
        teamSeats: 25,
        storageGb: 1000,
        bandwidthGbPerMonth: 3000,
      },
      features: [
        "Domie AI (fair-use limit)",
        "Learner device limits",
        "Custom roles and permissions",
        "Remove \"Powered by LMS Domain\"",
        "Priority support",
      ],
      includesPrevious: true,
      isPopular: false,
      isCustom: false,
      sortOrder: 3,
      active: true,
    },
    {
      slug: "enterprise",
      name: "Enterprise",
      tagline: "For multi-branch institutes and custom needs.",
      audience: "Multi-branch institutes",
      priceMonthly: { INR: null, USD: null },
      annualDiscountPercent: 0,
      limits: {
        activeLearners: "Custom",
        teamSeats: "Custom",
        storageGb: "Custom",
        bandwidthGbPerMonth: "Custom",
      },
      features: [
        "Multiple academies or branches",
        "Custom features",
        "Uptime SLA",
        "Free migration",
        "Dedicated account manager",
      ],
      includesPrevious: true,
      isPopular: false,
      isCustom: true,
      sortOrder: 4,
      active: true,
    },
  ],
  comparison: [
    // Group: Limits & quotas
    {
      group: "Limits & quotas",
      label: "Active learners",
      values: { starter: "Up to 500", growth: "Up to 2,000", pro: "Up to 5,000", enterprise: "Custom" },
    },
    {
      group: "Limits & quotas",
      label: "Admin & teacher seats",
      values: { starter: "3 seats", growth: "10 seats", pro: "25 seats", enterprise: "Custom" },
    },
    {
      group: "Limits & quotas",
      label: "Video & file storage",
      values: { starter: "100 GB", growth: "300 GB", pro: "1,000 GB (1 TB)", enterprise: "Custom" },
    },
    {
      group: "Limits & quotas",
      label: "Bandwidth per month",
      values: { starter: "250 GB", growth: "1,000 GB", pro: "3,000 GB", enterprise: "Custom" },
    },
    // Group: Website & brand
    {
      group: "Website & brand",
      label: "Custom domain with free SSL",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Website & brand",
      label: "Custom fonts & advanced branding",
      values: { starter: false, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Website & brand",
      label: "Remove 'Powered by LMS Domain'",
      values: { starter: false, growth: false, pro: true, enterprise: true },
    },
    {
      group: "Website & brand",
      label: "Multiple academies or branches",
      values: { starter: false, growth: false, pro: false, enterprise: true },
    },
    // Group: Teaching
    {
      group: "Teaching",
      label: "Courses, batches & drip schedule",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Teaching",
      label: "Zoom live classes",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Teaching",
      label: "1:1 Tutor booking",
      values: { starter: false, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Teaching",
      label: "Bootcamps",
      values: { starter: false, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Teaching",
      label: "Knowledge Base",
      values: { starter: false, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Teaching",
      label: "Video watermarking",
      values: { starter: false, growth: true, pro: true, enterprise: true },
    },
    // Group: Tests & certificates
    {
      group: "Tests & certificates",
      label: "Timed tests & question banks",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Tests & certificates",
      label: "Automated certificates",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    // Group: Selling
    {
      group: "Selling",
      label: "0% commission on course sales",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Selling",
      label: "Razorpay, Paytm, Stripe & DOKU checkout",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Selling",
      label: "Discount coupons",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Selling",
      label: "GST invoices (B2C & B2B)",
      values: { starter: "B2C only", growth: "B2C & B2B", pro: "B2C & B2B", enterprise: "B2C & B2B" },
    },
    {
      group: "Selling",
      label: "Offline payment approval",
      values: { starter: false, growth: true, pro: true, enterprise: true },
    },
    // Group: Team & control
    {
      group: "Team & control",
      label: "Custom roles & permissions",
      values: { starter: false, growth: false, pro: true, enterprise: true },
    },
    {
      group: "Team & control",
      label: "Learner concurrent device limits",
      values: { starter: false, growth: false, pro: true, enterprise: true },
    },
    {
      group: "Team & control",
      label: "Data export",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    // Group: AI
    {
      group: "AI",
      label: "Domie AI teaching & assistant suite",
      values: { starter: false, growth: false, pro: "Fair-use limit", enterprise: "High-volume / Custom" },
    },
    // Group: Support
    {
      group: "Support",
      label: "Email notifications",
      values: { starter: true, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Support",
      label: "SMS notifications",
      values: { starter: false, growth: true, pro: true, enterprise: true },
    },
    {
      group: "Support",
      label: "Support level",
      values: { starter: "Standard email", growth: "Standard email", pro: "Priority email & chat", enterprise: "Dedicated account manager & SLA" },
    },
    {
      group: "Support",
      label: "Free migration service",
      values: { starter: false, growth: false, pro: false, enterprise: true },
    },
    {
      group: "Support",
      label: "Uptime SLA",
      values: { starter: false, growth: false, pro: false, enterprise: "99.9% SLA" },
    },
  ],
};

/**
 * Format currency amounts:
 * - INR uses Indian number grouping (e.g. ₹1,49,990)
 * - USD uses standard commas (e.g. $1,990)
 */
export function formatPrice(amount: number, currency: PricingCurrency): string {
  if (currency === "INR") {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return `$${amount.toLocaleString("en-US")}`;
}

export interface ComputedPlanPricing {
  monthly: number | null;
  yearly: number | null;
  perMonthEquivalent: number | null;
  yearlySavingsLabel: string;
  taxLabel: string;
}

/**
 * Compute yearly pricing according to Admin settings:
 * - annualMode "monthsFree": monthly × (12 − monthsFree), label "{monthsFree} months free"
 * - annualMode "percent": monthly × 12 × (1 − annualDiscountPercent/100)
 *   rounded to nearest 10 (INR) or whole dollar (USD), label "Save N%"
 * Also computes per-month equivalent ("₹3,333/mo billed yearly").
 */
export function computePlanPricing(
  plan: PricingPlanV2,
  currency: PricingCurrency,
  annualMode: "monthsFree" | "percent",
  monthsFree: number,
  taxLabel: string
): ComputedPlanPricing {
  const monthly = plan.priceMonthly?.[currency] ?? null;

  if (monthly === null) {
    return {
      monthly: null,
      yearly: null,
      perMonthEquivalent: null,
      yearlySavingsLabel: "",
      taxLabel,
    };
  }

  let yearly: number;
  let yearlySavingsLabel: string;

  if (annualMode === "percent") {
    const discount = plan.annualDiscountPercent || 0;
    const rawYearly = monthly * 12 * (1 - discount / 100);
    if (currency === "INR") {
      yearly = Math.round(rawYearly / 10) * 10;
    } else {
      yearly = Math.round(rawYearly);
    }
    yearlySavingsLabel = `Save ${discount}%`;
  } else {
    const freeMonths = typeof monthsFree === "number" ? monthsFree : 2;
    yearly = monthly * (12 - freeMonths);
    yearlySavingsLabel = `${freeMonths} months free`;
  }

  const perMonthEquivalent = Math.round(yearly / 12);

  return {
    monthly,
    yearly,
    perMonthEquivalent,
    yearlySavingsLabel,
    taxLabel,
  };
}
