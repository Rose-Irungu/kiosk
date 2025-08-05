import React from 'react';
import Header from './Header';
import DataItem from './DataItem';

export default function DataStorageSettings({callback1, callback2}) {
  return (
    <div className='flex flex-col w-full h-[186px] rounded-[12px] py-[20px] px-[10px] gap-[9px] bg-[#FFFFFF]'>
        <Header icon="/file.svg" text="Data and Storage Settings"/>
        <div className='flex flex-col w-full h-[106px] gap-[10px]'>
            <DataItem icon="/kengele.svg" icon2="/bin.svg" text="Clear Cache" callback={()=>callback1()}/>
            <DataItem icon="/mail.svg" icon2="/ngam.svg" text="View Logged in Devices" callback={()=>callback2()}/>
        </div>
    </div>
  );
}