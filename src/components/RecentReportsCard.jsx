import React from 'react';
import { TriangleAlert, MapPin, Calendar, Clock3 } from 'lucide-react';

const statusStyles = {
  new:         "bg-red-100 text-red-700",
  under_review:"bg-yellow-100 text-yellow-700",
  resolved:     "bg-green-100 text-green-700",
  // add more statuses if needed
};

const statusLabels = {
  new:         "New Complaint",
  under_review:"In Review",
  resolved:     "Resolved",
  
};

export default function RecentCard({ incidentReports = [] }) {
  if (!Array.isArray(incidentReports) || incidentReports.length === 0) {
    return (
      <p className="text-gray-600 text-center py-4">
        No incidents to display.
      </p>
    );
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className=" grid gap-2 ">
      {incidentReports.map((incident) => {
        const {
          id,
          incident_type,
          incident_location,
          incident_date,
          incident_time,
          incident_status,
          created_at
        } = incident;

        const label = incident_type
          .split('_')
          .map(w => w[0]?.toUpperCase() + w.slice(1))
          .join(' ');

        const statusText = statusLabels[incident_status] || incident_status;
        const badgeClass = statusStyles[incident_status] || 'bg-gray-100 text-gray-800';

        return (
          
          <article
            key={id}
            className="h-full bg-white p-6  rounded-xl shadow-md flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-green-900 flex items-center gap-1">
                <TriangleAlert size={18} /> {label}
              </h3>
              {/* <button
                onClick={() => incident.onView?.(incident)}
                className="text-green-900 px-3 py-1 rounded-xl shadow-md border-2 border-green-900 hover:bg-green-50"
              >
                View Details
              </button> */}
            </div>

            {/* Details Row */}
            <div className="grid grid-cols-3 gap-4 text-green-900 mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={16} /> From: <span className="font-medium">{incident_location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} /> {incident_date || new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1 justify-self-end">
                <Clock3 size={16} /> {created_at ? formatTime(created_at) : incident_time}
              </div>
            </div>

            {/* Status Badge */}
            <span className={`inline-block w-30 px-3 py-1 rounded-xl text-sm font-medium ${badgeClass}`}>
              {statusText}
            </span>
          </article>
        );
      })}
    </div>
  );
}