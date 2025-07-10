"use client";

import Card4 from "../../components/Card4";
import Chart2 from "../../components/Chart2";              
import EmergencyTable from "../../components/tables/Emergencies";
import Layout from "../../components/layout/Layout";

// import { useState, useEffect } from "react";

export default function Emergencypage() {
  // ---------- STATE ----------
  // const [feed,   setFeed]   = useState(null);           // { floor, unit, name, status }
  // const [stats,  setStats]  = useState(null);           // { resolved, ongoing }
  // const [events, setEvents] = useState([]);             // array of event objects

  // const [loading, setLoading] = useState(true);
  // const [error,   setError]   = useState(null);

  // ---------- EFFECT ----------
  // useEffect(() => {
  //   const fetchEmergencies = async () => {
  //     try {
  //       // 🔗 swap with your real endpoint
  //       const res = await fetch("/api/emergencies/summary");
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data = await res.json();

  //       /* Expected payload:
  //          {
  //            feed:   { floor, unit, name, status },
  //            stats:  { resolved, ongoing },
  //            events: [ { location, visitor, type, time, status }, ... ]
  //          }
  //       */
  //       setFeed(data.feed);
  //       setStats(data.stats);
  //       setEvents(data.events);
  //     } catch (err) {
  //       setError(err.message || "Unknown error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEmergencies();

  //   // optional polling every 10 seconds
  //   const id = setInterval(fetchEmergencies, 10_000);
  //   return () => clearInterval(id);
  // }, []);

  // ---------- GUARDS ----------
  // if (loading) return <p className="p-6">Loading emergencies…</p>;
  // if (error)   return <p className="p-6 text-red-600">Error: {error}</p>;

  // ---------- UI ----------
  return (
    <Layout>
      <div className="flex flex-col min-h-screen w-full items-center px-4 md:px-8">
        {/* ---- Upper Row ---- */}
        <div
          id="upper"
          className="
            flex flex-col md:flex-row
            w-full max-w-[1140px]
            gap-6 md:gap-8
          "
        >
          {/* Left Card (Card4) */}
          <div className="w-full md:w-1/2">
            <Card4
              floor="5"
              unit="B05A"
              name="Wan Tam"
              status="Active"
            />
          </div>

          {/* Right Card (Chart2) - same dimensions as left */}
          <div className="w-full md:w-1/2">
            <Chart2 />
          </div>
        </div>

        {/* ---- Lower Row ---- */}
        <div
          id="lower"
          className="
            w-full max-w-[1140px]
            mt-10
          "
        >
          <EmergencyTable />
        </div>
      </div>
    </Layout>
  );
}
