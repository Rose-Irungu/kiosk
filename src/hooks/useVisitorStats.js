import { useEffect, useState } from "react";
import { getDashboardStatistics } from "../services/dashboardService";

const useVisitorStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStatistics();
        setStats(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching visitor stats:", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
          setError("Server error occurred. Please try again.");
        } else {
          setError("Something went wrong. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []); 

  const refreshStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStatistics();
      setStats(data);
      setError(null);
    } catch (error) {
      console.error("Error refreshing visitor stats:", error);
      setError("Failed to refresh stats");
    } finally {
      setLoading(false);
    }
  };

  return { 
    stats, 
    loading, 
    error, 
    refreshStats,
    totalVisitors: stats?.visitors?.total || 0,
    visitorData: stats?.visitors?.data || []
  };
};

export default useVisitorStats;