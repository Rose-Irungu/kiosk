
import React from "react";
import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloorManagement from "../../components/FloorManagement";

export default function FacilityProfile() {
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("Office");
  const [safetyInstructions, setSafetyInstructions] = useState("");
  const navigate = useNavigate();
 
  useEffect(() => {
    const savedFacilityData = localStorage.getItem("facilityData");
    if (savedFacilityData) {
      try {
        const parsedData = JSON.parse(savedFacilityData);
        setFacilityName(parsedData.facilityName || "");
        setFacilityType(parsedData.facilityType || "Office");
        setSafetyInstructions(parsedData.safetyInstructions || "");
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  const handleSave = () => {
    if (!facilityName.trim()) {
      alert("Please enter a facility name.");
      return;
    }

    const facilityData = {
      facilityName: facilityName.trim(),
      facilityType,
      safetyInstructions,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem("facilityData", JSON.stringify(facilityData));
    console.log("Facility saved:", facilityData);
    alert(`Facility "${facilityName}" saved successfully!`);
  };

  const saveData = () => {
    if (!facilityName.trim()) {
      alert("Please enter a facility name before saving the profile.");
      return;
    }

    const facilityData = {
      facilityName: facilityName.trim(),
      facilityType,
      safetyInstructions,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem("facilityData", JSON.stringify(facilityData));
    console.log("Facility profile saved:", facilityData);
    alert("Facility profile saved successfully!");

     navigate("/settings");
  };

  return (
    <Layout>
      <div className="bg-white rounded-2xl p-12 flex flex-col gap-8 items-start">
        <h1 className="text-black text-2xl font-bold">Facility Profile</h1>

        <div className="bg-[#f5f4f5] rounded-lg border border-gray-400/50 p-8 shadow-md w-full flex flex-col gap-8">
          <h2 className="text-[#495057] text-xl font-bold">
            Basic Information
          </h2>
          <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-row gap-6 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-[#495057]">Facility Name*</label>
                <div className="bg-white rounded-md px-3 py-2 h-12 flex items-center">
                  <input
                    type="text"
                    placeholder="name of your facility"
                    className="text-[#495057] w-full outline-none"
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="bg-[#005e0e] hover:bg-[#023609] text-white text-sm font-medium px-6 py-3 mt-[40px] rounded-md w-full ml-[120px]"
                >
                  SAVE
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-[#495057]">Facility Type*</label>
                <div className="relative">
                  <select
                    value={facilityType}
                    onChange={(e) => setFacilityType(e.target.value)}
                    className="appearance-none w-full h-12 bg-white border border-gray-300 text-[#495057] text-sm px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005e0e] focus:border-transparent"
                  >
                    <option value="Office">Office</option>
                    <option value="School">School</option>
                    <option value="Resident">Resident</option>
                    <option value="Hospital">Hospital</option>
                  </select>
                  <img
                    src="formkit-down0.svg"
                    alt="dropdown icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-[10.5px] pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <FloorManagement />

        <div className="rounded-lg p-8 shadow-md w-full flex flex-col gap-8">
          <h2 className="text-[#495057] text-xl font-bold">
            Safety Instructions
          </h2>
          <textarea
            placeholder="Add safety instructions..."
            value={safetyInstructions}
            onChange={(e) => setSafetyInstructions(e.target.value)}
            className="bg-[#f5f4f5] border border-[#495057]/50 rounded-lg p-4 h-[123px] w-full resize-none focus:outline-none focus:ring-2 focus:ring-[#005e0e] focus:border-transparent"
          />
        </div>

        <div className="shadow w-full flex justify-start">
          <button 
            onClick={saveData}
         
            className="bg-[#005e0e] hover:bg-[#023609] text-white text-sm font-medium px-6 py-3 rounded-md w-full"
          >
            SAVE FACILITY PROFILE
          </button>
        </div>
      </div>
    </Layout>
  );
}