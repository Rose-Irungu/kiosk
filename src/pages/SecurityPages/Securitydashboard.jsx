import React, { useState, useEffect } from "react";

import SecurityLayout from "../../components/SecurityComponents/SecurityLayout";
import Navigation from "../../components/Navigation";
import Card1 from "../../components/Card1";
import Card6 from "../../components/Card6";
import Card3 from "../../components/Card3";
import Chart from "../../components/Chart";
import { AlertTriangle } from "lucide-react";
import DashboardTable from "../../components/tables/DashboardTable";
import { getDashboardStatistics } from "../../services/dashboardService";
import useVisitorStats from "../../hooks/useVisitorStats";

export default function SecurityDashboard(){
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
            stats: visitorStats,
            loading: visitorLoading,
            error: visitorError
        } = useVisitorStats();


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
  console.log("Visitor stats:", visitorStats);

  return (
    <SecurityLayout>
      <div className="flex flex-wrap justify-start mb-[12px]">
        <Card1
          cardTitle="Expected Visitors"
          count={visitorLoading ? "..." : stats?.visitors?.total}
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
          count={loading ? "..." : stats?.incidents_in_progress?.total || 0}
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
            loading ? "..." : stats?.emergencies?.stats?.today_emergencies || 0
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
          count={loading ? "..." : stats?.users?.total || 0}
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

      {visitorError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {visitorError}
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

