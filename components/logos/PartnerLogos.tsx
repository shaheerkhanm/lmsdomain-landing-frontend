import React from "react";
import { StripeLogo } from "./StripeLogo";
import { RazorpayLogo } from "./RazorpayLogo";

interface LogoProps {
  className?: string;
  size?: number;
}

export function ZoomLogo({ className = "", size = 24 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 92 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: `${size}px`, width: "auto" }}
      aria-label="Zoom"
      role="img"
    >
      <path
        d="M6.2 3.8h11.6L6.5 17.5h11.9v3H4.2l11.4-13.8H6.2v-2.9zm17.9 6.8c4.2 0 7.4 3.1 7.4 7.2 0 4.1-3.2 7.2-7.4 7.2-4.2 0-7.4-3.1-7.4-7.2 0-4.1 3.2-7.2 7.4-7.2zm0 11.5c2.5 0 4.4-1.9 4.4-4.3 0-2.4-1.9-4.3-4.4-4.3-2.5 0-4.4 1.9-4.4 4.3 0 2.4 1.9 4.3 4.4 4.3zm17.9-11.5c4.2 0 7.4 3.1 7.4 7.2 0 4.1-3.2 7.2-7.4 7.2-4.2 0-7.4-3.1-7.4-7.2 0-4.1 3.2-7.2 7.4-7.2zm0 11.5c2.5 0 4.4-1.9 4.4-4.3 0-2.4-1.9-4.3-4.4-4.3-2.5 0-4.4 1.9-4.4 4.3 0 2.4 1.9 4.3 4.4 4.3zm18.3-11.2h2.9v1.8c1-1.3 2.6-2.1 4.5-2.1 2.2 0 3.8 1 4.5 2.6 1.1-1.6 2.8-2.6 5-2.6 3.4 0 5.6 2.2 5.6 5.8v9h-3v-8.6c0-2.2-1.3-3.4-3.1-3.4-1.9 0-3.3 1.3-3.3 3.5v8.5h-3v-8.6c0-2.2-1.3-3.4-3.1-3.4-1.9 0-3.3 1.3-3.3 3.5v8.5h-3.7V10.9z"
        fill="#0B5CFF"
      />
    </svg>
  );
}

export function SlackLogo({ className = "", size = 24 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 94 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: `${size}px`, width: "auto" }}
      aria-label="Slack"
      role="img"
    >
      <g transform="translate(0, 0)">
        {/* Slack 4-Color Mark */}
        <path d="M5.3 14.8a2.6 2.6 0 0 1-2.6-2.6c0-1.4 1.2-2.6 2.6-2.6h2.6v2.6a2.6 2.6 0 0 1-2.6 2.6z" fill="#E01E5A" />
        <path d="M9.2 14.8c1.4 0 2.6-1.2 2.6-2.6V5.3a2.6 2.6 0 1 0-5.2 0v6.9c0 1.4 1.2 2.6 2.6 2.6z" fill="#E01E5A" />
        <path d="M9.2 5.3a2.6 2.6 0 0 1-2.6-2.6C6.6 1.3 7.8.1 9.2.1h2.6v2.6a2.6 2.6 0 0 1-2.6 2.6z" fill="#36C5F0" />
        <path d="M9.2 9.2c0 1.4-1.2 2.6-2.6 2.6H-.3a2.6 2.6 0 1 1 0-5.2h6.9c1.4 0 2.6 1.2 2.6 2.6z" transform="translate(7.2, 0)" fill="#36C5F0" />
        <path d="M18.8 9.2c0 1.4-1.2 2.6-2.6 2.6a2.6 2.6 0 0 1-2.6-2.6V6.6h2.6c1.4 0 2.6 1.2 2.6 2.6z" fill="#2EB67D" />
        <path d="M14.8 9.2c-1.4 0-2.6 1.2-2.6 2.6v6.9a2.6 2.6 0 1 0 5.2 0v-6.9c0-1.4-1.2-2.6-2.6-2.6z" fill="#2EB67D" />
        <path d="M14.8 18.8c0-1.4 1.2-2.6 2.6-2.6 1.4 0 2.6 1.2 2.6 2.6v2.6h-2.6a2.6 2.6 0 0 1-2.6-2.6z" fill="#ECB22E" />
        <path d="M14.8 14.8c0-1.4 1.2-2.6 2.6-2.6h6.9a2.6 2.6 0 1 1 0 5.2h-6.9c-1.4 0-2.6-1.2-2.6-2.6z" transform="translate(-7.2, 0)" fill="#ECB22E" />
      </g>
      {/* Slack Logotype */}
      <text
        x="30"
        y="18.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17.5"
        fontWeight="800"
        fill="#1D1C1D"
        letterSpacing="-0.03em"
      >
        slack
      </text>
    </svg>
  );
}

