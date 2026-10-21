import React from "react";

export interface CardProps {
  size?: "large" | "ui";
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  size = "large",
  bordered = true,
  className = "",
  children,
}: CardProps) {
  const radiusClass = size === "large" ? "rounded-[32px] sm:rounded-[40px]" : "rounded-[20px]";
  const borderClass = bordered ? "border border-[#ECEDEF]" : "";

  return (
    <div
      className={`bg-white ${radiusClass} ${borderClass} shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
