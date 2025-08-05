import React from 'react';

export default function PastVisitorOpen({ name, time, type, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-transparent">
      <div className="relative flex flex-col w-[370px] h-[106px] rounded-[12px] p-[10px] bg-[#FFFFFF] shadow-md border border-gray-200">

        {/* ❌ Close button top-right */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[18px] font-bold text-gray-500 hover:text-red-500"
          aria-label="Close"
        >
          ×
        </button>

        <div className="flex flex-row items-center justify-between px-[10px] h-[40px]">
          <div className="flex flex-row items-center gap-[10px]">
            <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>
            <div className="flex flex-col h-[36px] gap-[2px]">
              <p className="font-dmsans font-medium text-[16px] text-[#002706]">{name}</p>
              <p className="font-dmsans font-medium text-[12px] text-[#999999]">
                Check out time: {time}
              </p>
            </div>
          </div>
          <button
            className="w-[51px] h-[22px] rounded-[12px] py-[3px] px-[10px] bg-[#B0F1B9]"
            onClick={onClose}
          >
            {type}
          </button>
        </div>

        <div className="flex flex-row justify-between px-[10px] h-[39px] mt-[10px]">
          <div className="text-center w-[138px] h-[39px] rounded-[8px] border border-[#00580D] py-[8px] px-[10px]">
            Visitor Details
          </div>
          <div className="w-[152px] h-[39px] rounded-[8px] py-[8px] px-[10px] bg-[#00580D] font-dmsans font-medium text-[18px] text-white">
            Add to Blacklist
          </div>
        </div>
      </div>
    </div>
  );
}
