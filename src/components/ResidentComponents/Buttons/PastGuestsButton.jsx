import React from 'react';

export default function PastGuestsButton({label, callback, onCardClick, id, activeCardId}) {

  const isActive = id === activeCardId;

  return (
    <button className='flex justify-center align-items-center text-center w-1/3 h-[32px] rounded-[16px] p-[5px] bg-[#FFFFFF] font-dmsans font-semibold text-[14px] text-[#000000]'
       style={{ backgroundColor: isActive ? '#E6FBE9' :'#FFFFFF' }} 
       onClick={() => {
         callback();
         onCardClick(id);
       }}>
      {label}
    </button>
  );
}