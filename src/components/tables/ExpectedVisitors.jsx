import React, { useState } from "react";
import { useExpectedVisitors } from "../../hooks/useExpectedVisitors";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, ChevronDown, MoreHorizontal } from "lucide-react";

export default function ExpectedVisitors() {
  const { expectedVisitors, loading } = useExpectedVisitors();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [visitorTypeFilter, setVisitorTypeFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();

  
  const filteredVisitors =
    visitorTypeFilter === "all"
      ? expectedVisitors
      : expectedVisitors.filter((v) => v.visitor_type === visitorTypeFilter);

  const totalEntries = filteredVisitors.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentVisitors = filteredVisitors.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const handleAction = (action, e, index) => {
    e.stopPropagation();
    const visitor = currentVisitors[index];
    console.log(`Action "${action}" on visitor:`, visitor);
    setOpenDropdown(null);

    if (action === "View" && visitor) {
      
      navigate("/view", { state: { visitor } });
    }
  };


  const handleExportCSV = () => {
    const headers = ["Name", "Phone", "Visitor Type", "Host/Unit", "Visit Date"];
    const rows = filteredVisitors.map((v) => [
      v.full_name || "N/A", 
      v.phone_number || "N/A",
      v.visitor_type || "N/A",
      v.unit_number || "N/A", 
      v.visit_date || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "expected_visitors.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-white  rounded-xl shadow-sm mt-5">
        <div className="flex justify-between items-center overflow-y-auto p-6 mb-4 border-b border-[rgba(0,0,0,0.3)]">
          <h2 className="text-2xl font-semibold">Expected Visitors</h2>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 h-12 px-4 pr-6 bg-[#005E0E] text-white rounded-lg hover:bg-[#123107] transition"
          >
            <Upload />
            Export
          </button>
        </div>

        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <div className="relative">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white min-w-16 appearance-none pr-8"
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
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
              onChange={(e) => {
                setVisitorTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All</option>
              <option value="visitor">Visitor</option>
              <option value="service">Service</option>
              <option value="recurring">Recurring</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visitor Name</TableHead>
                <TableHead>Phone No.</TableHead>
                <TableHead>Visit Unit</TableHead>
                <TableHead>Visitor Type</TableHead>
                <TableHead>Visit Date</TableHead>                
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="text-center text-gray-500 py-10">
                      Loading...
                    </div>
                  </TableCell>
                </TableRow>
              ) : currentVisitors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="text-center text-gray-500 py-10">
                      No visitors found.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
              currentVisitors.map((visitor, index) => (
                  <TableRow key={visitor.id || index}>
                    <TableCell className="font-medium">
                      {visitor.full_name || "N/A"}
                    </TableCell>
                    <TableCell>{visitor.phone_number || "N/A"}</TableCell>
                    <TableCell>{visitor.unit_number || "N/A"}</TableCell>
                    <TableCell>
                      <span className="capitalize">{visitor.visitor_type || "N/A"}</span>
                    </TableCell>
                    <TableCell>{visitor.visit_date || "N/A"}</TableCell>
                  
                    <TableCell className="relative dropdown-parent">
                      <MoreHorizontal
                        className="cursor-pointer text-muted-foreground"
                        onClick={() => toggleDropdown(index)}
                      />
                      {openDropdown === index && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow z-20">
                          <button
                            onClick={(e) => handleAction("View", e, index)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            View
                          </button>                        
                        
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full px-4 h-auto sm:h-12 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="h-12 flex items-center justify-center px-6 py-2 border border-[#005E0E] rounded-lg bg-white text-[#005E0E] hover:bg-[#f4fdf5] transition disabled:opacity-50"
          >
            Previous
          </button>
          <button className="w-14 h-12 flex items-center justify-center bg-[#005E0E] text-white rounded-lg hover:bg-[#004a0b] transition">
            {currentPage}
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-12 flex items-center justify-center px-6 py-2 border border-[#005E0E] rounded-lg bg-white text-[#005E0E] hover:bg-[#f4fdf5] transition disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-600 mt-4 sm:mt-0">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + entriesPerPage, totalEntries)} of{" "}
          {totalEntries} entries
        </div>
      </div>
    </>
  );
}