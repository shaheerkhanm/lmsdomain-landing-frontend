import { FaqContent } from "@/types/content";

export const faqContent: FaqContent = {
  badge: "FAQ",
  title: {
    line1: "Frequently asked",
    line2: "questions",
  },
  subtitle:
    "Everything you need to know about our learning platform, premium AI add-ons, payments, and custom domains.",
  items: [
    {
      question: "How does the HelpDesk AI tutor answer questions?",
      answer: "It answers from the learner's own courses, and chats are saved for each course.",
    },
    {
      question: "Are the AI tools included?",
      answer: "They are premium add-ons.",
    },
    {
      question: "Can I run the academy on my own domain?",
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
      question: "Can I sell in more than one currency or language?",
      answer: "Yes.",
    },
  ],
};

