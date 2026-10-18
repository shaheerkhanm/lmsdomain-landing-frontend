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
        "Catalogue, cart and wishlist; coupons; Stripe, Razorpay, Paytm and DOKU; offline payments; multiple currencies and languages.",
      details: [
        "Course catalogue, shopping cart, and wishlist",
        "Configurable promotional discount coupons",
        "Stripe, Razorpay, Paytm, and DOKU checkout",
        "Offline payments and multi-currency / multi-language support",
      ],
    },
    {
      id: "your-brand-your-domain",
      title: "Your brand, your domain",
      summary:
        "Custom domain with SSL, per-school logos and colours, home page builder, SEO settings.",
      details: [
        "Custom domain with automated SSL certificates",
        "Per-school logos, typography, and brand colours",
        "Drag-and-drop home page builder",
        "Built-in search engine optimization (SEO) settings",
      ],
    },
    {
      id: "keep-learners-coming-back",
      title: "Keep learners coming back",
      summary:
        "Achievements and points, leaderboard, course forum, email and SMS notifications.",
      details: [
        "Gamified achievements and learner reward points",
        "Competitive cohort leaderboards",
        "Interactive course discussion forums",
        "Automated email and SMS milestone notifications",
      ],
    },
  ],
};

