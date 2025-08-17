import React, { useState, useRef, useEffect } from "react";
import { getAllVisitors } from "../../services/visitorservice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, ChevronDown, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [allVisitors, setAllVisitors] = useState([]);
  const [filteredAllVisitors, setFilteredAllVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [visitorTypeFilter, setVisitorTypeFilter] = useState("all");
  const [totalEntries, setTotalEntries] = useState(0);

  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const menuRef = useRef(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const navigate = useNavigate();
  // View visitor
  const handleView = (visitor) => {
    navigate(`/viewvisitor`, {
      state: { visitorData: visitor }
    });
  };

  // Edit Visitor
  const handleEdit = (visitor) => {
    navigate("/editvisitor", {
      state: { visitorData: visitor }
    });
  };

  // Close menu if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchVisitors();
  }, [currentPage, entriesPerPage, visitorTypeFilter]);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await getAllVisitors();
      if (res.result_code === 0) {
        let allData = res.data;
        setAllVisitors(allData); // Store all visitors

        if (visitorTypeFilter !== "all") {
          allData = allData.filter((v) => v.visitor_type === visitorTypeFilter);
        }

        setFilteredAllVisitors(allData);
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
      console.error("Error fetching visitors:", error);
      setVisitors([]);
      setFilteredAllVisitors([]);
      setTotalEntries(0);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Phone", "Visitor Type", "Host/Unit", "Status"];
    const rows = filteredAllVisitors.map((v) => [
      v.visitor_name,
      v.phone_number,
      v.visitor_type,
      v.host_unit || "N/A",
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

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      const filtered = allVisitors.filter((visitor) =>
        Object.values(visitor)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );

      setFilteredAllVisitors(filtered);
      setTotalEntries(filtered.length);
      setCurrentPage(1); // Reset to first page when searching

      // Apply pagination to the filtered results
      const start = 0; // Since we reset to page 1
      const end = start + entriesPerPage;
      const paginated = filtered.slice(start, end);

      setVisitors(paginated);
    } else {
      // If search query is empty, revert to the original filtered data
      fetchVisitors();
    }
  }, [searchQuery]);

  const [activeTab, setActiveTab] = useState("visitor");

  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm mt-5 ">
        <div className="flex flex-row justify-between items-center px-6 py-4  mb-4 border-b border-[rgba(0,0,0,0.3)]">
          <div>
            <h2 className="text-xl font-bold font-['DM Sans']">Visitor Logs</h2>
          </div>


          <div className="flex flex-row items-center justify-end gap-[24px] font-['Inter']">
            <div className="flex items-center justify-center w-[128px] h-[40px] bg-[#005E0E] rounded-lg hover:bg-green-500">
              <button className="flex items-center text-white text-sm font-medium">
                Visitor Logs

              </button>


            </div>

            <div className="flex items-center justify-center w-[128px] h-[40px] bg-[#FFFFF rounded-lg border border-[#005E0E] hover:bg-gray-500">
              <button className="flex items-center text-[#005E0E] text-sm  font-medium">
                Security Logs

              </button>


            </div>



          </div>
          {/* <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 h-12 px-4 pr-6 bg-[#005E0E] text-white rounded-lg hover:bg-[#123107] transition"
          >
            <Upload />
            Export
          </button> */}
        </div>

        <div className="flex flex-row flex-wrap justify-between gap-4 px-6 pb-3 w-full font-['Inter'] ">
          <div className="flex flex-row justify-start items-center gap-[24px]">
            <div className="flex items-center gap-2">
              <span className="text-base text-gray-600">Show</span>
              <div className="relative">
                <select
                  className="border border-[#6C757D] rounded-md px-4 py-2 text-base bg-white w-[88px]  appearance-none pr-8 h-[48px]"
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
              <span className="text-base text-gray-600">entries</span>
            </div>

            {/* serach */}
            <div className="flex items-center w-full max-w-[200px] h-[40px] sm:w-[233px] px-4 py-[3px] gap-2.5 bg-white border border-[rgba(108,117,125,0.3)] rounded-md">
              <img src="/new-search.svg" alt="" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1  focus:outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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



            {/* <div className="relative">
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
            </div> */}


          </div>

        </div>

        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter']">Photo</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter']">
                  <div className="flex items-center gap-4 cursor-pointer ">
                    Name
                    <ArrowUpDown className="w-4 h-4 inline" />
                  </div>
                </TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter']">Phone</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter']">Visitor Type</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter']">Host/Unit</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter']" >Status</TableHead>
                <TableHead className="text-[#495057] text-[16px]  font-bold font-['Inter']">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow >
                  <TableCell colSpan={7}>
                    <div className="text-center text-gray-500 py-10">Loading...</div>
                  </TableCell>
                </TableRow>
              ) : visitors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="text-center text-gray-500 py-10">No visitors found.</div>
                  </TableCell>
                </TableRow>
              ) : (
                visitors.map((visitor, index) => (
                  <TableRow key={index} className="even:bg-[#E0DBF4]/5 odd:bg-[#005E0E]/5 font-['Inter'] text-base text-[#495057] ">
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
                    <TableCell >{visitor.visitor_name}</TableCell>
                    <TableCell>{visitor.phone_number}</TableCell>
                    <TableCell>{visitor.visitor_type}</TableCell>
                    <TableCell>{visitor.host_unit || "N/A"}</TableCell>
                    <TableCell>
                      <div
                        className={`flex items-center justify-center  gap-2 w-[90px] h-[20px] rounded text-xs  font-['Inter'] ${visitor.status === "checked_in"
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

                    <TableCell ><img
                      src="/three-dots.svg"
                      alt="menu"
                      className="cursor-pointer"
                      onClick={() => {
                        setMenuOpenIndex(index);
                        setSelectedVisitor(visitor);
                      }}
                    />
                      {/* Dropdown menu */}
                      {menuOpenIndex === index && selectedVisitor && (
                        <div
                          ref={menuRef}
                          className="absolute right-6 mt-2 w-[94px] bg-white shadow-[0px_1px_20px_0px_rgba(0_,_0,_0,_0.1)] border rounded-sm z-50"
                          style={{
                            position: 'fixed',
                            top: `${event.clientY}px`,
                            left: `${event.clientX - 80}px`
                          }}
                        >
                          <ul className="flex flex-col text-sm text-gray-700 text-center font-['Inter']">
                            <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => handleView(selectedVisitor)}>
                              View
                            </li>
                            <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => handleEdit(selectedVisitor)}>
                              Edit
                            </li>

                            <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => handleCheckIn(selectedVisitor)}>
                              Check In
                            </li>
                            <li className="px-4 py-2 hover:bg-green-100 cursor-pointer" onClick={() => handleCheckOut(selectedVisitor)}>
                              Check Out
                            </li>
                            <li className="px-4 py-2 hover:bg-green-100 cursor-pointer text-red-500" onClick={() => handleDelete(selectedVisitor)}>
                              Delete
                            </li>
                          </ul>
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
