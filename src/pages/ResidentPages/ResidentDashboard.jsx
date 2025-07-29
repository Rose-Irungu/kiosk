import React from 'react';
//import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import InviteGuest from '../../components/ResidentComponents/Buttons/InviteGuest';
import SosButton from '../../components/ResidentComponents/Buttons/SosButton';
import SafetyProtocolsButton from '../../components/ResidentComponents/Buttons/SafetyProtocolsButton';
import PastGuestsButton from '../../components/ResidentComponents/Buttons/PastGuestsButton';


//Service imports
import {inviteGuest, triggerSOS, clickTest} from '../../services/residentDashboardServices';

function ResidentDashboard() {
  return (
     <div className="flex flex-wrap justify-start mb-[12px]">
        <InviteGuest callback={inviteGuest}/>
        <SosButton callback = {triggerSOS}/>
        <SafetyProtocolsButton />
        <PastGuestsButton label="Today" callback={clickTest}/>
     </div>
  );
}

export default ResidentDashboard;