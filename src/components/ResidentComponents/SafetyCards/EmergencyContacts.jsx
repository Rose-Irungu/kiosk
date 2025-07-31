import React from 'react';
import SectionHeading2 from './SectionHeading2';

export default function EmergencyContacts({icon1, icon2,heading, phoneOne, phoneTwo}) {
  return (
    <div className='flex flex-col w-full h-[108px] border-b-[1px] py-[12px] px-[10px] gap-[12px]'>
        <SectionHeading2 icon = {icon1} text={heading}/>
        <div className='flex flex-row w-[365px] h-[40px] gap-[8px]'>
            <div className='flex flex-row text-center items-center justify-center w-[181px] h-[40px] rounded-[8px] border-[1px] border-[#005E0E] p-[4px] gap-[4px]'>
                <img src={icon2} className='w-[24px] h-[24px] object-contain' />
                <p className='font-dmsans font-normal text-[20px] leading-[100%] tracking-[0] text-[#002706]'>{phoneOne}</p>
            </div>
            <div className='flex flex-row text-center items-center justify-center w-[181px] h-[40px] rounded-[8px] border-[1px] border-[#005E0E] p-[4px] gap-[4px]'>
                <img src={icon2} className='w-[24px] h-[24px] object-contain' />
                <p className='font-dmsans font-normal text-[20px] leading-[100%] tracking-[0] text-[#002706]'>{phoneTwo}</p>
            </div>
        </div>
    </div>
  );
}