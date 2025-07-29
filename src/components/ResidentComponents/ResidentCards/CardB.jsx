import React from 'react';

const CardB = () => {
  return (
    <div className="bg-white rounded-lg p-3 flex items-center justify-between h-16 shadow-md">
      <div className="flex items-center gap-1.5">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="ellipse-20.png"
          alt="Visitor"
        />
        <div className="flex flex-col gap-0.5 w-[145px]">
          <div className="text-green-900 text-sm font-medium">Becky Waithera</div>
          <div className="text-gray-500 text-xs font-medium">Check in time: 12:42 pm</div>
        </div>
      </div>
      <div className="bg-green-100 rounded-xl px-2.5 py-0.5 flex items-center justify-center">
        <div className="text-green-900 text-xs font-normal">Guest</div>
      </div>
    </div>
  );
};

export default CardB;
