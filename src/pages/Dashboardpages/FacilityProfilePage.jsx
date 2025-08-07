import React from "react";
import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFacility } from "../../services/facility";
import FloorManagement from "../../components/FloorManagement";

export default function FacilityProfile() {
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("office");
  const [safetyInstructions, setSafetyInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    // Validation
    if (!facilityName.trim()) {
      setError("Facility name is required");
      return;
    }

    // Ensure safety instructions is not empty (API requires a string)
    const safetyInstructionValue = safetyInstructions.trim() || "No specific safety instructions provided";

    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const newFacility = {
        facility_name: facilityName.trim(),
        facility_type: facilityType.toLowerCase(), // Ensure lowercase
        safety_instruction: safetyInstructionValue,
      };

      console.log("Sending facility data:", newFacility); // Debug log
      const response = await addFacility(newFacility);
      console.log("API Response:", response); // Debug log
      
      setSuccess("Facility added successfully!");
      
      // Reset form
      setFacilityName("");
      setFacilityType("office");
      setSafetyInstructions("");
      
    } catch (error) {
      console.error("Error adding facility:", error);
      
      // More detailed error handling
      if (error.response && error.response.data) {
        // Server responded with validation errors
        const errorData = error.response.data;
        let errorMessages = [];
        
        // Handle field-specific errors
        Object.keys(errorData).forEach(field => {
          if (Array.isArray(errorData[field])) {
            errorMessages.push(`${field}: ${errorData[field].join(', ')}`);
          } else {
            errorMessages.push(`${field}: ${errorData[field]}`);
          }
        });
        
        setError(errorMessages.join(' | '));
      } else if (error.request) {
        // Network error
        setError("Network error: Unable to reach the server");
      } else {
        // Other error
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-2xl p-12 flex flex-col gap-8 items-start">
        <h1 className="text-black text-2xl font-bold">Facility Profile</h1>

        {/* Error Message */}
        {error && (
          <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {success}
          </div>
        )}

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
                    disabled={loading}
                  />
                </div>
                {/* Removed the misplaced SAVE button from here */}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-[#495057]">Facility Type*</label>
                <div className="relative">
                  <select
                    value={facilityType}
                    onChange={(e) => setFacilityType(e.target.value)}
                    className="appearance-none w-full h-12 bg-white border border-gray-300 text-[#495057] text-sm px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005e0e] focus:border-transparent"
                    disabled={loading}
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
            disabled={loading}
          />
        </div>

        <div className="shadow w-full flex justify-start">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`text-white text-sm font-medium px-6 py-3 rounded-md w-full ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#005e0e] hover:bg-[#023609]'
            }`}
          >
            {loading ? "SAVING..." : "SAVE FACILITY PROFILE"}
          </button>
        </div>
      </div>
    </Layout>
  );
}