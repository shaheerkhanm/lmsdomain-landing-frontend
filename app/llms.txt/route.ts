import { NextResponse } from "next/server";
import { entity } from "@/content/entity";
import { PRODUCTION_ORIGIN, getSiteUrl } from "@/lib/site";
import { getPricingPage } from "@/lib/api/content";
import { DEFAULT_PRICING_V2, computePlanPricing, formatPrice, type PricingV2Data } from "@/config/pricing";

// Plans come from the pricing page (Admin > Pricing or the central plans API); refreshed hourly.
export const revalidate = 3600;

function shortPlans(data: PricingV2Data): string {
  const plans = [...(data.plans || [])].filter((p) => p.active !== false).sort((x, y) => x.sortOrder - y.sortOrder);
  const lines = plans.map((plan) => {
    const learners = plan.limits?.activeLearners;
    const seats = plan.limits?.teamSeats;
    if (plan.isCustom) return `- **${plan.name} Plan**: Custom pricing. ${plan.audience ? plan.audience + "." : ""}`.trim();
    const inr = computePlanPricing(plan, "INR", data.annualMode, data.monthsFree, data.currencies?.INR?.taxLabel || "");
    const usd = computePlanPricing(plan, "USD", data.annualMode, data.monthsFree, data.currencies?.USD?.taxLabel || "");
    const price = inr.monthly !== null ? `${formatPrice(inr.monthly, "INR")}/month${usd.monthly !== null ? ` (${formatPrice(usd.monthly, "USD")}/month)` : ""} billed monthly` : "";
    const yearly = inr.yearly !== null ? `, or ${formatPrice(inr.yearly, "INR")}/year${usd.yearly !== null ? ` (${formatPrice(usd.yearly, "USD")}/year)` : ""} billed yearly (${inr.yearlySavingsLabel.toLowerCase()})` : "";
    const lim = [typeof learners === "number" ? `${learners.toLocaleString("en-US")} active learners` : "", typeof seats === "number" ? `${seats} team seats` : ""].filter(Boolean).join(", ");
    return `- **${plan.name} Plan**: ${price}${yearly}.${plan.audience ? ` For ${plan.audience.charAt(0).toLowerCase() + plan.audience.slice(1)}.` : ""}${lim ? ` Includes ${lim}.` : ""}`;
  });
  return [`All plans come with a ${data.trialDays}-day free trial and 0% commission on your sales (gateway processing fees apply). Your own domain with SSL is included from Growth; Starter runs on a free LMS Domain subdomain.`, "", ...lines].join("\n");
}

export async function GET() {
  const origin = getSiteUrl() || PRODUCTION_ORIGIN;
  const pricing = await getPricingPage().catch(() => null);
  const plansSummary = shortPlans(pricing?.pricingV2 || DEFAULT_PRICING_V2);

  const content = `# LMS Domain

> ${entity.short}

## Product

- [Teach](${origin}/platform/teach): Teach recorded video lessons with drip release, run live classes, Google Meet or Teams, and schedule cohort bootcamps.
- [Assess](${origin}/platform/assess): Evaluate learners with timed mock tests from question banks and issue branded PDF completion certificates.
- [Manage](${origin}/platform/manage): Manage batch rosters, track live class attendance, assign staff roles, and send automated notifications.
- [Sell](${origin}/platform/sell): Collect tuition fees online via Razorpay, Paytm, Stripe, or DOKU with automated GST invoices and coupon codes.
- [Brand](${origin}/platform/brand): White-label learning portal on your custom domain with free SSL, logo, color, and font customization, blogs, and downloadable ebooks.
- [Security](${origin}/platform/security): Protect courses with dynamic video watermarks, student device sign-in limits, and role-based permissions.
- [Mobile apps](${origin}/platform/mobile-app): The LMS Domain app for Android and iOS on every plan, and your own branded app in Google Play and the App Store on Pro and Enterprise.
- [Domie AI](${origin}/platform/ai): Course-grounded AI HelpDesk student tutor, metadata drafting, and daily admin operational brief on the Pro plan.

## Pricing & Plans

${plansSummary}
- [View Full Pricing Table](${origin}/pricing): Detailed comparison of all features and limits.

## Solutions (Who It Is For)

- [Coaching Institutes](${origin}/solutions/coaching-institutes): Built for coaching institutes, competitive exam centers, and batch tuition academies.
- [Language & Test-Prep Academies](${origin}/solutions/language-test-prep-academies): Built for IELTS, PTE, and language academies teaching scheduled morning and evening batches.
- [Training Companies](${origin}/solutions/training-companies): Deliver professional vocational bootcamps, client batches, and 1:1 tutor bookings.
- [Solo Educators & Creators](${origin}/solutions/solo-educators): Sell recorded courses, live cohort workshops, ebooks, and paid 1:1 consultations.

## Custom Deployment

- [Custom LMS Development](${origin}/custom-lms): Full custom academy deployment with content migration, staff training, and dedicated engineering support.

## Company & Contact

- [About Us](${origin}/about): Built by Techiegram in India. Founded in 2024 by Shaheer Khan and Anoop Sha.
- [Contact Us](${origin}/contact): Book a 20-minute live demo or reach our support team at ${entity.facts.supportEmail}.
- [Product Roadmap](${origin}/roadmap): Transparent overview of upcoming features currently in development.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

