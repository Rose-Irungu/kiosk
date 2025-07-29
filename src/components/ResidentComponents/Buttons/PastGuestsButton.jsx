import React, {useState} from 'react';

export default function PastGuestsButton({label, callback}) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <button className='flex justify-center align-items-center text-center w-[362px] h-[32px] rounded-[16px] p-[5px] bg-[#FFFFFF] font-dmsans font-semibold text-[14px] text-[#000000]'
       style={{ backgroundColor: !isClicked ? '#FFFFFF' : '#E6FBE9' }} 
       onClick={() => {
         callback();
         setIsClicked(true);
       }}>
      {label}
    </button>
  );
}