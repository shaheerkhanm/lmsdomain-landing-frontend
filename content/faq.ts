export interface FaqItem {
  id: string;
  _id?: string;
  question: string;
  answer: string;
  category?: string;
}

export const homeFaqItems: FaqItem[] = [
  {
    id: "custom-domain",
    question: "Can I use my own domain?",
    answer: "Yes. Every plan includes your own domain with SSL.",
  },
  {
    id: "payment-gateways",
    question: "Which payment gateways do you support?",
    answer:
      "Razorpay, Paytm, Stripe and DOKU, subject to your gateway account's country and currency.",
  },
  {
    id: "sales-cut",
    question: "Do you take a cut of my sales?",
    answer:
      "No. You pay the plan price; gateway fees are charged by your gateway.",
  },
  {
    id: "live-classes",
    question: "Can I run live classes?",
    answer: "Yes, through Zoom, scheduled per batch.",
  },
  {
    id: "mobile-app",
    question: "Is there a mobile app?",
    answer:
      'Learners use your academy in any phone browser today. Native mobile apps are on our <a href="/roadmap" class="text-[#7B5CF5] underline underline-offset-2 hover:text-[#6842ED]">roadmap</a>.',
  },
  {
    id: "course-migration",
    question: "Can you move my existing courses and students?",
    answer: "Yes, our team helps with migration during onboarding.",
  },
  {
    id: "active-learner",
    question: "What counts as an active learner?",
    answer: "A learner who signs in at least once during the billing month.",
  },
  {
    id: "ai-tools",
    question: "Are the AI tools included?",
    // TODO(pricing): re-check wording once Phase 3 plan names are approved.
    answer: "Domie AI is included on the Premium plan.",
  },
];
