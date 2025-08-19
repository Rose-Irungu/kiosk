import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash2, Eye, User, FileText, X } from "lucide-react";

const statusStyles = {
  new: "bg-red-100 text-red-700",
  under_review: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
};

export default function ResidentPastIncident({ incidentReports = [] }) {
  const [incidents, setIncidents] = useState(incidentReports);
  const [expandedCards, setExpandedCards] = useState({});
  const [selected, setSelected] = useState(null);


  useEffect(() => {
    setIncidents(incidentReports);
  }, [incidentReports]);

  const formatStatus = s => {
    if (s === "new") return "New Incident";
    if (s === "under_review") return "Under Review";
    if (s === "resolved") return "Resolved";
    return s;
  };

  const toggleCard = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getIncidentTypeColor = (type) => {
    const colors = {
      maintenance: "bg-green-100 text-green-700",
      electrical_issue: "bg-blue-100 text-blue-700",
      plumbing: "bg-purple-100 text-purple-700",
      noise_complaint: "bg-orange-100 text-orange-700",
      security_concern: "bg-red-100 text-red-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const filteredIncidents = incidents.filter(() => {
    
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 min-h-screen p-4">
      {!selected ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Reported Incidents</h2>
            
          </div>

          {/* Incident Cards */}
          <div className="space-y-4">
            {filteredIncidents.map(incident => (
              <div key={incident.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {/* Card Header */}
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleCard(incident.id)}
                >
                  <div className="flex items-center gap-3">
                  
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-1 rounded ${statusStyles[incident.incident_status]}`}>
                          {formatStatus(incident.incident_status)}
                        </span>
                      </div>
                      <span className={` px-2 py-1 bg-green-400 w-full rounded font-large${getIncidentTypeColor(incident.incident_type)}`}>
                          {incident.incident_type.replace(/_/g, " ")}
                        </span>
                      
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedCards[incident.id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCards[incident.id] && (
                  <div className="border-t bg-white p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm flex-1">
                        <div>
                          <span className="text-gray-600">Date: </span>
                          <span className="font-medium">{incident.date || new Date().toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Location: </span>
                          <span className="font-medium">{incident.incident_location || 'Not specified'}</span>
                        </div>
                        <div className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-medium mb-3">Incident Photo</h3>
                <div className="bg-gray-100 rounded h-10 w-8 overflow-hidden aspect-square flex items-center justify-center">
                  {incident.incident_image ? (
                    <img
                      src={incident.incident_image}
                      alt="Incident"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <svg className="w-4 h-4 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm">No photo available</p>
                    </div>
                  )}
                </div>
              </div>
                        
                      </div>
                      <div className="flex items-center  ml-4">
                       
                      </div>
                    </div>
                    
                    {/* Description Preview */}
                    <div className="mt-3 p-3 bg-white rounded border">
                      <h4 className="font-medium text-gray-900 mb-2">Description Preview</h4>
                      <p className="text-sm text-gray-700">
                        {incident.incident_description.slice(0, 150)}
                        {incident.incident_description.length > 150 && '...'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredIncidents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No incidents found for the selected time period.</p>
            </div>
          )}
        </>
      ) : (
        
        <div className="bg-gray-100 rounded-lg min-h-screen">
          
          <div className="flex justify-between items-center bg-white shadow rounded px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-10 bg-green-500 rounded" />
              <h2 className="text-xl font-semibold capitalize">
                {selected.incident_type.replace(/_/g, " ")} Details
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs px-3 py-1 rounded-full ${statusStyles[selected.incident_status]}`}>
                {formatStatus(selected.incident_status)}
              </span>
              <button 
                onClick={() => setSelected(null)} 
                className="p-2 rounded hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Incident Description */}
            <div className="bg-white shadow rounded p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-gray-500 w-5 h-5" />
                <h3 className="text-lg font-medium">Incident Description</h3>
              </div>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-gray-700 leading-relaxed">{selected.incident_description}</p>
              </div>
              
              {/* Additional Details */}
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Date Reported:</span>
                  <span className="font-medium">{selected.date || new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Location:</span>
                  <span className="font-medium">{selected.location || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Incident Type:</span>
                  <span className="font-medium capitalize">{selected.incident_type.replace(/_/g, " ")}</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Reporter Information */}
              <div className="bg-white shadow rounded p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="text-gray-500 w-5 h-5" />
                  <h3 className="text-lg font-medium">Reporter Information</h3>
                </div>
                <div className="bg-gray-50 rounded p-4 space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Name:</span>
                    <p className="font-medium">{selected.reporter_name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Role:</span>
                    <p className="font-medium capitalize">{selected.reporter_role}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Assigned to:</span>
                    <p className="font-medium">{selected.assigned_to || 'Admin'}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          </div>
            
          
        
      )}
    </div>
  );
}