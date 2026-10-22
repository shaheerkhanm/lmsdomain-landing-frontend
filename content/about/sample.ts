import type {
  AboutMission,
  AboutStory,
  AboutValues,
  AboutTimeline,
  AboutTeam,
  AboutStats,
  AboutCareers,
} from "@/types/content";

/**
 * Creates a clean, vector SVG initials avatar in #EEE9FF with #7B5CF5 typography.
 * Follows design requirements: obviously sample, zero stock faces, zero network fetch.
 */
function createInitialsAvatar(initials: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="20" fill="#EEE9FF"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="700" fill="#7B5CF5">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_ABOUT_HERO_IMAGE = "/images/features/team-training-office.webp";

export const SAMPLE_ABOUT_MISSION: AboutMission = {
  title: "Mission Statement",
  statement:
    "We build reliable learning architecture that empowers institutions, academies, and enterprise teams to deliver verifiable, cohort-driven education at scale.",
};

export const SAMPLE_ABOUT_STORY: AboutStory = {
  title: "Sample Story: Building Modern Academy Infrastructure",
  body:
    "LMS Domain was created to solve fragmentation in modern digital learning. Most organizations are forced to stitch together separate software tools for video hosting, graded assessments, discussion forums, and credential management.\n\nWe unified the academy stack into a cohesive platform—combining structured course modules, automated grading, live classroom sessions, and AI-assisted tutoring into a dependable system for educators and learners worldwide.",
  image: "/images/features/cohort-workshop.webp",
};

export const SAMPLE_ABOUT_VALUES: AboutValues = {
  title: "Our Core Principles",
  subtitle: "Instructional standards designed around real learning outcomes and institutional scale.",
  items: [
    {
      title: "Sample Value: Structured Learning Pedagogy",
      description:
        "Modules, sequential lessons, and verifiable checkpoints that ensure comprehensive subject mastery rather than passive video consumption.",
    },
    {
      title: "Sample Value: Unified Learning Infrastructure",
      description:
        "Combining video streaming, graded assessments, cohort forums, and accredited certificates in one integrated operational system.",
    },
    {
      title: "Sample Value: Rigorous Academic Integrity",
      description:
        "Automated quiz randomization, time limits, plagiarism safeguards, and verifiable credential verification.",
    },
    {
      title: "Sample Value: Purposeful Intelligence",
      description:
        "Grounded AI tutoring that references only approved course materials and citations, providing instant learning support with administrator oversight.",
    },
  ],
};

export const SAMPLE_ABOUT_TIMELINE: AboutTimeline = {
  title: "Platform Journey",
  subtitle: "Iterative architectural development focused on learner achievement and administrative control.",
  items: [
    {
      date: "Year 1",
      title: "Core Learning Management",
      description:
        "Initial release of modular course builder, secure video delivery, and student enrollment engine.",
    },
    {
      date: "Year 2",
      title: "Assessments & Certification",
      description:
        "Introduced graded quizzes, automated instructor reviews, and tamper-proof certificate generation.",
    },
    {
      date: "Year 3",
      title: "Cohorts & Live Classes",
      description:
        "Expanded to live interactive classrooms, discussion forums, and multi-instructor workspaces.",
    },
    {
      date: "Year 4",
      title: "AI-Assisted Learning Architecture",
      description:
        "Integrated grounded Domie AI assistant and automated knowledge indexing for academies.",
    },
  ],
};

export const SAMPLE_ABOUT_TEAM: AboutTeam = {
  title: "Meet Our Leadership",
  subtitle: "Experienced architects across instructional design, distributed engineering, and student success.",
  members: [
    {
      name: "Sample Name 1",
      role: "Sample Role: Instructional Design",
      photo: createInitialsAvatar("SN1"),
      linkedinUrl: "https://linkedin.com",
    },
    {
      name: "Sample Name 2",
      role: "Sample Role: Platform Engineering",
      photo: createInitialsAvatar("SN2"),
      linkedinUrl: "https://linkedin.com",
    },
    {
      name: "Sample Name 3",
      role: "Sample Role: Product Architecture",
      photo: createInitialsAvatar("SN3"),
      linkedinUrl: "https://linkedin.com",
    },
    {
      name: "Sample Name 4",
      role: "Sample Role: Academy Operations",
      photo: createInitialsAvatar("SN4"),
      linkedinUrl: "https://linkedin.com",
    },
  ],
};

export const SAMPLE_ABOUT_STATS: AboutStats = {
  title: "Academy Scale & Benchmarks",
  items: [
    {
      value: "00",
      label: "Sample stat: Active Academies",
      source: "Sample verification metric",
    },
    {
      value: "00",
      label: "Sample stat: Course Completion Rate",
      source: "Sample performance benchmark",
    },
    {
      value: "00",
      label: "Sample stat: Global Countries Served",
      source: "Sample platform telemetry",
    },
  ],
};

export const SAMPLE_ABOUT_CAREERS: AboutCareers = {
  title: "Sample Careers: Build the Future of Learning Systems",
  description:
    "We are expanding our core team of curriculum architects, distributed systems engineers, and learning designers. Explore open positions to join us in scaling educational technology.",
  cta: {
    label: "View Open Positions (Sample)",
    href: "/contact",
  },
};
