import React from 'react';
import Head from './Head';
import SectionHeading from './SectionHeading';
import SafetyP from './SafetyP';

export default function SecurityConcerns() {
  return (
    <div className='flex flex-col w-[728px] md:w-full sm:w-full h-[256.8px] gap-[21px]'>
      <Head/>
      <div className='flex flex-col lg:w-[728px] lg:h-[175.8] gap-[7px]'>
        <SectionHeading icon="/triangle.svg" text = "What to do when you feel unsafe/see something strange:"/>
        <div className='flex flex-col w-full h-[137.80] gap-[1.72px]'>
          <SafetyP icon="/tick.svg" text="Fill the security concern form if it's not an emergency."/>
          <SafetyP icon="/tick.svg" text="Triple tap the SOS button if you're in immediate danger."/>
          <SafetyP icon="/tick.svg" text="Don't let strangers into your home."/>
        </div>
      </div>
    </div>
  );
}
