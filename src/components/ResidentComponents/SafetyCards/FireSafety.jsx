import React from 'react';
import Head from './Head';
import SectionHeading3 from './SectionHeading';
import SafetyP from './SafetyP';

export default function SafetyProtocolsHeader() {
  return (
    <div className='flex flex-col w-[728px] md:w-full sm:w-full h-[256.8px] gap-[21px]'>
      <Head/>
      <div className='flex flex-col lg:w-[728px] lg:h-[175.8] gap-[7px]'>
        <SectionHeading3 icon="" text="What to do when there is a fire?"/>
        <div className='flex flex-col w-full h-[137.80] gap-[1.72px]'>
          <SafetyP icon="../../../assets/stairtick.svg" text="Don't use the lift. Use the Stairs."/>
          <SafetyP icon="" text="If you hear the alarm, leave the building fast."/>
          <SafetyP icon="" text="Tell security or an adult right away."/>
          <SafetyP icon="" text="Go to the safe meeting spot outside."/>
        </div>
      </div>
    </div>
  );
}
