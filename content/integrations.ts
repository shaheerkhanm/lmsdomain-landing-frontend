// ============================================================================
// Integration pages (/integrations and /integrations/<slug>).
// Facts confirmed by the product owner on 2026-11-22:
//   - live classes: the academy connects its own Zoom, Google or Microsoft account and
//     LMS Domain creates each class's meeting automatically; recordings are added to the
//     course and attendance is logged automatically, for all three
//   - WhatsApp reminders are sent from the academy's own WhatsApp Business number
// Plan gates follow the pricing page: all six integrations are on every plan
// (B2B GST invoices and offline payments from Growth, SMS from Growth).
// Promise only what is live in the product.
// ============================================================================

export type IntegrationCategory = "Live classes" | "Payments" | "Messages";

export interface IntegrationPage {
  slug: string;
  name: string;
  category: IntegrationCategory;
  /** One line for the cards on /integrations */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  /** Quick facts under the hero */
  facts: { label: string; value: string }[];
  tableTitle: string;
  table: { feature: string; how: string }[];
  steps: { title: string; text: string }[];
  useCases: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
}

const LIVE_USE_CASES = [
  {
    title: "Coaching institutes",
    text: "Run daily classes for several batches. Each batch gets its own meetings, attendance and recordings.",
  },
  {
    title: "Language and test-prep academies",
    text: "Small speaking groups and exam practice sessions, with recordings learners can replay before the test.",
  },
  {
    title: "Training companies",
    text: "Cohort workshops for client teams, with attendance you can show the client afterwards.",
  },
];

