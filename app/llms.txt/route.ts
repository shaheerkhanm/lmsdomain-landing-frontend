import { NextResponse } from "next/server";
import { entity } from "@/content/entity";
import { PRODUCTION_ORIGIN, getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const origin = getSiteUrl() || PRODUCTION_ORIGIN;

  const content = `# LMS Domain

> ${entity.short}

## Product

- [Teach](${origin}/platform/teach): Teach recorded video lessons with drip release, run live Zoom classes, and schedule cohort bootcamps.
- [Assess](${origin}/platform/assess): Evaluate learners with timed mock tests from question banks and issue branded PDF completion certificates.
- [Manage](${origin}/platform/manage): Manage batch rosters, track live class attendance, assign staff roles, and send automated notifications.
- [Sell](${origin}/platform/sell): Collect tuition fees online via Razorpay, Paytm, Stripe, or DOKU with automated GST invoices and coupon codes.
- [Brand](${origin}/platform/brand): White-label learning portal on your custom domain with free SSL, logo, color, and font customization, blogs, and downloadable ebooks.
- [Security](${origin}/platform/security): Protect courses with dynamic video watermarks, student device sign-in limits, and role-based permissions.
- [Domie AI](${origin}/platform/ai): Course-grounded AI HelpDesk student tutor, metadata drafting, and daily admin operational brief on the Pro plan.

## Pricing & Plans (Phase 3)

All plans come with a 15-day free trial, 0% platform sales commission (you keep 100% of course earnings; standard payment gateway fees apply), custom domain, and automated GST invoices.

- **Starter Plan**: ₹3,999/month ($49/month) billed monthly, or ₹3,333/month ($41/month) billed yearly (2 months free). For solo educators and new academies launching on their own domain. Includes 500 active learners, 1 instructor seat, unlimited courses, and Zoom live classes.
- **Growth Plan**: ₹7,999/month ($99/month) billed monthly, or ₹6,666/month ($82/month) billed yearly (2 months free). For growing academies running multiple batches. Includes 2,000 active learners, 5 instructor seats, mock tests, and batch scheduling.
- **Scale Plan**: ₹14,999/month ($199/month) billed monthly, or ₹12,499/month ($165/month) billed yearly (2 months free). For established institutes. Includes 10,000 active learners, 15 instructor seats, and Domie AI teaching assistant.
- **Enterprise Plan**: Custom pricing. For large education organizations requiring custom learner limits, dedicated database, and tailored migration services.
- [View Full Pricing Table](${origin}/pricing): Detailed comparison of all features and limits.

## Solutions (Who It Is For)

- [Coaching Institutes](${origin}/solutions/coaching-institutes): Built for coaching institutes, competitive exam centers, and batch tuition academies.
- [Language & Test-Prep Academies](${origin}/solutions/language-test-prep-academies): Built for IELTS, PTE, and language academies teaching scheduled morning and evening batches.
- [Training Companies](${origin}/solutions/training-companies): Deliver professional vocational bootcamps, client batches, and 1:1 tutor bookings.
- [Solo Educators & Creators](${origin}/solutions/solo-educators): Sell recorded courses, live cohort workshops, ebooks, and paid 1:1 consultations.

## Custom Deployment

- [Custom LMS Development](${origin}/custom-lms): Full custom academy deployment with content migration, staff training, and dedicated engineering support.

## Company & Contact

- [About Us](${origin}/about): Built by Techiegram, based in Kozhikode, Kerala, India. Founded in 2024 by Shaheer Khan and Anoop Sha.
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

