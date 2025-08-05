import React, { useEffect, useState } from 'react';
import RecentCard from '../RecentReportsCard';

import { residentIncidenceService } from '../../services/residentIncident';

export default function RecentReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await residentIncidenceService.getAllIncidence();
        
        const list = response.data ?? response;
        setReports(list);
      } catch (err) {
        console.error('Error fetching recent reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="max-w-full mx-auto p-6">
      <h2 className="text-2xl font-semibold text-green-900 flex items-center gap-2 mb-4">
        
        Recent Reports
      </h2>

      {loading ? (
        <div className="text-center w-full text-gray-500 py-8">Loading recent reports...</div>
      ) : (
        <RecentCard incidentReports={reports} />
      )}
    </div>
  );
}
