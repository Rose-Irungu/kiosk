import React from 'react';
import Head from './Head';
import SectionHeading from './SectionHeading';

export default function SecurityConcerns() {
  return (
    <div className='flex flex-col w-[728px] md:w-full sm:w-full h-[256.8px] gap-[21px]'>
      <Head/>
      <div className='flex flex-col lg:w-[728px] lg:h-[175.8] gap-[7px]'>
        <SectionHeading icon="" text = "What to do when you feel unsafe/see something strange:"/>
        <div className='flex flex-col w-full h-[137.80] gap-[1.72px]'></div>
      </div>
    </div>
  );
}
