import React from 'react';
import ToggleSwitch from './ToggleSwitch';

export default function DataItem({icon, icon2, text, callback}) {
  return (
    <div className='flex flex-row justify-between w-full h-[48px] border-b-[1px] border-[#0000004D] py-[12px] px-[10px]'
         onClick={()=>callback()} 
    >
        <div className='flex flex-row w-[226px] h-[24px] gap-[12px]'>
            <div className='w-[24px] h-[24px] rounded-[20px]'>
                <img src={icon} className='w-full h-full object-cover' />
            </div>
            <p className='font-dmsans font-medium text-[12px] sm:text-[16px] mt-[12px] sm:mt-[8px] text-[#002706] leading-[100%] tracking-[0]'>{text}</p>
        </div>
        <div className='w-[24px] h-[24px]'>
            <img src={icon2} className='w-full h-full object-cover'
            />
        </div>
    </div>
  );
}