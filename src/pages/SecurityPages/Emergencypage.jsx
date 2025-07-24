"use client";

import { useEffect, useState } from "react";
import Card4 from "../../components/Card4";
import EmergencyStatsChart from "../../components/Chart2";
import EmergencyTable from "../../components/tables/Emergencies";
import SecurityLayout from "../../components/SecurityComponents/SecurityLayout";
import {
  fetchEmergencies,
  updateEmergency,
} from "../../services/adminEmergencyServices";

export default function Emergencypage() {
  const [latest, setLatest] = useState(null);
  const [all, setAll] = useState([]);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("This Week");


  const getData = async () => {
    try {
      setLoading(true);

      const { all, ongoingCount, resolvedCount } = await fetchEmergencies();

      const ongoingOnly = all.filter(
        (e) => e.emergency_status?.toLowerCase() === "ongoing"
      );

      setLatest(ongoingOnly.length > 0 ? ongoingOnly[0] : null);
      setAll(all);
      setOngoingCount(ongoingCount);
      setResolvedCount(resolvedCount);
    } catch (err) {
      console.error("Error fetching emergencies:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  const filterEventsByTime = (events, filter) => {
    const now = new Date();
    return events.filter((e) => {
      const created = new Date(e.created_at);
      switch (filter) {
        case "Today":
          return created.toDateString() === now.toDateString();
        case "This Week": {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return created >= weekAgo;
        }
        case "This Month":
          return (
            created.getMonth() === now.getMonth() &&
            created.getFullYear() === now.getFullYear()
          );
        case "This Year":
          return created.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredEvents = filterEventsByTime(all, timeFilter);

  return (
    <SecurityLayout>
      <div className="flex flex-col min-h-screen w-full items-center px-4 md:px-8">
        {/* ---- Upper Row ---- */}
        <div className="flex flex-col md:flex-row w-full max-w-[1140px] gap-6 md:gap-8">
          {/* Card4 - The Live Emergency Feed */}
          <div className="w-full md:w-1/2">
            {latest ? (
              <Card4
                id={latest?.id}
                floor={latest?.triggerer_floor_number}
                unit={latest?.triggerer_unit_number}
                name={latest?.triggered_by}
                status={latest?.emergency_status}
                onResolved={getData}
              />
            ) : (
              <div className="bg-white p-6 rounded shadow w-full">
                <p className="text-center text-gray-600 font-semibold">
                  No unresolved emergencies
                </p>
              </div>
            )}
          </div>

          {/* Emergency Stats Chart */}
          <div className="w-full md:w-1/2">
            <EmergencyStatsChart
              ongoing={ongoingCount}
              resolved={resolvedCount}
            />
          </div>
        </div>

        {/* ---- Lower Row ---- */}
        <div className="w-full max-w-[1140px] mt-10">
          <EmergencyTable
            events={filteredEvents.map((e) => ({
              id: e.id,
              location: e.emergency_location || "Unknown",
              visitor: e.triggered_by || "Unknown",
              type: e.emergency_type,
              time: new Date(e.created_at).toLocaleString(),
              status: e.emergency_status === "resolved" ? "Resolved" : "Ongoing",
            }))}
            isLoading={loading}
            error={error}
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            highlightConditions={[{ emergency_status: "ongoing" }]}
            onStatusChange={async (action, event) => {
              try {
                const newStatus = action === "Resolved" ? "resolved" : "ongoing";
                await updateEmergency(event.id, newStatus);

                const { all, ongoingCount, resolvedCount } = await fetchEmergencies();

                const nextOngoing = all.find(
                  (e) => e.emergency_status === "ongoing"
                );

                setLatest(nextOngoing || null);
                setAll(all);
                setOngoingCount(ongoingCount);
                setResolvedCount(resolvedCount);
              } catch (err) {
                console.error("Failed to update emergency status:", err);
              }
            }}
          />
        </div>
      </div>
    </SecurityLayout>
  );
}
