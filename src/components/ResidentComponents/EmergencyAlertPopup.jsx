import { useState } from "react";

export default function EmergencyAlertCard() {

   const [visible, setVisible] = useState(true);

  const handleYes = () => {
    console.log("✅ Alert confirmed!");
    
    setVisible(false); 
  };

  const handleNo = () => {
    console.log("❌ Alert canceled.");
    setVisible(false); 
  };

  if (!visible) return null;
  return (
    <div className="fixed top-[250px] left-1/2 transform -translate-x-1/2 bg-[#fde8e7] rounded-2xl w-[560px] h-auto shadow-lg overflow-hidden z-50 p-6">
      <div className="flex gap-6 items-start">
        <img src="/alert.svg" alt="alert icon" className="w-24 h-24" />

        <div className="flex flex-col justify-between">
          <p className="text-red-700 font-semibold text-lg mb-4">
            Are you sure you want to send this alert?
          </p>

          <div className="flex gap-4">
            <button 
             onClick={handleYes}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <img
                src="/mdi-tick-circle0.svg"
                alt="Yes Icon"
                className="w-4 h-4"
              />
              <span>Yes</span>
            </button>

            <button 
             onClick={handleNo}
            className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-200 transition">
              <img
                src="/ic-round-cancel0.svg"
                alt="No Icon"
                className="w-4 h-4"
              />
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
