import React from 'react';
import Head from './Head';
import SectionHeading from './SectionHeading';
import SafetyP from './SafetyP';

export default function EmergencyPreparedness() {
  return (
    <div className='flex flex-col w-[728px] md:w-full sm:w-full h-[256.8px] gap-[21px]'>
      <Head/>
      <div className='flex flex-col lg:w-[728px] lg:h-[175.8] gap-[7px]'>
        <SectionHeading icon="" text = "Stay ready:"/>
        <div className='flex flex-col w-full h-[137.80] gap-[1.72px]'>
          <SafetyP icon="" text="Know where the exits and stairs are."/>
          <SafetyP icon="" text="Keep a small emergency bag ready(Water, ID, Keys)."/>
          <SafetyP icon="" text="Save emregency numbers in your phone."/>
        </div>
      </div>
    </div>
  );
}
