import React from "react";

export interface DuotoneIconProps {
  className?: string;
  size?: number;
}

/**
 * Brand Gradient Duotone Icons:
 * Light base shape at 35% opacity, accent shape at 100% solid brand gradient (#E2539B -> #F2894A -> #7B5CFF).
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
      <defs>
        <linearGradient id="learnersBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2539B" />
          <stop offset="50%" stopColor="#F2894A" />
          <stop offset="100%" stopColor="#7B5CFF" />
        </linearGradient>
      </defs>

      {/* Back Person (Light 35% Opacity Gradient) */}
      <circle cx="18" cy="14" r="7" fill="url(#learnersBrandGrad)" opacity="0.35" />
      <path
        d="M6 38C6 30.268 12.268 24 20 24H22C23.85 24 25.59 24.36 27.16 25.02C26.43 26.63 26 28.43 26 30.33V38H6Z"
        fill="url(#learnersBrandGrad)"
        opacity="0.35"
      />

      {/* Front Person (Solid 100% Brand Gradient) */}
      <circle cx="32" cy="18" r="7" fill="url(#learnersBrandGrad)" />
      <path
        d="M20 40C20 33.373 25.373 28 32 28C38.627 28 44 33.373 44 40H20Z"
        fill="url(#learnersBrandGrad)"
      />
    </svg>
  );
}

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
      <defs>
        <linearGradient id="coursesBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2539B" />
          <stop offset="50%" stopColor="#F2894A" />
          <stop offset="100%" stopColor="#7B5CFF" />
        </linearGradient>
      </defs>

      {/* Open Pages (Light 35% Opacity Gradient) */}
      <path
        d="M24 14C19 9.5 10 9 6 10V36C10 35 19 35.5 24 40C29 35.5 38 35 42 36V10C38 9 29 9.5 24 14Z"
        fill="url(#coursesBrandGrad)"
        opacity="0.35"
      />

      {/* Spine & Center Binding Ribbon (Solid 100% Brand Gradient) */}
      <path
        d="M24 12V40"
        stroke="url(#coursesBrandGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M24 14V26L21 23L18 26V11.5"
        fill="url(#coursesBrandGrad)"
      />
    </svg>
  );
}

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
      <defs>
        <linearGradient id="lessonsBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2539B" />
          <stop offset="50%" stopColor="#F2894A" />
          <stop offset="100%" stopColor="#7B5CFF" />
        </linearGradient>
      </defs>

      {/* Document Sheet (Light 35% Opacity Gradient) */}
      <path
        d="M10 8C10 5.791 11.791 4 14 4H28L38 14V40C38 42.209 36.209 44 34 44H14C11.791 44 10 42.209 10 40V8Z"
        fill="url(#lessonsBrandGrad)"
        opacity="0.35"
      />

      {/* Folded Corner (Light Gradient Flap) */}
      <path
        d="M28 4V14H38"
        fill="url(#lessonsBrandGrad)"
        opacity="0.5"
      />

      {/* Centered Play Triangle (Solid 100% Brand Gradient) */}
      <path
        d="M21 21L29 26L21 31V21Z"
        fill="url(#lessonsBrandGrad)"
      />
    </svg>
  );
}

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
      <defs>
        <linearGradient id="liveBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2539B" />
          <stop offset="50%" stopColor="#F2894A" />
          <stop offset="100%" stopColor="#7B5CFF" />
        </linearGradient>
      </defs>

      {/* Camera Body (Light 35% Opacity Gradient) */}
      <rect x="6" y="14" width="24" height="20" rx="5" fill="url(#liveBrandGrad)" opacity="0.35" />

      {/* Lens Cone (Solid 100% Brand Gradient) */}
      <path
        d="M30 20.5L41 14.5V33.5L30 27.5V20.5Z"
        fill="url(#liveBrandGrad)"
      />

      {/* Live Indicator Dot */}
      <circle cx="12" cy="19" r="2.5" fill="url(#liveBrandGrad)" />
    </svg>
  );
}
