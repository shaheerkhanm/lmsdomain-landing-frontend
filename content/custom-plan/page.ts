import type { CustomPlanPageData } from "@/types/content";

export const DEFAULT_CUSTOM_PLAN_PAGE_DATA: CustomPlanPageData = {
  seo: {
    title: "Custom LMS with Android & iOS Apps, Live in Days | LMS Domain",
    description:
      "Get your own branded LMS, website and Android & iOS apps, set up by our team in days. Your domain, your brand, your store listings, with setup, migration and support included.",
    shareImage: "",
  },
  hero: {
    eyebrow: "✦ CUSTOM PLAN",
    title: "Your own LMS and mobile apps, live in days",
    highlightedWords: "live in days",
    subtitle:
      "Tell us how you teach. Our team builds your branded academy, website and Android & iOS apps, sets everything up, and stays with you after launch. No developers to hire, no months of waiting.",
    primaryCta: { label: "Plan my custom LMS", href: "#plan" },
    secondaryCta: { label: "Book a 20-minute call", action: "demo" },
    proofChips: [
      "Web + Android + iOS",
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
        text: "Move your batches, recorded classes and tests into one app your students open every day, with your name on it.",
      },
      {
        icon: "Award",
        title: "Schools, colleges and universities",
        text: "One branded platform for courses, live classes, assessments and certificates, managed by your own staff with role-based access.",
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
        icon: "Smartphone",
        title: "Android app",
        text: "A native app with your name and icon on Google Play, under your own developer account.",
        tag: "Android",
      },
      {
        icon: "Smartphone",
        title: "iOS app",
        text: "The same app for iPhone and iPad on the App Store, under your own Apple developer account.",
        tag: "iOS",
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
    title: "From first call to launch, in days not months",
    subtitle: "A fixed plan from the first day, so you always know what happens next.",
    steps: [
      {
        when: "Day 1",
        title: "Discovery call",
        text: "We learn how you teach, who your learners are and what you need on day one. You get a written plan and quote within 24 hours.",
      },
      {
        when: "Day 1–2",
        title: "Brand and setup",
        text: "Your domain, logo, colours, payment gateway and admin roles are configured.",
      },
      {
        when: "Day 2–4",
        title: "Content and migration",
        text: "Your courses, videos, tests and learners move in. We help upload anything new.",
      },
      {
        when: "Day 3–5",
        title: "Web academy goes live",
        text: "Your academy opens on your domain. Your team is trained and ready.",
      },
      {
        when: "Day 7–10",
        title: "Apps submitted to the stores",
        text: "Your Android and iOS apps go to Google Play and the App Store under your name.",
      },
      {
        when: "Always",
        title: "Support and growth",
        text: "We stay on: updates, fixes, new features and help whenever you need it.",
      },
    ],
    footnote:
      "Times are working days after you approve the plan and share your brand assets. Store review time is set by Apple and Google, usually a few days.",
  },
  comparison: {
    title: "Why teams choose a Custom Plan",
    leftLabel: "Building it yourself",
    rightLabel: "LMS Domain Custom Plan",
    rows: [
      {
        topic: "Time to launch",
        left: "Months of development and testing",
        right: "Web in days, apps right after",
      },
      {
        topic: "Mobile apps",
        left: "A separate project and a separate team",
        right: "Android and iOS included",
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
  mobileApps: {
    eyebrow: "ANDROID + iOS",
    title: "Your app, on your students' phones",
    text: "Learners download your app, not ours. Recorded and live classes, quizzes, certificates and Domie AI tutor, with push notifications to bring them back.",
    bullets: [
      "Published under your name",
      "Your icon and splash screen",
      "Same login as your web academy",
      "Updates handled by us",
    ],
    note: "Apps are published from your own Google Play and Apple developer accounts, so the listings stay yours.",
    screenshots: [
      { image: "/images/custom-plan/app-screen-1.png", alt: "LMS Domain Android app demonstration" },
      { image: "/images/custom-plan/app-screen-2.png", alt: "LMS Domain iOS app demonstration" },
    ],
    appIcon: "/assets/img/logo/mark-square.svg",
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
        text: "New LMS Domain features reach your academy and apps.",
      },
      {
        icon: "ShieldCheck",
        title: "Secure hosting",
        text: "Hosting, SSL, backups and monitoring handled for you.",
      },
      {
        icon: "Zap",
        title: "Growth help",
        text: "Advice on SEO, payments and engagement as you grow.",
      },
    ],
  },
  pricingNote: {
    title: "A plan that fits what you need",
    text: "Every Custom Plan is quoted on what you actually need: number of learners, apps, migration and custom features. You get a clear written quote within 24 hours of our call, with no hidden costs.",
    ctaLabel: "Get my quote",
    startingFrom: undefined,
  },
  form: {
    title: "Tell us about your academy",
    subtitle: "Takes two minutes. We reply within one working day with a plan and quote.",
    organisationTypes: [
      "Coaching",
      "School or college",
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
      "Android app",
      "iOS app",
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
      "Thanks, {name}. We've got your request and will reply within one working day.",
    consentText: "By sending this form you agree to our Privacy Policy.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How fast can my LMS really go live?",
        answer:
          "Your web academy is usually live within 3 to 5 working days after you approve the plan and send your logo, colours and domain details. Android and iOS apps are submitted to the stores within 7 to 10 working days; Apple and Google then review them, which usually takes a few days.",
      },
      {
        question: "Do I get my own apps on Google Play and the App Store?",
        answer:
          "Yes. The apps carry your name, icon and splash screen and are published under your own developer accounts, so the listings belong to you.",
      },
      {
        question: "What does a Custom Plan cost?",
        answer:
          "It depends on the number of learners, the apps you need, any migration and custom features. After a short call you get a written quote within 24 hours, with no hidden costs.",
      },
      {
        question: "Can you move my courses and learners from my current platform?",
        answer:
          "Yes. We migrate courses, videos, tests, learners and their progress from most LMS platforms, or from spreadsheets and folders.",
      },
      {
        question: "Who owns the content and learner data?",
        answer: "You do. Your courses, learner data, domain and store listings stay yours.",
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
        question: "How is this different from your standard plans?",
        answer:
          "Standard plans let you set up the academy yourself. A Custom Plan is done for you: we set up, brand, migrate, publish your apps and build anything extra you need.",
      },
    ],
  },
  cta: {
    title: "Ready for your own LMS?",
    text: "Share a few details and get your plan and quote within a day.",
    primaryLabel: "Plan my custom LMS",
    primaryHref: "#plan",
    secondaryLabel: "Talk to sales",
    secondaryHref: "/contact?topic=sales",
  },
};

