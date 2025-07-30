import React, { useState } from "react";
import { Zap, AlertTriangle, UserX, Sword } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResidentLayout from "./ResidentLayout";

const ConcernItem = ({ concern, isSelected, onToggle }) => {
  const Icon = concern.icon;
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => onToggle(concern.id)}
        className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
          isSelected
            ? "border-green-600 bg-green-600"
            : "border-green-600 bg-transparent"
        }`}
      >
        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </button>
      <div className="flex items-center">
        <Icon className="w-[18px] h-[18px] text-green-800 mr-2" />
        <span className="text-lg font-semibold text-green-800">
          {concern.label}
        </span>
      </div>
    </div>
  );
};

export default function SecurityReportForm() {
  const concerns = [
    { id: "electrical", label: "Electrical", icon: Zap },
    { id: "gas-leak", label: "Gas Leak", icon: AlertTriangle },
    { id: "robbery", label: "Robbery", icon: UserX },
    { id: "violence", label: "Violence/Assault", icon: Sword },
  ];

  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const toggleConcern = (concernId) => {
    const isSelected = selectedConcerns.includes(concernId);
    const updated = isSelected
      ? selectedConcerns.filter((id) => id !== concernId)
      : [...selectedConcerns, concernId];

    setSelectedConcerns(updated);

    if (!isSelected) {
      console.log(`⚠️ Admin Alert: Concern selected - ${concernId}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      concerns: selectedConcerns,
      location,
      notes,
    };
    console.log("📝 Form submitted:", formData);
    navigate("/resident/emergencypage");

    setSelectedConcerns([]);
    setLocation("");
    setNotes("");
  };

  return (
    <ResidentLayout>
      <div className="bg-opacity-40 z-50 flex justify-center items-start pt-6 px-4 ]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg"
        >
          <img src="/logo copy.svg" className="w-30 h-30  flex items-center ml-[175px] mb-[20px]" />

          <div className="mb-6">
            <label className="block text-[#002706] font-bold text-2xl mb-5">
              What’s thesecurity concern you are <br/>reporting?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {concerns.map((concern) => (
                <ConcernItem
                  key={concern.id}
                  concern={concern}
                  isSelected={selectedConcerns.includes(concern.id)}
                  onToggle={toggleConcern}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Where did it happen?
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="e.g. Main gate, Block A, Floor 3"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Anything else to report?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-700 to-emerald-800 text-white py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </ResidentLayout>
  );
}
