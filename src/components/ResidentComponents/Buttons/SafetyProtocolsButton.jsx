import React from 'react'

export default function SafetyProtocolsButton({callback}) {
  return (
    <button className='flex flex-col justify-center w-[540px] h-[72px] rounded-[12px] py-[10.11px] px-[13.47px] gap-[8.42px] font-dmsans text-[13.47px] font-medium text-[#E61C11] text-center align-items-center bg-[#FFFFFF] border-[0.84px] border-[#E61C11]'
        onClick={() => callback()}>
        Safety Protocols
    </button>
  );
}