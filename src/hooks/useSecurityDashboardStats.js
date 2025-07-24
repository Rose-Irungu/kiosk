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

    return { 
            thisStats, 
            loading, 
            error, 
            refreshStats,
            expectedVisitors: thisStats?.expected_visitors?.count || 1,
            checkedInVisitors:thisStats?.current_visitors.count || 2,
            checkedOutVisitors:thisStats?.checked_out_visitors || 3,
            emergencyToday:thisStats?.emergencies?.stats?.today_emergencies || 4
        };
};

export default useSecurityDashboardStats;