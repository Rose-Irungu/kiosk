import React, {useState} from 'react';
import Header2 from './Header2';
import SubHeader from './SubHeader';
import SetP from './SetP';
import  SubmitButton from './SubmitButton';

export default function HouseholdInformation({occupants}) {
    const [show, setShow] = useState(false);
    const handleClick = () => {
      setShow(prev => !prev);
    };
  return (
    <div className='flex flex-col w-full h-[155px] rounded-[12px] p-[20px] gap-[7px] bg-[#FFFFFF]'>
        <Header2 icon="/keja.svg" text={"Household Information"}/>
        <div className='flex flex-col w-full h-[178px] gap-[10px]'>
            <div className='flex flex-col w-full h-[84px] py-[4px] gap-[4px]'>
                <div className='flex flex-row w-full h-[31px] justify-between'>
                   <SubHeader icon="/wasee.svg" text={"Occupants"}/>
                   <SetP text="Edit" callback={()=>handleClick()}/>
                    {show && <SubmitButton/>}
                </div>
                <input type="text" 
                       placeholder={occupants || 0}
                       className='w-full h-[46px] rounded-[12px] border-[1px] p-[10px] gap-[10px] border-[#00000080]'
                />
            </div>
        </div>
    </div>
  );
}