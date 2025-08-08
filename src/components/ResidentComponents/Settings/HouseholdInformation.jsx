import React, { useState, useEffect } from 'react';
import Header2 from './Header2';
import SubHeader from './SubHeader';
import SetP from './SetP';
import SubmitButton from './SubmitButton';
import { userService } from '../../../services/user';

export default function HouseholdInformation({ occupants, id }) {
  const [currentOccupants, setOccupants] = useState(occupants)
  const [show, setShow] = useState(false);

  useEffect(() => {
    setOccupants(occupants);
  }, [occupants]);

  const handleClick = () => {
    setShow(prev => !prev);
  };

  const handleOnSubmit = async () => {
    const formData = new FormData();
    formData.append('number_of_residents', currentOccupants);

    try {
      const res = await userService.updateUser(id, formData);
      if (res.result_code === 0) {
        const updatedUser = res.data;
        setOccupants(updatedUser.number_of_residents);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        setShow(false)
      }
      console.log(res.message);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className='flex flex-col w-full h-[155px] rounded-[12px] p-[20px] gap-[7px] bg-[#FFFFFF]'>
      <Header2 icon="/keja.svg" text={"Household Information"} />
      <div className='flex flex-col w-full h-[178px] gap-[10px]'>
        <div className='flex flex-col w-full h-[84px] py-[4px] gap-[4px]'>
          <div className='flex flex-row w-full h-[31px] justify-between'>
            <SubHeader icon="/wasee.svg" text={"Occupants"} />
            <SetP text={show ? "Cancel" : "Edit"} callback={() => handleClick()} />
            {show && <SubmitButton callback={handleOnSubmit}/>}
          </div>
          <input type="text"
            value={currentOccupants}
            onChange={(e) => setOccupants(e.target.value)}
            placeholder={currentOccupants || 0}
            readOnly={!show}
            className='w-full h-[46px] rounded-[12px] border-[1px] p-[10px] gap-[10px] border-[#00000080]'
          />
        </div>
      </div>
    </div>
  );
}