import React from 'react';

export default function ModalDash({callback1, callback2}) {
  return (
    <div className='flex flex-col w-[347px] h-[220px] rounded-[16px] pt-[24px] pb-[32px] px-[32px] gap-[16px] bg-[#FFFFFF]'>
        <div className='flex flex-col w-[283px] h-[108px] gap-[8px]'>
            <div className='w-[283px] h-[20px]'>
                <h1 className='font-inter font-normal text-[13px] leading-[20px] text-[#000000]'>
                    Emergency Feedback
                </h1>
            </div>
            <input type="text" className='w-[283px] h-[80px] rounded-[8px] border-[1px] border-[#495057] p-[10px] gap-[10px]'
                               placeholder='Write feedback...'/>
        </div>
        <div className='flex flex-row w-[283px] h-[40px] gap-[16px]'>
            <button className='w-[133.5px] h-[40px] rounded-[8px] border-[1px] border-[#005E0E] py-[10px] 
                               px-[24px] gap-[10px] bg-[#FFFFFF] font-inter font-normal text-[13px] leading-[20px] text-center text-[#000000]'
                    onClick={()=>callback1()}>
                Cancel
            </button>
            <button className='w-[133.5px] h-[40px] rounded-[8px] py-[10px] px-[24px] gap-[10px] bg-[#005E0E]
                               font-inter font-normal text-[13px] leading-[20px] text-center text-[#000000]'
                    onClick={()=>callback2()}>
                Submit
            </button>
        </div>
    </div>
  );
}