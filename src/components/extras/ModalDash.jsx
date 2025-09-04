import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ModalDash({ id, callback1, callback2 }) {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="flex flex-col w-[347px] h-[220px] rounded-[16px] pt-[24px] pb-[32px] px-[32px] gap-[16px] bg-[#FFFFFF]">
      <div className="flex flex-col w-[283px] h-[108px] gap-[8px]">
        <h1 className="font-inter text-[13px] leading-[20px] text-[#000000]">
          Emergency Feedback
        </h1>
        <input
          type="text"
          className="w-[283px] h-[80px] rounded-[8px] border border-[#495057] p-[10px]"
          placeholder="Write feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>

      <div className="flex flex-row w-[283px] h-[40px] gap-[16px]">
        <button
          className="w-[133.5px] h-[40px] cursor-pointer rounded-[8px] border border-[#005E0E] bg-[#FFFFFF] text-[13px] text-[#000000]"
          onClick={() => {
            callback1();
            setFeedback("");
            console.log('Cancel is clicking');
          }}
        >
          Cancel
        </button>
        <button
          className="w-[133.5px] h-[40px] cursor-pointer rounded-[8px] bg-[#005E0E] text-[13px] text-[#FFFFFF]"
          onClick={() => {
            if(!feedback){
              toast.error('Please fill in an emergency feedback');
              return;
            }
            callback2(feedback);
            console.log('Submit is clicking');
            setTimeout(()=>{
              toast.success('Emergency resolved successfully');
              callback1();
            }, 3000);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
