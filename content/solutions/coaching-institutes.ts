import { SolutionPageData } from "./types";

export const coachingInstitutesData: SolutionPageData = {
  slug: "coaching-institutes",
  eyebrow: "Coaching institutes",
  title: "The LMS for coaching institutes that teach in batches",
  subtitle: "LMS Domain helps coaching institutes and tuition centres run morning, evening and weekend batches, teach live with attendance logged automatically, run timed mock tests and collect fees online, all on your own website.",
  metaTitle: "LMS for Coaching Institutes & Tuition Centres | LMS Domain",
  metaDescription: "Run batches, live classes with automatic attendance, timed mock tests and online fee collection for your coaching institute, on your own branded website.",
  sectionHeading: "How does LMS Domain support coaching institutes and tuition centers?",
  features: [
    {
      title: "Batch scheduling & timetables",
      tagline: "Morning and evening batches with drip lesson pacing.",
      description:
        "Organize distinct shifts for schools, repeaters, and weekend cohorts. Set class schedules, manage student rosters, and drip release lesson materials as your syllabus advances.",
      icon: "CalendarRange",
    },
    {
      title: "Live classes with attendance",
      tagline: "Classroom meetings with automated attendance logging.",
      description:
        "Launch live lectures directly from the student dashboard. Attendance is recorded automatically as learners join, and cloud lecture recordings are archived with the course.",
      icon: "Video",
    },
    {
      title: "Mock tests & question banks",
      tagline: "Chapter-wise quizzes and timed competitive exams.",
      description:
        "Build deep question banks organized by subject and difficulty. Run timed mock exams with automatic scoring and instant rank reports.",
      icon: "CheckSquare",
    },
    {
      title: "Fee collection with GST invoices",
      tagline: "Razorpay, Paytm, UPI, and manual bank transfer reviews.",
      description:
        "Collect monthly or term tuition fees directly to your bank account. The system issues automated GST invoices and lets staff verify direct bank transfer receipts.",
      icon: "CreditCard",
    },
    {
      title: "Student alerts",
      tagline: "Automated transactional email and SMS class notifications.",
      description:
        "Send batch schedule updates, unexpected cancellation alerts, and fee due reminders directly through transactional emails and optional SMS broadcasts.",
      icon: "Building2",
    },
    {
      title: "Branded institute website",
      tagline: "Your name, logo, colors, and domain.",
      description:
        "Deliver learning under your institute's official domain name (e.g., learn.yourinstitute.com) with custom color themes, course catalog pages, and faculty biographies.",
      icon: "Award",
    },
  ],
  platformLinks: [
    {
      title: "Teach & Batches",
      href: "/platform/teach",
      description: "Manage multiple batch shifts with drip content and live classes.",
    },
    {
      title: "Assess & Question Banks",
      href: "/platform/assess",
      description: "Configure timed mock exams and automated student scoring.",
    },
    {
      title: "Sell & Fees",
      href: "/platform/sell",
      description: "Collect fees online through your own gateway, with coupons and offline payment approvals.",
    },
  ],
  faqs: [
    {
      question: "Can coaching institutes run multiple batches for the same subject?",
      answer:
        "Yes, you can create multiple morning, evening, and weekend batches for any course. Each batch has its own independent calendar schedule, student roster, and live class links.",
    },
    {
      question: "How do live classes work with attendance tracking?",
      answer:
        "Live sessions on Zoom, Google Meet or Teams launch directly from your academy, without sharing separate meeting IDs. Attendance is logged automatically when learners join, and you can export it for any session.",
    },
    {
      question: "Can we create chapter-wise mock tests and question banks?",
      answer:
        "Yes, you can upload question banks organized by topic and difficulty level. You can generate timed chapter quizzes or full-length mock examinations with automated scoring and answer explanations.",
    },
    {
      question: "How does fee collection work?",
      answer:
        "Learners pay online through your own Stripe, Razorpay, Paytm or DOKU account, and you keep 100% of the fees. Academies in India also get automatic GST invoices.",
    },
    {
      question: "Can we send SMS and email alerts to students?",
      answer:
        "Yes, LMS Domain supports automated email announcements and optional SMS broadcasts for batch schedule changes, exam reminders, and enrollment confirmations.",
    },
    {
      question: "Is there a mobile app for students?",
      answer:
        "Yes. Every plan includes the LMS Domain app for Android and iOS, where learners open your academy. On Pro and Enterprise, you get your own branded app in Google Play and the App Store.",
    },
  ],
  ctaTitle: "See how LMS Domain powers your coaching institute.",
  ctaSubtitle:
    "Book a 20-minute demo. We'll show you how batch schedules, live classes, and timed mock tests operate on your custom domain.",
  ctaButtonText: "Book a demo",
  v5: {
    heroAccent: "teach in batches",
    pains: [
      { before: "Class links shared in chat groups, and lost every week", after: "Learners join live classes from your academy with one click" },
      { before: "Attendance taken by hand at the start of every class", after: "Attendance logged automatically when learners join the live class" },
      { before: "Mock tests on paper, marked over the weekend", after: "Timed online tests with instant scores and ranks" },
      { before: "Fees chased one learner at a time", after: "Online fee payments and email reminders to whole batches" },
    ],
    weekTitle: "A week at your institute",
    weekSubtitle: "How one batch runs on LMS Domain, from Monday to Saturday.",
    week: [
      {
        day: "Mon",
        title: "New batch starts",
        body: "Learners are added to the evening batch, and Module 1 unlocks for everyone on the same day.",
        card: {
          title: "Grade 10 Maths · Evening",
          meta: "Mon, Wed, Fri · 18:00",
          rows: [
            { label: "Learners", value: "24" },
            { label: "Module 1", value: "Unlocked", tone: "ok" },
            { label: "Module 2", value: "Unlocks Mon 10 Mar", tone: "brand" },
          ],
        },
      },
      {
        day: "Wed",
        title: "Live class",
        body: "Learners join from your academy. Attendance is recorded for you, and the recording is saved to the course.",
        card: {
          title: "Quadratic equations",
          meta: "Live · Daniel Reyes",
          progress: { label: "23 of 24 joined", value: 96 },
          chip: { label: "Recording saved", tone: "ok" },
        },
      },
      {
        day: "Fri",
        title: "Weekly mock test",
        body: "A timed test from your question bank, scored automatically, with a rank for every learner.",
        card: {
          title: "Mock test 4 · Algebra",
          meta: "30 questions · 60 min",
          rows: [
            { label: "1. Sofia Rossi", value: "94%", tone: "ok" },
            { label: "2. Lucas Martin", value: "88%" },
            { label: "3. Priya Sharma", value: "82%" },
          ],
        },
      },
      {
        day: "Sat",
        title: "Fees and follow-ups",
        body: "See who has paid this month and send a reminder to the rest of the batch in one go.",
        card: {
          title: "March fees",
          meta: "Grade 10 Maths · Evening",
          progress: { label: "18 of 24 paid", value: 75 },
          chip: { label: "Reminder sent to 6", tone: "brand" },
        },
      },
    ],
  },
};

