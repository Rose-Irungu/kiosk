import React from 'react';
import TimeIcon from './TimeIcon';

export default function Time({time}) {
  return (
    <div className='flex flex-row w-[122px] h-[20px] gap-[4px]'>
        <TimeIcon/>
        <div className='h-[16px] text-center'>
            <p className='font-dmsans font-medium text-[12px] mt-[4px] text-[#666666] leading-[100%] tracking-[0]'>
                {time}
            </p>
        </div>
    </div>
  );
}