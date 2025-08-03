import React, { useState, useEffect } from "react";

import SecurityLayout from "../../components/SecurityComponents/SecurityLayout";
import Navigation from "../../components/Navigation";
import Card1 from "../../components/Card1";
import Card6 from "../../components/Card6";
import LiveLogsTable from "../../components/SecurityComponents/LiveLogsTable";
import { getDashboardStatistics } from "../../services/dashboardService";
import useSecurityDashboardStats from "../../hooks/useSecurityDashboardStats";
//import { todaysVisitors } from "../../scripts/securityDashboardUtils";

export default function SecurityDashboard() {
  const [stats, setStats] = useState([]);
  const [, setLoading] = useState(true);
  const statistics = useSecurityDashboardStats();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStatistics();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [stats]);

  console.log(stats);

  return (
    <SecurityLayout>
      <div className="flex flex-wrap justify-start mb-[12px]">
        <Card1
          cardTitle="Expected Visitors"
          count={stats?.expected_visitors?.count || 0}
          link="View log"
          linkHref="/visitorsexpected"
          icon={
            <img
              src="/doorbell.svg"
              alt="Doorbell Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
        <Card1
          cardTitle="Checked In Visitors"
          count={stats?.current_visitors?.count || 0}
          link="View log"
          data={stats?.current_visitors?.data || []}
          linkHref="/checkedoutvisitors"
          icon={
            <img
              src="/tick.svg"
              alt="Incidents Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
        <Card1
          cardTitle="Checked Out Visitors"
          count={
            stats?.checked_out_visitors?.count || 0
          }
          link="View log"
          data={stats?.checked_out_visitors?.data || []}
          linkHref="/checkedoutvisitors"
          icon={
            <img
              src="/checkout.svg"
              alt="Emergency Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
        <Card1
          cardTitle="Emergency Today"
          count={stats?.emergencies?.stats?.today_emergencies || 0}
          link="View users"
          linkHref="/security/emergencypage"
          icon={
            <img
              src="/911.svg"
              alt="Users Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
      </div>

      {statistics.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {statistics.error}
        </div>
      )}

<div className="w-full flex flex-col lg:flex-row gap-6 mb-8 items-start">
  {/* Left Panel - 3/4 width on large screens */}
  <div className="w-full lg:w-3/4 bg-white p-3 rounded-lg shadow">
    <LiveLogsTable
      title="Expected Visitors Today"
      visitorData={stats?.expected_visitors?.data || []}
      isLoading={statistics.loading}
    />
  </div>

  {/* Right Panel - 1/4 width on large screens */}
  <div className="w-full lg:w-1/4 ">
    <div className="bg-white p-3 rounded-lg shadow">
      <Card6 />
    </div>
  </div>
</div>

    </SecurityLayout>
  );
}
