"use client";

import React, { useEffect, useState } from "react";
import FeaturesCards from "./FeaturesCards";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";
import { BACKEND_URL } from "@/utils/constants/constant";

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

export function FeaturesItems() {
  const [data, setData] = useState<any[]>(DEFAULT_TEACH_FEATURES);

  useEffect(() => {
    const getData = async () => {
      try {
        const location = (process.env.NEXT_PUBLIC_BACKEND_URL || BACKEND_URL) + apiRoutes?.getSmartTeach;
        const response = await fetchData({
          url: location,
          body: { slug: "" },
        });
        if (Array.isArray(response) && response.length > 0) {
          setData(response);
        }
      } catch (error) {
        // Retain verified default data
      }
    };

    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
      {data.map((item: any, index: number) => (
        <FeaturesCards key={index} item={item} />
      ))}
    </div>
  );
}

export default FeaturesItems;
