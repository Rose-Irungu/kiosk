import { useState } from "react";
import { createEmergency } from "../../services/securityDashboardService";
import { toast } from "react-hot-toast";
import AlertCard from "./AlertCard";

export default function EmergencyAlertCard({ time }) {
  const [stats, setStats] = useState([]);
  const [visible, setVisible] = useState(true);

  const handleYes = async () => {
    setVisible(false);
    try {
      const data = await createEmergency({ emergency_type: "sos" });
      setStats(data);
      time(30);
      toast.success("Emergency alert sent!");
    } catch (error) {
      console.error("Failed to create emergency:", error);
      toast.error("Failed to send emergency alert.");
    }
  };

  const handleNo = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-[#fde8e7] rounded-2xl w-full max-w-md md:max-w-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
          <img src="/alert.svg" alt="alert icon" className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0" />

          <div className="flex flex-col justify-between">
            <p className="text-red-700 font-semibold text-base sm:text-lg mb-4">
              Are you sure you want to send this alert?
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleYes}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <img src="/mdi-tick-circle0.svg" alt="Yes Icon" className="w-4 h-4" />
                <span>Yes</span>
              </button>

              <button
                onClick={handleNo}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-200 transition"
              >
                <img src="/ic-round-cancel0.svg" alt="No Icon" className="w-4 h-4" />
                <span>No</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
