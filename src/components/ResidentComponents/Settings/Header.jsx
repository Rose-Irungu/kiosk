import React from 'react';

export default function Header({icon, text}) {
  return (
    <div className='flex flex-row w-full h-32px gap-[12px]'>
        <div className='w-[32px] h-[32px]'>
            <img src={icon} className='w-full h-full object-cover' />
        </div>
        <div className='w-full h-[31px] mt-[1px]'>
            <h1 className='font-dmsans font-semibold text-[24px] mt-[7px] text-[#000000] leading-[100%] tracking-[0]'>{text}</h1>
        </div>
    </div>
  );
}

