import React from "react";

/* Google Play and Apple marks for small icon tiles and bubbles. */
export function GooglePlayIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 2.2 13.4 12l-9.8 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1Z" fill="#00D7FE" />
      <path d="m16.8 8.6-3.4 3.4-9.8-9.8c.3-.2.8-.2 1.2 0l12 6.4Z" fill="#32BBFF" />
      <path d="m16.8 15.4-12 6.4c-.4.2-.9.2-1.2 0l9.8-9.8 3.4 3.4Z" fill="#FF3A44" />
      <path d="M20.4 12c0 .5-.3 1-.8 1.2l-2.8 2.2-3.4-3.4 3.4-3.4 2.8 2.2c.5.2.8.7.8 1.2Z" fill="#FFD500" />
    </svg>
  );
}

export function AppleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#0A0A0B"
        d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z"
      />
    </svg>
  );
}

