import React, {useState} from 'react';

export default function PastGuestsButton({label, callback, id, activeCardId}) {

  const [isClicked, setIsClicked] = useState(false);
  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button className='flex justify-center align-items-center text-center w-1/3 h-[32px] rounded-[16px] p-[5px] bg-[#FFFFFF] font-dmsans font-semibold text-[14px] text-[#000000]'
       style={{ backgroundColor: isClicked ? '#E6FBE9' :'#FFFFFF' }} 
       onClick={() => {
         callback();
         handleToggle();
       }}>
      {label}
    </button>
  );
}