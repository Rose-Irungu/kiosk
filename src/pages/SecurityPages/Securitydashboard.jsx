import React, { useState, useEffect } from "react";

import SecurityLayout from "../../components/SecurityComponents/SecurityLayout";
import Navigation from "../../components/Navigation";
import Card1 from "../../components/Card1";
import Card6 from "../../components/Card6";
import { getDashboardStatistics } from "../../services/dashboardService";
import useSecurityDashboardStats from "../../hooks/useSecurityDashboardStats";

export default function SecurityDashboard(){
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  console.log(stats);
  console.log("Statistics:", statistics);

  return (
    <SecurityLayout>
      <div className="flex flex-wrap justify-start mb-[12px]">
        <Card1
          cardTitle="Expected Visitors"
          count={statistics.loading ? "..." : statistics.expectedVisitors || 0}
          link="View log"
          linkHref="/visitorlogs"
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
          count={statistics.loading ? "..." : statistics.checkedInVisitors || 0}
          link="View details"
          linkHref="/incident_report"
          icon={
            <img
              src="/active.svg"
              alt="Incidents Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
        <Card1
          cardTitle="Checked Out Visitors"
          count={
            statistics.loading ? "..." : statistics.checkedOutVisitors || 0
          }
          link="View details"
          linkHref="/checkincheckout"
          icon={
            <img
              src="/911.svg"
              alt="Emergency Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
        <Card1
          cardTitle="Emergency Today"
          count={statistics.loading ? "..." : statistics.emergencyToday || 0}
          link="View users"
          linkHref="/security/emergencypage"
          icon={
            <img
              src="/users.svg"
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


      <div className="w-full flex flex-row gap-6 mb-8">
        <div className="bg-white p-3 rounded-lg shadow flex-3">
          <div className="h-full">
            {/* Table in here */}
          </div>
        </div>

        <div className="">
          <div className="bg-white p-3 rounded-lg shadow h-full">
            <Card6/>
          </div>
        </div>
      </div>
    </SecurityLayout>
  );
};

