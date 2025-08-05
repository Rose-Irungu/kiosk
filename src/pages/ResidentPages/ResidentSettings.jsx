import React from 'react';
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import User from '../../components/ResidentComponents/Settings/User';
import Header from '../../components/ResidentComponents/Settings/Header';
import PersonalInformation from '../../components/ResidentComponents/Settings/PersonalInformation';

export default function ResidentSettings() {
  return (
    <ResidentLayout>
        <div className="flex flex-wrap flex-col justify-start mb-[12px] space-y-4">
          <User/>
          <Header icon="/msee.svg" text={"My Profile"}/>
          <PersonalInformation />
        </div>
    </ResidentLayout>
  );
}