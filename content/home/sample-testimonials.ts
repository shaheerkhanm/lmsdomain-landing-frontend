// ============================================================================
// Sample testimonials: LOCAL DESIGN PREVIEW ONLY
// These people and quotes are not real customers. Loaded only through a dynamic
// import in getHomeTestimonials() when CMS_USE_FIXTURES === "true". Never import
// this file statically from a page or client component.
// ============================================================================

import type { CtaTestimonial, TestimonialItem } from "@/types/content";

export const SAMPLE_TESTIMONIAL_CARDS: TestimonialItem[] = [
  {
    id: "testimonial-1",
    name: "Elena Rostova",
    role: "Founder, Apex Design Academy",
    avatar: "/assets/img/home/testimonials/author-1.jpg",
    quote:
      "Moving our courses to one platform saved our team hours every week. Learners find everything in one place without switching tools.",
    date: "Oct 14, 2026",
    social: "linkedin",
    placeholder: true,
  },
  {
    id: "testimonial-2",
    name: "Marcus Vance",
    role: "Head of Training, CloudScale Labs",
    avatar: "/assets/img/home/testimonials/author-2.jpg",
    quote:
      "The video watermarking and automated quiz grading gave us full confidence in expanding our certification cohorts globally.",
    date: "Sep 28, 2026",
    social: "twitter",
    placeholder: true,
  },
  {
    id: "testimonial-3",
    name: "Priya Sharma",
    role: "Director of Learning, DataBridge Institute",
    avatar: "/assets/img/home/testimonials/author-3.jpg",
    quote:
      "Live Zoom classes paired with instant student progress tracking made our bootcamps feel truly personal and engaging.",
    date: "Aug 19, 2026",
    social: "linkedin",
    placeholder: true,
  },
  {
    id: "testimonial-4",
    name: "David Chen",
    role: "Lead Instructor, CodeCraft Academy",
    avatar: "/assets/img/home/testimonials/author-4.jpg",
    quote:
      "Our completion rates jumped 35% once students could ask the AI tutor questions directly inside their course lessons.",
    date: "Jul 11, 2026",
    social: "twitter",
    placeholder: true,
  },
  {
    id: "testimonial-5",
    name: "Sarah Jenkins",
    role: "Founder & CEO, Horizon Leadership",
    avatar: "/assets/img/home/testimonials/author-5.jpg",
    quote:
      "Everything runs smoothly under our own custom domain. Setting up payment gateways and issuing certificates took minutes.",
    date: "May 22, 2026",
    social: "linkedin",
    placeholder: true,
  },
];

// Floating cards around the sphere in CtaSection, in slot order
export const SAMPLE_CTA_TESTIMONIALS: CtaTestimonial[] = [
  {
    id: "sample-cta-1",
    avatar: "/assets/img/reference/avatar-top.png",
    text: "At our firm, we heavily rely on LMS Domain to effectively communicate with countless cohorts on a weekly basis.",
  },
  {
    id: "sample-cta-2",
    avatar: "/assets/img/reference/avatar-top-left.png",
    text: "Each week, we connect with many cohorts through LMS Domain, boosting our outreach.",
  },
  {
    id: "sample-cta-3",
    avatar: "/assets/img/reference/avatar-top-right.png",
    text: "We depend on LMS Domain to send messages to a large number of students each week.",
  },
  {
    id: "sample-cta-4",
    avatar: "/assets/img/reference/avatar-mid-left.png",
    text: "My company uses LMS Domain – to text with thousands of learners every week. We run a technical academy and the effort of administration is zero.",
    author: "Darius Salehipour",
    role: "Head of Product",
    highlight: "Thousands of active cohorts",
  },
  {
    id: "sample-cta-5",
    avatar: "/assets/img/reference/avatar-mid-right.png",
    text: "In our thriving academy business, we utilize LMS Domain to efficiently handle a multitude of inquiries from prospective students each week.",
    author: "Melanie Jackson",
    role: "Project Manager",
  },
  {
    id: "sample-cta-6",
    avatar: "/assets/img/reference/avatar-bot-left.png",
    text: "We use LMS Domain to coordinate multi-faculty batches on a weekly basis.",
  },
  {
    id: "sample-cta-7",
    avatar: "/assets/img/reference/avatar-bot-right.png",
    text: "Our company leverages LMS Domain to deliver structured courses with watermarked video lessons.",
  },
];
