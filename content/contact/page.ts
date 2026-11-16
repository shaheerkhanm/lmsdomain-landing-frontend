import type { ContactHero, ContactFormConfig, ContactTopic } from "@/types/content";

export const DEFAULT_CONTACT_HERO: ContactHero = {
  eyebrow: "Contact",
  title: "Let's talk about your academy",
  subtitle:
    "Questions about plans, a demo, moving from another platform or getting set up? Send us a message and our team will get back to you.",
};

export const DEFAULT_CONTACT_FORM_CONFIG: ContactFormConfig = {
  submitLabel: "Send message",
  successTitle: "Message received",
  successMessage:
    "Thank you for reaching out. We will review your message and get back to you soon.",
  privacyNote: undefined,
};

export const DEFAULT_CONTACT_TOPICS: ContactTopic[] = [
  { id: "demo", label: "Request a demo" },
  { id: "pricing", label: "Pricing and plans" },
  { id: "custom-plan", label: "Custom plan" },
  { id: "support", label: "Support" },
  { id: "partnership", label: "Partnership" },
  { id: "other", label: "Something else" },
];
