import React from 'react';
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import User from '../../components/ResidentComponents/Settings/User';
import Header from '../../components/ResidentComponents/Settings/Header';
import PersonalInformation from '../../components/ResidentComponents/Settings/PersonalInformation';
import Cars from '../../components/ResidentComponents/Settings/Cars';
import HouseholdInformation from '../../components/ResidentComponents/Settings/HouseholdInformation';

export default function ResidentSettings() {
  return (
    <ResidentLayout>
        <div className="flex flex-wrap flex-col justify-start mb-[12px] space-y-4">
          <User/>
          <Header icon="/msee.svg" text={"My Profile"}/>
          <PersonalInformation />
          <Cars />
          <HouseholdInformation />
          <Header icon="/gear.svg" text={"My Settings"}/>
        </div>
    </ResidentLayout>
  );
}