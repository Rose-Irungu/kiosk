import React, { useState, useMemo } from 'react';

//components
import Header from '../Settings/Header';
import NoteP from '../SafetyCards/NoteP';
import FavoriteCard from './FavoriteCard';

export default function Favorites({ guests }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Use useMemo for performance 
  const filteredGuests = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return guests;
    return guests.filter((guest) =>
      [guest.full_name, guest.phone, guest.email]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    );
  }, [guests, searchTerm]);

  return (
    <div className="flex flex-col w-full h-[433px] py-[20px] px-[10px] gap-[10px] bg-[#F0EEFD]">
      <Header icon={"/mgeni.svg"} text={"Favorites"} />

      <input
        className="w-full h-[40px] rounded-[8px] border-[1px] border-[#6C757D4D] py-[3px] px-[16px] bg-[#FFFFFF]
                   font-roboto font-normal text-[14px] text-[#333333CC] placeholder-[#999999] leading-[100]"
        placeholder="Search by Name, Phone, or Email"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col w-full h-[301px] gap-[16px] overflow-y-scroll">
        {filteredGuests.length > 0 ? (
          filteredGuests.map((guest) => (
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
        ) : (
          <NoteP text="No matching guests" />
        )}
      </div>
    </div>
  );
}
