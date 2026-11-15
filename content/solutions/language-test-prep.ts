import { SolutionPageData } from "./types";

export const languageTestPrepData: SolutionPageData = {
  slug: "language-test-prep-academies",
  eyebrow: "Language & test-prep academies",
  title: "The LMS for language and test‑prep academies",
  subtitle: "LMS Domain helps language schools and exam-prep academies run batches, teach live on Zoom, give timed practice tests, review written work with private feedback and issue certificates, for any language or exam, on your own website.",
  metaTitle: "LMS for Language Schools & Test-Prep Academies | LMS Domain",
  metaDescription: "Run language and exam-prep batches with live Zoom classes, timed practice tests, essay reviews with private feedback, certificates and multi-currency fees on your own site.",
  sectionHeading: "How does LMS Domain support language and test-prep academies?",
  features: [
    {
      title: "Batch scheduling",
      tagline: "Morning and evening batches that progress on schedule.",
      description:
        "Assign students to distinct cohorts, set calendar start and end dates, and drip release lesson materials as your classes progress.",
      icon: "CalendarRange",
    },
    {
      title: "Live Zoom classes & attendance",
      tagline: "Classroom meetings with automatic attendance logs.",
      description:
        "Schedule live Zoom lectures directly inside course modules, automatically log class attendance, and keep class recordings organized in the lesson timeline.",
      icon: "Video",
    },
    {
      title: "Practice tests & certificates",
      tagline: "Timed mock exams, review feedback, and branded certificates.",
      description:
        "Run timed mock tests with automated scoring, review essays and written assignments with private feedback, and issue branded PDF certificates upon completion.",
      icon: "CheckSquare",
    },
    {
      title: "Multi-currency fee collection",
      tagline: "Local payment methods with fee settlements directly to you.",
      description:
        "Collect course tuition via Stripe, Razorpay, Paytm, and DOKU in the learner's currency, with manual bank transfer receipt review when students pay offline.",
      icon: "CreditCard",
    },
  ],
  platformLinks: [
    {
      title: "Teach & Batches",
      href: "/platform/teach",
      description: "Manage morning and evening batch rosters with drip content.",
    },
    {
      title: "Assess & Question Banks",
      href: "/platform/assess",
      description: "Configure timed mock exams and automated student scoring.",
    },
    {
      title: "Sell & Multi-Currency",
      href: "/platform/sell",
      description: "Collect fees in your learners' currencies through your own gateway.",
    },
  ],
  customerNote: "Permission confirmed by Shaheer Khan for all 3 client logos.",
  faqs: [
    {
      question: "How does LMS Domain handle language and exam-prep batches?",
      answer:
        "LMS Domain allows language academies to configure morning, evening, and weekend batches. Each batch has its own calendar dates, Zoom live class links, student rosters, and drip lesson schedules.",
    },
    {
      question: "Can I create timed mock tests for language exams?",
      answer:
        "Yes, you can create timed practice tests with multiple-choice sections and essay submission prompts. Scores are calculated automatically for objective questions, while teachers can leave written feedback for descriptive answers.",
    },
    {
      question: "Does the platform track student attendance in live Zoom classes?",
      answer:
        "Yes, attendance is automatically logged whenever students join batch Zoom classes through their portal. Instructors can generate batch attendance summaries with one click.",
    },
    {
      question: "Can students pay tuition fees in international currencies?",
      answer:
        "Yes. You can collect fees through Stripe, Razorpay, Paytm or DOKU in USD, EUR, GBP, INR and other currencies your gateway supports.",
    },
    {
      question: "Can I issue completion certificates for test-prep cohorts?",
      answer:
        "Yes, you can issue branded PDF completion certificates customized with your academy logo, student name, and course details once a student passes the required mock tests.",
    },
    {
      question: "Can learners take mock tests on mobile phones?",
      answer:
        "Yes, learners can access practice tests, video lessons, and live Zoom meetings on any mobile web browser. Branded native mobile apps are on our roadmap.",
    },
  ],
  ctaTitle: "See how LMS Domain powers your language academy.",
  ctaSubtitle:
    "Book a 20-minute demo. We'll show you how batch rosters, Zoom classes, and timed mock tests work on your custom domain.",
  ctaButtonText: "Book a demo",
  v5: {
    heroAccent: "test‑prep academies",
    pains: [
      { before: "Essays emailed back and forth, feedback lost in inboxes", after: "Learners upload essays, teachers reply with private feedback and a score" },
      { before: "Practice tests printed, timed with a stopwatch and marked by hand", after: "Timed online practice tests, scored the moment they close" },
      { before: "No clear picture of who is improving before the exam", after: "Every learner's test scores and progress in one profile" },
      { before: "Learners abroad struggle to pay in your currency", after: "Fees collected in USD, EUR, GBP, INR and more" },
    ],
    weekTitle: "A week in an exam-prep batch",
    weekSubtitle: "How one evening batch prepares for its exam on LMS Domain.",
    week: [
      {
        day: "Mon",
        title: "Live grammar class",
        body: "The batch joins on Zoom from your academy. Attendance is logged and the recording is saved for revision.",
        card: {
          title: "Advanced grammar · Evening",
          meta: "Live · Mia Collins",
          progress: { label: "18 of 20 joined", value: 90 },
          chip: { label: "Recording saved", tone: "ok" },
        },
      },
      {
        day: "Tue",
        title: "Essay submitted",
        body: "Learners upload this week's essay. Teachers see who has submitted and what's waiting for review.",
        card: {
          title: "Essay 3 · Opinion essay",
          meta: "Due Wed, 23:59",
          rows: [
            { label: "Submitted", value: "16", tone: "ok" },
            { label: "Waiting for review", value: "16", tone: "warn" },
            { label: "Not submitted", value: "4", tone: "muted" },
          ],
        },
      },
      {
        day: "Thu",
        title: "Private feedback",
        body: "Teachers score each essay and leave private comments, or ask for a revision.",
        card: {
          title: "Amara · Essay 3",
          meta: "Reviewed by Mia",
          rows: [
            { label: "Score", value: "7 / 9", tone: "brand" },
            { label: "Ideas and structure", value: "Strong" },
            { label: "Grammar", value: "Review tenses" },
          ],
        },
      },
      {
        day: "Sat",
        title: "Full practice test",
        body: "A timed practice test from your question bank, scored automatically, with results in every learner's profile.",
        card: {
          title: "Practice test 5",
          meta: "Reading and listening · 90 min",
          progress: { label: "Batch average 74%", value: 74 },
          chip: { label: "Up 6% from test 4", tone: "ok" },
        },
      },
    ],
  },
};

