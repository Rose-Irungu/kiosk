import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllVisitors } from "../../services/visitorservice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, ChevronDown } from "lucide-react";

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);
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
      const res = await getAllVisitors();
      if (res.result_code === 0) {
        let allData = res.data;

        // Apply filter (if not 'all')
        if (visitorTypeFilter !== "all") {
          allData = allData.filter(
            (v) => v.visitor_type === visitorTypeFilter
          );
        }

        setTotalEntries(allData.length);

        // Slice data for current page
        const start = (currentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        const paginated = allData.slice(start, end);

        setVisitors(paginated);
      } else {
        setVisitors([]);
        setTotalEntries(0);
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
      setVisitors([]);
      setTotalEntries(0);
    } finally {
      setLoading(false);
    }
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
        {/* Header */}
        <div className="flex justify-between items-center p-6 mb-4 border-b border-[rgba(0,0,0,0.3)]">
          <h2 className="text-2xl font-semibold">Visitor Logs</h2>
          <button className="flex items-center gap-2 h-12 px-4 pr-6 bg-[#005E0E] text-white rounded-lg hover:bg-[#123107] transition">
            <Upload />
            Export
          </button>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <div className="relative">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white min-w-16 appearance-none pr-8"
                value={entriesPerPage}
                onChange={handleEntriesChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="relative">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white min-w-24 appearance-none pr-8"
              value={visitorTypeFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="Recurring">Recurring</option>
              <option value="Service">Service</option>
              <option value="One-time">One-time</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading...</div>
          ) : visitors.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No visitors found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Visitor Type</TableHead>
                  <TableHead>Host/Unit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.map((visitor, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {visitor.visitor_photo ? (
                        <img
                          src={visitor.visitor_photo}
                          alt={visitor.visitor_name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                          N/A
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{visitor.visitor_name}</TableCell>
                    <TableCell>{visitor.phone_number}</TableCell>
                    <TableCell>{visitor.visitor_type}</TableCell>
                    <TableCell>{visitor.host_unit || "N/A"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${visitor.status === "Checked-In"
                          ? "bg-[#c2f0c9]"
                          : visitor.status === "Checked-Out"
                            ? "bg-[#e0dbf4]"
                            : "bg-yellow-200 text-yellow-800"
                          }`}
                      >
                        {visitor.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          )}
        </div>


      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full px-4 h-auto sm:h-12 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="h-12 flex items-center justify-center px-6 py-2 border border-[#005E0E] rounded-lg bg-white text-[#005E0E] hover:bg-[#f4fdf5] transition disabled:opacity-50"
          >
            Previous
          </button>
          <button className="w-14 h-12 flex items-center justify-center bg-[#005E0E] text-white rounded-lg hover:bg-[#004a0b] transition">
            {currentPage}
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="h-12 flex items-center justify-center px-6 py-2 border border-[#005E0E] rounded-lg bg-white text-[#005E0E] hover:bg-[#f4fdf5] transition disabled:opacity-50"
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
