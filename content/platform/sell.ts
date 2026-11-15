import { PlatformPageData } from "./types";

export const sellPlatformData: PlatformPageData = {
  slug: "sell",
  eyebrow: "Sell",
  heroAccent: "0% commission",
  title: "Sell courses in any currency, with 0% commission",
  subtitle: "LMS Domain gives your academy its own checkout with Stripe, Razorpay, Paytm or DOKU. Learners pay in their currency, money goes straight to your account, and we never take a cut.",
  metaTitle: "Sell Courses Online with 0% Commission | LMS Domain",
  metaDescription: "Sell courses on your own checkout with Stripe, Razorpay, Paytm or DOKU. Multi-currency prices, coupons, invoices and offline payments, with 0% commission.",
  sectionHeading: "Everything you need to get paid",
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
        "Charge learners in USD, EUR, GBP, INR and other currencies your connected gateway supports.",
      icon: "Globe",
    },
    {
      title: "Offline payments with approval",
      description:
        "Accept direct bank transfers and payment receipts with one-click administrative review and enrollment approval.",
      icon: "Receipt",
      plan: "Growth",
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
  faqs: [
    {
      question: "Do you charge a commission on my sales?",
      answer:
        "No. LMS Domain charges zero platform commission on course sales. You keep 100% of your earnings; standard payment gateway processing fees still apply based on your gateway provider.",
    },
    {
      question: "Which payment gateways does LMS Domain support?",
      answer:
        "LMS Domain supports Razorpay, Paytm, Stripe, and DOKU. Supported gateways depend on your business location and merchant account capabilities.",
    },
    {
      question: "Can I sell courses with GST invoices?",
      answer:
        "Yes, LMS Domain automatically generates regular GST invoices for individual learners and separate B2B GST invoices for corporate clients. You can configure your academy GSTIN, business address, and state tax rules in payment settings.",
    },
    {
      question: "Can I accept offline payments like bank transfers?",
      answer:
        "Yes, students can submit direct bank transfer or UPI payment receipts during checkout. Administrators can review the proof of payment and approve enrollment with one click.",
    },
    {
      question: "What currencies can I charge students in?",
      answer:
        "You can sell courses in INR, USD, EUR, GBP, and other major currencies supported by your connected payment gateway account. The checkout displays clear currency pricing.",
    },
    {
      question: "Can I create discount coupons and promotional offers?",
      answer:
        "Yes, you can generate percentage or flat discount coupon codes with expiration dates, minimum order values, and maximum usage limits.",
    },
    {
      question: "Can I sell ebooks and study materials?",
      answer:
        "Yes, you can sell downloadable digital ebooks as standalone products or bundle them with course enrollments.",
    },
  ],
};

