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
    id: "sales-commission",
    question: "Do you charge a commission on my sales?",
    answer:
      "No. LMS Domain charges zero platform commission on course sales. You keep 100% of your earnings; standard payment gateway processing fees still apply based on your gateway provider.",
  },
  {
    id: "live-classes",
    question: "Can I run live classes?",
    answer: "Yes, through Zoom, Google Meet or Microsoft Teams, scheduled per batch.",
  },
  {
    id: "mobile-app",
    question: "Is there a mobile app?",
    answer:
      "Yes. Every plan includes the LMS Domain app for Android and iOS, where learners open your academy. On Pro and Enterprise, you get your own branded app in Google Play and the App Store.",
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
    answer: "Domie AI is included on the Pro plan with 5 million AI tokens a month, and with a custom limit on Enterprise.",
  },
];
