// ============================================================================
// Demo page content (built-in defaults).
// Editable in Admin > Website > Demo: one CMS entry per section (slugs in
// DEMO_SLUGS, page "demo"), the section object in `data`. The admin's values
// win; missing, hidden or empty entries use the text below. Pictures, the call
// mockup and the booking form's fields stay in the code; the proof numbers are
// the Customers page numbers (Admin > Website > Customers > Numbers).
// ============================================================================

import { mergeSection } from "./merge";

export interface DemoContent {
  hero: { titleBefore: string; titleHighlight: string; titleAfter: string; subtitle: string; checks: string[] };
  form: { title: string; subtitle: string; submitLabel: string };
  agenda: { heading: string; steps: { time: string; title: string; text: string }[] };
  proof: { heading: string };
  see: { eyebrow: string; title: string; subtitle: string; items: { title: string; text: string }[] };
  after: {
    eyebrow: string;
    title: string;
    steps: { title: string; text: string }[];
    readyText: string;
    primaryButton: string;
    secondaryButton: string;
  };
  faq: { title: string; subtitle: string; items: { question: string; answer: string }[] };
}

export type DemoSection = keyof DemoContent;

/** CMS entry per section (Admin > Website > Demo). */
export const DEMO_SLUGS: Record<DemoSection, { slug: string; label: string }> = {
  hero: { slug: "site-demo-hero", label: "Demo: Top of the page" },
  form: { slug: "site-demo-form", label: "Demo: Booking form" },
  agenda: { slug: "site-demo-agenda", label: "Demo: What we cover" },
  proof: { slug: "site-demo-proof", label: "Demo: Academies already teaching" },
  see: { slug: "site-demo-see", label: "Demo: What you'll see" },
  after: { slug: "site-demo-after", label: "Demo: After your demo" },
  faq: { slug: "site-demo-faq", label: "Demo: FAQ" },
};

export const DEMO_DEFAULTS: DemoContent = {
  hero: {
    titleBefore: "See your academy on LMS Domain in",
    titleHighlight: "20 minutes",
    titleAfter: "",
    subtitle: "A free, live walkthrough with our team. We show you LMS Domain using your own courses and the way you teach.",
    checks: ["Free, no obligation", "With your own courses", "Bring your team"],
  },
  form: {
    title: "Book your free demo",
    subtitle: "Takes less than a minute. We'll get back to you to pick a time.",
    submitLabel: "Book my free demo",
  },
  agenda: {
    heading: "What we cover",
    steps: [
      { time: "0–5 min", title: "Your academy", text: "How you teach today and what you want to change." },
      { time: "5–15 min", title: "LMS Domain, with your courses", text: "Batches, live classes, tests, payments and your branded site." },
      { time: "15–20 min", title: "Plan and next steps", text: "The right plan for you and how setup works." },
    ],
  },
  proof: { heading: "Academies already teaching on LMS Domain" },
  see: {
    eyebrow: "In your demo",
    title: "What you'll see, with your own courses",
    subtitle: "We tailor the walkthrough to how you teach. These are some of the things academies ask to see most.",
    items: [
      { title: "Live classes and attendance", text: "Join on Zoom from your academy. Attendance is logged for you." },
      { title: "Tests and instant results", text: "Timed tests from your question bank, scored the moment they close." },
      { title: "Feedback on written work", text: "Learners upload work, teachers reply with a score and private comments." },
      { title: "Certificates and reports", text: "Branded certificates when learners finish, and reports in a click." },
      { title: "Sales with 0% commission", text: "Your own checkout. Payments go straight to your account." },
      { title: "Fees and reminders", text: "See who has paid and remind the rest of the batch in one go." },
    ],
  },
  after: {
    eyebrow: "After your demo",
    title: "From demo to your own academy",
    steps: [
      { title: "Start your free trial", text: "Try any plan free, with no credit card needed." },
      { title: "We set it up with you", text: "Our team helps with your courses, domain and payments." },
      { title: "Go live on your domain", text: "Your branded academy opens to learners on your own website." },
      { title: "Grow with support", text: "Real people help you whenever you need it." },
    ],
    readyText: "Ready to book? It takes less than a minute.",
    primaryButton: "Book my demo",
    secondaryButton: "See pricing",
  },
  faq: {
    title: "Questions about the demo",
    subtitle: "Everything you need to know before you book.",
    items: [
      { question: "Is the demo free?", answer: "Yes. The demo is free and there is no obligation to buy." },
      { question: "How long is the demo?", answer: "About 20 minutes, with time for your questions at the end." },
      {
        question: "Do I need to prepare anything?",
        answer: "No. It helps to know roughly how many learners and courses you have, but we can cover everything on the call.",
      },
      { question: "Can my team join the demo?", answer: "Yes. Invite anyone who will help run your academy, such as teachers or admin staff." },
      {
        question: "Can I try LMS Domain without a demo?",
        answer: "Yes. Every plan comes with a free trial. See the [pricing page](/pricing) to get started.",
      },
    ],
  },
};

export const mergeDemoSection = mergeSection;
