import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  variant?: "mark" | "wordmark";
}

/**
 * Official Razorpay vector brand asset.
 * Mark: Iconic Razorpay folded lightning 'R' in brand navy (#0C2340) & blue (#3395FF).
 * Wordmark: Razorpay mark + logotype.
 */
export function RazorpayLogo({ className = "", size = 24, variant = "mark" }: LogoProps) {
  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 120 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ height: `${size}px`, width: "auto" }}
        aria-label="Razorpay"
        role="img"
      >
        {/* Razorpay Mark */}
        <g transform="translate(0, 2) scale(1.0)">
          <path d="M19.63 0L9.21 6.8l-1.03 3.74 5.8-3.76L10.2 21h3.84L19.63 0z" fill="#0C2340" />
          <path d="M12.48 8.84L2.96 15.02l-1.6 5.98h7.88l3.24-12.16z" fill="#3395FF" />
        </g>
        {/* Logotype */}
        <text
          x="26"
          y="18.5"
          fill="#0C2340"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="15"
          letterSpacing="-0.02em"
        >
          Razorpay
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      aria-label="Razorpay"
      role="img"
    >
      <path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24z" fill="#0C2340" />
      <path d="M14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" fill="#3395FF" />
    </svg>
  );
}

export default RazorpayLogo;
