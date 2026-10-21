import React from "react";

export interface SectionProps {
  id?: string;
  background?: "white" | "alternate";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  background = "white",
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const bgClass = background === "alternate" ? "bg-[#F3F4F6]" : "bg-white";

  return (
    <section
      id={id}
      className={`${bgClass} py-[88px] lg:py-[140px] font-urbanist ${className}`}
    >
      <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

export default Section;
