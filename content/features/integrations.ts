// ============================================================================
// Seamless Integrations: the tools shown on /features
// Same 12 integrations and logo files as the live site (main, 77ca9c0:
// components/sections/FeaturesPage/IntegrationBeamEffects.tsx and
// IntegrationMobileSection.tsx), which hard-codes them. Add or remove an item
// here; the layout places any count (6 to 24) automatically.
// ============================================================================

export interface Integration {
  name: string;
  logo: string;
  // Intrinsic logo size in px (the files are small PNGs; never shown larger)
  logoSize: number;
  category?: "Payments" | "Live classes" | "Automation" | "Marketing" | "Communication" | "Analytics";
}

export const INTEGRATIONS_HEADING = "Seamless Integrations";
export const INTEGRATIONS_SUBTITLE = "LMS Domain connects with your favorite tools for effortless workflows:";

export const INTEGRATIONS: Integration[] = [
  { name: "Razorpay", logo: "/assets/img/integration/integration-1.png", logoSize: 56, category: "Payments" },
  // Logo read as Pabbly Connect (green "P" mark); confirm before launch
  { name: "Pabbly Connect", logo: "/assets/img/integration/integration-2.png", logoSize: 28, category: "Automation" },
  { name: "Mailchimp", logo: "/assets/img/integration/integration-3.png", logoSize: 50, category: "Marketing" },
  { name: "Zapier", logo: "/assets/img/integration/integration-4.png", logoSize: 32, category: "Automation" },
  // Generic code icon on the live site (not a brand logo)
  { name: "Developer API", logo: "/assets/img/integration/integration-5.png", logoSize: 42, category: "Automation" },
  { name: "Zoom", logo: "/assets/img/integration/integration-6.png", logoSize: 50, category: "Live classes" },
  { name: "Microsoft Teams", logo: "/assets/img/integration/integration-7.png", logoSize: 34, category: "Live classes" },
  { name: "Stripe", logo: "/assets/img/integration/integration-8.png", logoSize: 54, category: "Payments" },
  { name: "Google Meet", logo: "/assets/img/integration/integration-9.png", logoSize: 27, category: "Live classes" },
  { name: "PayPal", logo: "/assets/img/integration/integration-10.png", logoSize: 38, category: "Payments" },
  { name: "Slack", logo: "/assets/img/integration/integration-11.png", logoSize: 36, category: "Communication" },
  { name: "Google Analytics", logo: "/assets/img/integration/integration-12.png", logoSize: 26, category: "Analytics" },
];
