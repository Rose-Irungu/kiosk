import React from 'react';

export default function SubHeader({ icon, text }) {
  return (
    <div className='flex flex-row w-full h-[90px] gap-[12px]'>
      <div className='w-[24px] h-[24px]'>
        <img src={icon} className='w-full h-full object-contain' />
      </div>
      <div className='w-full h-[31px] mt-[1px]'>
        <h1 className='font-dmsans font-medium text-[16px] sm:text-[20px] sm:mt-[7px] mt-[5px] text-[#005E0E] leading-[100%] tracking-[0]'>{text}</h1>
      </div>
    </div>
  );
}

