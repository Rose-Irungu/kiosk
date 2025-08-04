import React from "react";

const EmergencyContacts = () => {
  return (
   <div className="p-6 w-[calc(100vw-2rem)] sm:w-auto sm:max-w-[964px] md:w-[964px] mx-auto bg-white rounded-xl shadow-md space-y-6 font-sans text-[#002706]">
      <div className="flex items-center gap-2">
        <img src="/phone0.svg" alt="Phone Icon" className="w-6 h-6" />
        <h2 className="text-xl sm:text-2xl font-semibold">Emergency Contacts</h2>
      </div>
   
      <div className="bg-gray-100 p-3 sm:p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-3">
          <img src="/security0.svg" alt="Security Icon" className="w-6 h-6" />
          <span className="font-medium text-sm sm:text-base">West Brook Security Guards</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-0 sm:pl-9">
          <div className="inline-flex items-center gap-2 border border-[#7aa981] rounded-[12px] px-3 py-1 text-[#1b4332] font-medium text-sm sm:text-base">
            <img src="/phone-light.svg" alt="Phone" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>0712345678</span>
          </div>
          <div className="inline-flex items-center gap-2 border border-[#7aa981] rounded-[12px] px-3 py-1 text-[#1b4332] font-medium text-sm sm:text-base">
            <img src="/phone-light.svg" alt="Phone" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>0723456789</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 sm:p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-3">
          <img src="/ex.svg" alt="Fire Icon" className="w-6 h-6" />
          <span className="font-medium text-sm sm:text-base">Nairobi County Fire & Rescue Services</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-0 sm:pl-9">
          <div className="inline-flex items-center gap-2 border border-[#7aa981] rounded-[12px] px-3 py-1 text-[#1b4332] font-medium text-sm sm:text-base">
            <img src="/phone-light.svg" alt="Phone" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>0780000000</span>
          </div>
          <div className="inline-flex items-center gap-2 border border-[#7aa981] rounded-[12px] px-3 py-1 text-[#1b4332] font-medium text-sm sm:text-base">
            <img src="/phone-light.svg" alt="Phone" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>0790000000</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 sm:p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-3">
          <img src="/group1.svg" alt="Ambulance Icon" className="w-6 h-6" />
          <span className="font-medium text-sm sm:text-base">Ambulances</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-0 sm:pl-9">
          <div className="inline-flex items-center gap-2 border border-[#7aa981] rounded-[12px] px-3 py-1 text-[#1b4332] font-medium text-sm sm:text-base">
            <img src="/phone-light.svg" alt="Phone" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>1800-098-765</span>
          </div>
          <div className="inline-flex items-center gap-2 border border-[#7aa981] rounded-[12px] px-3 py-1 text-[#1b4332] font-medium text-sm sm:text-base">
            <img src="/phone-light.svg" alt="Phone" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>1800-123-456</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;