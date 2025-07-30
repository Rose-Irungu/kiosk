import React, { useState } from "react";
import { Flame } from "lucide-react";

const FireCheckbox = ({ id, label, isSelected, onToggle }) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          isSelected ? "bg-green-500 border-green-500" : "bg-transparent border-green-500"
        }`}
      >
        {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
      </button>
      <label className="text-[#002706] text-base font-normal cursor-pointer">
        {label}
      </label>
    </div>
  );
};


export default function FireAlertForm() {
  const [location, setLocation] = useState("");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedDanger, setSelectedDanger] = useState("");

  const fireConditions = [
    { id: "smoke", label: "Smoke" },
    { id: "flames", label: "Flames" },
    { id: "cant-breathe", label: "Can't breathe" }
  ];

  const dangerOptions = [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" }
  ];

  const toggleCondition = (conditionId) => {
    setSelectedConditions(prev =>
      prev.includes(conditionId)
        ? prev.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const handleDangerSelect = (dangerId) => {
    setSelectedDanger(dangerId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      location,
      conditions: selectedConditions,
      anyoneInDanger: selectedDanger
    };
    console.log("🔥 Fire Alert submitted:", formData);


    setLocation("");
    setSelectedConditions([]);
    setSelectedDanger("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-start pt-6 px-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden">
       
        <div className="flex justify-center pt-7 pb-4">
          <img src="/fire.svg" alt="fire icon" />
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-8">
          <h2 className="text-green-700 text-center font-semibold text-base pb-6">
            Fire Alert - Quick Form
          </h2>

 
          <div className="mb-6">
            <label className="block text-[#002706] text-xl font-normal mb-3">
              Where is the fire?
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-black/30 rounded-2xl px-3 py-2.5 text-base text-black/60 focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter location/unit"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#002706] text-xl font-normal mb-3">
              What's happening? (tap one)
            </label>
            <div className="space-y-1">
              {fireConditions.map((condition) => (
                <FireCheckbox
                  key={condition.id}
                  id={condition.id}
                  label={condition.label}
                  isSelected={selectedConditions.includes(condition.id)}
                  onToggle={toggleCondition}
                />
              ))}
            </div>
          </div>

      
          <div className="mb-8">
            <label className="block text-[#002706] text-xl font-normal mb-3">
              Anyone in danger?
            </label>
            <div className="space-y-1">
              {dangerOptions.map((option) => (
                <FireCheckbox
                  key={option.id}
                  id={option.id}
                  label={option.label}
                  isSelected={selectedDanger === option.id}
                  onToggle={handleDangerSelect}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#005e0e] text-[#e9e9e9] py-2 px-5 rounded-3xl font-semibold text-xl shadow-lg hover:bg-[#004a0b] transition-colors"
            style={{
              boxShadow: "2px 2px 8px 0px rgba(0, 88, 13, 0.25)"
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
