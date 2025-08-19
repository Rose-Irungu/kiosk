import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Eye, User, FileText, X, Search, ChevronDown } from "lucide-react";
import { incidenceService } from "../../services/incident";

const statusStyles = {
  new: "bg-red-100 text-red-700",
  under_review: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
};

export default function IncidentTable({ incidentReports = [] }) {
  const [incidents, setIncidents] = useState(incidentReports);
  const [filteredIncidents, setFilteredIncidents] = useState(incidentReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionsFor, setActionsFor] = useState(null);
  const [selected, setSelected] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  useEffect(() => {
    setIncidents(incidentReports);
    setFilteredIncidents(incidentReports);
  }, [incidentReports]);

  useEffect(() => {
    let filtered = incidents;

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      let filterDate;

      switch (dateFilter) {
        case "day":
          filterDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "week":
          filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          filterDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          filterDate = null;
      }

      if (filterDate) {
        filtered = filtered.filter((incident) => {
          const incidentDate = new Date(incident.created_at || incident.date_reported);
          return incidentDate >= filterDate;
        });
      }
    }

    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((incident) => {
        return (
          incident.reporter_name.toLowerCase().includes(searchLower) ||
          incident.incident_type.toLowerCase().replace(/_/g, " ").includes(searchLower) ||
          incident.incident_description.toLowerCase().includes(searchLower) ||
          incident.reporter_role.toLowerCase().includes(searchLower)
        );
      });
    }

    setFilteredIncidents(filtered);
  }, [searchQuery, incidents, dateFilter]);
  
  const formatStatus = (s) => {
    if (s === "new") return "New Incident";
    if (s === "under_review") return "Under Review";
    if (s === "resolved") return "Resolved";
    return s;
  };

  const updateStatus = async (id, newStatus) => {
    const res = await incidenceService.updateIncidentStatus(id, newStatus);
    console.log("Log resp...........", res);
    
    if (res.result_code === 0) {
      setIncidents((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, incident_status: newStatus } : r
        )
      );
      setActionsFor(null);
      setSelected(null)
    }
  };

  const filterButtons = [
    { key: "all", label: "All " },
    { key: "day", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
  ];

  return (
    <div className="relative max-w-6xl mx-auto bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-xl font-semibold">Reported Incidents</h2>
          
          {/* Date Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {filterButtons.find(b => b.key === dateFilter)?.label || "All Time"}
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showDateDropdown && (
              <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg z-30 w-40">
                {filterButtons.map((button) => (
                  <button
                    key={button.key}
                    onClick={() => {
                      setDateFilter(button.key);
                      setShowDateDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      dateFilter === button.key ? "bg-green-50 text-green-700 font-medium" : "text-gray-700"
                    }`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search name, type, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableCaption className="sr-only">Incident reports</TableCaption>
          <TableHeader>
            <TableRow className="border-b">
              {[
                "Reporter Name",
                "Reporter Role",
                "Incident Type",
                "Short Description",
                "Status",
                "Action",
              ].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncidents.map((r) => (
              <TableRow key={r.id} className="hover:bg-gray-100 border-b odd:bg-green-50 even:bg-gray-50">
                <TableCell>{r.reporter_name}</TableCell>
                <TableCell className="capitalize">{r.reporter_role}</TableCell>
                <TableCell>{r.incident_type.replace(/_/g, " ")}</TableCell>
                <TableCell>{r.incident_description.slice(0, 50)}...</TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      statusStyles[r.incident_status] || ""
                    }`}
                  >
                    {formatStatus(r.incident_status)}
                  </span>
                </TableCell>
                <TableCell className="relative overflow-visible">
                  <button
                    onClick={() =>
                      setActionsFor(actionsFor === r.id ? null : r.id)
                    }
                    className="p-2 rounded hover:bg-gray-100 overflow-visible"
                  >
                    <MoreHorizontal />
                  </button>

                  {actionsFor === r.id && (
                    <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg z-20 w-48 overflow-visible sticky-bottom-0">
                      <button
                        onClick={() => {
                          setSelected(r);
                          setActionsFor(null);
                        }}
                        className="flex items-center w-full px-4 py-2 hover:bg-gray-50"
                      >
                        <Eye className="mr-2" /> View Details
                      </button>
                      <div className="border-t my-1" />
                      {["new", "under_review", "resolved"].map((st) =>
                        r.incident_status !== st ? (
                          <button
                            key={st}
                            onClick={() => updateStatus(r.id, st)}
                            className={`flex w-full px-4 py-2 text-sm ${
                              st === "new"
                                ? "text-red-700 hover:bg-red-50"
                                : st === "under_review"
                                ? "text-yellow-700 hover:bg-yellow-50"
                                : "text-green-700 hover:bg-green-50"
                            }`}
                          >
                            Mark as {formatStatus(st)}
                          </button>
                        ) : null
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="h-30"></TableRow>
          </TableBody>
        </Table>
      </div>

      {selected && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg border-hidden">
          <div className="flex justify-between items-center bg-white shadow rounded px-4 py-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 place-self-start h-10 bg-green-500 rounded" />
              <h2 className="text-xl font-semibold capitalize">
                {selected.incident_type.replace(/_/g, " ")}
              </h2>
            </div>
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-4">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  statusStyles[selected.incident_status]
                }`}
              >
                {formatStatus(selected.incident_status)}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-1 bg-white shadow rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="text-gray-500" />
                <h3 className="text-lg font-medium">Incident Description</h3>
              </div>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-gray-700">{selected.incident_description}</p>
              </div>
            </div>

            <div className="grid-cols-2 bg-white shadow rounded p-4 space-y-6 flex">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="text-gray-500" />
                  <h3 className="text-lg font-medium">Reporter Information</h3>
                </div>
                <div className="bg-gray-50 rounded p-4 space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Name:</span>
                    <p className="font-medium">{selected.reporter_name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Role:</span>
                    <p className="font-medium capitalize">
                      {selected.reporter_role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <h3 className="text-lg font-medium mb-2 p-1">Photo</h3>
                <div className="bg-gray-100 rounded w-32 h-32 overflow-hidden aspect-square flex items-center justify-center">
                  {selected.incident_image_url ? (
                    <img
                      src={selected.incident_image_url}
                      alt="Incident"
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      {/* placeholder icon */}
                      <svg
                        className="w-16 h-16 mx-auto mb-2"
                        fill="currentColor" /*...*/
                      />
                      <p className="text-sm">No photo available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}