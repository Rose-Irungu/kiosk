import React from 'react';
import Header2 from './Header2';
import SubHeader from './SubHeader';
import SetP from './SetP';

export default function Cars({plate}) {
  return (
    <div className='flex flex-col w-full h-[155px] rounded-[12px] p-[20px] gap-[7px] bg-[#FFFFFF]'>
        <Header2 icon="/ndai.svg" text={"Cars"}/>
        <div className='flex flex-col w-full h-[178px] gap-[10px]'>
            <div className='flex flex-col w-full h-[84px] py-[4px] gap-[4px]'>
                <div className='flex flex-row w-full h-[31px] justify-between'>
                   <SubHeader icon="/plate.svg" text={"License Plate"}/>
                   <SetP text="Edit"/>
                </div>
                <input type="text" 
                       placeholder={plate || "XXX ###X, XXX ###X"}
                       className='w-full h-[46px] rounded-[12px] border-[1px] p-[10px] gap-[10px] border-[#00000080]'
                />
            </div>
        </div>
    </div>
  );
}