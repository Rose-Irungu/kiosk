"use client";
import { useState } from "react";
import { Siren } from "lucide-react";
import { Link } from "react-router-dom";
import { updateEmergency } from "../services/adminEmergencyServices";

export default function Card4({ id, floor, unit, name, status, onResolved }) {
  const [isResolved, setIsResolved] = useState(status === "resolved");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResolve = async () => {
    if (isResolved || loading) return;

    try {
      setLoading(true);
      setError("");
      const result = await updateEmergency(id, "resolved");
      if (result?.emergency_status === "resolved") {
        setIsResolved(true);
        onResolved(); // Notify parent to refetch data
      }
    } catch (err) {
      setError(err?.toString() || "Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-[537px] rounded-[10px] p-4 md:p-6 bg-white gap-[12px] mx-auto">
      {/* Title Row */}
      <div className="flex items-center gap-2">
        <div className="w-[60px] h-[60px] flex items-center justify-center rounded-sm">
          <Siren className="w-6 h-6 text-[#F93162] animate-ping flex-shrink-0" />
        </div>
        <h1 className="font-dmsans text-[16px] leading-5 tracking-[1%] text-[#495057] font-bold w-full">
          Live Emergency Feed
        </h1>
      </div>

      {/* Info Block */}
      <div className="flex flex-col justify-center w-full gap-[16px]">
        {/* Panic Alert Row */}
        <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-0">
          <div className="md:w-[204px]">
            <h1 className="font-dmsans text-base text-grayish font-normal tracking-[1%] uppercase">
              PANIC BUTTON TRIGGERED AT {floor} – {unit}
            </h1>
          </div>

          <div className="flex justify-between md:w-[166px] gap-[6px]">
            <div className="flex flex-col justify-between w-[86px] gap-[12px]">
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">Triggered By</p>
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">Status</p>
            </div>
            <div className="flex flex-col justify-between w-[4px] gap-[12px]">
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">:</p>
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">:</p>
            </div>
            <div className="flex flex-col justify-between w-[64px] gap-[12px]">
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">{name}</p>
              <p
                className={`font-inter font-normal text-sm leading-5 tracking-[1%] ${
                  isResolved ? "text-green-700" : "text-red-600"
                }`}
              >
                {isResolved ? "Resolved" : "Ongoing"}
              </p>
            </div>
          </div>
        </div>

        {/* Button Row */}
        <div className="flex flex-col sm:flex-row w-full gap-3 min-w-0">
          <Link to="/triggers" className="flex-1 min-w-0" state={{ id, floor, unit }}>
              <button className="cursor-pointer w-full min-h-[40px] bg-[#005E0E] text-white rounded hover:bg-[#002A05] px-4 py-2 transition-all duration-300 text-center whitespace-normal break-words">
                Open Roll Call
              </button>
            </Link>

            <button
              onClick={handleResolve}
              disabled={isResolved || loading}
              className={`cursor-pointer flex-1 min-w-0 px-4 py-2 min-h-[40px] rounded-sm transition-all duration-300 text-center whitespace-normal break-words ${
                isResolved
                  ? "bg-[#CCCCCC] text-white border border-[#CCCCCC] cursor-not-allowed"
                  : "text-[#005E0E] border border-[#005E0E] hover:bg-[#CCCCCC] hover:text-white"
              }`}
            >
              {loading ? "Updating..." : isResolved ? "Resolved ✅" : "Mark Resolved"}
            </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-1 font-inter">{error}</p>}
      </div>
    </div>
  );
}
