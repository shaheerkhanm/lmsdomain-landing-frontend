import { BenefitsContent } from "@/types/content";

export const benefitsContent: BenefitsContent = {
  badge: "BENEFITS",
  title: {
    line1: "One platform for",
    line2: "every kind of academy",
  },
  cards: [
    {
      id: "sell-anywhere",
      title: "Sell anywhere",
      summary:
        "Sell courses with Stripe, Razorpay, Paytm or DOKU, with coupons and multiple currencies.",
      details: [
        "Course catalogue, cart and coupons",
        "Stripe, Razorpay, Paytm and DOKU",
        "Multiple currencies and languages",
      ],
    },
    {
      id: "your-brand-your-domain",
      title: "Your brand, your domain",
      summary:
        "Your own domain, logo and colours, with a home page you build yourself.",
      details: [
        "Custom domain with automated SSL",
        "Per-school logos and brand colours",
        "Home page builder and SEO controls",
      ],
    },
    {
      id: "keep-learners-coming-back",
      title: "Keep learners coming back",
      summary:
        "Points, leaderboards, course forums and email or SMS reminders.",
      details: [
        "Achievements and learner points",
        "Cohort leaderboards and course forum",
        "Automated email and SMS reminders",
      ],
    },
  ],
};
