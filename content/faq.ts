export interface FaqItem {
  id?: string;
  _id?: string;
  question: string;
  answer: string;
  category?: string;
}

export const homeFaqItems: FaqItem[] = [
  {
    question: "Can I use my own domain?",
    answer: "Yes. Every plan includes your own domain with SSL.",
  },
  {
    question: "Which payment gateways do you support?",
    answer:
      "Razorpay, Paytm, Stripe and DOKU, subject to your gateway account's country and currency.",
  },
  {
    question: "Do you take a cut of my sales?",
    answer:
      "No. You pay the plan price; gateway fees are charged by your gateway.",
  },
  {
    question: "Can I run live classes?",
    answer: "Yes, through Zoom, scheduled per batch.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      'Learners use your academy in any mobile browser today. Native apps are on our <a href="/roadmap" class="text-[#7B5CF5] underline underline-offset-2 hover:text-[#6842ED]">roadmap</a>.',
  },
  {
    question: "Can you move my existing courses and students?",
    answer: "Yes, our team helps with migration during onboarding.",
  },
];
