import React, { useState } from 'react';

// import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
// import InviteGuest from '../../components/ResidentComponents/Buttons/InviteGuest';
import SosButton from '../../components/ResidentComponents/Buttons/SosButton';
import SafetyProtocolsButton from '../../components/ResidentComponents/Buttons/SafetyProtocolsButton';
import PastGuestsButton from '../../components/ResidentComponents/Buttons/PastGuestsButton';
import MyGuestsFrame from '../../components/ResidentComponents/ResidentCards/MyGuestsFrame';

// Service imports
import { inviteGuest, triggerSOS, clickTest } from '../../services/residentDashboardServices';

function ResidentDashboard() {
    const [activeCardId, setActiveCardId] = useState(null);
    const handleCardClick = (id) => {
        setActiveCardId(id);
    };
  return (
    <>
      
      <div className="mb-6">
        <MyGuestsFrame />
      </div>

      <div className="flex flex-wrap justify-start mb-[12px] space-y-4">
        <div className="flex flex-col w-full lg:h-[222px] top-[521px] rounded-[12px] py-[8px] px-[12px] bg-[#F0EEFD] gap-[10px]">
          <div className="flex flex-row justify-between w-full h-[32px]">
            <div className="flex flex-row w-[182px] h-[32px]">
              <div className="h-[32px] w-[32px]"></div>
              <h1 className="font-dmsans font-semibold text-[24px] text-[#002706]">Past Guests</h1>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full h-[40px] rounded-[24px] py-[4px] px-[8px] gap-[10px]">
            <PastGuestsButton label={"Today"} callback={() => clickTest} />
            <PastGuestsButton label={"This Week"} callback={() => clickTest} />
            <PastGuestsButton label={"This Month"} callback={() => clickTest} />
          </div>
        </div>

        <div className="flex flex-col w-full lg:h-[165px] lg:top-[784px] rounded-[12px] py-[10px] px-[20px] bg-[#FDE8E7]">
          <div className="flex flex-row justify-between w-full h-[32px]">
            <div className="flex flex-row gap-[12px] w-[262px] h-[32px]">
              <div className="h-[32px] w-[32px]"></div>
              <h1 className="font-dmsans font-semibold text-[24px] text-[#610C07]">Emergencies Panel</h1>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full h-[96px] rounded-[12px] py-[12px] px-[14px] space-x-4">
            <SosButton callback={triggerSOS} />
            <SafetyProtocolsButton callback={clickTest} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResidentDashboard;
