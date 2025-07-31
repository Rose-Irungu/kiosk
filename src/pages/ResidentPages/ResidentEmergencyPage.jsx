import React from "react";
import AlertCard from "../../components/ResidentComponents/AlertCard";
import EmergencyAlert from "../../components/ResidentComponents/EmergencyAlert";
import EmergencyContacts from "../../components/ResidentComponents/EmergencyContacts";

export default function EmergencyControlApp() {
  return (
    <div className="p-6">
      <div className="flex items-center mb-2 ml-[125px]">
        <img
          src="/emg.svg"
          className="w-6 h-6 text-red-500 mr-3"
          alt="emergency icon"
        />
        <h1 className="text-2xl font-sans text-[#610c07] font-semibold">
          Emergency Control
        </h1>
      </div>

      <div className="flex ml-[125px] gap-8 justify-items-center mb-10">
        <button className="bg-gradient-to-r from-[#F6003B] to-[#550115] text-white p-4 rounded-lg font-bold w-[300px] h-[100px] text-center shadow-lg transform hover:scale-105 transition-transform">
          S.O.S
        </button>
        <button className="bg-[#fde8e7] text-[#e61c11] border border-red-300 rounded-[12px] p-6 font-bold text-center shadow-lg hover:shadow-xl w-[300px] h-[100px] transform hover:scale-105 transition-transform">
          Fire <br /> Alert
        </button>
        <button className="bg-[#fde8e7] text-[#e61c11] border border-red-300 rounded-[12px] p-6 font-bold text-center shadow-lg hover:shadow-xl w-[300px] h-[100px] transform hover:scale-105 transition-transform">
          Security <br /> Concern
        </button>
      </div>

      <div className="flex flex-col items-center  py-6 absolute  left-0 right-0">
        <AlertCard />
      </div>
      <div className="flex flex-col items-center py-6 absolute  left-[30px] right-0 -bottom-[55px]">
        <EmergencyAlert />
      </div>
      <div className="flex flex-col items-center py-6 absolute  left-[30px] right-0 -bottom-[550px]">
        <EmergencyContacts />
      </div>
    </div>
  );
}
