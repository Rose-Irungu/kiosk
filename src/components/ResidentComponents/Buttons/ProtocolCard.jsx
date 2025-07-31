import React from 'react';

export default function ProtocolCard({image, label, callback, onCardClick, id, activeCardId}) {
  const isActive = id === activeCardId;
  return (
    <div className='flex flex-row w-[349px] h-[46px] rounded-[12px] p-[10px] gap-[11px] border-1 border-[#005E0E] bg-[#FFFFFF]'
          style={{backgroundColor: isActive? '#E6FBE9' : '#FFFFFF'}}
          onClick={() => {
            callback();
            onCardClick(id);
          }}>

        <div className='flex flex-col justify-center align-items-center w-[24px] h-[24px]'>
            <img src={image} alt="Protocol image" className='w-[24px] h-[24px] fill-green-700 object-contain' />
        </div>
        <p className='font-dmsans font-semibold text-[20px] text-[#002706] leading-[100%] tracking-[0]'>{label}</p>

    </div>
  );
}
