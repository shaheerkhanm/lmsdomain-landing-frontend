import React from "react";

export type ContentSourceKind = "api" | "partial" | "code";

// Marks where a section's content came from: "api" (admin), "partial" (admin entry
// without its structured content yet) or "code" (built-in fallback). Renders no box
// (display: contents), so layout and animations are unaffected. Read by
// scripts/check-admin-parity.mjs.
export function ContentSource({
  source,
  id,
  children,
}: {
  source: ContentSourceKind;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "contents" }} data-content-source={source} data-content-key={id}>
      {children}
    </div>
  );
}

export default ContentSource;
