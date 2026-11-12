import React from "react";

export interface DuotoneIconProps {
  className?: string;
  size?: number;
}

/**
 * Duotone Learners: Two overlapping people.
 * Back person is light #C9BCFF, front person is solid violet #6C4BFF.
 */
export function DuotoneLearners({ className = "", size = 48 }: DuotoneIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Back Person (Light #C9BCFF) */}
      <circle cx="18" cy="14" r="7" fill="#C9BCFF" />
      <path
        d="M6 38C6 30.268 12.268 24 20 24H22C23.85 24 25.59 24.36 27.16 25.02C26.43 26.63 26 28.43 26 30.33V38H6Z"
        fill="#C9BCFF"
      />

      {/* Front Person (Solid Violet #6C4BFF) */}
      <circle cx="32" cy="18" r="7" fill="#6C4BFF" />
      <path
        d="M20 40C20 33.373 25.373 28 32 28C38.627 28 44 33.373 44 40H20Z"
        fill="#6C4BFF"
      />
    </svg>
  );
}

/**
 * Duotone Courses: Open book.
 * Light #C9BCFF pages with solid violet #6C4BFF spine & center ribbon.
 */
export function DuotoneCourses({ className = "", size = 48 }: DuotoneIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Open Pages (Light #C9BCFF) */}
      <path
        d="M24 14C19 9.5 10 9 6 10V36C10 35 19 35.5 24 40C29 35.5 38 35 42 36V10C38 9 29 9.5 24 14Z"
        fill="#C9BCFF"
      />
      {/* Spine & Center Binding Accent (Solid Violet #6C4BFF) */}
      <path
        d="M24 12V40"
        stroke="#6C4BFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Bookmark Ribbon */}
      <path
        d="M24 14V26L21 23L18 26V11.5"
        fill="#6C4BFF"
      />
    </svg>
  );
}

/**
 * Duotone Lessons: Document with a violet play triangle.
 * Light #C9BCFF document sheet with solid violet #6C4BFF play button.
 */
export function DuotoneLessons({ className = "", size = 48 }: DuotoneIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Document Sheet (Light #C9BCFF) */}
      <path
        d="M10 8C10 5.791 11.791 4 14 4H28L38 14V40C38 42.209 36.209 44 34 44H14C11.791 44 10 42.209 10 40V8Z"
        fill="#C9BCFF"
      />
      {/* Folded Corner flap */}
      <path
        d="M28 4V14H38"
        fill="#B5A4FF"
        opacity="0.8"
      />
      {/* Centered Play Triangle (Solid Violet #6C4BFF) */}
      <path
        d="M21 21L29 26L21 31V21Z"
        fill="#6C4BFF"
      />
    </svg>
  );
}

/**
 * Duotone Live Classes: Video camera with small violet live dot.
 * Light #C9BCFF camera body with solid violet #6C4BFF lens cone & live dot.
 */
export function DuotoneLiveClasses({ className = "", size = 48 }: DuotoneIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Camera Body (Light #C9BCFF) */}
      <rect x="6" y="14" width="24" height="20" rx="5" fill="#C9BCFF" />

      {/* Lens Cone (Solid Violet #6C4BFF) */}
      <path
        d="M30 20.5L41 14.5V33.5L30 27.5V20.5Z"
        fill="#6C4BFF"
      />

      {/* Red/Violet Live Indicator Dot */}
      <circle cx="12" cy="19" r="2.5" fill="#6C4BFF" />
    </svg>
  );
}
