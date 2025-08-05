import React from 'react';
import Header from './Header';
import NotificationItem from './NotificationItem';

export default function NotificationSettings({callback1, callback2, callback3}) {
  return (
    <div className='flex flex-col w-full h-[244px] rounded-[12px] py-[20px] px-[10px] gap-[9px] bg-[#FFFFFF]'>
        <Header icon="/ring_the_bell.svg" text="Notification Settings"/>
        <div className='flex flex-col w-full h-[164px] gap-[10px]'>
            <NotificationItem icon="/push.svg" text="Push Notifications" callback={()=>callback1()} />  
            <NotificationItem icon="/mail.svg" text="Email Alerts" callback={()=>callback2()} /> 
            <NotificationItem icon="/meso.svg" text="SMS Alerts" callback={()=>callback3()} />      
        </div>
    </div>
  );
}