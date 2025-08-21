import React from 'react';

export default function FavoriteDetail({img, name, phone, email, callback1, callback2, callback3}) {
  return (
    <div className='flex flex-col w-full sm:w-[517px] h-[296px] rounded-[24px] bg-[#F5F4F5]'>
        <div className='flex flex-row w-full justify-between h-[61px] border-b-[1px] border-[#E6FBE9] rounded-tl-[24px] rounded-tr-[24px] p-[20px] bg-[#FFFFFF]'>
            <div className='w-[185px] h-[41px] py-[5px] px-[10px] gap-[10px]'>
                <h1 className='font-dmsans font-bold text-[24px] text-[#002706] leading-[100%] tracking-normal'>
                    Visitor Details
                </h1>
            </div>
            <div className='w-[30px] h-[30px] cursor-pointer'
                 onClick={(e) => { e.stopPropagation(); callback1(); }}
            >
                <img src="/x.svg" className='w-[30px] h-[30px]'
                                  onClick={()=>callback1()}
                />
            </div>
        </div>
        <div className='flex flex-row justify-between h-[30px] top-[85px]'>
            <div className='w-[216px] h-[22px] left-[30px]'>
                <h1 className='font-dmsans font-bold text-[18px] text-[#005E0E] leading-[100%] tracking-normal mt-[4px] ml-[30px]'>
                    Personal Information
                </h1>
            </div>
            <div className='w-[30px] h-[30px]  left-[459px] mr-[30px]'>
                <img src="/hearts.svg" className='w-[30px] h-[30px] mt-[2px]'/>
            </div>
        </div>
        <div className='flex flex-row justify-between'>
            <div className='w-[120px] h-[120px] ml-[30px]'>
                <img src={img} className='w-[120px] h-[120px] top-[128px]'/>
            </div>
            <div className='flex flex-col w-[275px] h-[126px] top-[125px] left-[184px] gap-[5px]'>
                <div className='flex flex-col w-[275px] h-[90px]'>
                    <div className='w-[151px] h-[34px] py-[4px] gap-[10px]'>
                        <h1 className='font-dmsans font-bold text-[20px] leading-[100%] tracking-normal'>
                            {name}
                        </h1>
                    </div>
                    <div className='flex flex-row w-[236px] h-[28px] py-[4px] gap-[4px]'>
                        <p className='font-dmsans font-semibold text-[18px] text-[#002706] leading-[100%] tracking-normal'>
                            Phone:
                        </p>
                        <p className='font-dmsans font-medium text-[18px] text-[#002706] leading-[100%] tracking-normal'>
                            {phone}
                        </p>
                    </div>
                    <div className='flex flex-row w-[236px] h-[28px] px-[4px] gap-[4px]'>
                        <p className='font-dmsans font-semibold text-[18px] text-[#002706] leading-[100%] tracking-normal'>
                            Email:
                        </p>
                        <p className='font-dmsans font-medium text-[18px] text-[#002706] leading-[100%] tracking-normal'>
                            {email}
                        </p>
                    </div>
                </div>
                <div className='flex flex-row w-[239px] h-[31px] justify-between'>
                    <button className='cursor-pointer w-[129px] h-[31px] rounded-[4px] border-b-[1px] py-[5px] px-[]2px gap-[10px] bg-[#005E0E] 
                                       font-dmsans font-bold text-[16px] text-[#FFFFFF] leading-[100%] tracking-normal'
                            onClick={()=>callback2()}
                    >
                        Invite Guest
                    </button>
                    <button className='cursor-pointer w-[91px] h-[31px] rounded-[4px] border-[1px] border-[#005E0E] py-[5px] px-[10px] gap-[10px]
                                       font-dmsans font-bold text-[16px] text-[#005E0E] leading-[100%] tracking-normal'
                            onClick={()=>callback3()}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}