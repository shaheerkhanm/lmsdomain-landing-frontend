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
          description: "Recorded courses, drip release and Zoom live classes",
        },
        {
          label: "Assess",
          href: "/platform/assess",
          description: "Quizzes, assignments with review and certificates",
        },
        {
          label: "Manage",
          href: "/platform/manage",
          description: "Batches, attendance, learners, RBAC and notifications",
        },
        {
          label: "Sell",
          href: "/platform/sell",
          description: "Multi-currency checkout, Stripe, Razorpay and coupons",
        },
        {
          label: "Brand",
          href: "/platform/brand",
          description: "Your own custom domain, white-label academy and theme",
        },
        {
          label: "Domie AI",
          href: "/platform/ai",
          badge: "Premium",
          description: "Grounded AI assistant for learners and creators",
        },
        {
          label: "Security",
          href: "/platform/security",
          description: "Data protection, device limits and encrypted video",
        },
        {
          label: "All features",
          href: "/platform",
          description: "Explore the full LMS Domain capabilities",
        },
      ],
    },
    {
      label: "Solutions",
      children: [
        {
          label: "Language & test-prep academies",
          href: "/solutions/language-test-prep-academies",
          description: "For IELTS, PTE and language academies teaching in batches",
        },
        {
          label: "Training companies",
          href: "/solutions/training-companies",
          description: "For cohorts, corporate packages, bootcamps and tutor booking",
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
          description: "Articles, insights and academy growth playbooks",
        },
        {
          label: "Roadmap",
          href: "/roadmap",
          description: "See what we're building next",
        },
        {
          label: "About",
          href: "/about",
          description: "Our story, mission and the team behind LMS Domain",
        },
        {
          label: "Contact",
          href: "/contact",
          description: "Talk to our specialists or get support",
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
