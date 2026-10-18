import React from "react";

export interface HomeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  accent?: "#7B5CF5" | "#F3CF74" | "#8E7CF8" | "#A6E3D3" | string;
}

export function HomeCard({ children, className = "", accent, style, ...props }: HomeCardProps) {
  return (
    <div
      className={`bg-white rounded-[20px] border border-[#ECEDEF] p-5 md:p-6 transition-all duration-200 text-[#161616] font-urbanist relative overflow-hidden ${className}`}
      style={{
        boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
        ...style,
      }}
      {...props}
    >
      {accent && (
        <span
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full pointer-events-none opacity-80"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

export function HomeCardHeader({
  title,
  subtitle,
  badge,
  badgeColor = "#7B5CF5",
  className = "",
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-urbanist text-[18px] font-semibold text-[#161616] leading-snug tracking-tight">
          {title}
        </h3>
        {badge && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white shrink-0"
            style={{ backgroundColor: badgeColor }}
          >
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-[13px] font-normal text-[#6B6F76] truncate mt-0.5 leading-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function HomeCardInnerField({
  children,
  className = "",
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-[#F5F6F8] rounded-[12px] px-[14px] py-[12px] text-[14px] text-[#161616] font-urbanist ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export function HomeCardChip({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-tight bg-[#F5F6F8] text-[#161616] border border-[#ECEDEF] ${className}`}
    >
      {accent && (
        <span
          className="size-1.5 rounded-full shrink-0"
          style={{ backgroundColor: accent }}
        />
      )}
      {children}
    </span>
  );
}
