import { PlatformPageData } from "./types";

export const sellPlatformData: PlatformPageData = {
  slug: "sell",
  eyebrow: "MONETIZATION & PAYMENTS",
  title: "Collect fees in any currency, on your own checkout.",
  subtitle:
    "LMS Domain is an e-commerce platform to sell courses online in India with GST invoices, custom discount coupons, and offline bank transfer reviews. Connect Razorpay, Paytm, Stripe, or DOKU to accept student fees in INR and major currencies with direct payouts to your business bank account.",
  metaTitle: "Sell Courses Online with GST Invoices | LMS Domain",
  metaDescription:
    "Sell courses with Razorpay, Paytm, Stripe, and DOKU. Offer coupons, approve offline payments, and generate automated GST invoices on your own checkout.",
  sectionHeading: "How does fee collection and checkout work in LMS Domain?",
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
        "Connect your existing gateway account to receive direct payouts without platform intermediaries.",
      icon: "CreditCard",
    },
    {
      title: "Multi-currency checkout",
      description:
        "Charge learners in INR or major currencies depending on your connected gateway capabilities.",
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
    {
      title: "Solo educators & creators",
      href: "/solutions/solo-educators",
      description:
        "Sell pre-recorded video courses, live cohort workshops, and 1:1 consultation sessions.",
    },
  ],
};

