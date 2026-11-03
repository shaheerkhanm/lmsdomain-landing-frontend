export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface NavigationConfig {
  marketingNav: NavItem[];
  homeNav: NavItem[];
  authNav: {
    login: NavItem;
    signup: NavItem;
  };
  cta: {
    label: string;
    action: "modal" | "link";
    href?: string;
  };
}

export const navigationConfig: NavigationConfig = {
  marketingNav: [
    { label: "Features", href: "/features" },
    { label: "Domie AI", href: "/ai" },
    { label: "Pricing", href: "/pricing" },
    { label: "Custom Plan", href: "/custom-lms", badge: "New" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  homeNav: [
    { label: "Features", href: "#features" },
    { label: "AI Studio", href: "#extension" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
  ],
  authNav: {
    login: { label: "Log in", href: "/login" },
    signup: { label: "Sign up", href: "/signup" },
  },
  cta: {
    label: "Request Demo",
    action: "modal",
  },
};
