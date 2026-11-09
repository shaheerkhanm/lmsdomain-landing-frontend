import type { CustomPlanPageData } from "@/types/content";

export const DEFAULT_CUSTOM_PLAN_PAGE_DATA: CustomPlanPageData = {
  seo: {
    title: "Custom LMS Set Up for Your Academy | LMS Domain",
    description:
      "Get your custom branded learning platform built and set up for you. Setup, content migration, staff training, and ongoing support included.",
    shareImage: "",
  },
  hero: {
    eyebrow: "✦ CUSTOM PLAN",
    title: "Your own LMS, set up for you",
    highlightedWords: "set up for you",
    subtitle:
      "LMS Domain builds and deploys customized learning management systems for established coaching institutes, training organizations, and academies in India. Get your own white-label platform configured with custom branding, batch workflows, live Zoom integration, domestic payment gateways, and dedicated onboarding support from our engineering team.",
    primaryCta: { label: "Plan my custom LMS", href: "#plan" },
    secondaryCta: { label: "Book a 20-minute call", action: "demo" },
    proofChips: [
      "Your domain and brand",
      "Setup and support included",
    ],
    brandPreview: {
      nameLabel: "Try it: your academy name",
      namePlaceholder: "Your Academy",
      colourLabel: "Pick your colour",
      colours: ["#7B5CF5", "#2563EB", "#059669", "#D97706", "#DC2626", "#0D9488"],
    },
    image: "",
  },
  audiences: {
    title: "Who it's for",
    items: [
      {
        icon: "BookOpen",
        title: "Coaching institutes and tutors",
        text: "Move your batches, recorded classes and tests into one academy site your students open every day, with your name on it.",
      },
      {
        icon: "TrendingUp",
        title: "Companies and training providers",
        text: "Train employees, partners or customers on your own domain, with team packages, progress reports and certificates.",
      },
    ],
  },
  deliverables: {
    title: "Everything you need to launch, done for you",
    subtitle:
      "One plan, one team, one launch date. Each item below is set up by us and handed over working.",
    items: [
      {
        icon: "Globe",
        title: "Your branded web academy",
        text: "Your logo, colours and name across the learner site, admin panel, emails and certificates, on your own domain with SSL.",
        tag: "Web",
      },
      {
        icon: "Shield",
        title: "Admin panel for your team",
        text: "Courses, learners, payments, live classes and reports in one place, with roles for each staff member.",
        tag: "Admin",
      },
      {
        icon: "CreditCard",
        title: "Payments in your account",
        text: "Stripe, Razorpay, Paytm or DOKU connected to your own account, so course sales go straight to you.",
        tag: "Payments",
      },
      {
        icon: "Sparkles",
        title: "Domie AI built in",
        text: "AI tutor for learners, AI content drafts for creators and AI insights for admins, ready from day one.",
        tag: "AI",
      },
      {
        icon: "Database",
        title: "Migration from your old system",
        text: "We move your courses, videos, learners and progress from your current LMS or spreadsheets.",
        tag: "Setup",
      },
      {
        icon: "Users",
        title: "Training for your staff",
        text: "Live walkthroughs for your admins and instructors, plus a knowledge base they can return to.",
        tag: "Setup",
      },
      {
        icon: "Server",
        title: "Hosting, updates and support",
        text: "Secure hosting, regular updates and a support team that knows your setup.",
        tag: "After launch",
      },
      {
        icon: "Sliders",
        title: "Features built for you",
        text: "Need something specific? We plan and build custom features on top of your platform.",
        tag: "Custom",
      },
    ],
  },
  timeline: {
    title: "From first call to launch",
    subtitle: "A fixed plan from the first day, so you always know what happens next.",
    steps: [
      {
        when: "Step 1",
        title: "Discovery call",
        text: "We learn how you teach, who your learners are and what you need on day one. You get a written plan and quote after our call.",
      },
      {
        when: "Step 2",
        title: "Brand and setup",
        text: "Your domain, logo, colours, payment gateway and admin roles are configured.",
      },
      {
        when: "Step 3",
        title: "Content and migration",
        text: "Your courses, videos, tests and learners move in. We help upload anything new.",
      },
      {
        when: "Step 4",
        title: "Web academy goes live",
        text: "Your academy opens on your domain. Your team is trained and ready.",
      },
    ],
    footnote: "We agree the dates with you in the written plan.",
  },
  comparison: {
    title: "Why teams choose a Custom Plan",
    leftLabel: "Building it yourself",
    rightLabel: "LMS Domain Custom Plan",
    rows: [
      {
        topic: "Time to launch",
        left: "Months of development and testing",
        right: "A fixed plan with agreed dates",
      },
      {
        topic: "Branding",
        left: "Built from scratch",
        right: "Your brand everywhere, set up for you",
      },
      {
        topic: "Features",
        left: "Only what you can afford to build",
        right: "38 ready features plus Domie AI",
      },
      {
        topic: "After launch",
        left: "You hire and keep a team",
        right: "Hosting, updates and support included",
      },
      {
        topic: "Cost",
        left: "Large upfront budget",
        right: "One plan quoted to your needs",
      },
    ],
  },
  services: {
    title: "We don't disappear after launch",
    items: [
      {
        icon: "Headphones",
        title: "Dedicated support",
        text: "A team that knows your setup, by email, chat and call.",
      },
      {
        icon: "RefreshCw",
        title: "Regular updates",
        text: "New LMS Domain features reach your academy.",
      },
      {
        icon: "ShieldCheck",
        title: "Secure hosting",
        text: "Hosting, SSL, backups and monitoring handled for you.",
      },
      {
        icon: "Zap",
        title: "Growth help",
        text: "Advice on SEO, payments and growth as you scale.",
      },
    ],
  },
  pricingNote: {
    title: "A plan that fits what you need",
    text: "Every Custom Plan is quoted on what you actually need: number of learners, migration and custom features. You get a clear written quote after our call, with no hidden costs.",
    ctaLabel: "Get my quote",
    startingFrom: undefined,
  },
  form: {
    title: "Tell us about your academy",
    subtitle: "Takes two minutes. We reply after our call with a plan and quote.",
    organisationTypes: [
      "Coaching",
      "Company",
      "Training provider",
      "Other",
    ],
    learnerBands: [
      "Under 500",
      "500–2,000",
      "2,000–10,000",
      "10,000+",
    ],
    needs: [
      "Web academy",
      "Migration from another LMS",
      "Custom features",
    ],
    launchTimings: [
      "As soon as possible",
      "Within a month",
      "1–3 months",
      "Just exploring",
    ],
    submitLabel: "Send my request",
    successMessage:
      "Thanks, {name}. We've got your request and will reply after our call.",
    consentText: "By sending this form you agree to our Privacy Policy.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How long does setup take?",
        answer:
          "It depends on how much content we move and what you need on day one. We agree the launch date with you in the written plan.",
      },
      {
        question: "What does a Custom Plan cost?",
        answer:
          "It depends on the number of learners, any migration and custom features. After a short call you get a written quote, with no hidden costs.",
      },
      {
        question: "Can you move my courses and learners from my current platform?",
        answer:
          "Yes. We migrate courses, videos, tests, learners and their progress from most LMS platforms, or from spreadsheets and folders.",
      },
      {
        question: "Who owns the content and learner data?",
        answer: "You do. Your courses, learner data and domain stay yours.",
      },
      {
        question: "Can you build features we need that aren't in the platform?",
        answer:
          "Yes. Tell us what you need on the call; we scope it, include it in the quote and give you a delivery date.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We host your academy, keep it updated with new features, fix issues and help your team whenever needed.",
      },
      {
        question: "How is this different from your self-serve plans?",
        answer:
          "Self-serve plans (Starter, Growth, Pro) let you set up the academy yourself. A Custom Plan is done for you: we set up, brand, migrate, and build anything extra you need.",
      },
    ],
  },
  cta: {
    title: "Ready for your own LMS?",
    text: "Share a few details and get your plan and quote after our call.",
    primaryLabel: "Plan my custom LMS",
    primaryHref: "#plan",
    secondaryLabel: "Talk to sales",
    secondaryHref: "/contact?topic=sales",
  },
};
