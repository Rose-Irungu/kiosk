import React from 'react';

export default function SetP({text, callback}) {
  return (
    <div className='w-[38px] h-[26px]'>
        <p className='font-dmsans font-medium text-[20px] text-[#00D21E] leading-[100%] tracking-[0]'
           onClick={()=>callback()}>
          {text}
        </p>
    </div>
  );
}