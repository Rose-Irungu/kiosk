import React, { useEffect, useState } from "react";
import SecurityLayout from "../../components/SecurityComponents/SecurityLayout.jsx";
import CheckinCheckoutTable from "../../components/tables/CheckinCheckoutTable.jsx";

export default function VisitorLog() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVisitorLogs() {
      try {
        const response = await fetch("/api/visits/visit-logs/");
        const data = await response.json();

        const formattedData = data.map((visitor) => ({
          name: visitor.visitor_name,
          phone: visitor.phone_number,
          visitorType: visitor.visitor_type,
          hostUnit: visitor.unit_number,
          status: visitor.status,
          photo: "https://via.placeholder.com/150", 
        }));

        setVisitors(formattedData);
      } catch (error) {
        console.error("Failed to fetch visitor logs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVisitorLogs();
  }, []);

  return (
    <SecurityLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Visitor Check-In/Out Logs</h2>
        </div>
        {loading ? (
          <p>Loading visitor logs...</p>
        ) : (
          <CheckinCheckoutTable data={visitors} />
        )}
      </div>
    </SecurityLayout>
  );
}
