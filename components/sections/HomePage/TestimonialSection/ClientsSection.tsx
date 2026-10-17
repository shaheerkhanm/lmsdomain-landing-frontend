"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";

export function ClientsSection() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const location =
          process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getClients;
        const response = await fetchData({
          url: location,
          body: { slug: "" },
        });
        setData(Array.isArray(response) ? response : []);
      } catch (error) {
        setData([]);
      }
    };
    getData();
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="pt-8 border-t border-slate-200/80 font-inter">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
        Trusted by Progressive Academies & Enterprise Learning Teams
      </p>

      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
        {data.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-center grayscale opacity-65 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
          >
            <img
              src={item?.logo || "/assets/img/clients/Logo.svg"}
              alt={item?.altImage || item?.title || "Partner logo"}
              title={item?.title}
              className="h-7 sm:h-9 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientsSection;
