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

## Plans, Pricing & Subscription Tiers (Phase 3)

All subscriptions include a 15-day free trial on any plan, 0% platform sales commission on course sales (gateways charge standard processing fees), custom domain with free SSL, automated GST and B2B GST invoices, and Zoom live classes.

### 1. Starter Plan
- Price (INR): ₹3,999/month (billed monthly) or ₹3,333/month / ₹39,990/year (billed yearly, 2 months free)
- Price (USD): $49/month (billed monthly) or $41/month / $490/year (billed yearly, 2 months free)
- Active Learners: 500
- Admin/Instructor Seats: 1
- Courses: Unlimited
- Key Features: Custom domain, recorded video lessons with drip release, Zoom live classes, Razorpay/Paytm/Stripe/DOKU checkout, automated GST receipts.
- Who it is for: Solo educators, creators, and new coaching academies launching their first online academy.

### 2. Growth Plan
- Price (INR): ₹7,999/month (billed monthly) or ₹6,666/month / ₹79,990/year (billed yearly, 2 months free)
- Price (USD): $99/month (billed monthly) or $82/month / $990/year (billed yearly, 2 months free)
- Active Learners: 2,000
- Admin/Instructor Seats: 5
- Courses: Unlimited
- Key Features: Everything in Starter plus timed mock tests and question banks, batch schedules and rosters, automated class attendance logs, branded PDF certificates.
- Who it is for: Growing test-prep institutes and tuition academies running multiple shifts and morning/evening batches.

### 3. Scale Plan
- Price (INR): ₹14,999/month (billed monthly) or ₹12,499/month / ₹149,990/year (billed yearly, 2 months free)
- Price (USD): $199/month (billed monthly) or $165/month / $1,990/year (billed yearly, 2 months free)
- Active Learners: 10,000
- Admin/Instructor Seats: 15
- Courses: Unlimited
- Key Features: Everything in Growth plus Domie AI course-grounded teaching assistant, course metadata drafting, custom brand colors and fonts, priority support.
- Who it is for: Established coaching institutes, professional academies, and training providers scaling large cohorts across India.

### 4. Enterprise Plan
- Price: Custom pricing based on volume and requirements.
- Active Learners: Unlimited
- Admin/Instructor Seats: Unlimited
- Key Features: Dedicated account manager, custom database setup, legacy LMS data migration, custom SLAs, and custom integration assistance.
- Who it is for: Large multi-branch coaching chains, universities, and enterprise corporate upskilling programs.

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

