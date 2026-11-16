import React from "react";

export function FeatureGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default FeatureGrid;
