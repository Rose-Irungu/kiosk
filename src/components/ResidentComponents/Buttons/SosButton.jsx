import React from 'react'

export default function SosButton({callback}) {
  return (
    <button className='flex flex-col justify-center w-[540px] h-[72px] rounded-[11.8px] py-[2.95px] px-[7.38px] gap-[7.38px] font-dmsans text-[16px] font-bold text-[#FEFEFE] text-center align-items-center'
        onClick={() => callback()}
        style={{background: 'linear-gradient(180deg, #F6003B 0%, #550115 100%)'}}>
        S.O.S
    </button>
  );
}