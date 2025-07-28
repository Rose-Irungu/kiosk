import React, { useEffect, useState } from "react";
import SecurityIncidentTable from "../../components/tables/SecurityIncident";
import { securityIncidenceService } from "../../services/securityIncidence";
import SecurityLayout from "../../components/SecurityComponents/SecurityLayout";
export default function SecurityIncidentPage() {
  const [incidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await securityIncidenceService.getAllIncidence();
        
        const incidents = response.data || response;  
        
        setIncidentData(incidents);
      } catch (error) {
        console.error("Error fetching incident data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <SecurityLayout>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading incidents...</div>
      ) : (
        <SecurityIncidentTable incidentReports={incidentData} />
      )}
    </SecurityLayout>
  );
}