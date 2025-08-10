import { useEffect, useState } from "react";
import { getLatestEmergency } from "../../services/facility";
import { getRelativeTime } from "../../utils/fomatters";

export default function EmergencyCard() {
  const [emergency, setEmergency] = useState(null);
  const icon = "/emg1.svg";
  const instructionsTitle = "";
  const notes = [];

  useEffect(() => {
    const getLatestE = async () => {
      const res = await getLatestEmergency();
      if (res.data !== null) {
        setEmergency(res.data);
      }
    };
    getLatestE();
  }, []);

  const instructions = (emergency?.emergency_safety_instruction || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    emergency !== null && (
      <div className="bg-red-50 border border-red-200 rounded-[12px] p-6 mb-6 relative w-[calc(100vw-2rem)] sm:w-auto sm:max-w-[964px] md:w-[964px] flex flex-col gap-[10px] text-[#610c07] font-sans">
        <div className="flex items-center mb-[20px]">
          <img src={icon} alt="emergency icon" className="w-8 h-8" />
          <h2 className="text-[#610c07] font-semibold text-2xl">
            Emergency Alert
          </h2>
        </div>

        <p className="text-[20px] font-medium">
          Fire Drill at {emergency?.emergency_location}
        </p>
        <p className="text-[16px]">{getRelativeTime(emergency?.created_at)}</p>

        {instructionsTitle && (
          <p className="text-[20px] font-semibold">{instructionsTitle}</p>
        )}

        <ul className="text-[20px] list-decimal pl-5 space-y-1">
          {instructions.map((step, idx) => (
            <li key={`instruction-${idx}`}>{step}</li>
          ))}
          {notes.map((note, idx) => (
            <li key={`note-${idx}`} className="text-[#610c07]">
              <span className="font-bold">Note:</span> {note}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
