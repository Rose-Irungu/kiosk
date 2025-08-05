// OldSchoolDataToggle.jsx
import React, { useState } from 'react';

export default function ToggleSwitch({ onToggle }) {
  const [isOn, setIsOn] = useState(false);

  const toggleData = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (typeof onToggle === 'function') {
      onToggle();
    }
  };

  return (

      <div
        onClick={toggleData}
        className={`flex items-center w-[48px] h-[24px] rounded-full p-[2px] cursor-pointer transition-all duration-300 ${
          isOn ? 'bg-[#4caf50]' : 'bg-[#ccc]'
        }`}
      >
        <div
          className={`h-[20px] w-[20px] rounded-full bg-white shadow-md transition-transform duration-300 ${
            isOn ? 'translate-x-[30px]' : 'translate-x-0'
          }`}
        />
      </div>
  );
}
