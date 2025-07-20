import React, { useState } from 'react';

export default function SystemPreferences({
  title = "System Preferences",
  showSaveButton = true,
  onSave = null,
}) {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [retentionPeriod, setRetentionPeriod] = useState('30');

  const handleSaveChanges = () => {
    const settings = {
      maintenanceMode,
      retentionPeriod,
    };

    console.log("Saving changes:", settings);

    if (onSave) {
      onSave(settings);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col space-y-6">
        
        <h1 className="text-2xl  font-sans font-semibold text-[#777c81]">{title}</h1>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between ">
                <h2 className="text-md font-semibold text-[#777c81] items-start">
                  Maintenance Mode
                </h2>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`relative inline-flex h-4 w-8 items-center ml-x rounded-full transition-colors focus:outline-none   focus:ring-offset-2 ${
                    maintenanceMode ? 'bg-[#005e0e]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      maintenanceMode ? 'translate-x-4' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <p className="text-sm text-[#777c81]">
                Temporarily disable user logins for maintenance. Admin only can access
              </p>
            </div>

            {showSaveButton && (
              <button
                onClick={handleSaveChanges}
                className="mt-6 w-fit px-6 py-2 bg-[#005e0e] text-white text-sm font-medium rounded-md hover:bg-green-800 focus:outline-none  focus:ring-offset-2 transition"
              >
                SAVE CHANGES
              </button>
            )}
          </div>
            <div className="flex">
  
    <div className="w-px bg-[#038516] mx-30" />
 
          
          <div className="justify-end ml-auto flex flex-col space-y-3 -mt-[20px]">
            <h2 className="text-md font-semibold text-gray-800 mb-4">
              Data Retention Period for Logs
            </h2>
            <div className="flex flex-col space-y-3">
              {[
                { value: '10', label: '10 Days' },
                { value: '30', label: '30 Days' },
                { value: '60', label: '60 Days' },
                { value: 'unlimited', label: 'Unlimited' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="retention"
                    value={option.value}
                    checked={retentionPeriod === option.value}
                    onChange={(e) => setRetentionPeriod(e.target.value)}
                    className="h-4 w-4 text-green-600 border-gray-300 accent-[#038516] focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-800">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
