import React from "react";
import * as Icons from "lucide-react";

interface FeatureIconProps {
  name?: string;
  className?: string;
  size?: number;
}

export function FeatureIcon({
  name = "Sparkles",
  className = "w-5 h-5 text-[#161616]",
  size = 20,
}: FeatureIconProps) {
  const IconComponent = (Icons as any)[name] || Icons.Sparkles;
  return <IconComponent size={size} className={className} />;
}

export default FeatureIcon;

