import React, { useState, useEffect, use } from "react";
import { Menu } from "lucide-react";
import { useRef } from "react";
import { createEmergency } from "../../services/securityDashboardService";

const ResidentHeader = ({ imageUrl, setMobileOpen }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

 
  const handleSOSClick = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();

        setTimeout(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setVisible(false);
        }, 100000);
      }
    } catch (err) {
      console.error("Audio error:", err);
    }

    try {
      const data = await createEmergency({ emergency_type: "sos" });
      setStats(data);
      time(20);
      toast.success("S.O.S triggered! Help is on the way!");
    } catch (error) {
      console.error("Failed to create emergency:", error);
      toast.error("Failed to send emergency alert.");
    }
  };

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
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#F5F4F5] shadow-sm w-full text-[13px]">
      <audio ref={audioRef} src="/sounds/fire_alarm.mp3" preload="auto" loop />
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
          onClick={handleSOSClick}
          className="bg-gradient-to-r from-[#F6003B] to-[#550115] text-white p-4 rounded-lg font-bold w-[170px] h-[50px] text-center shadow-lg transform hover:scale-105 transition-transform mr-4"
        >
          S.O.S
        </button>
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
