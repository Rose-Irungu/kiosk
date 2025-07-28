import { useEffect, useState } from "react";
import { getDashboardStatistics } from "../services/dashboardService";

export function useExpectedVisitors() {
  const [expectedVisitors, setExpectedVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExpected() {
      try {
        setLoading(true);
        const data = await getDashboardStatistics();       
      
        const visitorsData = data?.expected_visitors?.data || [];     

        setExpectedVisitors(visitorsData);
      } catch (err) {
        setError(err.message || "Error fetching expected visitors");
        console.error("Error fetching expected visitors:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExpected();
  }, []);

  return {
    expectedVisitors,
    loading,
    error,
    count: expectedVisitors.length
  };
}