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
    "LMS Domain is a white-label learning management system for academies, coaching institutes and training businesses in India. Run scheduled batches, live Zoom classes, recorded lessons with drip release, mock tests, and 1:1 tutor bookings. Collect payments in INR with zero commission, generate regular and B2B GST invoices, and issue branded completion certificates under your own domain.",
  long:
    "LMS Domain is a white-label learning management system built for academies, coaching institutes, language schools, and training businesses in India. Deliver structured courses with drip release, conduct live classes via Zoom with recordings saved directly to courses, organize bootcamps, and let learners book 1:1 tutor sessions with trainers. Evaluate progress using subject question banks and timed mock tests, and award branded PDF completion certificates. Operate under your own custom domain with dedicated branding, custom fonts, colors, blogs, and knowledge base. Export student, attendance, and course data anytime to CSV. Collect course fees seamlessly through Razorpay, Paytm, Stripe, or DOKU in INR and major currencies with zero platform commission, regular and B2B GST invoices, discount coupons, and offline payment approvals. Powered by Domie AI on Premium for course-grounded learner support—without training external models—metadata drafting, analytics, and administrative daily briefs.",
  confirmedFeatures: [
    {
      title: "Courses & Curriculum",
      description:
        "Recorded lessons supporting video, PDF guides, and structured rich text with scheduled calendar drip release.",
    },
    {
      title: "Batches & Schedules",
      description:
        "Separate cohorts for morning and evening shifts with distinct rosters and progress tracking.",
    },
    {
      title: "Live Classes with Zoom",
      description:
        "Direct Zoom integration with automated calendar reminders and recorded lectures saved to the course timeline.",
    },
    {
      title: "Cohort Bootcamps",
      description:
        "Intensive multi-week group bootcamps with shared milestone checkpoints.",
    },
    {
      title: "Tutor Booking",
      description:
        "Private 1:1 sessions learners book and pay for directly based on trainer calendar availability.",
    },
    {
      title: "Ebooks & Digital Downloads",
      description:
        "Sell downloadable PDF ebooks standalone or bundled with curriculum courses.",
    },
    {
      title: "Mock Tests & Question Banks",
      description:
        "Timed multiple-choice mock exams and topic quizzes with automated scoring from custom question banks.",
    },
    {
      title: "Branded Completion Certificates",
      description:
        "Automatic PDF certificates issued upon passing courses, customized with your academy logo and passing criteria.",
    },
    {
      title: "White-Label Domain & Branding",
      description:
        "Custom domain (e.g. learn.yourbrand.com) with free SSL, brand logos, custom colors, custom fonts, blogs, and knowledge base.",
    },
    {
      title: "Zero Commission & Monetization",
      description:
        "Zero platform commission on course sales (gateway processing fees apply); collect payments via Razorpay, Paytm, Stripe, or DOKU in INR and major currencies with promo coupons, offline payment approvals, regular GST invoices, and separate B2B GST invoices.",
    },
    {
      title: "Data Ownership & Export",
      description:
        "Export student directories, live class attendance logs, test scores, and transaction reports at any time in standard CSV format.",
    },
    {
      title: "Roles & Permissions",
      description:
        "Granular Admin and Instructor staff access controls.",
    },
    {
      title: "Notifications",
      description:
        "Automated transactional email alerts and optional SMS notifications for class schedules and batch announcements.",
    },
    {
      title: "Domie AI (Premium)",
      description:
        "HelpDesk student tutor grounded in your academy's published course materials without training external AI models, course title and description drafting assistance, analytics, and an Ask Domie administrative daily brief.",
    },
  ],
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

