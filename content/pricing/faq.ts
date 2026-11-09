import type { FaqItem } from "@/types/content";

export function getPricingFaqs(trialDays: number = 15): FaqItem[] {
  return [
    {
      id: "free-trial",
      question: "Is there a free trial?",
      answer: `Yes, you can try any plan free for ${trialDays} days with full feature access. No credit card is required to start your trial.`,
    },
    {
      id: "switch-plans",
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Contact our team when you are ready to switch, and we will adjust your billing and account limits.",
    },
    {
      id: "usd-billing",
      question: "Do you charge in USD?",
      answer:
        "Yes, academies and training companies outside India can pay in USD. You can toggle currency at the top of the pricing table.",
    },
    {
      id: "sales-commission",
      question: "Do you charge a commission on my sales?",
      answer:
        "No. LMS Domain charges 0% commission on your sales across every plan. You keep 100% of your earnings; standard gateway fees still apply based on your payment processor.",
    },
    {
      id: "active-learners",
      question: "What counts as an active learner?",
      // TODO(confirm): active learner definition is a learner who logs in during the billing month
      answer:
        "An active learner is any learner who logs into your academy portal at least once during your billing month.",
    },
    {
      id: "limit-overage",
      question: "What happens if I go over my limits?",
      answer:
        "If your active learners, storage, or bandwidth exceed your plan quota, we will contact you to move to the next plan tier or add extra capacity. We do not automatically bill unexpected charges.",
    },
    {
      id: "custom-domain",
      question: "Can I use my own domain?",
      answer: "Yes. Every plan from Starter upward includes your own custom domain with free automatic SSL.",
    },
    {
      id: "payment-gateways",
      question: "Which payment gateways do you support?",
      answer:
        "Razorpay, Paytm, Stripe and DOKU, subject to your gateway account's country and currency.",
    },
    {
      id: "live-classes",
      question: "Can I run live classes?",
      answer:
        "Yes. Zoom live classes are included from Starter, with schedules and recordings organized with each batch.",
    },
    {
      id: "ai-tools",
      question: "Are the AI tools included?",
      answer:
        "Domie AI is included on the Pro plan within fair-use limits, and on custom terms for Enterprise.",
    },
    {
      id: "course-migration",
      question: "Can you move my existing courses and students?",
      answer:
        "Yes. Free migration is included on Enterprise, and our technical team assists academies transitioning from other learning platforms.",
    },
    {
      id: "mobile-app",
      question: "Is there a mobile app?",
      answer:
        'Learners access your academy via any modern mobile browser with full responsive support. Dedicated native mobile apps are on our <a href="/roadmap" class="text-[#7B5CF5] underline underline-offset-2 hover:text-[#6842ED]">roadmap</a>.',
    },
  ];
}

export const DEFAULT_PRICING_FAQS: FaqItem[] = getPricingFaqs(15);
