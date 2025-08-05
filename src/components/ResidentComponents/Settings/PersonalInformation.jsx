import React from 'react';
import Header2 from './Header2';
import SubHeader from './SubHeader';

export default function PersonalInformation({phone, email}) {
  return (
    <div className='flex flex-col w-full h-[256px] rounded-[12px] p-[20px] gap-[7px] bg-[#FFFFFF]'>
        <Header2 icon="/msee.svg" text={"Personal Information"}/>
        <div className='flex flex-col w-full h-[178px] gap-[10px]'>
            <div className='flex flex-col w-full h-[84px] py-[4px] gap-[4px]'>
                <SubHeader icon="/nefo2.svg" text={"Phone"}/>
                <input type="text" 
                       placeholder={phone}
                       className='w-full h-[46px] rounded-[12px] border-[1px] p-[10px] gap-[10px] border-[#00000080]'
                />
            </div>
            <div className='flex flex-col w-full h-[84px] py-[4px] gap-[4px]'>
                <SubHeader icon="/pepe.svg" text={"Email"}/>
                <input type="text" 
                       placeholder={email}
                       className='w-full h-[46px] rounded-[12px] border-[1px] p-[10px] gap-[10px] border-[#00000080]'
                />
            </div>
        </div>
    </div>
  );
}