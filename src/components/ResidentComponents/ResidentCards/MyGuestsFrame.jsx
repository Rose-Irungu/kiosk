import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardA from './CardA';

const MyGuestsFrame = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');

  const guestData = [
    {
      name: 'Robert Nanjala',
      time: '12:42 pm',
      purpose: 'guest',
      status: 'pending',
      image: 'ellipse-20.png',
    },
    {
      name: 'Robert Nanjala',
      time: '12:42 pm',
      purpose: 'guest',
      status: 'pending',
      image: 'ellipse-20.png',
    },
    {
      name: 'Roberto Nanjala',
      time: '12:42 pm',
      purpose: 'delivery',
      status: 'expected',
      image: 'ellipse-21.png',
    },
    {
      name: 'Robert Nanjala',
      time: '12:42 pm',
      purpose: 'service',
      status: 'onsite',
      stayTime: '52 mins',
      image: 'ellipse-22.png',
    },
    {
      name: 'Robert Nanjala',
      time: '12:42 pm',
      purpose: 'service',
      status: 'pending',
      stayTime: '52 mins',
      image: 'ellipse-22.png',
    },
  ];

  const filteredGuests = guestData.filter((guest) => guest.status === activeTab);

  return (
    <div className="bg-[#e6fbe9] rounded-xl px-2 py-3 flex flex-col gap-4 items-center justify-center relative">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-3">
          <img src="fluent-people-20-filled0.svg" alt="Guests Icon" className="w-8 h-8" />
          <h2 className="text-green-900 text-2xl font-semibold">My Guests</h2>
        </div>
        <button
          onClick={() => navigate('/guestform')}
          className="bg-green-600 shadow-md rounded-md flex items-center gap-1 px-3 py-1"
        >
          <img src="ic-round-plus0.svg" alt="Plus" className="w-6 h-6" />
          <span className="text-white text-sm font-semibold -ml-1">Invite Guest</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 items-center w-full px-4">
        <div className="bg-[rgba(51,51,51,0.1)] bg-opacity-80 rounded-full px-2 py-1 flex gap-4 w-full">
          <div
            onClick={() => setActiveTab('pending')}
            className={`rounded-full w-[315px] h-8 flex items-center justify-center text-sm font-semibold cursor-pointer ${
              activeTab === 'pending' ? 'bg-[#b0f1b9]' : 'bg-white'
            }`}
          >
            Pending (2)
          </div>
          <div
            onClick={() => setActiveTab('expected')}
            className={`rounded-full w-[315px] h-8 flex items-center justify-center text-sm font-semibold cursor-pointer ${
              activeTab === 'expected' ? 'bg-[#b0f1b9]' : 'bg-white'
            }`}
          >
            Expected (2)
          </div>
          <div
            onClick={() => setActiveTab('onsite')}
            className={`rounded-full w-[315px] h-8 flex items-center justify-center text-sm font-semibold cursor-pointer ${
              activeTab === 'onsite' ? 'bg-[#b0f1b9]' : 'bg-white'
            }`}
          >
            Onsite (2)
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <div className="flex flex-col gap-2 w-full max-w-[932px]">
            {filteredGuests.map((guest, index) => (
              <CardA key={index} {...guest} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGuestsFrame;
