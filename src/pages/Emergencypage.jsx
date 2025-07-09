/* app/(dashboard)/emergencies/page.jsx */
"use client";

import { useState, useEffect } from "react";
import Card4 from "../../components/Card4";
import Chart2 from "../../components/Chart2";              // make sure it reads props
import EmergencyTable from "../../components/tables/Emergencies"; // same here

export default function Emergencypage() {
  // ---------- STATE ----------
  const [feed,   setFeed]   = useState(null);           // { floor, unit, name, status }
  const [stats,  setStats]  = useState(null);           // { resolved, ongoing }
  const [events, setEvents] = useState([]);             // array of event objects

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ---------- EFFECT ----------
  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        // 🔗 swap with your real endpoint
        const res = await fetch("/api/emergencies/summary");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        /* Expected payload:
           {
             feed:   { floor, unit, name, status },
             stats:  { resolved, ongoing },
             events: [ { location, visitor, type, time, status }, ... ]
           }
        */
        setFeed(data.feed);
        setStats(data.stats);
        setEvents(data.events);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencies();

    // optional polling every 10 seconds
    const id = setInterval(fetchEmergencies, 10_000);
    return () => clearInterval(id);
  }, []);

  // ---------- GUARDS ----------
  if (loading) return <p className="p-6">Loading emergencies…</p>;
  if (error)   return <p className="p-6 text-red-600">Error: {error}</p>;

  // ---------- UI ----------
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* ---- Upper row ---- */}
      <div
        id="upper"
        className="
          flex flex-col gap-6
          md:flex-row md:gap-4
          w-full
        "
      >
        {/* Card4 (left) */}
        <div className="w-full md:w-1/2">
          {feed && (
            <Card4
              floor={feed.floor}
              unit={feed.unit}
              name={feed.name}
              status={feed.status}
            />
          )}
        </div>

        {/* Chart2 (right) */}
        <div className="w-full md:w-1/2">
          {stats && (
            <Chart2
              resolved={stats.resolved}
              ongoing={stats.ongoing}
            />
          )}
        </div>
      </div>

      {/* ---- Lower row ---- */}
      <div id="lower" className="mt-8">
        <EmergencyTable events={events} />
      </div>
    </div>
  );
}
