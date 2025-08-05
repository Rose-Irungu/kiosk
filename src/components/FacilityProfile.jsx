import React from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function SessionManagementCard() {
  const navigate = useNavigate();
  const handleEditFacility = () => {
  navigate("/facilityprofile"); 
};
  return (
    <div className="p-5 w-full">
      <div className="border-1  rounded-lg bg-white p-6 shadow-2xl  max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-gray-600" />
          <h2 className="text-lg  font-sans text-gray-600 font-bold">
            Facility profile
          </h2>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 max-w-lg font-sans">
              Edit and manage facility details, including floors and units, to
              accurately structure your property for access control.
            </p>
          </div>

          <button
            onClick={handleEditFacility}
            className="ml-6 px-6 py-2 mt-5 bg-[#005e0e] text-white font-medium text-sm rounded font-sans hover:bG-[#023609]  transition-colors]"
          >
            EDIT FACILITY
          </button>
        </div>
      </div>
    </div>
  );
}
