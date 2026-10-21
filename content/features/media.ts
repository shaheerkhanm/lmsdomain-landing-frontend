export interface MediaSlot {
  id: string;
  kind: "photo" | "video";
  src: string;
  poster?: string;
  alt: string;
  credit?: {
    photographer: string;
    profileUrl?: string;
    pageUrl: string;
    sourceName: string;
    license: string;
  };
}

export const FEATURES_MEDIA: Record<string, MediaSlot> = {
  "audience-institutes": {
    id: "audience-institutes",
    kind: "photo",
    src: "/images/features/audience-institutes.webp",
    alt: "Training institute educator presenting lesson to academy students in classroom",
    credit: {
      photographer: "Yan Krukau",
      profileUrl: "https://www.pexels.com/@yankrukau/",
      pageUrl: "https://www.pexels.com/photo/professor-standing-in-front-of-his-students-8197551/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "audience-coaches": {
    id: "audience-coaches",
    kind: "photo",
    src: "/images/features/audience-coaches.webp",
    alt: "Creator recording educational course lesson at studio desk with microphone",
    credit: {
      photographer: "Benjamin Dominguez",
      profileUrl: "https://www.pexels.com/@benjamin-dominguez-284998877/",
      pageUrl: "https://www.pexels.com/photo/man-sitting-at-a-desk-next-to-a-microphone-14772072/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "audience-corporate": {
    id: "audience-corporate",
    kind: "photo",
    src: "/images/features/audience-corporate.webp",
    alt: "Corporate team conducting employee onboarding and training session with laptop",
    credit: {
      photographer: "MART PRODUCTION",
      profileUrl: "https://www.pexels.com/@mart-production/",
      pageUrl: "https://www.pexels.com/photo/woman-in-glasses-smiling-and-pointing-at-laptop-while-standing-near-colleagues-7644071/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "live-class-loop": {
    id: "live-class-loop",
    kind: "video",
    src: "/videos/features/live_class_loop.mp4",
    poster: "/videos/features/live_class_poster.webp",
    alt: "Educator conducting live interactive lecture from desk",
    credit: {
      photographer: "Katerina Holmes",
      profileUrl: "https://www.pexels.com/@katerina-holmes/",
      pageUrl: "https://www.pexels.com/video/woman-teaching-an-online-class-5904592/",
      sourceName: "Pexels Videos",
      license: "Free Commercial License",
    },
  },
  "live-class-screen": {
    id: "live-class-screen",
    kind: "photo",
    src: "/images/features/live-class-screen.webp",
    alt: "Interactive live classroom video conference on laptop screen",
    credit: {
      photographer: "Artem Podrez",
      profileUrl: "https://www.pexels.com/@artempodrez/",
      pageUrl: "https://www.pexels.com/photo/photo-of-a-woman-on-the-screen-of-a-laptop-8512131/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "cohort-workshop": {
    id: "cohort-workshop",
    kind: "photo",
    src: "/images/features/cohort-workshop.webp",
    alt: "Cohort bootcamp learners collaborating during scheduled workshop session",
    credit: {
      photographer: "Walls.io",
      profileUrl: "https://www.pexels.com/@walls-io/",
      pageUrl: "https://www.pexels.com/photo/colleagues-standing-by-whiteboard-17724731/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "one-to-one-tutor": {
    id: "one-to-one-tutor",
    kind: "photo",
    src: "/images/features/one-to-one-tutor.webp",
    alt: "Tutor providing individual guidance to learner in 1-on-1 coaching session",
    credit: {
      photographer: "Ahmet Kurt",
      profileUrl: "https://www.pexels.com/@ahmetkurt/",
      pageUrl: "https://www.pexels.com/photo/teacher-assisting-student-in-classroom-setting-35745569/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "team-training-office": {
    id: "team-training-office",
    kind: "photo",
    src: "/images/features/team-training-office.webp",
    alt: "Team training presentation for enterprise employee development",
    credit: {
      photographer: "Pavel Danilyuk",
      profileUrl: "https://www.pexels.com/@pavel-danilyuk/",
      pageUrl: "https://www.pexels.com/photo/man-in-black-blazer-having-a-presentation-8761327/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "learner-studying-ai": {
    id: "learner-studying-ai",
    kind: "photo",
    src: "/images/features/learner-studying-ai.webp",
    alt: "Student asking HelpDesk AI questions while studying on laptop",
    credit: {
      photographer: "Zen Chung",
      profileUrl: "https://www.pexels.com/@zen-chung/",
      pageUrl: "https://www.pexels.com/photo/crop-multiethnic-students-with-laptop-studying-at-table-5537527/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "course-checkout-browsing": {
    id: "course-checkout-browsing",
    kind: "photo",
    src: "/images/features/course-checkout-browsing.webp",
    alt: "Student exploring course catalogue and checkout storefront on laptop",
    credit: {
      photographer: "Vitaly Gariev",
      profileUrl: "https://www.pexels.com/@vitaly-gariev/",
      pageUrl: "https://www.pexels.com/photo/a-man-in-glasses-and-a-suit-is-sitting-at-a-table-with-a-laptop-23496958/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "branding-institute-desk": {
    id: "branding-institute-desk",
    kind: "photo",
    src: "/images/features/branding-institute-desk.webp",
    alt: "Academy administrator workspace configured with custom domain and brand identity",
    credit: {
      photographer: "Kaboompics.com",
      profileUrl: "https://www.pexels.com/@kaboompics/",
      pageUrl: "https://www.pexels.com/photo/laptop-and-notebook-on-brown-wooden-table-8092461/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  "instructor-grading-review": {
    id: "instructor-grading-review",
    kind: "photo",
    src: "/images/features/instructor-grading-review.webp",
    alt: "Instructor reviewing and grading course assignment submission",
    credit: {
      photographer: "Andy Barbour",
      profileUrl: "https://www.pexels.com/@andy-barbour/",
      pageUrl: "https://www.pexels.com/photo/a-person-holding-a-marker-6684360/",
      sourceName: "Pexels",
      license: "Free Commercial License",
    },
  },
  // In-repo assets reused
  "course-learning-instructor": {
    id: "course-learning-instructor",
    kind: "photo",
    src: "/assets/img/home/features/instructor_lesson.jpg",
    alt: "Instructor recording structured video lesson",
    credit: {
      photographer: "LMS Domain Brand Asset",
      pageUrl: "https://lmsdomain.com",
      sourceName: "In-repo asset",
      license: "Proprietary",
    },
  },
  "course-learning-student": {
    id: "course-learning-student",
    kind: "photo",
    src: "/assets/img/home/features/learner_laptop.jpg",
    alt: "Student completing video lecture on laptop",
    credit: {
      photographer: "LMS Domain Brand Asset",
      pageUrl: "https://lmsdomain.com",
      sourceName: "In-repo asset",
      license: "Proprietary",
    },
  },
  "assessment-learner-quiz": {
    id: "assessment-learner-quiz",
    kind: "photo",
    src: "/assets/img/home/features/learner_quiz.jpg",
    alt: "Learner taking online quiz assessment",
    credit: {
      photographer: "LMS Domain Brand Asset",
      pageUrl: "https://lmsdomain.com",
      sourceName: "In-repo asset",
      license: "Proprietary",
    },
  },
};
