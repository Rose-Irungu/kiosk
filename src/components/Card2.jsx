import { useEffect, useState } from "react";
import { Siren } from "lucide-react";

// const INCIDENT_ENDPOINT = "https://api.example.com/incidents/123"; // Real endpoint disabled for testing

export default function Card2() {
  const [incident, setIncident] = useState(null); // { unit, floor, minute, resident, status }
  const [loadingIncident, setLoadingIncident] = useState(true);
  const [loadingResolve, setLoadingResolve] = useState(false);
  const [error, setError] = useState(null);

  // MOCK: Simulate incident data load
  useEffect(() => {
    const mockIncident = {
      unit: "Unit B3",
      floor: "3rd Floor",
      minute: 5,
      resident: "John M.",
      status: "Unresolved",
    };

    const timer = setTimeout(() => {
      setIncident(mockIncident);
      setLoadingIncident(false);
    }, 500); // Simulate 0.5s delay

    return () => clearTimeout(timer);
  }, []);

  /* Real fetch — commented out for mock testing */
  /*
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoadingIncident(true);
        const res = await fetch(INCIDENT_ENDPOINT, { signal: ctrl.signal });
        if (!res.ok) throw new Error("Failed to fetch incident");
        const data = await res.json();
        setIncident(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Couldn’t load incident.");
        }
      } finally {
        setLoadingIncident(false);
      }
    })();
    return () => ctrl.abort();
  }, []);
  */

  const handleResolve = async () => {
    if (!incident || loadingResolve || incident.status === "Resolved") return;

    setLoadingResolve(true);
    setError(null);

    // MOCK: Simulate resolve success
    setTimeout(() => {
      setIncident((prev) => ({ ...prev, status: "Resolved" }));
      setLoadingResolve(false);
    }, 800);

    /* Real PATCH — commented for mock testing */
    /*
    try {
      const res = await fetch(`${INCIDENT_ENDPOINT}/resolve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resolved: true }),
      });
      if (!res.ok) throw new Error("Failed to resolve incident");
      setIncident((prev) => ({ ...prev, status: "Resolved" }));
    } catch (err) {
      console.error(err);
      setError("Couldn’t mark as resolved.");
    } finally {
      setLoadingResolve(false);
    }
    */
  };

  const isResolved = incident?.status?.toLowerCase() === "resolved";

  if (loadingIncident)
    return (
      <div className="bg-babyrose w-full p-4 rounded-[10px] shadow animate-pulse">
        Loading incident…
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-[10px] shadow">
        {error}
      </div>
    );

return (
  <div className="bg-[#FEEAEF] w-full p-4 rounded-[10px] shadow flex flex-col lg:flex-row lg:justify-between gap-6">
    {/* Left side */}
    <div className="flex-1">
      {/* Siren + headline on one line */}
      <div className="flex items-center gap-2">
        <div className="w-[60px] h-[60px] flex items-center justify-center border-2 border-[#F93162] rounded-sm">
          <Siren className="w-6 h-6 text-[#F93162] animate-ping flex-shrink-0" />
        </div>
        <h1 className="font-dmsans text-xl text-grayish font-normal">
          PANIC BUTTON TRIGGERED AT {incident.unit} – {incident.floor}
        </h1>
      </div>


      <p className="font-inter text-sm text-slategray font-normal">
        {incident.minute} minute{incident.minute !== 1 && "s"} ago
      </p>

      <div className="flex gap-2 mt-3">
        <button className="bg-[#F93162] text-white text-sm font-inter font-normal px-3 py-1 border rounded hover:bg-white hover:border-[#F93162] hover:text-[#F93162]">
          Open Roll Call
        </button>

        <button
          onClick={handleResolve}
          disabled={isResolved || loadingResolve}
          className={`border border-[#005E0E] text-sm font-inter font-normal px-3 py-1 rounded transition-colors hover:bg-[#005E0E] hover:text-white ${
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
    <div className="w-full lg:w-1/3 rounded-[10px] border-[0.5px] border-[#49505780] p-4 flex flex-col gap-2">
      <p className="font-dmsans text-sm text-slateboost">
        Triggered&nbsp;By: {incident.resident}
      </p>
      <p className="font-dmsans text-sm text-slateboost">
        Status: {incident.status}
      </p>
    </div>
  </div>
);
}
