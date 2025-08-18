import React from 'react';

export default function FavoriteCard({img, name, time}) {
  return (
    <div className='flex flex-row w-full h-[64px] justify-between rounded-[8px] p-[12px] bg-[#FFFFFF]'>
        <div className='flex flex-row w-[216px] h-[40px] gap-[6px]'>
            <div className='w-[40px] h-[40px]'>
                <img src={img} className='w-[40px] h-[40px] object-cover'/>
            </div>
            <div className='flex flex-col w-[170px] h-[38px] gap-[2px]'>
                <h1 className='font-dmsans font-medium text-[16px] text-[#002706] leading-[100] tracking-normal'>
                    {name}
                </h1>
                <p className='font-dmsans font-medium text-[12px] text-[#999999] leading-[100] tracking-normal'>
                    Last Visit: {time}
                </p>
            </div>
        </div>
    </div>
  );
}