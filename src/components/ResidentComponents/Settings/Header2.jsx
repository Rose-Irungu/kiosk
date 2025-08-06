import React from 'react';

export default function Header2({icon, text}) {
  return (
    <div className='flex flex-row w-full h-32px gap-[12px]'>
        <div className='w-[24px] h-[24px]'>
            <img src={icon} className='w-full h-full object-cover' />
        </div>
        <div className='w-full h-full'>
            <h1 className='font-dmsans font-semibold text-[24px] mt-[4px] text-[#005E0E] leading-[100%] tracking-[0]'>{text}</h1>
        </div>
    </div>
  );
}

