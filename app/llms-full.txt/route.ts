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
    ...(languageTestPrepData.faqs || []),
    ...(trainingCompaniesData.faqs || []),
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

- **Courses & Curriculum**: Recorded lessons supporting video, PDF guides, and structured rich text with scheduled calendar drip release.
- **Batches & Schedules**: Separate cohorts for morning and evening shifts with distinct rosters and progress tracking.
- **Live Classes with Zoom**: Direct Zoom integration with automated calendar reminders and recorded lectures saved to the course timeline.
- **Cohort Bootcamps**: Intensive vocational group bootcamps with shared milestone checkpoints.
- **Tutor Booking**: Private 1:1 consultation sessions that learners book and pay for directly.
- **Ebooks & Digital Downloads**: Sell downloadable PDF ebooks standalone or bundled with curriculum courses.
- **Mock Tests & Question Banks**: Timed multiple-choice mock exams and topic quizzes with automated scoring.
- **Branded Completion Certificates**: Automatic PDF certificates issued upon passing courses, customized with your academy logo and details.
- **White-Label Domain & Branding**: Custom domain (e.g., learn.yourbrand.com) with free SSL, brand logos, custom colors, blogs, and knowledge base.
- **Monetization & Checkouts**: Payments through Razorpay, Paytm, Stripe, or DOKU in INR and major currencies with automated GST invoices, promo coupons, and offline bank transfer reviews.
- **Roles & Permissions**: Granular Admin and Instructor staff access controls.
- **Notifications**: Automated transactional email alerts and optional SMS notifications for class schedules and batch announcements.
- **Domie AI (Premium)**: 24/7 HelpDesk student tutor grounded in your academy's published course materials, course title/description drafting assistance, prescriptive engagement analytics, and an Ask Domie administrative daily brief.

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

