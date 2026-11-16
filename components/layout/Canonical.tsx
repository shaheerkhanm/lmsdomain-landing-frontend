'use client'

// Next.js App Router renders <link rel="canonical"> in <head> server-side
// via metadata.alternates.canonical using getMetadataBase() (SITE_URL, never localhost or staging).
// This component returns null to avoid duplicate or client-overwritten canonical tags.
export default function Canonical() {
  return null;
}