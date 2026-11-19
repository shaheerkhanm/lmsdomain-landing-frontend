export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  badge?: string;
  children?: NavDropdownItem[];
  isExternal?: boolean;
}

export interface NavigationConfig {
  marketingNav: NavItem[];
  authNav: {
    login: { label: string; href: string };
    signup: { label: string; href: string };
  };
  cta: {
    label: string;
    action: "modal" | "link";
    href?: string;
  };
}

export const navigationConfig: NavigationConfig = {
  marketingNav: [
    {
      label: "Platform",
      children: [
        {
          label: "Teach",
          href: "/platform/teach",
          description: "Courses, drip release and live classes",
        },
        {
          label: "Assess",
          href: "/platform/assess",
          description: "Quizzes, mock tests and certificates",
        },
        {
          label: "Manage",
          href: "/platform/manage",
          description: "Batches, attendance and learners",
        },
        {
          label: "Sell",
          href: "/platform/sell",
          description: "Checkout in any currency, with coupons",
        },
        {
          label: "Brand",
          href: "/platform/brand",
          description: "Your domain, logo and colours",
        },
        {
          label: "Domie AI",
          href: "/platform/ai",
          badge: "Pro",
          description: "Answers learners from your lessons",
        },
        {
          label: "Security",
          href: "/platform/security",
          description: "DRM video, watermarks, SSO and device limits",
        },
        {
          label: "Mobile apps",
          href: "/platform/mobile-app",
          description: "Android and iOS apps, your own on Pro",
        },
        {
          label: "All features",
          href: "/platform",
          description: "Everything LMS Domain does, on one page",
        },
      ],
    },
    {
      label: "Solutions",
      children: [
        {
          label: "Coaching institutes",
          href: "/solutions/coaching-institutes",
          description: "Exam prep, live batches and fee collection",
        },
        {
          label: "Language & test-prep academies",
          href: "/solutions/language-test-prep-academies",
          description: "IELTS, PTE and language batches with mock tests",
        },
        {
          label: "Training companies",
          href: "/solutions/training-companies",
          description: "Cohorts, corporate packages and bootcamps",
        },
        {
          label: "Solo educators & creators",
          href: "/solutions/solo-educators",
          description: "Sell courses, cohorts and 1:1 sessions",
        },
      ],
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Customers",
      href: "/customers",
    },
    {
      label: "Resources",
      children: [
        {
          label: "Blog",
          href: "/resources/blog",
          description: "Practical guides for running an academy",
        },
        {
          label: "Roadmap",
          href: "/roadmap",
          description: "See what we're building next",
        },
        {
          label: "About",
          href: "/about",
          description: "Our story and the people behind LMS Domain",
        },
        {
          label: "Contact",
          href: "/contact",
          description: "Talk to our team or get support",
        },
      ],
    },
  ],
  authNav: {
    login: { label: "Log in", href: "/login" },
    signup: { label: "Sign up", href: "/signup" },
  },
  cta: {
    label: "Book a demo",
    action: "modal",
  },
};
