import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { authService } from "../services/authService";

export default function SessionManagementCard() {
  const handleLogout = () => {
    authService.logoutUser();
  };
    


  return (
    <div className=" p-5 mx-auto    max-w-[950px] w-[950px] ">
      
      <div className="border-1  rounded-lg bg-white p-6 shadow-2xl  ">
        
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-gray-600" />
          <h2 className="text-lg  font-sans text-gray-600 font-bold">Session Management</h2>
        </div>

        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-bold font-sans text-gray-600 mb-2">
              End Current Session
            </h3>
            <p className="text-sm text-gray-600 max-w-lg font-sans">
              Log out from this device and return to login screen. All unsaved changes will be lost.
            </p>
          </div>
          
          
          <button
            onClick={handleLogout}
            className="ml-6 px-6 py-2 mt-5 bg-[#e61c11] text-white font-medium text-sm rounded font-sans hover:bg-red-700  transition-colors]"
          >
            LOGOUT
          </button>
        </div>
      </div>

    
    </div>
  );
}