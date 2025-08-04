import React from 'react'

export default function SectionHeading3({icon, text}) {
  return (
    <div className='flex flex-row justify-center w-full h-[32px] gap-[4px]'>
      <div className='w-[32px] h-[32px]'>
        <img src={icon} className='w-full h-full object-contain' />
      </div>
      <div className='flex flex-row w-full h-[31px] gap-[2px]'>
          <h1 className='font-dmsans font-semibold text-[24px] leading-[100%] tracking-[0] text-[#002706]'>{text}</h1>
      </div>
    </div>
  );
}