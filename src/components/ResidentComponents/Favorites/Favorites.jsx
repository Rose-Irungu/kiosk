import React from 'react';

//components
import Header from '../Settings/Header';
import NoteP from '../SafetyCards/NoteP';
import FavoriteCard from './FavoriteCard';

export default function Favorites({guests}) {
  return (
    <div className='flex flex-col w-full h-[433px] py-[20px] px-[10px] gap-[10px] bg-[#F0EEFD]'>
        <Header icon={"/mgeni.svg"} text={"Favorites"}/>
        <input className='w-full h-[40px] rounded-[8px] border-[1px] border-[#6C757D4D] py-[3px] px-[16px] gap-[10px] bg-[#FFFFFF]
                          font-roboto font-normal text-[14px] text-[#333333CC] leading-[100] tracking-[0]' 
               placeholder='Search'
               type="text" 
        />
        <div className='flex flex-col w-full h-[301px] gap-[16px] overflow-y-scroll'>
        {guests.length > 0 ? (
          guests.map((guest) => (
            <FavoriteCard
              key={guest.favourite_id}
              id={guest.visitor_id}
              img={guest.image}
              name={guest.full_name}
              time={guest.last_visit_date}
              phone={guest.phone}
              email={guest.email}
            />
          ))
        ): (<NoteP text="No favorite guests" />)}
        </div>
    </div>
  );
}