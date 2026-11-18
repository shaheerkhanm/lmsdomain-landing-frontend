import type { FaqItem } from "@/types/content";

// Answer-first wording: the first sentence answers the question on its own, so search
// engines and AI assistants can quote it. Admin > Pricing FAQ overrides this list when set.
export function getPricingFaqs(trialDays: number = 15): FaqItem[] {
  return [
    {
      id: "pricing-overview",
      question: "How much does LMS Domain cost?",
      answer:
        "LMS Domain has four plans: Starter, Growth, Pro and Enterprise. Starter, Growth and Pro have a fixed monthly price shown on this page, and Enterprise is priced to your needs. Every plan includes your own domain, live classes and 0% commission on your sales.",
    },
    {
      id: "free-trial",
      question: "Is there a free trial?",
      answer: `Yes. You can try any plan free for ${trialDays} days, with no credit card needed to start.`,
    },
    {
      id: "sales-commission",
      question: "Does LMS Domain take a commission on my course sales?",
      answer:
        "No. LMS Domain charges 0% commission on every plan, so you keep 100% of your course revenue. Your payment gateway (such as Stripe or Razorpay) still charges its own standard fees.",
    },
    {
      id: "currency",
      question: "Which currency will I pay in?",
      answer:
        "Academies in India pay in Indian rupees (INR), and academies everywhere else pay in US dollars (USD). This page shows prices in your currency automatically.",
    },
    {
      id: "yearly",
      question: "Is yearly billing cheaper?",
      answer:
        "Yes. Paying yearly gives you a discount compared with paying monthly. Switch to Yearly at the top of this page to see the yearly price for each plan.",
    },
    {
      id: "switch-plans",
      question: "Can I change my plan later?",
      answer:
        "Yes. You can upgrade or downgrade at any time. Tell our team and we will adjust your billing and plan limits.",
    },
    {
      id: "active-learners",
      question: "What counts as an active learner?",
      // TODO(confirm): active learner definition is a learner who logs in during the billing month
      answer: "An active learner is any learner who logs in to your academy at least once during your billing month.",
    },
    {
      id: "limit-overage",
      question: "What happens if I go over my plan limits?",
      answer:
        "We contact you before anything changes. If your learners, storage or bandwidth go over your plan, we help you move to the next plan or add capacity. We never add surprise charges.",
    },
    {
      id: "custom-domain",
      question: "Can I use my own domain name?",
      answer: "Yes. Every plan, including Starter, lets you run your academy on your own domain with free SSL.",
    },
    {
      id: "payment-gateways",
      question: "Which payment gateways can I use?",
      answer:
        "You can sell with Stripe, Razorpay, Paytm and DOKU, depending on the country and currency of your gateway account. Payments go straight to your own account.",
    },
    {
      id: "live-classes",
      question: "Are live classes included?",
      answer: "Yes. Live classes on Zoom are included from Starter, with schedules and recordings kept with each batch.",
    },
    {
      id: "ai-tools",
      question: "Is Domie AI included?",
      answer: "Domie AI is included in the Pro plan with 5 million AI tokens a month, and with a custom limit in Enterprise.",
    },
    {
      id: "course-migration",
      question: "Can you move my existing courses and learners?",
      answer:
        "Yes. Our team helps academies move over from other platforms, and full migration is included free on Enterprise.",
    },
    {
      id: "mobile-app",
      question: "Is there a mobile app?",
      answer:
        "Yes. Every plan includes the LMS Domain app for Android and iOS, where learners open your academy. On Pro and Enterprise, you get your own branded app in Google Play and the App Store.",
    },
  ];
}

export const DEFAULT_PRICING_FAQS: FaqItem[] = getPricingFaqs(15);
