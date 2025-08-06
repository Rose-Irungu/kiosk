import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { visitsuser, approveVisit, cancelVisit,  } from "../../../services/visitsuser";

import CardA from './CardA';

const MyGuestsFrame = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [guestList, setGuestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await visitsuser();
        console.log(response);
        // const guestsData = Array.isArray(response?.data) ? response.data : [];
        setGuestList(response.data);
      } catch (err) {
        console.error('API fetch error:', err);
        setError('Could not load guest data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const handleApproveVisit = async (visitId) => {
    try {
      await approveVisit(visitId);
      // ✅ Refresh guest list
      setGuestList((prev) =>
        prev.map((g) => g.visit_id === visitId ? { ...g, status: 'approved' } : g)
      );
    } catch (error) {
      console.error('Approve failed', error);
    }
  };

  const handleCancelVisit = async (visitId) => {
    try {
      await cancelVisit(visitId);
      // ✅ Refresh guest list
      setGuestList((prev) =>
        prev.map((g) => g.visit_id === visitId ? { ...g, status: 'cancelled' } : g)
      );
    } catch (error) {
      console.error('Cancel failed', error);
    }
  };


  const filteredGuests = guestList.filter((guest) => guest.status === activeTab);

  return (
    <div className="bg-[#e6fbe9] rounded-xl px-2 py-3 flex flex-col gap-4 items-center justify-start overflow-y-auto relative max-h-[90vh]">

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

      <div className="flex flex-col gap-4 items-center w-full  px-4">
        <div className="bg-[rgba(51,51,51,0.1)] bg-opacity-80 rounded-full px-2 py-1 flex gap-4 w-full">
          {Object.entries({ 'Pending': 'pending', 'Expected': 'approved', 'On-Site': 'checked_in' }).map(
            ([label, value]) => (
              <div
                key={value}
                onClick={() => setActiveTab(value)}
                className={`rounded-full w-[315px] h-8  flex items-center justify-center text-sm font-semibold cursor-pointer ${activeTab === value ? 'bg-[#b0f1b9]' : 'bg-white'
                  }`}
              >
                {label} ({guestList.filter((g) => g.status === value).length})
              </div>
            )
          )}
        </div>


        <div className="flex gap-3 w-full">
          <div className="flex flex-col gap-2 w-full max-w-[932px]">
            {loading && <div className="text-gray-600 text-sm">Loading guests...</div>}
            {error && <div className="text-red-600 text-sm">Error: {error}</div>}
            {!loading && !error && guestList.length === 0 && (
              <div className="text-gray-600 text-sm">No guests found.</div>
            )}
            {!loading &&
              !error &&
              filteredGuests.map((guest, index) => <CardA key={index}
                {...guest}
                onApproveVisit={handleApproveVisit}
                onCancelVisit={handleCancelVisit} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGuestsFrame;
