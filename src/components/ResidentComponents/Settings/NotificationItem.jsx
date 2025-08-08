import React from 'react';
import ToggleSwitch from './ToggleSwitch';

export default function NotificationItem({ icon, text, callback }) {
  return (
    <div className='flex flex-row justify-between w-full h-[48px] border-b-[1px] border-[#0000004D] py-[12px] px-[10px]'>
      <div className='flex flex-row w-[226px] h-[24px] gap-[12px]'>
        <div className='w-[24px] h-[24px] rounded-[20px]'>
          <img src={icon} className='w-full h-full object-contain' />
        </div>
        <p className='font-dmsans font-medium text-[12px] sm:text-[16px] text-[#002706] mt-[12px] sm:mt-[8px] leading-[100%] tracking-[0]'>{text}</p>
      </div>
      <ToggleSwitch onToggle={() => callback()} />
    </div>
  );
}