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

