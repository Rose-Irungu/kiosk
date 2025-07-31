import React from 'react';
import Head from './Head';
import SectionHeading from './SectionHeading';
import SafetyP from './SafetyP';

export default function ElectricityWater() {
  return (
    <div className='flex flex-col w-[728px] md:w-full sm:w-full h-[256.8px] gap-[21px]'>
      <Head/>
      <div className='flex flex-col lg:w-[728px] lg:h-[175.8] gap-[7px]'>
         <SectionHeading icon="" text = "Electricity & Water:"/>
         <div className='flex flex-col w-full h-[137.80] gap-[1.72px]'>
          <SafetyP icon="" text="Report any water leak or broken light."/>
          <SafetyP icon="" text="Don't touch wires or sockets with wet hands."/>
          <SafetyP icon="" text="Report any lights that are not working."/>
         </div>
      </div>
    </div>
  );
}
