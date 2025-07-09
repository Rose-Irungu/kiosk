
import React from "react";

/**
 * Card3 – Visitor totals card
 *
 * @param {number} companyVisitors   – total company guests
 * @param {number} residentVisitors  – total resident guests
 * @param {number} serviceProviders  – total service‑provider visits
 * @param {string} className         – extra Tailwind classes (optional)
 */
export default function Card3({
  companyVisitors = 0,
  residentVisitors = 0,
  serviceProviders = 0,
  className = "",
}) {
  const cards = [
    { label: "Company's Visitors", value: companyVisitors },
    { label: "Residents’ Visitors", value: residentVisitors },
    { label: "Service Providers", value: serviceProviders },
  ];

  return (
    <div
      className={`flex h-[340px] w-[260px] flex-col gap-3 rounded-[10px] bg-white py-6 px-4 ${className}`}
    >
      {cards.map(({ label, value }) => (
        <div
          key={label}
          className="w-[228px] h-[88px] flex flex-col gap-4 self-center rounded-[10px] border bg-white p-3"
        >
          <p className="font-dmsans text-sm leading-[20px] text-[#495057] lining-nums proportional-nums">
            {label}
          </p>
          <p className="font-dmsans text-[20px] font-bold leading-[20px] text-[#495057] lining-nums proportional-nums">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
