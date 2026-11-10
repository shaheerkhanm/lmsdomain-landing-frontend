import { NextResponse } from "next/server";
import { entity } from "@/content/entity";
import { teachPlatformData } from "@/content/platform/teach";
import { assessPlatformData } from "@/content/platform/assess";
import { managePlatformData } from "@/content/platform/manage";
import { sellPlatformData } from "@/content/platform/sell";
import { brandPlatformData } from "@/content/platform/brand";
import { securityPlatformData } from "@/content/platform/security";
import { aiPlatformData } from "@/content/platform/ai";
import { languageTestPrepData } from "@/content/solutions/language-test-prep";
import { trainingCompaniesData } from "@/content/solutions/training-companies";
import { coachingInstitutesData } from "@/content/solutions/coaching-institutes";
import { soloEducatorsData } from "@/content/solutions/solo-educators";
import { roadmapPageData } from "@/content/roadmap";
import { PRODUCTION_ORIGIN, getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const origin = getSiteUrl() || PRODUCTION_ORIGIN;

  const allFaqs = [
    ...(teachPlatformData.faqs || []),
    ...(assessPlatformData.faqs || []),
    ...(managePlatformData.faqs || []),
    ...(sellPlatformData.faqs || []),
    ...(brandPlatformData.faqs || []),
    ...(securityPlatformData.faqs || []),
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

All plans come with a 15-day free trial on any plan, 0% commission on your sales (gateway processing fees apply), custom domain with SSL, automated GST and B2B GST invoices, and Zoom live classes.

### 1. Starter Plan
- Price (INR): ₹3,999/month (billed monthly) or ₹3,333/month / ₹39,990/year (billed yearly, 2 months free)
- Price (USD): $49/month (billed monthly) or $41/month / $490/year (billed yearly, 2 months free)
- Active Learners: 500
- Team Seats: 3
- Storage: 100 GB
- Bandwidth: 250 GB/month
- Key Features: Your own domain with SSL, 0% commission on your sales, courses, batches and drip release, Zoom live classes, tests, question banks, certificates, Razorpay, Paytm, Stripe and DOKU checkout, coupons, GST invoices, email notifications, blog, ebooks, data export.
- Who it is for: Solo educators and new academies launching on their own domain.

### 2. Growth Plan
- Price (INR): ₹7,999/month (billed monthly) or ₹6,666/month / ₹79,990/year (billed yearly, 2 months free)
- Price (USD): $99/month (billed monthly) or $82/month / $990/year (billed yearly, 2 months free)
- Active Learners: 2,000
- Team Seats: 10
- Storage: 300 GB
- Bandwidth: 1,000 GB/month
- Key Features: Everything in Starter plus 1:1 tutor bookings, bootcamps, SMS notifications, offline payment approval, B2B GST invoices, custom fonts and advanced branding, knowledge base, video watermarking.
- Who it is for: Coaching institutes running several batches.

### 3. Pro Plan
- Price (INR): ₹14,999/month (billed monthly) or ₹12,499/month / ₹149,990/year (billed yearly, 2 months free)
- Price (USD): $199/month (billed monthly) or $165/month / $1,990/year (billed yearly, 2 months free)
- Active Learners: 5,000
- Team Seats: 25
- Storage: 1,000 GB
- Bandwidth: 3,000 GB/month
- Key Features: Everything in Growth plus Domie AI assistant (fair-use limit), learner device limits, custom roles and permissions, white-label (remove "Powered by LMS Domain"), priority support.
- Who it is for: Larger academies and training companies.

### 4. Enterprise Plan
- Price: Custom pricing ("Talk to us").
- Active Learners: Custom
- Team Seats: Custom
- Storage: Custom
- Bandwidth: Custom
- Key Features: Multiple academies or branches, custom features, uptime SLA, free migration, dedicated account manager.
- Who it is for: Multi-branch institutes and enterprise networks.

## Who LMS Domain Is For (Solutions)

- **Coaching Institutes & Tutors** (${origin}/solutions/coaching-institutes): Indian coaching institutes running morning and evening batches, timed mock tests, and fees collected via UPI and cards with GST invoices.
- **Language & Test-Prep Academies** (${origin}/solutions/language-test-prep-academies): IELTS, PTE, and language schools running live speaking cohorts, section quizzes, and evaluations.
- **Training Companies & Bootcamps** (${origin}/solutions/training-companies): Vocational institutes and corporate upskilling providers delivering multi-week cohort bootcamps, 1:1 trainer bookings, and B2B GST invoicing.
- **Solo Educators & Independent Creators** (${origin}/solutions/solo-educators): Independent teachers selling recorded courses, live workshops, ebooks, and 1:1 sessions under their personal brand with 0% commission.

## Frequently Asked Questions

${allFaqs.map((faq) => `### ${faq.question}\n\n${faq.answer}\n`).join("\n")}

## Upcoming Features (Coming Soon on Roadmap)

These features are not live today and are currently in development on our roadmap:

${roadmapPageData.items
  .map(
    (item) =>
      `- **${item.title}** (${item.category} — ${item.badge}): ${item.description}`
  )
  .join("\n")}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

