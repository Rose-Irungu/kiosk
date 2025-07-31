import React from 'react';
import Head from './Head';
import SectionHeading from './SectionHeading';
import SafetyP from './SafetyP';

export default function VisitorDeliveries() {
  return (
    <div className='flex flex-col w-[728px] md:w-full sm:w-full h-[256.8px] gap-[21px]'>
      <Head/>
      <div className='flex flex-col lg:w-[728px] lg:h-[175.8] gap-[7px]'>
        <SectionHeading icon="" text = "Safety around visitors and deliveries:"/>
        <div className='flex flex-col w-full h-[137.80] gap-[1.72px]'>
          <SafetyP icon="" text="Approve visitors before they come."/>
          <SafetyP icon="" text="Don't let in people you don't know."/>
          <SafetyP icon="" text="Collect your deliveries at the gate or door - don't allow them into your house"/>
        </div>
      </div>
    </div>
  );
}
