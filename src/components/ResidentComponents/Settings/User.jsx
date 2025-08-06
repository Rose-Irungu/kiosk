import React from 'react';

export default function User({image, name, unit}) {
  return (
    <div className='flex flex-col justify-center items-center text-center w-full h-[328px]'style={{ background: 'radial-gradient(circle at bottom right, #00D21E 5%, #2D2264 30%)'}}>
        <div className='w-[150px] h-[150px] border-[1px] border-[#2D2264] rounded-full'>
            <img src={image} className='w-full h-full object-cover' />
            <div className='w-[32px] h-[32px]'>
                <img src="/edit.svg" className='w-full h-full object-cover'/>
            </div>
        </div>
        <p className='font-dmsans font-semibold text-[24px] text-[#E6EFE7] leading-[100%] tracking-[0]'>{name}</p>
        <p className='font-dmsans font-semibold text-[20px] text-[#FFFFFF80] leading-[100%] tracking-[0]'>{unit}</p>

    </div>
  );
}

