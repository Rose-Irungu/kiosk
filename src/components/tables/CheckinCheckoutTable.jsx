"use client";

import React, { useState, useEffect } from "react";
// import { getAllVisitors } from "../../services/visitorservice";
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
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [visitorTypeFilter, setVisitorTypeFilter] = useState("all");
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    fetchVisitors();
  }, [currentPage, entriesPerPage, visitorTypeFilter]);

  const fetchVisitors = async () => {
  setLoading(true);
  try {
    const data = await getVisitLogs(); 
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

  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm mt-5">
        <div className="flex justify-between items-center p-6 mb-4">

          <h2 className="text-2xl font-semibold">Check-in/Check-out Logs</h2>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 h-12 px-4 pr-6 bg-[#005E0E] text-white rounded-lg hover:bg-[#123107] transition"
          >
            <Upload />
            Export
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <div className="relative">
              <select
                className="border rounded-md px-3 py-2 text-sm appearance-none pr-8"
                value={entriesPerPage}
                onChange={handleEntriesChange}
              >
                {[5, 10, 25, 50].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="relative">
            <select
              className="border rounded-md px-3 py-2 text-sm appearance-none pr-8"
              value={visitorTypeFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="recurring">Recurring</option>
              <option value="service">Service</option>
              <option value="one-time">One-time</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Visitor Table */}
        <div className="p-4">
          <Table className="w-full border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="bg-[#F5F6FA] text-[#3A3F51] rounded-lg">
                <TableHead className="text-sm font-semibold px-4 py-3">Visitor Name</TableHead>
                <TableHead className="text-sm font-semibold px-4 py-3">Phone No.</TableHead>
                <TableHead className="text-sm font-semibold px-4 py-3">Visit Unit</TableHead>
                <TableHead className="text-sm font-semibold px-4 py-3">Check-In Time</TableHead>
                <TableHead className="text-sm font-semibold px-4 py-3">Check-Out Time</TableHead>
                <TableHead className="text-sm font-semibold px-4 py-3 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : visitors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    No visitors found.
                  </TableCell>
                </TableRow>
              ) : (
                visitors.map((visitor, index) => (
                  <TableRow
                    key={index}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200"
                  >
                    <TableCell className="px-4 py-4 font-medium text-[#171B1E]">
                      {visitor.visitor_name}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[#464F60]">
                      {visitor.phone_number}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[#464F60]">
                      {visitor.host_unit || "N/A"}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[#464F60]">
                      {visitor.check_in_time || "--"}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[#464F60]">
                      {visitor.check_out_time || "--"}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div
                        className={`mx-auto w-fit px-2 py-1 rounded text-xs font-semibold ${
                          visitor.status === "checked_in"
                            ? "bg-[rgba(1,210,30,0.2)] text-[#017B25]"
                            : visitor.status === "checked_out"
                            ? "bg-[#E0DBF4] text-[#4B3BAE]"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {visitor.status === "checked_in"
                          ? "Checked-In"
                          : visitor.status === "checked_out"
                          ? "Checked-Out"
                          : visitor.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full px-4 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="h-12 px-6 border border-[#005E0E] rounded-lg text-[#005E0E] hover:bg-[#f4fdf5] transition disabled:opacity-50"
          >
            Previous
          </button>
          <button className="w-14 h-12 bg-[#005E0E] text-white rounded-lg hover:bg-[#004a0b] transition">
            {currentPage}
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="h-12 px-6 border border-[#005E0E] rounded-lg text-[#005E0E] hover:bg-[#f4fdf5] transition disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-600 mt-4 sm:mt-0">
          Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
          {Math.min(currentPage * entriesPerPage, totalEntries)} of{" "}
          {totalEntries} entries
        </div>
      </div>
    </>
  );
}