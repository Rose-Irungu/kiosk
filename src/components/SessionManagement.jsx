import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function SessionManagementCard() {
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Card */}
      <div className="border-1  rounded-lg bg-white p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-gray-600" />
          <h2 className="text-lg  font-sans text-gray-600 font-bold">Session Management</h2>
        </div>

        {/* Content */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-bold font-sans text-gray-600 mb-2">
              End Current Session
            </h3>
            <p className="text-sm text-gray-600 max-w-lg font-sans">
              Log out from this device and return to login screen. All unsaved changes will be lost.
            </p>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-6 px-6 py-2 bg-[#e61c11] text-white font-medium text-sm rounded font-sans hover:bg-red-700  transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>

    
    </div>
  );
}