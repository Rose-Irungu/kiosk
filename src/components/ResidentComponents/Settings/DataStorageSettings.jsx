import React from 'react';
import Header from './Header';

export default function DataStorageSettings() {
  return (
    <div className='flex flex-col w-full h-[186px] rounded-[12px] py-[20px] px-[10px] gap-[9px] bg-[#FFFFFF]'>
        <Header icon="/file.svg" text="Data and Storage Settings"/>
        <div className='flex flex-col w-full h-[106px] gap-[10px]'></div>
    </div>
  );
}