import { NextResponse } from "next/server";
import { entity } from "@/content/entity";
import { teachPlatformData } from "@/content/platform/teach";
import { assessPlatformData } from "@/content/platform/assess";
import { managePlatformData } from "@/content/platform/manage";
import { sellPlatformData } from "@/content/platform/sell";
import { brandPlatformData } from "@/content/platform/brand";
import { securityPlatformData } from "@/content/platform/security";
import { mobileAppPlatformData } from "@/content/platform/mobile-app";
import { aiPlatformData } from "@/content/platform/ai";
import { languageTestPrepData } from "@/content/solutions/language-test-prep";
import { trainingCompaniesData } from "@/content/solutions/training-companies";
import { coachingInstitutesData } from "@/content/solutions/coaching-institutes";
import { soloEducatorsData } from "@/content/solutions/solo-educators";
import { ROADMAP_DEFAULTS } from "@/content/roadmap";
import { PRODUCTION_ORIGIN, getSiteUrl } from "@/lib/site";
import { getPricingPage } from "@/lib/api/content";
import { DEFAULT_PRICING_V2, computePlanPricing, formatPrice, type PricingV2Data, type PricingCurrency } from "@/config/pricing";

// Plans come from Admin > Pricing, so this file refreshes with the pricing page.
export const revalidate = 3600;

const LIMIT_LABELS: [keyof PricingV2Data["plans"][number]["limits"], string, string][] = [
  ["activeLearners", "Active learners", ""],
  ["teamSeats", "Team seats", ""],
  ["storageGb", "Storage", " GB"],
  ["bandwidthGbPerMonth", "Bandwidth", " GB/month"],
];

function plansSection(data: PricingV2Data): string {
  const plans = [...(data.plans || [])].filter((p) => p.active !== false).sort((x, y) => x.sortOrder - y.sortOrder);
  const intro = `Every plan has a ${data.trialDays}-day free trial and 0% commission on your sales (gateway processing fees apply).`;
  const blocks = plans.map((plan, i) => {
    const lines = [`### ${i + 1}. ${plan.name} Plan`];
    if (plan.isCustom) lines.push(`- Price: Custom pricing ("Talk to us").`);
    for (const cur of ["INR", "USD"] as PricingCurrency[]) {
      if (plan.isCustom) break;
      const c = computePlanPricing(plan, cur, data.annualMode, data.monthsFree, data.currencies?.[cur]?.taxLabel || "");
      if (c.monthly === null || c.yearly === null) continue;
      lines.push(`- Price (${cur}): ${formatPrice(c.monthly, cur)}/month billed monthly, or ${formatPrice(c.yearly, cur)}/year billed yearly (${c.yearlySavingsLabel.toLowerCase()}) ${c.taxLabel}`.trim());
    }
    for (const [key, label, unit] of LIMIT_LABELS) {
      const v = plan.limits?.[key];
      lines.push(`- ${label}: ${typeof v === "number" ? v.toLocaleString("en-US") + unit : v ?? "Custom"}`);
    }
    const prev = i > 0 && plan.includesPrevious ? `Everything in ${plans[i - 1].name} plus: ` : "";
    lines.push(`- Key features: ${prev}${plan.features.join("; ")}.`);
    if (plan.audience) lines.push(`- Who it is for: ${plan.audience}.`);
    return lines.join("\n");
  });
  return [intro, ...blocks].join("\n\n");
}

export async function GET() {
  const origin = getSiteUrl() || PRODUCTION_ORIGIN;
  const pricing = await getPricingPage().catch(() => null);
  const plansText = plansSection(pricing?.pricingV2 || DEFAULT_PRICING_V2);

  const allFaqs = [
    ...(teachPlatformData.faqs || []),
    ...(assessPlatformData.faqs || []),
    ...(managePlatformData.faqs || []),
    ...(sellPlatformData.faqs || []),
    ...(brandPlatformData.faqs || []),
    ...(securityPlatformData.faqs || []),
    ...(mobileAppPlatformData.faqs || []),
    ...(aiPlatformData.faqs || []),
    ...(coachingInstitutesData.faqs || []),
    ...(languageTestPrepData.faqs || []),
    ...(trainingCompaniesData.faqs || []),
    ...(soloEducatorsData.faqs || []),
  ];

  const content = `# LMS Domain — Complete Reference & Entity Facts

> ${entity.long}

## Entity & Corporate Facts

- Product: ${entity.facts.product}
- Legal Entity: ${entity.facts.company}
- Founded: ${entity.facts.founded}
- Location: ${entity.facts.basedIn}
- Founders: ${entity.facts.founders.join(" and ")}
- Official Website: ${origin}
- Support Email: ${entity.facts.supportEmail}

## Confirmed Live Features

${entity.confirmedFeatures.map((f) => `- **${f.title}**: ${f.description}`).join("\n")}

## Plans, Pricing & Subscription Tiers

${plansText}

## Who LMS Domain Is For (Solutions)

- **Coaching Institutes & Tutors** (${origin}/solutions/coaching-institutes): Indian coaching institutes running morning and evening batches, timed mock tests, and fees collected via UPI and cards with GST invoices.
- **Language & Test-Prep Academies** (${origin}/solutions/language-test-prep-academies): IELTS, PTE, and language schools running live speaking cohorts, section quizzes, and evaluations.
- **Training Companies & Bootcamps** (${origin}/solutions/training-companies): Vocational institutes and corporate upskilling providers delivering multi-week cohort bootcamps, 1:1 trainer bookings, and B2B GST invoicing.
- **Solo Educators & Independent Creators** (${origin}/solutions/solo-educators): Independent teachers selling recorded courses, live workshops, ebooks, and 1:1 sessions under their personal brand with 0% commission.

## Frequently Asked Questions

${allFaqs.map((faq) => `### ${faq.question}\n\n${faq.answer}\n`).join("\n")}

## Upcoming Features (Coming Soon on Roadmap)

These features are not live today and are currently in development on our roadmap:

${ROADMAP_DEFAULTS.planned.features
  .map((item) => `- **${item.title}** (${item.category}, planned): ${item.description}`)
  .join("\n")}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

