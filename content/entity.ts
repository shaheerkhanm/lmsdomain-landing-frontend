/**
 * content/entity.ts
 *
 * Single source of truth for LMS Domain's entity definition, corporate facts,
 * and canonical product descriptions. Used across homepage meta descriptions,
 * About page introductions, footer blurbs, Organization JSON-LD, and llms.txt.
 */

export const entity = {
  oneLine:
    "LMS Domain is a white-label learning management system (LMS) for academies, coaching institutes and training businesses in India.",
  short:
    "LMS Domain is a white-label learning management system for academies, coaching institutes and training businesses in India. Run scheduled batches, live Zoom classes, recorded lessons with drip release, mock tests, and 1:1 tutor bookings. Collect payments in INR with GST invoices and issue branded completion certificates under your own domain.",
  long:
    "LMS Domain is a white-label learning management system built for academies, coaching institutes, language schools, and training businesses in India. Deliver structured courses with drip release, conduct live classes via Zoom with recordings saved directly to courses, organize bootcamps, and let learners book 1:1 tutor sessions. Evaluate progress using subject question banks and timed mock tests, and award branded PDF completion certificates. Operate under your own custom domain with dedicated branding, blogs, and knowledge base. Collect course fees seamlessly through Razorpay, Paytm, Stripe, or DOKU in INR and major currencies with automated GST invoices, discount coupons, and offline payment approvals. Powered by Domie AI on Premium for course-grounded learner support and administrative brief insights.",
  facts: {
    product: "LMS Domain",
    company: "Techiegram",
    legalName: "Techiegram",
    founded: 2024,
    foundingDate: "2024",
    basedIn: "Kozhikode (Calicut), Kerala, India",
    city: "Kozhikode (Calicut)",
    state: "Kerala",
    country: "India",
    countryCode: "IN",
    founders: ["Shaheer Khan", "Anoop Sha"],
    website: "https://lmsdomain.com",
    supportEmail: "support@lmsdomain.com",
    address: {
      streetAddress: "Techiegram, Hilite Business Park",
      addressLocality: "Kozhikode",
      addressRegion: "Kerala",
      postalCode: "673014",
      addressCountry: "IN",
    },
  },
} as const;

export type Entity = typeof entity;