export function TeamsLogo({ className = "", size = 24 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 98 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: `${size}px`, width: "auto" }}
      aria-label="Microsoft Teams"
      role="img"
    >
      <rect x="2" y="3" width="18" height="18" rx="4" fill="#505AC9" />
      <path d="M11 7.5v9h2.2v-9h-2.2zm-2.8 0h7.8v1.8H8.2V7.5z" fill="#FFFFFF" />
      <text
        x="26"
        y="17"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="13.5"
        fontWeight="700"
        fill="#242424"
        letterSpacing="-0.01em"
      >
        Teams
      </text>
    </svg>
  );
}

export function MailchimpLogo({ className = "", size = 24 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 108 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: `${size}px`, width: "auto" }}
      aria-label="Mailchimp"
      role="img"
    >
      {/* Freddie Head Graphic */}
      <circle cx="12" cy="12" r="10" fill="#FFE01B" />
      <path
        d="M8.5 13.5c.8 1.4 2.1 2.2 3.5 2.2s2.7-.8 3.5-2.2c-.6.3-1.4.5-2.2.5-.5 0-.9-.1-1.3-.2-.4.1-.8.2-1.3.2-.8 0-1.6-.2-2.2-.5z"
        fill="#241C15"
      />
      <circle cx="9.5" cy="10" r="1.2" fill="#241C15" />
      <circle cx="14.5" cy="10" r="1.2" fill="#241C15" />
      <text
        x="27"
        y="17"
        fontFamily="Georgia, serif"
        fontSize="14.5"
        fontWeight="700"
        fill="#241C15"
        letterSpacing="-0.02em"
      >
        Mailchimp
      </text>
    </svg>
  );
}

export function ZapierLogo({ className = "", size = 24 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 88 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: `${size}px`, width: "auto" }}
      aria-label="Zapier"
      role="img"
    >
      {/* Zapier Asterisk */}
      <path
        d="M10 4v16M4 7l12 10M16 7L4 17"
        stroke="#FF4F00"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <text
        x="22"
        y="17.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="15"
        fontWeight="800"
        fill="#2B2B2B"
        letterSpacing="-0.02em"
      >
        zapier
      </text>
    </svg>
  );
}

export function GoogleMeetLogo({ className = "", size = 24 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 114 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: `${size}px`, width: "auto" }}
      aria-label="Google Meet"
      role="img"
    >
      <g transform="translate(2, 2)">
        <rect x="0" y="3" width="13" height="14" rx="2" fill="#00832D" />
        <path d="M13 7l5-3.5v13L13 13V7z" fill="#00AC47" />
        <path d="M0 5a2 2 0 0 1 2-2h11v4H0V5z" fill="#2684FC" />
        <path d="M0 15h13v4H2a2 2 0 0 1-2-2v-2z" fill="#0066DA" />
        <rect x="10" y="3" width="3" height="14" fill="#EA4335" />
      </g>
      <text
        x="27"
        y="16.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="13"
        fontWeight="600"
        fill="#3C4043"
        letterSpacing="-0.01em"
      >
        Google Meet
      </text>
    </svg>
  );
}

export function PabblyLogo({ className = "", size = 24 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 88 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: `${size}px`, width: "auto" }}
      aria-label="Pabbly"
      role="img"
    >
      <circle cx="10" cy="12" r="9" fill="#0EA5E9" />
      <path d="M8 7v10h2.5a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3H8zm2.5 4.5v-2h.8a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1h-.8z" fill="#FFFFFF" />
      <text
        x="24"
        y="17"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#1E293B"
        letterSpacing="-0.01em"
      >
        Pabbly
      </text>
    </svg>
  );
}

export const PARTNER_LOGOS = [
  { name: "Stripe", component: () => <StripeLogo variant="wordmark" size={24} className="h-6 w-auto" /> },
  { name: "Razorpay", component: () => <RazorpayLogo variant="wordmark" size={24} className="h-6 w-auto" /> },
  { name: "Zoom", component: () => <ZoomLogo size={24} className="h-6 w-auto" /> },
  { name: "Microsoft Teams", component: () => <TeamsLogo size={24} className="h-6 w-auto" /> },
  { name: "Slack", component: () => <SlackLogo size={24} className="h-6 w-auto" /> },
  { name: "Mailchimp", component: () => <MailchimpLogo size={24} className="h-6 w-auto" /> },
  { name: "Zapier", component: () => <ZapierLogo size={24} className="h-6 w-auto" /> },
  { name: "Google Meet", component: () => <GoogleMeetLogo size={24} className="h-6 w-auto" /> },
  { name: "Pabbly", component: () => <PabblyLogo size={24} className="h-6 w-auto" /> },
];
