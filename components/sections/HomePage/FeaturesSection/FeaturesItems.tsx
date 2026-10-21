"use client";

import React, { useState } from "react";
import FeaturesCards from "./FeaturesCards";

const DEFAULT_TEACH_FEATURES = [
  {
    title: "Quizzes & Assignments",
    subTitle: "Assess learning with structured quizzes, instructor-reviewed assignments, and certificates on completion.",
    image: "/assets/img/features/feature-icon-1.svg",
  },
  {
    title: "Watermarked Video Protection",
    subTitle: "Protect course lessons with video watermarking and device limits to prevent unauthorized sharing.",
    image: "/assets/img/features/feature-icon-2.svg",
  },
  {
    title: "Live Classes with Zoom",
    subTitle: "Deliver live classes, bootcamps with recurring sessions, and one-to-one tutor bookings.",
    image: "/assets/img/features/feature-icon-3.svg",
  },
  {
    title: "Achievements & Certificates",
    subTitle: "Track progress with points, leaderboard rankings, and customizable course completion certificates.",
    image: "/assets/img/features/feature-icon-4.svg",
  },
];

export function FeaturesItems({ items }: { items?: any[] }) {
  const [data] = useState<any[]>(items && items.length > 0 ? items : DEFAULT_TEACH_FEATURES);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
      {data.map((item: any, index: number) => (
        <FeaturesCards key={index} item={item} />
      ))}
    </div>
  );
}

export default FeaturesItems;
