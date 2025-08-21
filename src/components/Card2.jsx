import { useState } from "react";
import { Siren } from "lucide-react";
import { Link } from "react-router-dom";
import { updateEmergency } from "../services/adminEmergencyServices";
import { getRelativeTime } from "../utils/fomatters";


export default function Card2({
  id,
  floor,
  unit,
  minute,
  name,
  status,
  onResolved
}) {
  const [isResolved, setIsResolved] = useState(status === "resolved");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleResolve = async () => {
    if (isResolved || loading) return;

    try {
      setLoading(true);
      setError("");
      const result = await updateEmergency(id, "resolved");
      if (result?.emergency_status === "resolved") {
        // setIsResolved(true);
        onResolved(); 
      }
    } catch (err) {
      setError(err?.toString() || "Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full p-4 rounded-[10px] shadow flex flex-col lg:flex-row lg:justify-between gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="w-[60px] h-[60px] flex items-center justify-center rounded-sm">
            <Siren className="w-6 h-6 text-[#F93162] animate-ping flex-shrink-0" />
          </div>
          <h1 className="font-DM Sans text-xl text-[#a3a7aa] font-medium">
            PANIC BUTTON TRIGGERED AT {floor} – {unit}
          </h1>
        </div>

        <p className="font-DM Sans text-sm text-slategray font-medium text-[#a3a7aa]" >
          {getRelativeTime(minute)}
        </p>

        <div className="flex gap-2 mt-3">
          <Link to="/triggers" state={{id, floor, unit}}>
            <button className="cursor-pointer bg-[#005E0E] text-white text-sm font-inter font-normal px-3 py-1 border rounded hover:bg-[#002A05]">
              Open Roll Call
            </button>
          </Link>

          <button
            onClick={handleResolve}
            disabled={isResolved || loading}
            className={`cursor-pointer border border-[#005E0E] text-sm font-inter font-normal px-3 py-1 rounded transition-colors hover:bg-[#CCCCCC] ${
                isResolved
                  ? "bg-[#CCCCCC] text-white border border-[#CCCCCC] cursor-not-allowed"
                  : "text-[#005E0E] border border-[#005E0E] hover:bg-[#CCCCCC] hover:text-white"
            }`}
          >
            {loading ? "Updating..." : isResolved ? "Resolved ✅" : "Mark Resolved"}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500 font-inter">{error}</p>
        )}
      </div>

      <div className="w-full lg:w-[258px] h-[140px] rounded-[10px] border-[0.5px] p-4 flex items-center gap-[8px]">
        <div className="flex flex-col justify-between w-[103px] h-[52px] gap-[12px]">
          <p className="font-dmsans text-sm text-slateboost w-[103px] h-[20px]">
            Triggered&nbsp;By
          </p>
          <p className="font-dmsans text-sm text-slateboost w-[103px] h-[20px]">
            Status
          </p>
        </div>
        <div className="flex flex-col justify-between w-[12px] h-[52px] gap-[12px]">
          <p className="font-dmsans text-sm text-slateboost w-[12px] h-[20px]">
            :
          </p>
          <p className="font-dmsans text-sm text-slateboost w-[12px] h-[20px]">
            :
          </p>
        </div>
        <div className="flex flex-col justify-between w-[69px] h-[52px] gap-[12px]">
          <p className="font-dmsans text-sm text-slateboost w-[69px] h-[20px]">
            {name}
          </p>
          <p className="font-dmsans text-sm text-slateboost w-[69px] h-[20px]">
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
