import React from 'react';
import LocationIcon from './LocationIcon';

export default function Location({place}) {
  return (
    <div className='flex flex-row w-[104px] h-[20px] gap-[4px]'>
        <LocationIcon />
        <div className='w-[80px] h-[16px] text-center'>
            <p className='font-dmsans font-medium text-[12px] mt-[4px] text-[#666666] leading-[100%] tracking-[0]'>
                {place}
            </p>
        </div>
    </div>
  );
}