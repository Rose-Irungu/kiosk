import React, { useState, useEffect } from "react";
import { getCheckedOut } from "@/services/checkedoutvisitors";
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
  const [filteredAllVisitors, setFilteredAllVisitors] = useState([]); // For export
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

      const res = await getCheckedOut();
      console.log(" Full API response:", res);
      if (res.result_code === 0) {
        let allData = res.data;

        if (visitorTypeFilter !== "all") {
          allData = allData.filter((v) => v.visitor_type === visitorTypeFilter);
        }

        setFilteredAllVisitors(allData); // Save all filtered data for export
        setTotalEntries(allData.length);

        const start = (currentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        const paginated = allData.slice(start, end);

        setVisitors(paginated);
      } else {
        setVisitors([]);
        setFilteredAllVisitors([]);
        setTotalEntries(0);
      }
    } catch (error) {
      
      setVisitors([]);
      setFilteredAllVisitors([]);
      setTotalEntries(0);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Phone", "Visitor Unit", "Check In Time", "Check Out Time", "Verified By", "Status"];
    const rows = filteredAllVisitors.map((v) => [
      v.visitor_name,
      v.phone_number,
      v.host_unit || "N/A",
      v.check_in_time || "--",
      v.check_out_time || "--",
      v.status,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
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
        <div className="flex justify-between items-start p-6 ">
          <h2 className="text-lg  font-bold font-['Inter']">Checked Out Visitors</h2>

        </div>

        <div className="flex flex-row flex-wrap justify-between gap-4 px-6 pb-3 w-full  ">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] text-gray-600">Show</span>
              <div className="relative">
                <select
                  className="border border-[#6C757D] rounded-md px-4 py-2 text-[16px] bg-white w-[88px]  appearance-none pr-8 h-[48px]"
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                {/* <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" /> */}
                <img src="dropdown-checked-out.svg" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-9 w-9 text-gray-400 pointer-events-none" alt="" />
              </div>
              <span className="text-[16px] text-gray-600">entries</span>
            </div>
          </div>

          <div className="flex flex-row gap-4 items center">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 h-[48px] px-4 pr-6 bg-[#005E0E] text-white rounded-lg hover:bg-[#123107] transition text-sm"
            >
              <Upload />
              Export
            </button>

            <div className="relative">
              <select
                className="border border-[#6C757D] rounded-md px-3 py-2 text-[16px] bg-white w-[91px] appearance-none pr-8 h-[48px]"
                value={visitorTypeFilter}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="recurring">Recurring</option>
                <option value="service">Service</option>
                <option value="one-time">One-time</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>


          </div>

        </div>

        <div className="flex justify-between items-center px-6">



        </div>

        <div className="p-4 ">
          <Table>
            <TableHeader >
              <TableRow >
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter'] ">Visitor Name</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter'] ">Phone No.</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter'] ">Visit Unit</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter'] ">Check-In Time</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter'] ">Check-Out Time</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter'] ">Verified By</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter'] ">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow >
                  <TableCell colSpan={6}>
                    <div className="text-center text-gray-500 py-10">Loading...</div>
                  </TableCell>
                </TableRow>
              ) : visitors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="text-center text-gray-500 py-10">No visitors found.</div>
                  </TableCell>
                </TableRow>
              ) : (
                visitors

                  // .filter(visitor => visitor.status === "checked_out")
                  .map((visitor, index) => (
                    <TableRow key={index} className="even:bg-[#E0DBF4]/5 odd:bg-[#005E0E]/5">
                      <TableCell className="text-[#495057] text-[13px]   font-['Inter'] p-4">{visitor.full_name}</TableCell>
                      <TableCell className="text-[#495057] text-[13px]   font-['Inter'] p-4">{visitor.phone_number}</TableCell>
                      <TableCell className="text-[#495057] text-[13px]  font-['Inter'] p-4">{visitor.unit_number}</TableCell>
                      <TableCell className="text-[#495057] text-[13px]   font-['Inter'] p-4">{visitor.check_in}</TableCell>
                      <TableCell className="text-[#495057] text-[13px]   font-['Inter'] p-4">{visitor.check_out}</TableCell>
                      <TableCell className="text-[#495057] text-[13px]   font-['Inter'] p-4">{visitor.verifier}</TableCell>
                      <TableCell className="text-[#495057] text-[13px]   font-['Inter'] p-4">


                        <div
                          className={`flex items-center justify-center px-1 py-0.5 gap-2 w-[90px] h-[20px] rounded text-xs  ${visitor.status === "checked_in"
                            ? "bg-[rgba(1,210,30,0.2)] text-green-800"
                            : visitor.status === "checked_out"
                              ? "bg-[#E0DBF4] text-purple-800"
                              : "bg-yellow-200 text-yellow-800"
                            }`}
                        >
                          {
                            visitor.status == "checked_in"
                              ? "Checked In"
                              : visitor.status == "checked_out"
                                ? "Checked Out"
                                : "Registered"
                          }
                        </div>


                      </TableCell>
                    </TableRow>
                  )))}

            </TableBody>
          </Table>
        </div>
      </div>

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
