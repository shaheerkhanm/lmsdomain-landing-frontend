"use client";

import React from "react";
import CustomerCard from "./CustomerCard";

export function CustomerSliderSection({ data }: { data: any[] }) {
  const customerItems: any[] = Array.isArray(data) && data.length > 0 ? data : [];

  if (customerItems.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {customerItems.map((item: any, index: number) => (
        <CustomerCard key={index} item={item} />
      ))}
    </div>
  );
}

export default CustomerSliderSection;
