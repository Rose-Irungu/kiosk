import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [emergencyType, setEmergencyType] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); 

  useEffect(() => {
    let timer = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft === 0) {
          clearInterval(timer);
          return 0;
        } else return timeLeft - 1;
      });
    }, 1000);
 
  }, [timeLeft]);
  const navigate = useNavigate();

  const handleSOSClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setEmergencyType("sos");
    }, 5000);
  };

  const handleFireClick = () => {
    setEmergencyType("fire");
    navigate("/resident/fire-alert");
  };

  const handleSecurityClick = () => {
    setEmergencyType("security_concern");
    navigate("/resident/security-form");
  };

  return (
    <ResidentLayout>
      <div className="p-6 flex flex-col items-center mb-[70px]">
        <div className="flex items-center justify-center md:justify-start w-full mb-4">
          <img
            src="/emg.svg"
            className="w-6 h-6 text-red-500 mr-3"
            alt="emergency icon"
          />
          <h1 className="text-2xl font-sans text-[#610c07] font-semibold md:text-left">
            Emergency Control
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-10">
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

        {showPopup && <EmergencyAlertPopup type={emergencyType} time={setTimeLeft}/>}

        {activeForm === "fire" && <FireAlertForm type={emergencyType} />}
        {activeForm === "security" && <Security_form type={emergencyType} />}

        <div className="flex flex-col items-center py-6">
          <AlertCard time={timeLeft}/>
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
