import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

const statusStyles = {
  new: "bg-red-100 text-red-700",
  "under_review": "bg-yellow-100 text-yellow-700", 
  resolved: "bg-green-100 text-green-700",
};

export default function IncidentTable({ incidentReports }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showActionsFor, setShowActionsFor] = useState(null);
  const [localIncidentReports, setLocalIncidentReports] = useState(incidentReports || []);

  // Update local state when props change
  React.useEffect(() => {
    setLocalIncidentReports(incidentReports || []);
  }, [incidentReports]);

  // Get unique statuses from data for filter buttons
  const availableStatuses = useMemo(() => {
    const statuses = new Set(localIncidentReports?.map(report => report.incident_status));
    return Array.from(statuses).filter(Boolean);
  }, [localIncidentReports]);

  // Filter incidents based on selected status
  const filteredIncidents = useMemo(() => {
    if (!localIncidentReports) return [];
    if (selectedFilter === "all") return localIncidentReports;
    return localIncidentReports.filter(report => report.incident_status === selectedFilter);
  }, [localIncidentReports, selectedFilter]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const counts = {};
    localIncidentReports?.forEach(report => {
      const status = report.incident_status;
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  }, [localIncidentReports]);

  const handleStatusUpdate = (reportId, newStatus) => {
    // Update status in frontend only
    setLocalIncidentReports(prev => 
      prev.map(report => 
        report.id === reportId 
          ? { ...report, incident_status: newStatus }
          : report
      )
    );
    setShowActionsFor(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Reported Incidents</h2>
        <div className="relative">
          <select className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedFilter === "all"
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All ({localIncidentReports?.length || 0})
        </button>
        
        {availableStatuses.map(status => (
          <button
            key={status}
            onClick={() => setSelectedFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === status
                ? statusStyles[status] + " border border-current"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {status?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ({statusCounts[status] || 0})
          </button>
        ))}
      </div>
      
      <Table>
        <TableCaption className="sr-only">A list of incident reports.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-muted-foreground">Reporter Name</TableHead>
            <TableHead className="font-medium text-muted-foreground">Reporter Role</TableHead>
            <TableHead className="font-medium text-muted-foreground">Incident Type</TableHead>
            <TableHead className="font-medium text-muted-foreground">Short Description</TableHead>
            <TableHead className="font-medium text-muted-foreground">Status</TableHead>
            <TableHead className="font-medium text-muted-foreground">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIncidents?.length > 0 ? (
            filteredIncidents.map((report) => (
              <TableRow
                key={report.id}
                className={
                  (report.reporter_name === "George Weru" && report.incident_status === "new") ||
                  (report.reporter_name === "Lewis Oduor" && report.incident_status === "resolved")
                    ? "bg-[#f2f7f3]"
                    : ""
                }
              >
                <TableCell className="font-medium">{report.reporter_name}</TableCell>
                <TableCell className="capitalize">{report.reporter_role}</TableCell>
                <TableCell className="capitalize">{report.incident_type?.replace(/_/g, ' ')}</TableCell>
                <TableCell>{report.incident_description}</TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                      statusStyles[report.incident_status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {report.incident_status?.replace(/_/g, ' ')}
                  </span>
                </TableCell>
                <TableCell className="relative">
                  <button
                    onClick={() => setShowActionsFor(showActionsFor === report.id ? null : report.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <MoreHorizontal className="cursor-pointer text-muted-foreground" />
                  </button>
                  
                  {/* Action Dropdown */}
                  {showActionsFor === report.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                      <div className="py-1">
                        {/* Mark as New - only show if not already new */}
                        {report.incident_status !== "new" && (
                          <button
                            onClick={() => handleStatusUpdate(report.id, "new")}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                          >
                            Mark as New
                          </button>
                        )}
                        
                        {/* Mark as Resolved - only show if not already resolved */}
                        {report.incident_status !== "resolved" && (
                          <button
                            onClick={() => handleStatusUpdate(report.id, "resolved")}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full text-left"
                          >
                            Mark as Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                {selectedFilter === "all" 
                  ? "No incident reports found." 
                  : `No ${selectedFilter.replace(/_/g, ' ')} incidents found.`}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Click outside to close dropdown */}
      {showActionsFor && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowActionsFor(null)}
        />
      )}
    </div>
  );
}