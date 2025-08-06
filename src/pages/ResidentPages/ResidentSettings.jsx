import React from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import User from '../../components/ResidentComponents/Settings/User';
import Header from '../../components/ResidentComponents/Settings/Header';
import PersonalInformation from '../../components/ResidentComponents/Settings/PersonalInformation';
import Cars from '../../components/ResidentComponents/Settings/Cars';
import HouseholdInformation from '../../components/ResidentComponents/Settings/HouseholdInformation';
import NotificationSettings from '../../components/ResidentComponents/Settings/NotificationSettings';
import DataStorageSettings from '../../components/ResidentComponents/Settings/DataStorageSettings';

//Scripts
import clearCache from '../../scripts/clearCache';

export default function ResidentSettings() {
  const navigate = useNavigate();
  return (
    <ResidentLayout>
        <div className="flex flex-wrap flex-col justify-start mb-[12px] space-y-4">
          <User/>
          <Header icon="/msee.svg" text={"My Profile"}/>
          <PersonalInformation />
          <Cars />
          <HouseholdInformation />
          <Header icon="/gear.svg" text={"My Settings"}/>
          <NotificationSettings/>
          <DataStorageSettings callback1={()=>clearCache(navigate, "/loginform")} callback2={()=>navigate("/resident/loggeddevices")}/>
        </div>
    </ResidentLayout>
  );
}