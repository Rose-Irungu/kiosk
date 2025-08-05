import React, { useEffect, useState } from 'react';
import ResidentPastIncident from './ResidentCards/PastCard';
import { incidenceService } from '../../services/incident';
import { ArrowLeft } from 'lucide-react';

export default function PastReportsCard() {
  const [incidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchIncidents = async () => {
          try {
            const response = await incidenceService.getAllIncidence();
            
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
    <div className="max-w-7xl mx-auto p-6">
      <button>
        <h2 className="text-2xl font-semibold text-green-900 flex items-center gap-2 mb-4">
        <ArrowLeft/>
        Past Reports
      </h2>
      </button>
      

      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading past reports...</div>
      ) : (
        <ResidentPastIncident incidentReports={incidentData} />
      )}
    </div>
  );
}
