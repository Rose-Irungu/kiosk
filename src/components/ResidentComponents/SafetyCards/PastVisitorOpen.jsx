import React from 'react';

export default function PastVisitorOpen({ name, time, type, onClose, callback }) {
  const handleBlacklist = async () => {
    try {
      const result = await callback();
      if (result?.status === true) {
        onClose();
      }
    } catch (error) {
      console.error("Blacklist failed:", error);
    }
  };

  return (
    <div className='fixed inset-0 bg-[#000000]/50 backdrop-blur-sm'>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 sm:w-[500px] w-full h-full z-50 flex items-center justify-center bg-transparent">
        <div className="relative flex flex-col w-[370px] h-[106px] rounded-[12px] p-[10px] bg-[#FFFFFF] shadow-md border border-gray-200">

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
            <button className="w-[51px] h-[22px] text-[12px] rounded-[12px] bg-[#B0F1B9]">
              {type}
            </button>
          </div>

          <div className="flex flex-row justify-between px-[10px] h-[39px] mt-[10px]">
            <button
              className="w-[152px] h-[39px] rounded-[8px] py-[8px] px-[10px] bg-[#00580D] font-dmsans font-medium text-[18px] text-white"
              onClick={handleBlacklist}
            >
              Add to Blacklist
            </button>
            <button
              className="text-center w-[138px] h-[39px] rounded-[8px] border border-[#00580D] py-[8px] px-[10px]"
              onClick={onClose}
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
