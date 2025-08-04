import React from 'react'

export default function PastGuestCard({image, name, checkOutTime, type}) {
  return (
    <div className='flex flex-row justify-between items-center w-full h-64px rounded-[8px] p-[12px] bg-[#FFFFFF]'>
        <div className='flex flex-row w-[216px] h-[40px] gap-[6px]'>
          <img src={image} className='w-10 h-10 rounded-full object-cover' />
          <div className='flex flex-col w-[170px] h-[36px] gap-[2px]'>
            <div className='w-[170px] h-[20px]'>
                <h1 className='font-dmsans font-medium text-[16px] leading-[100%] tracking-[0] text-[#002706]'>{name}</h1>
            </div>
            <div className='w-[170px] h-[20px]'>
                <p className='font-dmsans font-medium text-[12px] leading-[100%] tracking-[0] text-[#999999]'>{`Check out time: ${checkOutTime}`}</p>
            </div>
          </div>
        </div>
        <button className='w-[64px] h-[24px] rounded-[50px] px-[10px] gap-[10px] bg-[#D1C9FA] text-[#2D2264]'>{type}</button>
    </div>
  );
}

