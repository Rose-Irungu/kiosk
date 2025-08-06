import React from 'react';
import Location from './Location';
import Time from './Time';

export default function OtherDevice({os, place, time, browser, callback}) {
  return (
    <div className='flex flex-col w-full rounded-[12px] py-[10px] px-[20px] gap-[10px] bg-[#FFFFFF]'>
        <div className='w-full h-[26px] gap-[22px]'>
            <div className='flex flex-row justify-between w-[full] h-[26px] gap-[20px] text-center items-center'>
                <h1 className='font-dmsans font-bold text-[18px] text-[#000000] leading-[100%] tracking-[0]'>{os}</h1>
                <button className='w-[126px] h-[31px] rounded-[5px] border-[1px] border-[#005E0E] py-[5px] px-[10px] font-dmsans font-medium text-[16px] text-[#005E0E] leading-[100%] tracking-[0]'
                        onClick={()=>callback()}
                >
                    Sign Out
                </button>
            </div>
        </div>
        <div className='flex flex-row w-[256px] h-[20px] gap-[40px]'>
            <Location place={place}/>
            <Time time={time}/>
        </div>
        <div className='w-full h-[0px] border-[1px] border-[#999999]'></div>
        <div className='flex flex-row w-[76px] h-[24px] gap-[14px]'>
            <div className='flex flex-col w-[24px] h-[24px] justify-center items-center'>
                <img src="/dot.svg" className='w-[7.599999904632568px] h-[7.599999904632568px] top-[8.2px] left-[8.2px]' />
            </div>
            <div className='w-[38px] h-[18px] text-center'>
                <p className='font-dmsans font-medium text-[14px] text-[#666666] mt-[4px] leading-[100%] tracking-[0]'>{browser}</p>
            </div>
        </div>
    </div>
  );
}