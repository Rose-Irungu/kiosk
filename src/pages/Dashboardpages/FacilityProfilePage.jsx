import React from "react";
import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloorManagement from "../../components/FloorManagement";
import { updateFacility, getFacilityInfo } from "../../services/facility";

export default function FacilityProfile() {
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("office");
  const [safetyInstructions, setSafetyInstructions] = useState("");
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo")) || {};
  const facilityId = user.admin_profile.facility || null;

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const response = await getFacilityInfo();
        if (response && response.data) {
          const { facility_name, facility_type, safety_instruction } =
            response.data;
          setFacilityName(facility_name || "");
          setFacilityType(facility_type || "office");
          setSafetyInstructions(safety_instruction || "");
          setFloors(response.data.floors || []);
        }
      } catch (error) {
        console.error("Error fetching facility data:", error);
        setError("Failed to load facility data. Please try again.");
      }
    };
    fetchFacilityData();
  }, []);

  const handleSave = async () => {
    // Validation
    if (!facilityName.trim()) {
      setError("Facility name is required");
      return;
    }

    const safetyInstructionValue =
      safetyInstructions.trim() || "No specific safety instructions provided";

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const newFacility = {
        facility_name: facilityName.trim(),
        facility_type: facilityType.toLowerCase(),
        safety_instruction: safetyInstructionValue,
      };
      await updateFacility(facilityId, newFacility);
      setSuccess("Facility updated successfully!");

      setFacilityName("");
      setFacilityType("office");
      setSafetyInstructions("");
    } catch (error) {
      console.error("Error adding facility:", error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMessages = [];

        Object.keys(errorData).forEach((field) => {
          if (Array.isArray(errorData[field])) {
            errorMessages.push(`${field}: ${errorData[field].join(", ")}`);
          } else {
            errorMessages.push(`${field}: ${errorData[field]}`);
          }
        });

        setError(errorMessages.join(" | "));
      } else if (error.request) {
        setError("Network error: Unable to reach the server");
      } else {
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

        {error && (
          <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

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
                    <option value="office">Office</option>
                    <option value="school">School</option>
                    <option value="resident">Resident</option>
                    <option value="hospital">Hospital</option>
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

        <FloorManagement floors={floors} setFloors={setFloors} />

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
            className={`text-white text-sm font-medium px-6 py-3 rounded-md w-full ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#005e0e] hover:bg-[#023609]"
              }`}
          >
            {loading ? "SAVING..." : "SAVE FACILITY PROFILE"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
