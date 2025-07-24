"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, ChevronDown } from "lucide-react";
import { getVisitLogs } from "@/services/checkincheckout"; 

export default function CheckinCheckoutTable() {
  const [visitors, setVisitors] = useState([]);
  const [filteredAllVisitors, setFilteredAllVisitors] = useState([]);
  const [visitorTypeFilter, setVisitorTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("am back")
    fetchVisitors();
  }, [visitorTypeFilter, currentPage]);

  const fetchVisitors = async () => {
  setLoading(true);
  try {
    const data = await getVisitLogs(); // Call your API here

    let allData = data;

    if (visitorTypeFilter !== "all") {
      allData = allData.filter(
        (v) => v.visitor_type.toLowerCase() === visitorTypeFilter.toLowerCase()
      );
    }

    setFilteredAllVisitors(allData);
    setTotalEntries(allData.length);

    const start = (currentPage - 1) * entriesPerPage;
    const paginated = allData.slice(start, start + entriesPerPage);
    setVisitors(paginated);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    setVisitors([]);
    setFilteredAllVisitors([]);
    setTotalEntries(0);
  } finally {
    setLoading(false);
  }
};

  const handleExportCSV = () => {
    const headers = [
      "Visitor Name",
      "Phone No",
      "Visit Unit",
      "Check-In Time",
      "Check-Out Time",
      "Status",
    ];
    const rows = filteredAllVisitors.map((v) => [
      v.visitor_name,
      v.phone_number,
      v.host_unit || "N/A",
      v.check_in_time || "--",
      v.check_out_time || "--",
      v.status,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "visitor_logs.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setVisitorTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleView = (visitor) => {
    navigate("/view", { state: { visitor } });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    const d = new Date(dateStr);
    return d.toLocaleString("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
      
        <div className="flex items-center gap-2">
          <select
            value={visitorTypeFilter}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded text-sm"
          >
            <option value="all">All</option>
            <option value="Returning">Returning</option>
            <option value="New">New</option>
          </select>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Export
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor Name</TableHead>
              <TableHead>Phone No.</TableHead>
              <TableHead>Visit Unit</TableHead>
              
              <TableHead>Check-In Time </TableHead>
              <TableHead>Check-Out Time</TableHead>
              <TableHead>Status</TableHead>
              
             
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10}>Loading...</TableCell>
              </TableRow>
            ) : visitors.length > 0 ? (
              visitors.map((visitor, index) => (
                <TableRow key={index}>
                  <TableCell>{visitor.visitor_name}</TableCell>
                  <TableCell>{visitor.phone_number}</TableCell>
                  <TableCell>{visitor.unit_number}</TableCell>
                 
                  
                  <TableCell>{formatDate(visitor.check_in_time)}</TableCell>
                  <TableCell>{formatDate(visitor.check_out_time)}</TableCell>
                   <TableCell>{formatDate(visitor.status)}</TableCell>
                 
                 
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>No visitors found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm py-2 px-4">Page {currentPage}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(totalEntries / entriesPerPage)
                ? prev + 1
                : prev
            )
          }
          disabled={currentPage >= Math.ceil(totalEntries / entriesPerPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
