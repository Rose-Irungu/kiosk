  import React from "react";
export default function SubmitButton(callback){
    return <button className='ml-[20px]w-[70px] h-[20px] bg-[#00D21E] text-white text-base text-center font-dmsans font-medium leading-[100%] tracking-[0]'
                   onClick={()=>callback()}> Submit
           </button>
};