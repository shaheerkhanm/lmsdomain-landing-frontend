import { SolutionPageData } from "./types";

export const soloEducatorsData: SolutionPageData = {
  slug: "solo-educators",
  eyebrow: "Solo educators",
  title: "Sell courses, live workshops and 1:1 sessions under your own brand",
  subtitle: "LMS Domain gives independent educators and course creators their own academy website, with recorded courses, live Zoom workshops, paid 1:1 sessions and ebooks. Payments go straight to your account, with 0% commission.",
  metaTitle: "LMS for Solo Educators & Course Creators | LMS Domain",
  metaDescription: "Sell courses, live Zoom workshops, paid 1:1 sessions and ebooks on your own branded website. Payments go straight to you, with 0% commission.",
  sectionHeading: "How does LMS Domain empower solo educators and independent tutors?",
  features: [
    {
      title: "Recorded courses & drip lessons",
      tagline: "Structured chapters with video, PDF, and text materials.",
      description:
        "Build self-paced or drip-scheduled courses with rich multimedia. Protect videos with DRM, viewer watermarks and a screen-recording block in the apps, plus device limits (Pro and up).",
      icon: "BookOpen",
    },
    {
      title: "Live cohort workshops",
      tagline: "Interactive Zoom sessions with automated cloud recordings.",
      description:
        "Host live multi-week cohorts or masterclasses. Students receive calendar reminders, access the Zoom meeting with one click, and watch replay recordings directly in the portal.",
      icon: "Video",
    },
    {
      title: "1:1 paid tutor booking",
      tagline: "Private office hours and paid consultations.",
      description:
        "Set your available times and let learners book and pay for private 1:1 sessions on your website. Available on Growth and up.",
      icon: "UserCheck",
    },
    {
      title: "Ebooks & study guides",
      tagline: "Sell digital downloads standalone or bundled.",
      description:
        "Distribute syllabus notes, PDF guides, and study materials. Offer digital books as standalone products or as complimentary resources included with course purchases.",
      icon: "Award",
    },
    {
      title: "Direct gateway payouts",
      tagline: "Razorpay, Paytm, Stripe, and DOKU settlements.",
      description:
        "All customer payments settle directly into your connected payment gateway merchant account without platform intermediaries or sales deductions.",
      icon: "CreditCard",
    },
    {
      title: "Branded domain storefront",
      tagline: "Your own custom website, colors, and blog.",
      description:
        "Launch your academy website on your own custom domain (e.g., learn.yourname.com) with visual homepage controls, blog publishing, and automated SSL.",
      icon: "Globe2",
    },
  ],
  platformLinks: [
    {
      title: "Teach & Live Classes",
      href: "/platform/teach",
      description: "Deliver on-demand video courses, live Zoom batches, and 1:1 bookings.",
    },
    {
      title: "Sell & Checkouts",
      href: "/platform/sell",
      description: "Connect Razorpay or Stripe to receive direct student fee settlements.",
    },
    {
      title: "Brand & Custom Domain",
      href: "/platform/brand",
      description: "Own your web domain, design your course catalog, and publish blogs.",
    },
  ],
  faqs: [
    {
      question: "Can I sell courses and 1:1 sessions on the same platform?",
      answer:
        "Yes, LMS Domain lets you sell pre-recorded video courses, live group workshops, and individual 1:1 tutor consultations through a single unified student storefront.",
    },
    {
      question: "How do payments and payouts work for solo educators?",
      answer:
        "You connect your own Razorpay, Paytm, Stripe, or DOKU merchant account. Payments go straight to your own account and LMS Domain takes 0% commission. Educators in India also get automatic GST invoices.",
    },
    {
      question: "Can I sell ebooks and study guides alongside my courses?",
      answer:
        "Yes, you can upload downloadable PDF study materials and sell them as standalone digital products or bundle them as bonus content with course enrollments.",
    },
    {
      question: "Do I need technical skills to set up my domain and website?",
      answer:
        "No, setting up your domain is simple: just point a CNAME DNS record to our platform. Free automated SSL certificates are issued immediately, and our team is available to assist during setup.",
    },
    {
      question: "Can I run live Zoom workshops for student cohorts?",
      answer:
        "Yes, you can schedule live Zoom cohort classes with automated email reminders. Class attendance is recorded automatically, and lecture recordings are archived with the curriculum.",
    },
    {
      question: "Is there a mobile app for learners?",
      answer:
        "Yes. Every plan includes the LMS Domain app for Android and iOS, where learners open your academy. On Pro and Enterprise, you get your own branded app in Google Play and the App Store.",
    },
  ],
  ctaTitle: "Ready to launch your own teaching academy?",
  ctaSubtitle:
    "Book a 20-minute demo. We'll show you how course building, 1:1 booking, and payment checkouts operate under your own brand.",
  ctaButtonText: "Book a demo",
  v5: {
    heroAccent: "your own brand",
    pains: [
      { before: "A marketplace takes a cut of every sale you make", after: "Payments go straight to your account, with 0% commission" },
      { before: "Courses on one app, bookings on another, ebooks somewhere else", after: "Courses, workshops, 1:1 sessions and ebooks on one website" },
      { before: "Your learners belong to someone else's platform", after: "Your own domain, your brand and your learner list" },
      { before: "Manually sending Zoom links before every workshop", after: "Learners join live workshops from your academy" },
    ],
    weekTitle: "A week as a solo educator",
    weekSubtitle: "How one independent tutor teaches and earns on LMS Domain.",
    week: [
      {
        day: "Mon",
        title: "Course sales come in",
        body: "Learners buy from your own website. Each payment goes straight to your account.",
        card: {
          title: "Python for Beginners",
          meta: "Recorded course · $59",
          rows: [
            { label: "Sold this week", value: "14" },
            { label: "Coupon EARLYBIRD", value: "6 used", tone: "brand" },
            { label: "Commission", value: "0%", tone: "ok" },
          ],
        },
      },
      {
        day: "Wed",
        title: "Live workshop",
        body: "A small cohort joins your Zoom workshop from your academy, and the recording is saved for them.",
        card: {
          title: "Data cleaning masterclass",
          meta: "Live · 90 min",
          progress: { label: "21 of 22 joined", value: 95 },
          chip: { label: "Recording saved", tone: "ok" },
        },
      },
      {
        day: "Thu",
        title: "1:1 sessions",
        body: "Learners book your open times and pay upfront for private sessions.",
        card: {
          title: "1:1 sessions this week",
          meta: "45 min · $40",
          rows: [
            { label: "Thu 11:30 · Sofia", value: "Paid", tone: "ok" },
            { label: "Thu 15:00 · Lucas", value: "Paid", tone: "ok" },
            { label: "Fri 09:00", value: "Open", tone: "muted" },
          ],
        },
      },
      {
        day: "Sun",
        title: "Your week in numbers",
        body: "See sales across courses, workshops, sessions and ebooks in one place.",
        card: {
          title: "This week",
          meta: "Paid to your Stripe account",
          progress: { label: "$1,486 of $1,500 goal", value: 99 },
          chip: { label: "0% commission", tone: "brand" },
        },
      },
    ],
  },
};

