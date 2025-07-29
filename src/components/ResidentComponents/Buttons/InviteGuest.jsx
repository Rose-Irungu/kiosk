import React from 'react';

export default function InviteGuest({callback}) {
  return (
    <button className='flex items-center justify-center w-[126px] h-[32px] rounded-[8px] py-[4px] px-[10px] bg-[#005E0E] text-white text-center font-dmsans text-[14px] font-semibold'
      onClick={() => callback()}>
      <img src="../../../assets/plus.svg" alt="Invite Guest" className="w-[14px] h-[14px] top-[5px] left-[5px] object-contain" />
      Invite Guest
    </button>
  );
}