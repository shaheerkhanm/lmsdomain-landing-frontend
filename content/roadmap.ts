// ============================================================================
// Roadmap page content (built-in defaults).
// Editable in Admin > Website > Roadmap: one CMS entry per section, the section
// object in `data` (slugs in ROADMAP_SLUGS). The admin's values win; a missing,
// inactive or empty entry falls back to the text below.
// ============================================================================

import { mergeSection, linkedAnswerHtml } from "./merge";

export interface RoadmapFeature {
  title: string;
  category: string;
  /** Name of a group in `groups`; anything else is listed under "More". */
  group: string;
  description: string;
}

export interface RoadmapContent {
  hero: { title: string; titleMuted: string; subtitle: string; note: string };
  planned: {
    eyebrow: string;
    title: string;
    titleMuted: string;
    groups: { name: string; subtitle: string }[];
    features: RoadmapFeature[];
    footnote: string;
  };
  process: {
    eyebrow: string;
    title: string;
    titleMuted: string;
    text: string;
    proof: string;
    steps: { title: string; text: string }[];
  };
  today: { eyebrow: string; title: string; titleMuted: string; features: string[]; linkText: string };
  request: { title: string; subtitle: string; buttonText: string; linkText: string };
  faq: { title: string; subtitle: string; items: { question: string; answer: string }[] };
}

export type RoadmapSection = keyof RoadmapContent;

/** CMS entry per section (Admin > Website > Roadmap). */
export const ROADMAP_SLUGS: Record<RoadmapSection, { slug: string; label: string }> = {
  hero: { slug: "site-roadmap-hero", label: "Roadmap: Top of the page" },
  planned: { slug: "site-roadmap-planned", label: "Roadmap: Planned features" },
  process: { slug: "site-roadmap-process", label: "Roadmap: How we decide" },
  today: { slug: "site-roadmap-today", label: "Roadmap: Ready today" },
  request: { slug: "site-roadmap-request", label: "Roadmap: Request a feature" },
  faq: { slug: "site-roadmap-faq", label: "Roadmap: FAQ" },
};

export const ROADMAP_DEFAULTS: RoadmapContent = {
  hero: {
    title: "What's next.",
    titleMuted: "In the open.",
    subtitle: "The features we're planning for LMS Domain, shared openly so you can plan with us.",
    note: "Dates aren't fixed; ask us if you need one of these.",
  },
  planned: {
    eyebrow: "Planned",
    title: "Coming to",
    titleMuted: "LMS Domain.",
    groups: [
      { name: "Learn anywhere", subtitle: "Apps and live classes" },
      { name: "Reach learners", subtitle: "Messages and protection" },
      { name: "Grow sales", subtitle: "New ways to sell" },
      { name: "Domie AI", subtitle: "Planned for Pro" },
    ],
    features: [
      {
        title: "Branded Android and iOS apps",
        category: "Mobile Learning",
        group: "Learn anywhere",
        description:
          "Dedicated native white-label mobile applications published to Google Play and Apple App Store under your academy's brand.",
      },
      {
        title: "DRM video protection (Widevine & FairPlay)",
        category: "Security & Content",
        group: "Reach learners",
        description:
          "Hardware-backed digital rights management to prevent unauthorized screen capture and stream interception on supported browsers.",
      },
      {
        title: "WhatsApp notifications",
        category: "Messaging & Alerts",
        group: "Reach learners",
        description:
          "Automated WhatsApp messages for batch schedule updates, live class links, payment confirmations, and reminder alerts.",
      },
      {
        title: "WebRTC live classes",
        category: "Classroom Technology",
        group: "Learn anywhere",
        description: "Built-in, browser-native interactive classroom rooms directly integrated without requiring external software clients.",
      },
      {
        title: "Google Meet integration",
        category: "Classroom Technology",
        group: "Learn anywhere",
        description: "Direct Google Meet meeting generation and automated calendar invites for scheduled batch classes.",
      },
      {
        title: "Memberships & recurring subscriptions",
        category: "Monetization",
        group: "Grow sales",
        description:
          "Recurring monthly and annual subscriptions granting ongoing access to curriculum libraries, community updates, and live sessions.",
      },
      {
        title: "Affiliate program management",
        category: "Growth & Marketing",
        group: "Grow sales",
        description:
          "Self-serve affiliate partner registration, custom tracking links, conversion attribution, and automated partner commission calculations.",
      },
      {
        title: "Sales funnels",
        category: "Sales Optimization",
        group: "Grow sales",
        description: "Multi-step conversion flows with pre-checkout lead capture, checkout order bumps, and post-purchase upsell offers.",
      },
      {
        title: "AI quiz and assessment generation",
        category: "Domie AI",
        group: "Domie AI",
        description:
          "Automatic generation of multiple-choice test banks, concept questions, and practice assessments from course lesson transcripts.",
      },
    ],
    footnote: "Previews show the idea, not the final design.",
  },
  process: {
    eyebrow: "How we decide",
    title: "Built with",
    titleMuted: "academies.",
    text: "Our roadmap comes from the academies that use LMS Domain every day.",
    proof: "Requests from academies, every week",
    steps: [
      { title: "You tell us", text: "Academies share what they need on calls, in demos and through support." },
      { title: "We prioritise", text: "We build first what the most academies ask for and what helps them teach and sell." },
      { title: "Every academy gets it", text: "New features reach academies through regular updates. Nothing to install." },
    ],
  },
  today: {
    eyebrow: "Already in LMS Domain",
    title: "Ready today.",
    titleMuted: "No waiting.",
    features: [
      "Zoom live classes",
      "Tests and question banks",
      "Video watermarking",
      "Your own domain",
      "Domie AI on Pro",
      "Batches and drip release",
      "Certificates",
      "Device limits",
      "Stripe, Razorpay, Paytm, DOKU",
      "Coupons",
      "1:1 tutor booking",
      "Email and SMS notices",
    ],
    linkText: "Explore the platform",
  },
  request: {
    title: "Need one of these capabilities for your academy?",
    subtitle: "Tell us what you need. We prioritise the roadmap around what academies using LMS Domain ask for most.",
    buttonText: "Talk to us",
    linkText: "Or send us a message",
  },
  faq: {
    title: "Questions about the roadmap",
    subtitle: "How we plan, build and release new features.",
    items: [
      {
        question: "When will these features be released?",
        answer: "Dates aren't fixed yet. If you need one of these features, tell us. Requests from academies help us decide what comes first.",
      },
      {
        question: "Can I request a feature that isn't on the roadmap?",
        answer: "Yes. [Send us a message](/contact) or mention it in your demo. We read every request.",
      },
      {
        question: "Do new features reach my academy automatically?",
        answer: "Yes. LMS Domain is updated regularly, and new features reach academies without anything to install.",
      },
      {
        question: "Can you build a feature just for my academy?",
        answer: "Yes, on a [Custom Plan](/custom-lms). We scope it with you and include it in your written plan.",
      },
      {
        question: "Is there a mobile app today?",
        answer: "Learners can use your academy on any phone through the mobile browser today. Branded Android and iOS apps are on the roadmap.",
      },
    ],
  },
};

/** Merges an admin section over its default (see content/merge.ts). */
export const mergeRoadmapSection = mergeSection;

/** FAQ answers with [text](/path) links (see content/merge.ts). */
export const roadmapAnswerHtml = linkedAnswerHtml;
