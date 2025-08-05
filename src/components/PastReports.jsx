import React, { useState } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';

const statusStyles = {
  maintenance: "bg-green-100 text-green-900",
  // add other statuses here
};

function IncidentCard({ incident, isOpen, onToggle, onReopen, onDelete }) {
  const status = incident.incident_status || 'maintenance';
  const badgeClass = statusStyles[status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => onToggle(incident.id)}
        className={`${badgeClass} w-full flex items-center px-4 py-2 justify-between`}
      >
        <span className="font-medium">{incident.title}</span>
        <ChevronDown
          className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          size={20}
        />
      </button>

      {/* Body */}
      {isOpen && (
        <div className="bg-white px-4 py-3 text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <div>
              <span className="font-semibold">Date:</span> {incident.incident_date}
            </div>
            <div>
              <span className="font-semibold">Assigned to:</span> {incident.assigned}
            </div>
          </div>
          <div className="text-right">
            <div>
              <span className="font-semibold">Location:</span> {incident.location}
            </div>
            <div>
              <span className="font-semibold">Time:</span> {incident.incident_time}
            </div>
          </div>
          <div className="col-span-full flex items-center space-x-2 mt-2">
            <button
              onClick={() => onReopen(incident)}
              className="border border-green-900 text-green-900 rounded-md py-1 px-3 hover:bg-green-100 transition"
            >
              Reopen Report
            </button>
            <button
              onClick={() => onDelete(incident)}
              aria-label="Delete report"
              className="ml-auto text-gray-400 hover:text-red-600 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PastCard({ incidentReports = [] }) {
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) => {
    setOpenIds(ids =>
      ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
    );
  };

  if (!incidentReports?.length) {
    return <p className="text-gray-600 text-center py-4">No past reports to display.</p>;
  }

  return (
    <div className="space-y-4">
      {incidentReports.map(incident => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          isOpen={openIds.includes(incident.id)}
          onToggle={toggle}
          onReopen={incident.onReopen}
          onDelete={incident.onDelete}
        />
      ))}
    </div>
  );
}
