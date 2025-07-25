import React from "react";

export default function PersonalInformationCard({
  name = "Daniel Kipsang",
  role = "Officer",
  post = "Main Gate",
  profileImage = "ellipse-150.png",
  editIcon = "group0.svg",
}) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto space-y-4">
      
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>

      
      <div className="flex items-start gap-4">
        
        <img
          src={profileImage}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />

        
        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>

          
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
              <div>{role}</div>
              <div>{post}</div>
            </div>
          </div>
        </div>

        
        <div className="ml-auto">
          <img src={editIcon} alt="Edit" className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
