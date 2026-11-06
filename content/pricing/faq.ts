import type { FaqItem } from "@/types/content";

export const DEFAULT_PRICING_FAQS: FaqItem[] = [
  {
    question: "Can I use my own domain?",
    answer: "Yes, with SSL. It needs a DNS change.",
  },
  {
    question: "Which payment gateways do you support?",
    answer: "Stripe, Razorpay, Paytm and DOKU, plus offline payments such as bank transfers.",
  },
  {
    question: "Can I run live classes?",
    answer: "Yes, with Zoom, including recordings, bootcamps and one-to-one tutor booking.",
  },
  {
    question: "Can you move my existing courses and students?",
    answer: "Yes. We move your courses, videos, learners and progress from your current LMS or spreadsheets.",
  },
];
