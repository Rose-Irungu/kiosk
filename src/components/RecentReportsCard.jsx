import React, { useState } from 'react';
import { TriangleAlert, MapPin, Calendar, Clock3, X, FileText, User } from 'lucide-react';

const statusStyles = {
  new:         "bg-red-100 text-red-700",
  under_review:"bg-yellow-100 text-yellow-700",
  resolved:     "bg-green-100 text-green-700",
};

const statusLabels = {
  new:         "New Complaint",
  under_review:"In Review",
  resolved:     "Resolved",
};


function IncidentModal({ incident, onClose }) {
  if (!incident) return null;

  const {
    incident_type,
    incident_location,
    incident_date,
    incident_time,
    incident_status,
    created_at,
    incident_description,
    reporter_name,
    incident_image
  } = incident;

  const label = incident_type
    .split('_')
    .map(w => w[0]?.toUpperCase() + w.slice(1))
    .join(' ');

  const statusText = statusLabels[incident_status] || incident_status;
  const badgeClass = statusStyles[incident_status] || 'bg-gray-100 text-gray-800';

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-green-900 flex items-center gap-2">
            <TriangleAlert size={20} />
            {label}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          
          <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${badgeClass}`}>
              {statusText}
            </span>
          </div>

          
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-1 text-green-900">
              <MapPin size={14} />
              <div>
                <div className="text-gray-600 text-xs">Location</div>
                <div className="font-medium">{incident_location}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-900">
              <Calendar size={14} />
              <div>
                <div className="text-gray-600 text-xs">Date</div>
                <div className="font-medium">{incident_date || new Date().toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-900">
              <Clock3 size={14} />
              <div>
                <div className="text-gray-600 text-xs">Time</div>
                <div className="font-medium">{created_at ? formatTime(created_at) : incident_time}</div>
              </div>
            </div>
          </div>

          
          {incident_description && (
            <div>
              <h3 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-1">
                <FileText size={14} />
                Description
              </h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">{incident_description}</p>
            </div>
          )}

          
          {incident_image && (
            <div>
              <h3 className="text-sm font-semibold text-green-900 mb-2">Incident Image</h3>
              <img 
                src={incident_image} 
                alt="Incident" 
                className="w-full max-h-32 object-cover rounded-lg shadow-sm"
              />
            </div>
          )}

          
          {(reporter_name ) && (
            <div>
              <h3 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-1">
                <User size={14} />
                Reporter Information
              </h3>
              <div className="grid grid-cols-1 gap-2 p-3 bg-gray-50 rounded-lg text-sm">
                {reporter_name && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{reporter_name}</span>
                  </div>
                )}
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecentCard({ incidentReports = [] }) {
  const [selectedIncident, setSelectedIncident] = useState(null);

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

  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
  };

  const handleCloseModal = () => {
    setSelectedIncident(null);
  };

  return (
    <>
      <div className="grid gap-2">
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
              className="h-full bg-white p-6 rounded-xl shadow-md flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-green-900 flex items-center gap-1">
                  <TriangleAlert size={18} /> {label}
                </h3>
                <button
                  onClick={() => handleViewDetails(incident)}
                  className="text-green-900 px-3 py-1 rounded-xl shadow-md border-2 border-green-900 hover:bg-green-50 transition-colors"
                >
                  View Details
                </button>
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

      {/* Modal */}
      {selectedIncident && (
        <IncidentModal 
          incident={selectedIncident} 
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}