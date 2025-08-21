import React from 'react';

export default function EditVisitor({callback1}) {
  return (
    <div className='w-[517px] h-[460px] rounded-[24px] bg-[#F5F4F5]'>
        <div className='flex flex-row justify-between w-[517px] h-[61px] rounded-t-[24px] border-b-[1px] border-[#E6FBE9] p-[20px] bg-[#FFFFFF]'>
            <div className='w-[185px] h-[41px] py-[5px] px-[10px] gap-[10px]'>
                <h1 className='font-dmsans font-bold text-[24px] text-[#002706] leading-[100%] tracking-normal'>
                    Visitor Details
                </h1>
            </div>
            <div className='w-[30px] h-[30px] cursor-pointer'
                 onClick={(e) => { e.stopPropagation(); callback1(); }}
            >
                <img src="/x.svg" className='w-[30px] h-[30px]' />
            </div>
        </div>
        <div className='flex flex-col'>
            <h1 className='ml-[10px] mt-[10px] font-dmsans font-bold text-[18px] text-[#005E0E] leading-[100%] tracking-normal'>
                Personal Information
            </h1>
            <form action="" className='ml-[10px] mt-[10px] p-[10px] pb-[5px]'>
                <label htmlFor="name" className='font-semibold font-dmsans text-[16px] text-[#000000] leading-[100%] tracking-normal'>Name</label>
                <input id='name' type="text" className='w-full h-[46px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'/>
                <label htmlFor="phone" className='font-semibold font-dmsans text-[16px] text-[#000000] leading-[100%] tracking-normal'>Phone</label>
                <input id='phone' type="text" className='w-full h-[46px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'/>
                <label htmlFor="email" className='font-semibold font-dmsans text-[16px] text-[#000000] leading-[100%] tracking-normal'>Email</label>
                <input id='email' type="text" className='w-full h-[46px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'/>
                <label htmlFor="photo" className='font-semibold font-dmsans text-[16px] text-[#000000] leading-[100%] tracking-normal'>Photo</label>
                <input id='photo' type="text" className='w-full h-[46px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'/>
                <button className='cursor-pointer w-full h-[50px] rounded-[8px] border-[1px] border-[#005E0E] py-[7px] px-[10px] gap-[10px] bg-[#005E0E] mt-[10px]
                                    font-dmsans font-bold text-[16px] text-[#E6FBE9] leading-[100%] tracking-normal'
                >
                    Save
                </button>
            </form>
        </div>
    </div>
  );
}