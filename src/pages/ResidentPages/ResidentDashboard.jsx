import React from 'react';
//import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
//import InviteGuest from '../../components/ResidentComponents/Buttons/InviteGuest';
import SosButton from '../../components/ResidentComponents/Buttons/SosButton';
import SafetyProtocolsButton from '../../components/ResidentComponents/Buttons/SafetyProtocolsButton';
//import PastGuestsButton from '../../components/ResidentComponents/Buttons/PastGuestsButton';

//Service imports
import {inviteGuest, triggerSOS, clickTest} from '../../services/residentDashboardServices';

function ResidentDashboard() {
  return (
     <div className="flex flex-wrap justify-start mb-[12px]">
        <div className='flex flex-col w-full lg:h-[165px] top-[784px] rounded-[12px] py-[10px] px-[20px] bg-[#FDE8E7]'>
            <div className='flex flex-row justify-between w-full h-[32px]'>
                <div className='flex flex-row gap-[12px] w-[262px] h-[32px]'>
                    <div className='h-[32px] w-[32px]'></div>
                    <h1 className='font-dmsans font-semibold text-[24px] text-[#610C07]'>Emergencies Panel</h1>
                </div>
            </div>
            <div className='flex flex-row justify-between w-full h-[96px] rounded-[12px] py-[12px] px-[14px]'>
                <SosButton callback={triggerSOS}/>
                <SafetyProtocolsButton callback={clickTest}/>
            </div>
        </div>
     </div>
  );
}

export default ResidentDashboard;