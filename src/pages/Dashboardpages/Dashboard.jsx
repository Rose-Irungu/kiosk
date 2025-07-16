import React, { useState, useEffect } from "react";

import Layout from "../../components/layout/Layout";
import Navigation from "../../components/Navigation";
import Card1 from "../../components/Card1";
import Card2 from "../../components/Card2";
import Card3 from "../../components/Card3";
import Chart from "../../components/Chart";
import { AlertTriangle } from "lucide-react";
import DashboardTable from "../../components/tables/DashboardTable";
import { getDashboardStatistics } from "../../services/dashboardService";
import useVisitorStats from "../../hooks/useVisitorStats";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use the new visitor stats hook
  const {
    stats: visitorStats,
    loading: visitorLoading,
    error: visitorError,
    totalVisitors,
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
    <Layout>
      <div className="flex flex-wrap justify-start mb-[12px]">
        <Card1
          cardTitle="Current Visitors"
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
          cardTitle="Active Incidents"
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
          cardTitle="Emergencies Today"
          count={
            loading ? "..." : stats?.emergencies?.stats?.today_emergencies || 0
          }
          link="View details"
          linkHref="/emergencypage"
          icon={
            <img
              src="/911.svg"
              alt="Emergency Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
        <Card1
          cardTitle="Total Active Users"
          count={loading ? "..." : stats?.users?.total || 0}
          link="View users"
          linkHref="/userspage"
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

      <div className="mb-[30px]">
        <Card2
          label="Active Incidents"
          value={loading ? "..." : stats?.incidents?.total || 0}
          icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
          iconBg="bg-red-100"
          buttonText="View details"
        />
      </div>

      <div className="overflow-x-auto w-full bg-white p-6 rounded-lg shadow mb-8 flex flex-col lg:flex-row gap-6">
        <Chart />
        <Card3
          companyVisitors={loading ? 0 : stats?.visitor_totals?.company || 0}
          residentVisitors={loading ? 0 : stats?.visitor_totals?.resident || 0}
          serviceProviders={loading ? 0 : stats?.visitor_totals?.service || 0}
          className="lg:ml-4"
        />
      </div>

      <DashboardTable />
    </Layout>
  );
};

export default Dashboard;
