import React from 'react'

export default function SectionHeading({text}) {
  return (
    <div className='flex flex-row w-[392px] h-[31px] gap-[2px]'>
        <h1 className='font-dmsans font-semibold text-[24px] leading-[100%] tracking-[0] text-[#002706]'>{text}</h1>
    </div>
  );
}