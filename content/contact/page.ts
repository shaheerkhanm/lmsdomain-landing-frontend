import type { ContactHero, ContactFormConfig, ContactTopic } from "@/types/content";

export const DEFAULT_CONTACT_HERO: ContactHero = {
  eyebrow: "✦ CONTACT",
  title: "Speak with Our Learning Architecture Specialists",
  subtitle:
    "Schedule a live platform walkthrough, evaluate pedagogy workflows, or discuss custom enterprise infrastructure tailored to your organization.",
};

export const DEFAULT_CONTACT_FORM_CONFIG: ContactFormConfig = {
  submitLabel: "Schedule Platform Walkthrough",
  successTitle: "Demo Request Received",
  successMessage:
    "Thank you for reaching out to LMS Domain. Our learning architecture specialists will review your requirements and get in touch within 24 hours to schedule your walkthrough.",
  privacyNote:
    "We treat institutional data with absolute discretion. No spam or unsolicited third-party disclosures.",
};

export const DEFAULT_CONTACT_TOPICS: ContactTopic[] = [
  { id: "platform-demo", label: "Request an Academy Demo" },
  { id: "enterprise", label: "Enterprise & Dedicated Infrastructure" },
  { id: "pricing-quote", label: "Pricing & Custom Quote" },
  { id: "drm-security", label: "Video DRM & Content Security" },
  { id: "general", label: "General Product Inquiry" },
];
