import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
//import InviteGuest from '../../components/ResidentComponents/Buttons/InviteGuest';
import SosButton from '../../components/ResidentComponents/Buttons/SosButton';
import SafetyProtocolsButton from '../../components/ResidentComponents/Buttons/SafetyProtocolsButton';
import PastGuestsButton from '../../components/ResidentComponents/Buttons/PastGuestsButton';
import MyGuestsFrame from '../../components/ResidentComponents/ResidentCards/MyGuestsFrame';

//Service imports
import {/*inviteGuest,*/ triggerSOS, clickTest} from '../../services/residentDashboardServices';

function ResidentDashboard() {
    const [activeCardId, setActiveCardId] = useState(null);
    const navigate = useNavigate();
    const handleCardClick = (id) => {
        setActiveCardId(id);
    };
  return (
     <div className="flex flex-wrap justify-start mb-[12px] space-y-4">
        <input type="text" className='flex flex-row w-full h-[40px] rounded-[8px] border-[1px] border-[#E6FBE9] gap-[10px] py-[3px] px-[16px] bg-[#FFFFFF] ' style={{marginTop:'16px'}} placeholder={"Search"}/>
        <div className='flex flex-col w-full h-[341px] rounded-[12px] py-[12px] px-[8px] gap-[18px] bg-[#E6FBE9]'>
          <MyGuestsFrame/>
        </div>
        <div className='flex flex-col w-full lg:h-[222px] top-[521px] rounded-[12px] py-[8px] px-[12px] bg-[#F0EEFD] gap-[10px]'>
            <div className='flex flex-row justify-between w-full h-[32px]'>
                <div className='flex flex-row w-[182px] h-[32px]'>
                    <div className='h-[32px] w-[32px]'></div>
                    <h1 className='font-dmsans font-semibold text-[24px] text-[#002706]'>Past Guests</h1>
                </div>
            </div>
            <div className='flex flex-row justify-between w-full h-[40px] rounded-[24px] py-[4px] px-[8px] gap-[10px]'>
                <PastGuestsButton label={"Today"} callback={() => clickTest} onCardClick={handleCardClick} id = "card1" activeCardId={activeCardId}/>
                <PastGuestsButton label={"This Week"} callback={() => clickTest} onCardClick={handleCardClick} id = "card2" activeCardId={activeCardId}/>
                <PastGuestsButton label={"This Month"} callback={() => clickTest} onCardClick={handleCardClick} id = "card3" activeCardId={activeCardId}/>
            </div>
            <div className='flex flex-row w-full h-[106px] py-[12px] px-[8px] gap-[10px]'>
                {activeCardId == 'card1' ? (<p>card 1</p>) : activeCardId == 'card2' ? (<p>card 2</p>) : <p>card 3</p>}
            </div>
        </div>
        <div className='flex flex-col w-full lg:h-[165px] lg:top-[784px] rounded-[12px] py-[10px] px-[20px] bg-[#FDE8E7]'>
            <div className='flex flex-row justify-between w-full h-[32px]'>
                <div className='flex flex-row gap-[12px] w-[262px] h-[32px]'>
                    <div className='h-[32px] w-[32px]'></div>
                    <h1 className='font-dmsans font-semibold text-[24px] text-[#610C07]'>Emergencies Panel</h1>
                </div>
            </div>
            <div className='flex flex-row justify-between w-full h-[96px] rounded-[12px] py-[12px] px-[14px] space-x-4'>
                <SosButton callback={triggerSOS}/>
                <SafetyProtocolsButton callback={()=>navigate("/resident/safetyprotocols")}/>
            </div>
        </div>
     </div>
  );
}

export default ResidentDashboard;