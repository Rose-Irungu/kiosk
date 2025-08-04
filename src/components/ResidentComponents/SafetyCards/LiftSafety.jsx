import React from 'react';
import Head from './Head';
import SectionHeading from './SectionHeading';
import SafetyP from './SafetyP';

export default function LiftSafety() {
  return (
    <div className='flex flex-col w-[728px] md:w-full sm:w-full h-[256.8px] gap-[21px]'>
      <Head/>
      <div className='flex flex-col lg:w-[728px] lg:h-[175.8] gap-[7px]'>
        <SectionHeading icon="/lifup.svg" text = "In the lift:"/>
        <div className='flex flex-col w-full h-[137.80] gap-[1.72px]'>
          <SafetyP icon="/tick.svg" text="Don't jump or play inside."/>
          <SafetyP icon="/tick.svg" text="Press the red button if you get stuck."/>
        </div>
      </div>
    </div>
  );
}
