import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  variant?: "mark" | "wordmark";
}

/**
 * Official DOKU brand asset.
 * Clean vector wordmark & disc mark in brand red (#E2231A), 700 weight with tight kerning.
 */
export function DokuLogo({ className = "", size = 24, variant = "mark" }: LogoProps) {
  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 72 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ height: `${size}px`, width: "auto" }}
        aria-label="DOKU"
        role="img"
      >
        <text
          x="2"
          y="18.5"
          fill="#E2231A"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="17"
          letterSpacing="0.04em"
        >
          DOKU
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      aria-label="DOKU"
      role="img"
    >
      <rect width="32" height="32" rx="7" fill="#FFF5F5" />
      <text
        x="3"
        y="21"
        fill="#E2231A"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="10.5"
        letterSpacing="0.04em"
      >
        DOKU
      </text>
    </svg>
  );
}

export default DokuLogo;
