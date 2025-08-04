import React from 'react'

export default function PastGuestCard({image, name, checkOutTime, type}) {
  return (
    <div className='flex flex-row w-full h-64px rounded-[8px justify-between] p-[12px] bg-[#FFFFFF]'>
        <img src={image} className='w-10 h-10 rounded-full object-cover' />
        <div className='flex flex-row w-[286px] h-[40px] gap-[6px]'>
            <h1 className='font-dmsans font-medium text-[16px] leading-[100%] tracking-[0] text-[#002706]'>{name}</h1>
            <p className='font-dmsans font-medium text-[12px] leading-[100%] tracking-[0] text-[#999999]'>{checkOutTime}</p>
        </div>
        <div className='flex flex-col w-[64px] h-[24px] rounded-[50px] py-[3px] px-[10px] gap-[10px] bg-[#D1C9FA]'>{type}</div>
    </div>
  );
}

