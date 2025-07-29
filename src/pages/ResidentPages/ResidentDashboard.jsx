import React from 'react';
//import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import InviteGuest from '../../components/ResidentComponents/Buttons/InviteGuest';
import SosButton from '../../components/ResidentComponents/Buttons/SosButton';
import SafetyProtocolsButton from '../../components/ResidentComponents/Buttons/SafetyProtocolsButton';

//Service imports
import {inviteGuest, triggerSOS} from '../../services/residentDashboardServices';

function ResidentDashboard() {
  return (
     <div className="flex flex-wrap justify-start mb-[12px]">
        <InviteGuest callback={inviteGuest}/>
        <SosButton callback = {triggerSOS}/>
        <SafetyProtocolsButton />
     </div>
  );
}

export default ResidentDashboard;