"use client";

import React, { useEffect, useState } from "react";
import FeaturesCards from "./FeaturesCards";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";
import { BACKEND_URL } from "@/utils/constants/constant";

const DEFAULT_TEACH_FEATURES = [
  {
    title: "Automated Assessment & Rubrics",
    subTitle: "Draft quizzes, auto-grade student submissions, and sync scores directly to your centralized cohort gradebook.",
    image: "/assets/img/features/feature-icon-1.svg",
  },
  {
    title: "Hardware L1 DRM Screen Shield",
    subTitle: "Prevent unauthorized screen recording with studio-grade Widevine L1 & FairPlay encryption and dynamic watermarking.",
    image: "/assets/img/features/feature-icon-2.svg",
  },
  {
    title: "Live Interactive Cohorts",
    subTitle: "Deliver low-latency live classrooms with integrated real-time polling, whiteboard collaboration, and batch chat.",
    image: "/assets/img/features/feature-icon-3.svg",
  },
  {
    title: "Automated Attendance & Rostering",
    subTitle: "Track exact student session durations across hybrid batches and automatically issue verified completion certificates.",
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
