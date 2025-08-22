import React, { useState, useRef, useEffect } from "react";
import deleteVisitor, { getAllVisitors } from "../../services/visitorservice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, ChevronDown, ArrowUp, ArrowDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { kioskService } from '@/services/kiosk';
import toast from "react-hot-toast";

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
  const [deleteModal, setDeleteModal] = useState(null);
  const navigate = useNavigate();
  // sorting--------------------------------------------
  const [sortConfig, setSortConfig] = useState({
    key: 'visitor_name', // default sort by name
    direction: 'ascending', // default direction
  });
  const sortVisitors = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    const sortedVisitors = [...filteredAllVisitors].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFilteredAllVisitors(sortedVisitors);
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    setVisitors(sortedVisitors.slice(start, end));
  };

  // sorting--------------------------------------------
  // check in visitor--------------------------------------

  const handleCheckIn = async (visitor) => {
    const formData = {
      email: visitor.email,
    };
    console.log("here is the payload", visitor);

    const res = await kioskService.checkIn(formData);
    if (res.result_code === 0) {
      toast.success("Visitor checked in succesful");
      setVisitors(prevVisitors =>
        prevVisitors.map(v =>
          v.visit_id === visitor.visit_id ? { ...v, status: 'checked_in' } : v
        )
      );
    } else {
      toast.error(res.message);
    }
    setMenuOpenIndex(null);
  };
// check in visitor end --------------------------------------
  const handleCheckOut = async (visitor) => {
    const formData = {
      visit_id: visitor.visit_id,
    };
    const res = await kioskService.checkOut(formData);
    if (res.result_code === 0) {
      toast.success("Visitor checked out succesful");
      setVisitors(prevVisitors =>
        prevVisitors.map(v =>
          v.visit_id === visitor.visit_id ? { ...v, status: 'checked_out' } : v
        )
      );
    } else {
      toast.error(res.message);
    }
    setMenuOpenIndex(null);
  };
  
  // Delete Visitor --------------------------------------------------
  const handleDeleteVisitor = async () => {
    
      const res = await deleteVisitor(selectedVisitor.visitor_id);

      if (res.result_code === 0) {
        toast.success(res.message);

        setVisitors(prevVisitors => {
          const updated = prevVisitors.filter(v => v.visitor_id !== selectedVisitor.visitor_id);
          setTotalEntries(updated.length);
          return updated;
        });


        setDeleteModal(false);
        setSelectedVisitor(null); 
      } else {
        toast.error(res.message);
      }
  };

  // Delete Visitor end --------------------------------------------

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

  // Delete Visitor
  const handleDelete = (visitor) => {
    console.log("Visitor to be deleted", visitor);
    
    setSelectedVisitor(visitor);
    setDeleteModal(true);
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
      v.unit_number || "N/A",
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
        <div className="flex flex-row justify-between items-center px-6 py-4  mb-4 border-b border-[rgba(0,0,0,0.3)] ">
          <div>
            <h2 className="text-xl font-bold font-['DM Sans']">Visitor Logs</h2>
          </div>


          <div className="flex flex-row items-center justify-end gap-4 font-['Inter']">
            <div
              onClick={() => setActiveTab("visitor")}
              className={`flex items-center justify-center w-[128px] h-[40px] rounded-lg cursor-pointer ${activeTab === "visitor"
                ? "bg-[#005E0E] text-white"
                : "bg-white border border-[#005E0E] text-dark hover:bg-gray-200"
                }`}
            >
              <button className="flex items-center text-white text-sm font-medium">
                Visitor Logs

              </button>


            </div>

            <div
              onClick={() => setActiveTab("security")}
              className={`flex items-center justify-center w-[128px] h-[40px] rounded-lg cursor-pointer ${activeTab === "security"
                ? "bg-[#005E0E] text-[#FFFFF]"
                : "bg-white border border-[#005E0E] text-[#005E0E] hover:bg-gray-200"
                }`}
            >
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
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => sortVisitors('visitor_name')}
                  >
                    Name
                    {sortConfig.key === 'visitor_name' && (
                      sortConfig.direction === 'ascending' ?
                        <ArrowUp className="w-4 h-4 inline" /> :
                        <ArrowDown className="w-4 h-4 inline" />
                    )}
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
                    <TableCell>{visitor.unit_number || "N/A"}</TableCell>
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

                            <li
                              className={`px-4 py-2 ${selectedVisitor.status === 'checked_in'
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'hover:bg-green-100 cursor-pointer'
                                }`}
                              onClick={selectedVisitor.status !== 'checked_in' ? () => handleCheckIn(selectedVisitor) : undefined}
                            >
                              Check In
                            </li>
                            <li
                              className={`px-4 py-2 ${selectedVisitor.status !== 'checked_in'
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'hover:bg-green-100 cursor-pointer'
                                }`}
                              onClick={selectedVisitor.status === 'checked_in' ? () => handleCheckOut(selectedVisitor) : undefined}
                            >
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

      {deleteModal && selectedVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
          <div className="relative flex flex-col items-center p-4 gap-8 w-[289px] max-h-screen bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-[16px]">
            <button
              onClick={() => setDeleteModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition"
              aria-label="Close Edit Form"
            >
              <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
            </button>

            <img src="/delete-guy.svg" alt="" />

            <p className="font-['Inter'] text-xs text-[#000000] text-center ">Are you sure you want to delete ‘{selectedVisitor.visitor_name}’? This action is irreversible.</p>

            <div className="flex flex-col items-center gap-2 ">
              <div onClick={handleDeleteVisitor} className=" flex rounded-sm h-[40px] w-[257px] items-center bg-[#E61C11] justify-center font-['Inter'] font-light hover:bg-red-500">
                <button  className="flex items-center text-white text-sm tracking-[1%] ">DELETE USER</button>
              </div>

              <div onClick={() => setDeleteModal(false)} className="flex rounded-sm h-[40px] w-[257px] border border-[#0A5B60] justify-center font-['Inter'] hover:bg-green-500">
                <button className="flex items-center text-[#000000] ">CANCEL</button>
              </div>

            </div>
          </div>
        </div>
      )}

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
