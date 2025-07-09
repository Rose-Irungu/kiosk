import { useState } from "react";
import { Siren } from "lucide-react";

/**
 * Card2 – Panic‑button incident card
 *
 * @param {String} unit      
 * @param {String} floor     
 * @param {Number} minute    
 * @param {String} resident  
 * @param {String} status    
 */
export default function Card2({
  unit,
  floor,
  minute,
  resident,
  status = "Unresolved",
}) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loadingResolve, setLoadingResolve] = useState(false);
  const [error, setError] = useState(null);

  const isResolved = currentStatus.toLowerCase() === "resolved";

  const handleResolve = async () => {
    if (isResolved || loadingResolve) return;

    setLoadingResolve(true);
    setError(null);

    try {
      // simulate async resolve
      await new Promise((r) => setTimeout(r, 800));
      setCurrentStatus("Resolved");
    } catch (err) {
      console.error(err);
      setError("Couldn’t mark as resolved.");
    } finally {
      setLoadingResolve(false);
    }
  };

  return (
    <div className="bg-white w-full p-4 rounded-[10px] shadow flex flex-col lg:flex-row lg:justify-between gap-6">
      {/* Left side */}
      <div className="flex-1">
        {/* Siren + headline */}
        <div className="flex items-center gap-2">
          <div className="w-[60px] h-[60px] flex items-center justify-center rounded-sm">
            <Siren className="w-6 h-6 text-[#F93162] animate-ping flex-shrink-0" />
          </div>
          <h1 className="font-dmsans text-xl text-grayish font-normal">
            PANIC BUTTON TRIGGERED AT {unit} – {floor}
          </h1>
        </div>

        <p className="font-inter text-sm text-slategray font-normal">
          {minute} minute{minute !== 1 && "s"} ago
        </p>

        <div className="flex gap-2 mt-3">
          <button className="bg-[#005E0E] text-white text-sm font-inter font-normal px-3 py-1 border rounded hover:bg-[#002A05]">
            Open Roll Call
          </button>

          <button
            onClick={handleResolve}
            disabled={isResolved || loadingResolve}
            className={`border border-[#005E0E] text-sm font-inter font-normal px-3 py-1 rounded transition-colors hover:bg-[#CCCCCC] ${
              isResolved
                ? "border-green-600 text-[#005E0E] cursor-default"
                : loadingResolve
                ? "border-[#005E0E] text-[#005E0E] cursor-wait"
                : "border-[#005E0E] text-[#005E0E]"
            }`}
          >
            {isResolved
              ? "Resolved"
              : loadingResolve
              ? "Resolving…"
              : "Mark Resolved"}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500 font-inter">{error}</p>
        )}
      </div>

      {/* Right side */}
      <div className="w-full lg:w-[258px] h-[140px] rounded-[10px] border-[0.5px] p-4 flex items-center gap-[8px]">
        <div className="flex flex-col justify-between w-[103px] h-[52px] gap-[12px]">
          <p className="font-dmsans text-sm text-slateboost w-[103px] h-[20px]">Triggered&nbsp;By</p>
          <p className="font-dmsans text-sm text-slateboost w-[103px] h-[20px]">Status</p>
        </div>
        <div className="flex flex-col justify-between w-[12px] h-[52px] gap-[12px]">
          <p className="font-dmsans text-sm text-slateboost w-[12px] h-[20px]">:</p>
          <p className="font-dmsans text-sm text-slateboost w-[12px] h-[20px]">:</p>
        </div>
        <div className="flex flex-col justify-between w-[69px] h-[52px] gap-[12px]">
          <p className="font-dmsans text-sm text-slateboost w-[69px] h-[20px]">{resident}</p>
          <p className="font-dmsans text-sm text-slateboost w-[69px] h-[20px]">{currentStatus}</p>
        </div>
      </div>
    </div>
  );
}
