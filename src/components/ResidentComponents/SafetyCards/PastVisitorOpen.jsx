import React from 'react';

export default function PastVisitorOpen({name, time, type, callback, }) {
  return (
    <div className = 'flex flex-row items-center w-full h-[106px] rounded-[12px] justify-between p-[10px] bg-[#FFFFFF]'>
        <div className = 'flex flex-row w-full h-[40px] justify-between px-[10px]'>
            <div className = 'w-[40px] h-[40px]'></div>
            <div className = 'flex flex-col w-[145px] h-[36px] gap-[2px]'>
                <p className = 'font-dmsans font-medium text-[16px] leading-[100%] tracking-[0] text-[#002706]'>{name}</p>
                <p className = 'font-dmsans font-medium text-[12px] leading-[100%] tracking-[0] text-[#999999]'>{`Check out time: ${time}`}</p>
            </div>
            <button className = 'w-[51px] h-[22px] rounded-[12px] py-[3px] px-[10px] gap-[10px] bg-[#B0F1B9]'
                    onClick = {() => callback()}>
                {type}
            </button>
        </div>
        <div className = 'flex flex-row w-full h-[39px] justify-between px-[10px]'>
            <div className = 'text-center w-[138px] h-[39px] rounded-[8px] border-[1px] py-[8px] px-[10px] gap-[10px] border-[#00580D]'>
                Visitor Details
            </div>
            <div className = 'w-[152px] h-[39px] rounded-[8px] py-[8px] px-[10px] bg-[#00580D] font-dmsans font-medium text-[18px] text-[#FFFFFF] leading-[100%] tracking-[0]'>
                Add to Blacklist
            </div>
        </div>
    </div>
  );
}