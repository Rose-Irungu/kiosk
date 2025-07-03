import { useEffect, useState } from "react";

// const INCIDENT_ENDPOINT = "https://api.example.com/incidents/123"; // Real endpoint disabled for testing

export default function Card2({ panicEmoji }) {
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
    <div className="bg-babyrose w-full p-4 rounded-[10px] shadow flex flex-col lg:flex-row lg:justify-between gap-4">
      {/* Left side */}
      <div className="flex-1">
        <div className="text-rosefire text-2xl">{panicEmoji}</div>

        <h1 className="font-dmsans text-xl text-grayish font-normal">
          PANIC BUTTON TRIGGERED AT {incident.unit} – {incident.floor}
        </h1>

        <p className="font-inter text-sm text-slategray font-normal">
          {incident.minute} minute{incident.minute !== 1 && "s"} ago
        </p>

        <div className="flex gap-2 mt-3">
          <button className="bg-rosefire text-white text-sm font-inter font-normal px-3 py-1 rounded">
            Open Roll Call
          </button>

          <button
            onClick={handleResolve}
            disabled={isResolved || loadingResolve}
            className={`border text-sm font-inter font-normal px-3 py-1 rounded transition-colors ${
              isResolved
                ? "border-green-600 text-green-600 cursor-default"
                : loadingResolve
                ? "border-gray-400 text-gray-400 cursor-wait"
                : "border-deepindigo text-deepindigo hover:bg-deepindigo/10"
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
      <div className="flex-1 rounded-[10px] border-[0.5px] border-[#49505780] p-4 flex flex-col gap-2">
        <p className="font-dmsans text-sm text-slateboost">
          Triggered By: {incident.resident}
        </p>
        <p className="font-dmsans text-sm text-slateboost">
          Status: {incident.status}
        </p>
      </div>
    </div>
  );
}
