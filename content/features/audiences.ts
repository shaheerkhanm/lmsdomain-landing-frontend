// ============================================================================
// "Built for How You Teach" tabs on /features
// Fallback when the backend has no audiences (Admin > Features > Audiences).
// ============================================================================

export interface AudienceTab {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  photo: string;
  photoAlt: string;
  photoChip: string;
  photoChipColor?: string;
  features: { title: string; slug: string; tag: string }[];
}

export const AUDIENCE_TABS: AudienceTab[] = [
  {
    id: "institutes",
    label: "Training Institutes",
    heading: "Built for Professional Academies and Institutes",
    subheading:
      "Scale cohorts, manage teacher permissions, issue accredited certificates, and white-label your entire school.",
    photo: "/images/features/audience-institutes.webp",
    photoAlt: "Training Institute classroom with educator and learners",
    photoChip: "Training institute",
    photoChipColor: "bg-[#0D9488]",
    features: [
      { title: "Structured Courses", slug: "course-learning", tag: "Curriculums" },
      { title: "Graded Quizzes", slug: "assessment-and-evaluation", tag: "Testing" },
      { title: "Course Certificates", slug: "course-learning", tag: "Verifiable" },
      { title: "Role-Based Access Control", slug: "administration-and-communication", tag: "Admin" },
      { title: "Custom Domain with SSL", slug: "branding-website-and-reach", tag: "Branding" },
      { title: "Per-School Branding", slug: "branding-website-and-reach", tag: "White-Label" },
    ],
  },
  {
    id: "coaches",
    label: "Coaches and Creators",
    heading: "Designed for Solo Educators and Course Creators",
    subheading:
      "Draft courses with AI assistance, protect video content, and sell digital courses worldwide.",
    photo: "/images/features/audience-coaches.webp",
    photoAlt: "Coach and creator recording educational material at studio desk",
    photoChip: "Creator studio",
    photoChipColor: "bg-[#7B5CF5]",
    features: [
      { title: "Domie AI Content Generator", slug: "ai-powered-tools", tag: "AI Drafts" },
      { title: "HelpDesk AI Tutor", slug: "ai-powered-tools", tag: "24/7 Support" },
      { title: "Course Catalogue, Cart, and Wishlist", slug: "course-sales-and-payments", tag: "Storefront" },
      { title: "Coupons and Discounts", slug: "course-sales-and-payments", tag: "Marketing" },
      { title: "Video Watermarking", slug: "course-learning", tag: "DRM Protection" },
      { title: "One-to-One Tutor Booking", slug: "live-and-cohort-learning", tag: "1:1 Sessions" },
    ],
  },
  {
    id: "corporate",
    label: "Corporate Teams",
    heading: "Engineered for Enterprise Employee Onboarding and Training",
    subheading:
      "Automate corporate compliance training, track team progress with analytics, and allocate seat licenses effortlessly.",
    photo: "/images/features/audience-corporate.webp",
    photoAlt: "Corporate team collaborating around laptop in office meeting",
    photoChip: "Team training",
    photoChipColor: "bg-[#2563EB]",
    features: [
      { title: "Team Training Packages", slug: "live-and-cohort-learning", tag: "Seat Licenses" },
      { title: "Learner Device Limits", slug: "course-learning", tag: "Compliance" },
      { title: "Leaderboards and Points", slug: "learner-engagement", tag: "Gamification" },
      { title: "AI Prescriptive Analytics", slug: "ai-powered-tools", tag: "Risk Alerts" },
      { title: "Scheduled Content Release", slug: "course-learning", tag: "Drip Pacing" },
      { title: "Instructor Payouts and Revenue Reports", slug: "course-sales-and-payments", tag: "Reporting" },
    ],
  },
];
