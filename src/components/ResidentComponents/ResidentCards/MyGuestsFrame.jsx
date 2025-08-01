import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { visitsuser } from "../../../services/visitsuser";

import CardA from './CardA';

const MyGuestsFrame = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const data = await visitsuser(); 
        setGuests(data);
      } catch (err) {
        console.error('API fetch error:', err);
        setError('Could not load guest data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const filteredGuests = guests.filter((guest) => guest.status === activeTab);

  return (
    <div className="bg-[#e6fbe9] rounded-xl px-2 py-3 flex flex-col gap-4 items-center justify-center relative">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-3">
          <img src="/fluent-people-20-filled0.svg" className="w-8 h-8" />
          <h2 className="text-green-900 text-2xl font-semibold">My Guests</h2>
        </div>
        <button
          onClick={() => navigate('/guestform')}
          className="bg-green-600 shadow-md rounded-md flex items-center gap-1 px-3 py-1"
        >
          <img src="/ic-round-plus0.svg" className="w-6 h-6" />
          <span className="text-white text-sm font-semibold -ml-1">Invite Guest</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 items-center w-full px-4">
        <div className="bg-[rgba(51,51,51,0.1)] bg-opacity-80 rounded-full px-2 py-1 flex gap-4 w-full">
          {['pending', 'expected', 'onsite'].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full w-[315px] h-8 flex items-center justify-center text-sm font-semibold cursor-pointer ${
                activeTab === tab ? 'bg-[#b0f1b9]' : 'bg-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} (
              {guests.filter((g) => g.status === tab).length})
            </div>
          ))}
        </div>

        <div className="flex gap-3 w-full">
          <div className="flex flex-col gap-2 w-full max-w-[932px]">
            {loading && <div className="text-gray-600 text-sm">Loading guests...</div>}
            {error && <div className="text-red-600 text-sm">Error: {error}</div>}
            {!loading && !error && filteredGuests.length === 0 && (
              <div className="text-gray-600 text-sm">No guests found.</div>
            )}
            {!loading &&
              !error &&
              filteredGuests.map((guest, index) => <CardA key={index} {...guest} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGuestsFrame;
