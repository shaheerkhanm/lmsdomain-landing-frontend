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
- [Domie AI](${origin}/platform/ai): Course-grounded AI HelpDesk student tutor, metadata drafting, and daily admin operational brief on the Premium plan.

## Solutions

- [Coaching Institutes](${origin}/solutions/coaching-institutes): Built for coaching institutes, competitive exam centers, and batch tuition academies.
- [Language & Test-Prep Academies](${origin}/solutions/language-test-prep-academies): Built for IELTS, PTE, and language academies teaching scheduled morning and evening batches.
- [Training Companies](${origin}/solutions/training-companies): Deliver professional vocational bootcamps, client batches, and 1:1 tutor bookings.
- [Solo Educators & Creators](${origin}/solutions/solo-educators): Sell recorded courses, live cohort workshops, ebooks, and paid 1:1 consultations.

## Plans & Deployment

- [Pricing & Plans](${origin}/pricing): Predictable monthly and annual subscriptions with your own custom domain and zero platform commission on sales.
- [Custom LMS](${origin}/custom-lms): Full custom academy deployment with content migration, staff training, and dedicated engineering support.

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

