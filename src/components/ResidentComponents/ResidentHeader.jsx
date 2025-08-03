import React, { useState, useEffect, use } from "react";
import { Menu } from "lucide-react";


const ResidentHeader = ({ imageUrl, setMobileOpen }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
useEffect(() => {
   const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo); 
        setUserData(user);
      } catch (error) {
    
    } finally {
      setLoading(false);
    }
  };

}, []);


  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#F5F4F5] shadow-sm w-full text-[13px]">
      <div className="flex items-center gap-4">
        <img
          src={userData.profile_picture || "/default-profile.png"}
          alt={`${userData.first_name}'s profile`}
          className="w-12 h-12 rounded-full border-2 border-green-700 object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Hi {userData.first_name},
          </h2>
          <p className="text-sm text-gray-600">Unit {userData.unit}</p>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-green-800 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>

        <img
          src="/group-490.svg"
          alt="VG logo"
          className="hidden md:block w-10 h-10"
        />
      </div>
    </div>
  );
};

export default ResidentHeader;
