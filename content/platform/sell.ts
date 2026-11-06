import { PlatformPageData } from "./types";

export const sellPlatformData: PlatformPageData = {
  slug: "sell",
  eyebrow: "MONETIZATION & PAYMENTS",
  title: "Collect fees in any currency, on your own checkout.",
  subtitle:
    "Accept payments in 100+ currencies through Stripe, Razorpay, Paytm, or DOKU with instant fee settlements straight to your own accounts.",
  frameTitle: "Storefront & Multi-Gateway Checkout",
  frameAlt: "Collect fees in any currency, on your own checkout",
  features: [
    {
      title: "Catalogue and cart",
      description:
        "Present a searchable course catalogue with category filters, detailed syllabus views, and instant enrollment checkout.",
      icon: "ShoppingCart",
    },
    {
      title: "Coupons and discounts",
      description:
        "Generate percentage or flat promo codes with expiry limits, maximum redemption counts, and minimum purchase rules.",
      icon: "Tag",
    },
    {
      title: "Stripe, Razorpay, Paytm & DOKU",
      description:
        "Accept credit cards, UPI, debit cards, and local payment methods with zero platform transaction commissions.",
      icon: "CreditCard",
    },
    {
      title: "Multi-currency checkout",
      description:
        "Sell courses in INR, USD, EUR, GBP, and 100+ currencies supported by your connected gateway accounts.",
      icon: "Globe",
    },
    {
      title: "Offline payments with approval",
      description:
        "Accept direct bank transfers and payment receipts with one-click administrative review and enrollment approval.",
      icon: "Receipt",
    },
    {
      title: "Instructor payouts & reports",
      description:
        "Track gross sales volume, calculate instructor revenue splits, and export complete financial performance reports.",
      icon: "BarChart3",
    },
  ],
  usedFor: [
    {
      title: "Language & test-prep academies",
      href: "/solutions/language-test-prep-academies",
      description:
        "Collect course and test-prep fees in students' local currencies via domestic and global gateways.",
    },
    {
      title: "Training companies",
      href: "/solutions/training-companies",
      description:
        "Invoice corporate team packages, manage bank transfer approvals, and split instructor compensation.",
    },
  ],
};
