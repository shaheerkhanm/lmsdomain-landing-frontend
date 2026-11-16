import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  variant?: "mark" | "wordmark";
}

/**
 * Official Paytm vector brand asset.
 * Two-tone: "Pay" in brand navy (#002E6E), "tm" in brand cyan/blue (#00BAF2).
 */
export function PaytmLogo({ className = "", size = 24, variant = "mark" }: LogoProps) {
  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 76 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ height: `${size}px`, width: "auto" }}
        aria-label="Paytm"
        role="img"
      >
        <text
          x="2"
          y="18"
          fill="#002E6E"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="18"
          letterSpacing="-0.03em"
        >
          Pay
        </text>
        <text
          x="38"
          y="18"
          fill="#00BAF2"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="18"
          letterSpacing="-0.03em"
        >
          tm
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
      aria-label="Paytm"
      role="img"
    >
      <rect width="32" height="32" rx="7" fill="#F4F9FF" />
      <text
        x="3"
        y="21"
        fill="#002E6E"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="-0.03em"
      >
        Pay
      </text>
      <text
        x="21"
        y="17"
        fill="#00BAF2"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="10"
        letterSpacing="-0.02em"
      >
        tm
      </text>
    </svg>
  );
}

export default PaytmLogo;
