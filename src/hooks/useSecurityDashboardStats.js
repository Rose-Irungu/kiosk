import { useEffect, useState } from "react";
import { fetchStatistics } from "../services/securityDashboardService";

const useSecurityDashboardStats = () => {
  const [thisStats, setThisStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStatistics();
        setThisStats(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching visitor stats:", error);
        setError("Server error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const refreshStats = async () => {
    try {
      setLoading(true);
      const data = await fetchStatistics();
      setThisStats(data);
      setError(null);
    } catch (error) {
      console.error("Error refreshing visitor stats:", error);
      setError("Failed to refresh stats");
    } finally {
      setLoading(false);
    }
  };

  const visitorList = thisStats?.visitors?.data ?? [];
  const expectedVisitors = thisStats?.expected_visitors?.count ?? 0;
  const checkedInVisitors = thisStats?.current_visitors?.count ?? 0;
  const checkedOutVisitors = thisStats?.checked_out_visitors ?? 0;
  const emergencyToday = thisStats?.emergencies?.stats?.today_emergencies ?? 0;

  return {
    thisStats,
    loading,
    error,
    refreshStats,
    visitorList,
    expectedVisitors,
    checkedInVisitors,
    checkedOutVisitors,
    emergencyToday,
  };
};

export default useSecurityDashboardStats;