export const INTEGRATIONS: IntegrationPage[] = [
  {
    slug: "zoom",
    name: "Zoom",
    category: "Live classes",
    summary: "Meetings created for every class, with attendance and recordings added to the course.",
    metaTitle: "Zoom LMS Integration for Live Classes",
    metaDescription:
      "Connect your Zoom account to LMS Domain. Meetings are created for every class, learners join in one tap, and attendance and recordings are added to the course. On every plan.",
    title: "Zoom integration for your online academy",
    subtitle:
      "Connect your own Zoom account once. LMS Domain creates the meeting for every class you schedule, learners join in one tap from your academy or app, and attendance and recordings go straight into the course.",
    facts: [
      { label: "Plans", value: "Every plan" },
      { label: "You need", value: "Your own Zoom account" },
      { label: "Learners join", value: "From your academy website or app" },
    ],
    tableTitle: "What LMS Domain does with Zoom",
    table: [
      { feature: "Meeting links", how: "Created automatically for each class you schedule" },
      { feature: "Joining", how: "Learners tap Join in your academy or app; no meeting IDs to send" },
      { feature: "Attendance", how: "Logged automatically for every learner who joins" },
      { feature: "Recordings", how: "Added to the course automatically after the class" },
      { feature: "Batches", how: "Each batch has its own classes, attendance and recordings" },
      { feature: "Reminders", how: "Email reminders, and WhatsApp reminders from your own WhatsApp Business number" },
    ],
    steps: [
      { title: "Connect Zoom", text: "Connect your academy's Zoom account in your LMS Domain admin." },
      { title: "Schedule a class", text: "Pick the batch, date and time. LMS Domain creates the Zoom meeting for you." },
      { title: "Learners join", text: "Learners open the class from your academy website or app and join in one tap." },
      { title: "Attendance and recording", text: "Attendance is logged and the recording is added to the course, ready to rewatch." },
    ],
    useCases: LIVE_USE_CASES,
    faqs: [
      { question: "Which plans include the Zoom integration?", answer: "Every plan, including Starter. See [pricing](/pricing)." },
      {
        question: "Do I need a paid Zoom plan?",
        answer: "You use your own Zoom account, so Zoom's own plan limits apply, such as how long a meeting can run and how many people can join.",
      },
      { question: "Are class recordings saved?", answer: "Yes. The recording is added to the course automatically, so learners who missed the class can watch it later." },
      { question: "Is attendance automatic?", answer: "Yes. LMS Domain logs who joined each class, for every batch." },
      { question: "Can learners join from their phone?", answer: "Yes. Classes open from the LMS Domain app for Android and iOS on every plan, and from your own branded app on Pro." },
      { question: "Can I use Google Meet or Microsoft Teams instead?", answer: "Yes. All three work on every plan. See [Google Meet](/integrations/google-meet) and [Microsoft Teams](/integrations/microsoft-teams)." },
    ],
    related: ["google-meet", "microsoft-teams", "whatsapp"],
  },
  {
    slug: "google-meet",
    name: "Google Meet",
    category: "Live classes",
    summary: "Meet links created for every class, with attendance and recordings added to the course.",
    metaTitle: "Google Meet LMS Integration for Live Classes",
    metaDescription:
      "Connect your Google account to LMS Domain. Google Meet links are created for every class, learners join in one tap, and attendance and recordings are added to the course. On every plan.",
    title: "Google Meet integration for your online academy",
    subtitle:
      "Connect your academy's Google account once. LMS Domain creates the Meet link for every class, learners join from your academy or app, and attendance and recordings go straight into the course.",
    facts: [
      { label: "Plans", value: "Every plan" },
      { label: "You need", value: "Your academy's Google account" },
      { label: "Learners join", value: "From your academy website or app" },
    ],
    tableTitle: "What LMS Domain does with Google Meet",
    table: [
      { feature: "Meet links", how: "Created automatically for each class you schedule" },
      { feature: "Joining", how: "Learners tap Join in your academy or app; no links to send around" },
      { feature: "Attendance", how: "Logged automatically for every learner who joins" },
      { feature: "Recordings", how: "Added to the course automatically after the class" },
      { feature: "Batches", how: "Each batch has its own classes, attendance and recordings" },
      { feature: "Reminders", how: "Email reminders, and WhatsApp reminders from your own WhatsApp Business number" },
    ],
    steps: [
      { title: "Connect Google", text: "Connect your academy's Google account in your LMS Domain admin." },
      { title: "Schedule a class", text: "Pick the batch, date and time. LMS Domain creates the Google Meet link." },
      { title: "Learners join", text: "Learners open the class from your academy website or app and join in one tap." },
      { title: "Attendance and recording", text: "Attendance is logged and the recording is added to the course." },
    ],
    useCases: LIVE_USE_CASES,
    faqs: [
      { question: "Which plans include the Google Meet integration?", answer: "Every plan, including Starter. See [pricing](/pricing)." },
      {
        question: "Does Google Meet recording work on every Google account?",
        answer: "Google's own rules apply: Meet recording is available on some Google Workspace plans, not on every account. When your Google plan records the class, LMS Domain adds the recording to the course.",
      },
      { question: "Is attendance automatic?", answer: "Yes. LMS Domain logs who joined each class, for every batch." },
      { question: "Can learners join from their phone?", answer: "Yes. Classes open from the LMS Domain app for Android and iOS on every plan, and from your own branded app on Pro." },
      { question: "Can I use Zoom or Microsoft Teams instead?", answer: "Yes. All three work on every plan. See [Zoom](/integrations/zoom) and [Microsoft Teams](/integrations/microsoft-teams)." },
    ],
    related: ["zoom", "microsoft-teams", "whatsapp"],
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    category: "Live classes",
    summary: "Teams meetings created for every class, with attendance and recordings added to the course.",
    metaTitle: "Microsoft Teams LMS Integration for Live Classes",
    metaDescription:
      "Connect your Microsoft account to LMS Domain. Teams meetings are created for every class, learners join in one tap, and attendance and recordings are added to the course. On every plan.",
    title: "Microsoft Teams integration for your online academy",
    subtitle:
      "Connect your organisation's Microsoft account once. LMS Domain creates the Teams meeting for every class, learners join from your academy or app, and attendance and recordings go straight into the course.",
    facts: [
      { label: "Plans", value: "Every plan" },
      { label: "You need", value: "Your Microsoft account with Teams" },
      { label: "Learners join", value: "From your academy website or app" },
    ],
    tableTitle: "What LMS Domain does with Microsoft Teams",
    table: [
      { feature: "Teams meetings", how: "Created automatically for each class you schedule" },
      { feature: "Joining", how: "Learners tap Join in your academy or app" },
      { feature: "Attendance", how: "Logged automatically for every learner who joins" },
      { feature: "Recordings", how: "Added to the course automatically after the class" },
      { feature: "Batches", how: "Each batch or client cohort has its own classes, attendance and recordings" },
      { feature: "Reminders", how: "Email reminders, and WhatsApp reminders from your own WhatsApp Business number" },
    ],
    steps: [
      { title: "Connect Microsoft", text: "Connect your organisation's Microsoft account in your LMS Domain admin." },
      { title: "Schedule a class", text: "Pick the batch, date and time. LMS Domain creates the Teams meeting." },
      { title: "Learners join", text: "Learners open the class from your academy website or app and join in one tap." },
      { title: "Attendance and recording", text: "Attendance is logged and the recording is added to the course." },
    ],
    useCases: [
      LIVE_USE_CASES[2],
      { title: "Corporate academies", text: "Teams already used across the company, now with courses, tests and certificates around each session." },
      LIVE_USE_CASES[0],
    ],
    faqs: [
      { question: "Which plans include the Microsoft Teams integration?", answer: "Every plan, including Starter. See [pricing](/pricing)." },
      { question: "Are class recordings saved?", answer: "Yes. When Teams records the class, LMS Domain adds the recording to the course automatically." },
      { question: "Is attendance automatic?", answer: "Yes. LMS Domain logs who joined each class, for every batch." },
      { question: "Can staff sign in with their company accounts?", answer: "Single sign-on (SSO) is included on Pro and up." },
      { question: "Can I use Zoom or Google Meet instead?", answer: "Yes. All three work on every plan. See [Zoom](/integrations/zoom) and [Google Meet](/integrations/google-meet)." },
    ],
    related: ["zoom", "google-meet", "whatsapp"],
  },
  {
    slug: "razorpay",
    name: "Razorpay",
    category: "Payments",
    summary: "Sell in INR with UPI, cards and net banking, paid straight to your Razorpay account.",
    metaTitle: "Razorpay Integration: Sell Courses with UPI and GST Invoices",
    metaDescription:
      "Connect your Razorpay account to LMS Domain and sell courses in INR with UPI, cards and net banking. Payments go straight to you with 0% commission, and GST invoices are created automatically.",
    title: "Sell courses in India with Razorpay",
    subtitle:
      "Connect your own Razorpay account and learners pay on your academy's checkout with UPI, cards or net banking. Money settles straight into your account, LMS Domain takes 0% commission, and GST invoices are created for you.",
    facts: [
      { label: "Plans", value: "Every plan" },
      { label: "You need", value: "Your own Razorpay account" },
      { label: "Commission", value: "0%: only Razorpay's own fee" },
    ],
    tableTitle: "What LMS Domain does with Razorpay",
    table: [
      { feature: "Checkout", how: "Learners pay on your academy's own checkout" },
      { feature: "Payment methods", how: "UPI (Google Pay, PhonePe, Paytm, BHIM), cards including RuPay, and net banking, as enabled on your Razorpay account" },
      { feature: "Settlement", how: "Straight into your Razorpay account; LMS Domain never holds your money" },
      { feature: "GST invoices", how: "Created automatically: B2C on every plan, B2B from Growth" },
      { feature: "Coupons", how: "Discount coupons on every plan" },
      { feature: "Offline payments", how: "Approve bank transfers and other offline payments from Growth" },
    ],
    steps: [
      { title: "Use your Razorpay account", text: "Create a Razorpay account for your business, or use the one you have." },
      { title: "Connect it", text: "Connect your Razorpay account in your LMS Domain admin." },
      { title: "Set prices", text: "Set course and batch prices in INR, and add coupons if you like." },
      { title: "Get paid", text: "Learners pay, the money settles to your Razorpay account and the GST invoice is created." },
    ],
    useCases: [
      { title: "Coaching institutes", text: "Collect batch fees online with UPI, the way most learners in India prefer to pay." },
      { title: "Solo educators", text: "Sell courses from your own website without a marketplace taking a share." },
      { title: "Test-prep academies", text: "Sell test series and course bundles with coupons for early sign-ups." },
    ],
    faqs: [
      { question: "Does LMS Domain take a share of my sales?", answer: "No. LMS Domain charges 0% commission on every plan. Razorpay charges its own processing fee." },
      { question: "Which payment methods can learners use?", answer: "Whatever is enabled on your Razorpay account, such as UPI, debit and credit cards including RuPay, and net banking." },
      { question: "Are GST invoices created automatically?", answer: "Yes. B2C GST invoices on every plan, and B2B GST invoices from Growth." },
      { question: "Can I sell to learners outside India?", answer: "Yes. Connect [Stripe](/integrations/stripe) or DOKU to accept international cards and currencies alongside Razorpay." },
      { question: "Which other gateways does LMS Domain support?", answer: "Paytm, Stripe and DOKU, as well as Razorpay." },
    ],
    related: ["stripe", "whatsapp", "zoom"],
  },
  {
    slug: "stripe",
    name: "Stripe",
    category: "Payments",
    summary: "Accept international cards in USD, EUR, GBP and more, paid straight to your Stripe account.",
    metaTitle: "Stripe Integration: Sell Courses Internationally",
    metaDescription:
      "Connect your Stripe account to LMS Domain and sell courses to learners worldwide in USD, EUR, GBP and other currencies. Payments go straight to you with 0% commission.",
    title: "Sell courses worldwide with Stripe",
    subtitle:
      "Connect your own Stripe account and accept international cards in the currencies your account supports. Payments go straight to you, and LMS Domain takes 0% commission.",
    facts: [
      { label: "Plans", value: "Every plan" },
      { label: "You need", value: "Your own Stripe account" },
      { label: "Commission", value: "0%: only Stripe's own fee" },
    ],
    tableTitle: "What LMS Domain does with Stripe",
    table: [
      { feature: "Checkout", how: "Learners pay on your academy's own checkout" },
      { feature: "Currencies", how: "USD, EUR, GBP and the other currencies your Stripe account supports" },
      { feature: "Settlement", how: "Straight into your Stripe account; LMS Domain never holds your money" },
      { feature: "Alongside local payments", how: "Use Stripe for international learners and Razorpay or Paytm for INR" },
      { feature: "Coupons", how: "Discount coupons on every plan" },
      { feature: "Subscriptions and bundles", how: "From Growth" },
    ],
    steps: [
      { title: "Use your Stripe account", text: "Create a Stripe account for your business, or use the one you have." },
      { title: "Connect it", text: "Connect your Stripe account in your LMS Domain admin." },
      { title: "Set prices", text: "Set course prices in the currencies you sell in." },
      { title: "Get paid", text: "Learners pay by card and the money settles to your Stripe account." },
    ],
    useCases: [
      { title: "Academies with learners abroad", text: "Teach learners in several countries and let them pay in their own currency." },
      { title: "Training companies", text: "Sell programmes to international clients by card." },
      { title: "Language academies", text: "Reach learners worldwide without a marketplace taking a share." },
    ],
    faqs: [
      { question: "Does LMS Domain take a share of my sales?", answer: "No. LMS Domain charges 0% commission on every plan. Stripe charges its own processing fee." },
      { question: "Which currencies can I sell in?", answer: "The currencies your Stripe account supports, such as USD, EUR and GBP. Stripe's availability depends on the country your business is in." },
      { question: "Can I use Stripe and Razorpay together?", answer: "Yes. Use Stripe for international cards alongside the local payment methods you offer, such as [Razorpay](/integrations/razorpay) for INR." },
      { question: "Can I sell subscriptions?", answer: "Subscriptions and bundles are included from Growth." },
    ],
    related: ["razorpay", "whatsapp", "zoom"],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    category: "Messages",
    summary: "Class, test and homework reminders sent from your own WhatsApp Business number.",
    metaTitle: "WhatsApp Reminders for Your Online Academy",
    metaDescription:
      "Send class, test and homework reminders on WhatsApp from your academy's own WhatsApp Business number. Included on every LMS Domain plan.",
    title: "WhatsApp reminders from your academy's own number",
    subtitle:
      "Connect your academy's WhatsApp Business number and LMS Domain sends class, test and homework reminders on WhatsApp, where learners actually read them. Messages come from your number, under your name.",
    facts: [
      { label: "Plans", value: "Every plan" },
      { label: "You need", value: "Your own WhatsApp Business number (Meta)" },
      { label: "Messages from", value: "Your academy's number" },
    ],
    tableTitle: "What LMS Domain sends on WhatsApp",
    table: [
      { feature: "Class reminders", how: "Before each live class, with the class details" },
      { feature: "Test reminders", how: "When a test is coming up" },
      { feature: "Homework reminders", how: "When an assignment is due" },
      { feature: "Batch announcements", how: "Class schedules and updates for a batch" },
      { feature: "Sender", how: "Your academy's own WhatsApp Business number" },
      { feature: "Other channels", how: "Email on every plan, SMS from Growth, and push notifications in the app" },
    ],
    steps: [
      { title: "Set up WhatsApp Business", text: "Set up your academy's number on Meta's WhatsApp Business Platform." },
      { title: "Connect it", text: "Connect your WhatsApp Business number in your LMS Domain admin." },
      { title: "Teach as usual", text: "Schedule classes, tests and homework the way you already do." },
      { title: "Learners are reminded", text: "Reminders go out on WhatsApp from your number." },
    ],
    useCases: [
      { title: "Coaching institutes", text: "Fewer missed classes when the reminder lands where learners and parents already chat." },
      { title: "Test-prep academies", text: "Remind learners before every mock test." },
      { title: "Solo educators", text: "Keep a small group on track without sending messages by hand." },
    ],
    faqs: [
      { question: "Which number do the messages come from?", answer: "Your academy's own WhatsApp Business number, which you connect in the admin." },
      { question: "Which plans include WhatsApp reminders?", answer: "Every plan, including Starter. See [pricing](/pricing)." },
      {
        question: "Does Meta charge for the messages?",
        answer: "Meta may charge for business messages under its own WhatsApp pricing. Because the messages come from your WhatsApp Business account, those charges are billed by Meta to you.",
      },
      { question: "Are SMS reminders available too?", answer: "Yes, from Growth. Email reminders are on every plan, and the app sends push notifications." },
    ],
    related: ["zoom", "razorpay", "google-meet"],
  },
];

/** Also connects (shown on /integrations without their own page). */
export const MORE_INTEGRATIONS: { name: string; text: string }[] = [
  { name: "Paytm", text: "INR payments with UPI and the Paytm wallet, on every plan." },
  { name: "DOKU", text: "Payments for learners in Southeast Asia, on every plan." },
  { name: "SCORM and xAPI", text: "Import SCORM and xAPI courses, from Growth." },
  { name: "API and webhooks", text: "Connect your own systems, from Growth." },
  { name: "Single sign-on (SSO)", text: "Staff and learners sign in with existing accounts, on Pro and up." },
];

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = ["Live classes", "Payments", "Messages"];

export const getIntegration = (slug: string) => INTEGRATIONS.find((i) => i.slug === slug);
