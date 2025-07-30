import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import AlertCard from "../../components/ResidentComponents/AlertCard";
import EmergencyAlert from "../../components/ResidentComponents/EmergencyAlert";
import EmergencyContacts from "../../components/ResidentComponents/EmergencyContacts";
import EmergencyAlertPopup from "../../components/ResidentComponents/EmergencyAlertPopup";
import FireAlertForm from "../../components/ResidentComponents/FireAlertForm";
import Security_form from "../../components/ResidentComponents/Security_form";
import ResidentLayout from "../../components/ResidentComponents/ResidentLayout";

export default function EmergencyControlApp() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const navigate = useNavigate()

  const handleSOSClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };
  const handleFireClick = () => {
    navigate("/resident/fire-alert");
  };

  const handleSecurityClick = () => {
    navigate("/resident/security-form");
  };

  return (
    <ResidentLayout>
      <div className="p-6 flex flex-col items-center mb-[70px]">
        <div className="flex items-center mb-2 -ml-[712px]">
          <img
            src="/emg.svg"
            className="w-6 h-6 text-red-500 mr-3"
            alt="emergency icon"
          />
          <h1 className="text-2xl font-sans text-[#610c07] font-semibold">
            Emergency Control
          </h1>
        </div>

        <div className="flex  gap-8 justify-items-center mb-10">
          <button
            onClick={handleSOSClick}
            className="bg-gradient-to-r from-[#F6003B] to-[#550115] text-white p-4 rounded-lg font-bold w-[300px] h-[100px] text-center shadow-lg transform hover:scale-105 transition-transform"
          >
            S.O.S
          </button>

          <button
            onClick={handleFireClick}
            className="bg-[#fde8e7] text-[#e61c11] border border-red-300 rounded-[12px] p-6 font-bold text-center shadow-lg hover:shadow-xl w-[300px] h-[100px] transform hover:scale-105 transition-transform"
          >
            Fire <br /> Alert
          </button>

          <button
            onClick={handleSecurityClick}
            className="bg-[#fde8e7] text-[#e61c11] border border-red-300 rounded-[12px] p-6 font-bold text-center shadow-lg hover:shadow-xl w-[300px] h-[100px] transform hover:scale-105 transition-transform"
          >
            Security <br /> Concern
          </button>
        </div>

        {showPopup && <EmergencyAlertPopup />}

        {activeForm === "fire" && <FireAlertForm />}
        {activeForm === "security" && <Security_form />}

        <div className="flex flex-col items-center py-6">
          <AlertCard />
        </div>
        <div className="flex flex-col items-center py-6">
          <EmergencyAlert />
        </div>
        <div className="flex flex-col items-center py-6">
          <EmergencyContacts />
        </div>
      </div>
    </ResidentLayout>
  );
}
