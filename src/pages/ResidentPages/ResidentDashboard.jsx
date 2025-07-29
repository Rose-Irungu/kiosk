import React from 'react';
//import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import InviteGuest from '../../components/ResidentComponents/Buttons/InviteGuest';

//Service imports
import inviteGuest from '../../services/residentDashboardServices';

function ResidentDashboard() {
  return (
     <div className="flex flex-wrap justify-start mb-[12px]">
        <InviteGuest callback={inviteGuest}/>
     </div>
  );
}

export default ResidentDashboard;