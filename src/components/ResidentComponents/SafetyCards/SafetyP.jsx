import React from 'react'

export default function SafetyP({icon, text}) {
  return (
    <div className='flex flex-row w-full h-[33.16px] p-[4.58px] gap-[11.45px] border-b-[1.15px]'>
        <img src={icon} className='w-[24px] h-[24px] object-contain' />
        <p className='font-dmsans font-medium text-[18px] leading-[100%] tracking-[0] text-[#002706]'>{text}</p>
    </div>
  );
}