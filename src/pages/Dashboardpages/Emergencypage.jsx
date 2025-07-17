"use client";

import { useEffect, useState } from "react";
import Card4 from "../../components/Card4";
import EmergencyStatsChart from "../../components/Chart2";              
import EmergencyTable from "../../components/tables/Emergencies";
import Layout from "../../components/layout/Layout";
import {
  fetchEmergencies
} from "../../services/adminEmergencyServices";

export default function Emergencypage() {
  const [latest, setLatest] = useState(null);
  const [all, setAll] = useState([]);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("Today");

  // Fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { latest, all, ongoingCount, resolvedCount } = await fetchEmergencies();
        setLatest(latest);
        setAll(all);
        setOngoingCount(ongoingCount);
        setResolvedCount(resolvedCount);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Time filter logic - can be expanded based on created_at timestamps
  const filterEventsByTime = (events, filter) => {
    const now = new Date();
    return events.filter((e) => {
      const created = new Date(e.created_at);
      switch (filter) {
        case "Today":
          return (
            created.toDateString() === now.toDateString()
          );
        case "This Week": {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return created >= weekAgo;
        }
        case "This Month": {
          return (
            created.getMonth() === now.getMonth() &&
            created.getFullYear() === now.getFullYear()
          );
        }
        case "This Year":
          return created.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredEvents = filterEventsByTime(all, timeFilter);

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
              name={latest?.user_id} // Replace with name if possible
              status={latest?.emergency_status}
            />
          </div>

          {/* Right Card (EmergencyStatsChart) */}
          <div className="w-full md:w-1/2">
            <EmergencyStatsChart
              ongoing={ongoingCount}
              resolved={resolvedCount}
            />
          </div>
        </div>

        {/* ---- Lower Row ---- */}
        <div id="lower" className="w-full max-w-[1140px] mt-10">
          <EmergencyTable
            events={filteredEvents.map((e) => ({
              id: e.id,
              location: e.emergency_location || "Unknown",
              visitor: e.user_id || "N/A", // Replace with actual user/visitor
              type: e.emergency_type,
              time: new Date(e.created_at).toLocaleString(),
              status: e.emergency_status === "resolved" ? "Resolved" : "Ongoing"
            }))}
            isLoading={loading}
            error={error}
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            highlightConditions={[{ emergency_status: "ongoing" }]}
            onStatusChange={(action, event) => {
              console.log(`Status change clicked: ${action}`, event);
              // Call updateEmergency(event.id, newStatus) here
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
