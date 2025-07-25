import React from "react";

export default function PersonalInformationCard() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto space-y-4">
      
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>

      
      <div className="flex items-start gap-4">
        
        <img
          src="ellipse-150.png"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />

        
        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-bold text-gray-900">Daniel Kipsang</h3>

          
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
            <div>
              <div>Role</div>
              <div>Post</div>
            </div>
            <div>
              <div>:</div>
              <div>:</div>
            </div>
            <div>
              <div>Officer</div>
              <div>Main Gate</div>
            </div>
          </div>
        </div>

        
        <div className="ml-auto">
          <img src="group0.svg" alt="Edit" className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
