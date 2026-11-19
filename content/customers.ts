// ============================================================================
// Customers page content (built-in defaults).
// Editable in Admin > Website > Customers: one CMS entry per section (slugs in
// CUSTOMERS_SLUGS, page "customers-page"), the section object in `data`. The
// admin's values win; missing, hidden or empty entries use the text below.
// Pictures and animations stay in the code; testimonials and client logos have
// their own admin screens (Home > Testimonials, Home > Client logos).
// ============================================================================

import { mergeSection } from "./merge";

export interface CustomersAcademy {
  name: string;
  text: string;
  points: string[];
  statValue: string;
  statLabel: string;
  personName: string;
  personRole: string;
  link: string;
}

export interface CustomersContent {
  hero: { titleBefore: string; titleHighlight: string; titleAfter: string; subtitle: string; primaryButton: string; secondaryButton: string };
  numbers: { items: { value: string; label: string; text: string }[] };
  academies: { eyebrow: string; title: string; subtitle: string; items: CustomersAcademy[] };
  why: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  stories: { logosHeading: string; testimonialsTitle: string };
  cta: { eyebrow: string; title: string; text: string; primaryButton: string; secondaryButton: string };
}

export type CustomersSection = keyof CustomersContent;

/** CMS entry per section (Admin > Website > Customers). */
export const CUSTOMERS_SLUGS: Record<CustomersSection, { slug: string; label: string }> = {
  hero: { slug: "site-customers-hero", label: "Customers: Top of the page" },
  numbers: { slug: "site-customers-numbers", label: "Customers: Numbers" },
  academies: { slug: "site-customers-academies", label: "Customers: Every kind of academy" },
  why: { slug: "site-customers-why", label: "Customers: Why academies choose us" },
  stories: { slug: "site-customers-stories", label: "Customers: Logos and testimonials headings" },
  cta: { slug: "site-customers-cta", label: "Customers: Closing call to action" },
};

export const CUSTOMERS_DEFAULTS: CustomersContent = {
  hero: {
    titleBefore: "Academies that",
    titleHighlight: "teach and grow",
    titleAfter: "with LMS Domain",
    subtitle:
      "Coaching institutes, language schools, training companies and independent educators run their courses, live classes and payments on LMS Domain, under their own brand.",
    primaryButton: "Book a demo",
    secondaryButton: "See pricing",
  },
  numbers: {
    items: [
      { value: "2,000+", label: "Learners", text: "learning on academies built with LMS Domain" },
      { value: "100+", label: "Courses", text: "published by educators on the platform" },
      { value: "300+", label: "Lessons", text: "of video, PDF and quizzes delivered" },
      { value: "100+", label: "Live classes", text: "taught live from LMS Domain" },
    ],
  },
  academies: {
    eyebrow: "Who uses it",
    title: "Built for every kind of academy",
    subtitle: "Different ways of teaching, one platform. Pick a type of academy and watch it run.",
    items: [
      {
        name: "Coaching institutes",
        text: "Run morning, evening and weekend batches with live classes, mock tests and fees in one place.",
        points: ["Batch timetables and drip release", "Attendance logged automatically", "Mock tests with instant ranks", "Online fees and reminders"],
        statValue: "23/24",
        statLabel: "joined today",
        personName: "Daniel Reyes",
        personRole: "Maths teacher, coaching institute",
        link: "/solutions/coaching-institutes",
      },
      {
        name: "Language academies",
        text: "Prepare learners for any language or exam with practice tests and private feedback on their writing.",
        points: ["Timed practice tests", "Essay reviews with private feedback", "Scores in every learner's profile", "Fees in many currencies"],
        statValue: "7/9",
        statLabel: "latest essay",
        personName: "Mia Collins",
        personRole: "English teacher, language academy",
        link: "/solutions/language-test-prep-academies",
      },
      {
        name: "Training companies",
        text: "Deliver private programmes for each client, certify the people who finish and report on progress.",
        points: ["A private batch per client", "Project reviews by trainers", "Branded certificates", "Completion reports in a click"],
        statValue: "28",
        statLabel: "certified",
        personName: "Sarah Lee",
        personRole: "Head of training delivery",
        link: "/solutions/training-companies",
      },
      {
        name: "Solo educators",
        text: "Sell courses, workshops, 1:1 sessions and ebooks on your own website, and keep every sale.",
        points: ["Your own branded academy", "Paid 1:1 bookings", "Live workshops", "0% commission on sales"],
        statValue: "$1,486",
        statLabel: "this week",
        personName: "Priya Sharma",
        personRole: "Independent data tutor",
        link: "/solutions/solo-educators",
      },
    ],
  },
  why: {
    eyebrow: "Why academies switch",
    title: "Why academies choose LMS Domain",
    items: [
      { title: "0% commission", text: "Payments go straight to your account. We never take a cut of your sales." },
      { title: "Your own domain", text: "Your own web address on Growth and up (a free subdomain on Starter), with your logo and colours on every plan." },
      { title: "Setup help from our team", text: "We help you get courses, domain and payments ready, so you launch fast." },
      { title: "One platform, not five", text: "Teaching, tests, payments and your website in one place, with one login." },
    ],
  },
  stories: {
    logosHeading: "Academies teaching with LMS Domain",
    testimonialsTitle: "What academies say about LMS Domain",
  },
  cta: {
    eyebrow: "Customer stories",
    title: "Want to hear how an academy like yours runs on LMS Domain?",
    text: "Detailed case studies are on the way. In the meantime, book a call and our team will walk you through real setups for academies like yours.",
    primaryButton: "Book a demo",
    secondaryButton: "Contact us",
  },
};

export const mergeCustomersSection = mergeSection;
