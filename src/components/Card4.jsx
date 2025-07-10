import { Siren } from "lucide-react";

export default function Card4({ floor, unit, name, status }) {
  return (
    <div className="flex flex-col justify-center w-full max-w-[537px] h-auto md:h-[221px] rounded-[10px] p-4 md:p-6 bg-white gap-[12px]">
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
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">
                Triggered By
              </p>
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">
                Status
              </p>
            </div>
            <div className="flex flex-col justify-between w-[4px] gap-[12px]">
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">:</p>
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">:</p>
            </div>
            <div className="flex flex-col justify-between w-[64px] gap-[12px]">
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">
                {name}
              </p>
              <p className="font-inter font-normal text-sm leading-5 tracking-[1%]">
                {status}
              </p>
            </div>
          </div>
        </div>

        {/* Button Row */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
          <button className="w-full sm:w-[256px] h-[40px] bg-[#005E0E] text-white rounded hover:bg-[#002A05] px-6 py-2">
            Open Roll Call
          </button>
          <button className="w-full sm:w-[165px] h-[40px] border text-[#005E0E] border-[#005E0E] hover:bg-[#CCCCCC] hover:text-white px-4 py-2 rounded-sm">
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
}
