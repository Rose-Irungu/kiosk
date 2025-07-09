import { Siren } from "lucide-react";
export default function Card4({floor, unit, name, status}) {
    return (
        <div className="flex flex-col justify-center w-[537px] h-[221px] rounded-[10px] p-6 bg-white gap-[12px]">
          <div className="flex items-center gap-2">
            <div className="w-[60px] h-[60px] flex items-center justify-center rounded-sm">
                <Siren className="w-6 h-6 text-[#F93162] animate-ping flex-shrink-0" />
            </div>
            <h1 className="font-dmsans text-[16px] leading-5 tracking-[1%] align-middle text-[#495057] font-bold w-[439px] h-[20px] proportional-nums lining-nums">
                Live Emergency Feed
            </h1>
          </div>
          <div className="flex flex-col justify-center w-[489px] h-[108px] gap-[16px]">
            <div className="flex justify-between w-[489px] h-[40px]">
                <div className="w-[204px] h-[40px] gap-[5px]">
                  <h1 className="font-dmsans text-base text-grayish font-normal tracking-[1%] uppercase proportional-nums lining-nums">
                     PANIC BUTTON TRIGGERED AT {floor} – {unit}
                  </h1>
                </div>
                <div className="flex justify-between w-[166px] h-[40px] gap-[6px]">
                   <div className="flex flex-col justify-between w-[86px] h-[52px] gap-[12px]">
                      <p className="w-[86px] h-[20px] font-inter font-normal text-sm leading-5 tracking-[1%] proportional-nums lining-nums">Triggered By</p>
                      <p className="w-[86px] h-[20px] font-inter font-normal text-sm leading-5 tracking-[1%] proportional-nums lining-nums">Status</p>
                   </div>
                   <div className="flex flex-col justify-between w-[4px] h-[52px] gap-[12px]">
                      <p className="w-[4px] h-[20px] font-inter font-normal text-sm leading-5 tracking-[1%] proportional-nums lining-nums">:</p>
                      <p className="w-[4px] h-[20px] font-inter font-normal text-sm leading-5 tracking-[1%] proportional-nums lining-nums">:</p>
                   </div>
                   <div className="flex flex-col justify-between w-[64px] h-[52px] gap-[12px]">
                      <p className="w-[64px] h-[20px] font-inter font-normal text-sm leading-5 tracking-[1%] proportional-nums lining-nums">{name}</p>
                      <p className="w-[64px] h-[20px] font-inter font-normal text-sm leading-5 tracking-[1%] proportional-nums lining-nums">{status}</p>
                   </div>
                </div>
            </div>
            <div className="flex justify-between w-[489px] h-[40px]">
                    <button className="w-[256px] h-[40px] pt-[10px] pr-[24px] pb-[10px] pl-[24px] bg-[#005E0E] gap-[10px] text-white rounded border-1 hover:bg-[#002A05]">
                        Open Roll Call
                    </button>
                    <button className="w-[165px] h-[40px] border text-[#005E0E] border-[#005E0E] hover:bg-[#CCCCCC] hover:text-white py-2 px-4 rounded-sm">
                        Mark Resolved
                    </button>
            </div>
          </div>
        </div>
    );
}