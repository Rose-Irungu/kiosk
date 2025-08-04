import React, { useState, useEffect } from 'react';
import { getRelativeTime } from '../../../utils/fomatters';


const CardA = ({
  visitor_name,
  check_in,
  stayTime,
  purpose,
  status,
  tag,
  image, 
}) => {
  const [visitorData, setVisitorData] = useState({
    visitor_name,
    check_in,
    stayTime,
    purpose,
    status,
    tag,
    image, 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  const {
    name: n = visitor_name,
    time: t = getRelativeTime(check_in),
    stayTime: s = '52 mins',
    purpose: p = 'delivery',
    status: st = 'pending',
    tag: tg = 'guest',
    image: img = '/ellipse-20.png', 
  } = visitorData;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="bg-white rounded-lg p-3 flex items-center justify-between w-full h-16 shadow-md cursor-pointer"
        onClick={openModal}
      >
        <div className="flex items-center gap-1.5">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={img} 
            alt={n}
          />
          <div className="flex flex-col gap-0.5 w-[145px]">
            <div className="text-green-900 text-sm font-medium">{n}</div>
            {
              status === 'checked_in' ? (
                <div className="text-gray-500 text-xs font-medium">Check in time: {t}</div>
              ) : (
                <div className="text-gray-500 text-xs font-medium">Today</div>
              )
            }
            
          </div>
        </div>
        <div className="bg-green-100 rounded-xl px-2.5 py-0.5 flex items-center justify-center">
          <div className="text-green-900 text-xs font-normal">{p}</div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          {st === 'pending' ? (
            <div className="bg-white rounded-2xl border border-green-300 p-5 flex flex-col gap-4 w-[292px] shadow-md">
              <div className="flex gap-3 items-start">
                <img className="w-10 h-10 rounded-full object-cover" src={img} alt={n} />
                <div className="flex flex-col gap-1 w-[217px]">
                  <div className="flex justify-between w-full">
                    <div className="text-neutral-900 text-sm font-medium">{n}</div>
                    <div className="bg-purple-100 text-purple-900 text-xs font-medium px-2 py-0.5 rounded-full">
                      {tg}
                    </div>
                  </div>
                  <div className="text-gray-600 text-[10px] font-medium">Arrival time: {t}</div>
                </div>
              </div>
              <div className="flex justify-between w-[258px]">
                <button
                  onClick={() => {
                    console.log('Approved');
                    closeModal();
                  }}
                  className="bg-green-900 text-white text-sm font-medium px-4 py-2 rounded w-[110px]"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    console.log('Declined');
                    closeModal();
                  }}
                  className="border border-green-900 text-green-900 text-sm font-medium px-4 py-2 rounded w-[110px]"
                >
                  Decline
                </button>
              </div>
            </div>
          ) : st === 'onsite' ? (
            <div className="bg-white rounded-2xl border border-green-300 p-5 flex flex-col gap-4 w-[292px] shadow-md">
              <div className="flex gap-3 items-start">
                <img className="w-10 h-10 rounded-full object-cover" src={img} alt={n} />
                <div className="flex flex-col gap-1 w-[217px]">
                  <div className="flex justify-between w-full">
                    <div className="text-neutral-900 text-sm font-medium">{n}</div>
                    <div className="bg-purple-100 text-purple-900 text-xs font-medium px-2 py-0.5 rounded-full">
                      {tg}
                    </div>
                  </div>
                  <div className="text-gray-600 text-[10px] font-medium">Check in time: {t}</div>
                  <div className="text-gray-600 text-[10px] font-medium">Stay time: {s}</div>
                </div>
              </div>
              <div className="flex justify-between w-[258px]">
                <button
                  onClick={() => {
                    console.log('View Details');
                    closeModal();
                  }}
                  className="border border-green-900 text-green-900 text-sm font-medium px-4 py-2 rounded w-[110px]"
                >
                  Visitor Details
                </button>
                <button
                  onClick={() => {
                    console.log('Blacklisted');
                    closeModal();
                  }}
                  className="bg-green-900 text-white text-sm font-medium px-4 py-2 rounded w-[110px]"
                >
                  Add to Blacklist
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
              <h2 className="text-lg font-semibold text-green-900 mb-4">Visitor Details</h2>
              <p className="text-sm text-gray-700 mb-2"><strong>Name:</strong> {n}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Check-in Time:</strong> {t}</p>
              <p className="text-sm text-gray-700 mb-4"><strong>Purpose:</strong> {p}</p>
              <button
                onClick={closeModal}
                className="mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardA;
