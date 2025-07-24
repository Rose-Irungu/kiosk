"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LiveLogsTable() {
  const [visitors, setVisitors] = useState([]);
  const [filteredAllVisitors, setFilteredAllVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [visitorTypeFilter, setVisitorTypeFilter] = useState("all");
  const [totalEntries, setTotalEntries] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ⬅️ For routing

  useEffect(() => {
    fetchVisitors();
  }, [currentPage, entriesPerPage, visitorTypeFilter]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = {
        result_code: 0,
        data: [
          {
            visitor_name: "Haron Mureithi",
            phone_number: "0744678751",
            visitor_type: "recurring",
            host_unit: "B-04",
            status: "checked_in",
          },
          {
            visitor_name: "Haron Mureithi",
            phone_number: "0744678751",
            visitor_type: "recurring",
            host_unit: "B-04",
            status: "checked_in",
          },
          {
            visitor_name: "Lucy Wanja",
            phone_number: "0108978651",
            visitor_type: "new",
            host_unit: "A-20",
            status: "checked_out",
          },
          {
            visitor_name: "Lucy Wanja",
            phone_number: "0108978651",
            visitor_type: "service",
            host_unit: "A-20",
            status: "checked_out",
          },
          {
            visitor_name: "Lucy Wanja",
            phone_number: "0108978651",
            visitor_type: "new",
            host_unit: "A-20",
            status: "checked_out",
          },
        ],
      };

      if (res.result_code === 0) {
        let allData = res.data;

        if (visitorTypeFilter !== "all") {
          allData = allData.filter(
            (v) => v.visitor_type === visitorTypeFilter
          );
        }

        setFilteredAllVisitors(allData);
        setTotalEntries(allData.length);

        const start = (currentPage - 1) * entriesPerPage;
        const paginated = allData.slice(start + 0, start + entriesPerPage);
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

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm mt-5">
      <div className="flex justify-between items-center p-6 mb-4">
        <h2 className="text-2xl font-semibold">Expected Visitors Today</h2>
      </div>

      {/* Visitor Table */}
      <div className="p-4">
        <Table className="w-full border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow className="bg-[#F5F6FA] text-[#3A3F51] rounded-lg">
              <TableHead className="text-sm font-semibold px-4 py-3">
                Visitor Name
              </TableHead>
              <TableHead className="text-sm font-semibold px-4 py-3">
                Phone No.
              </TableHead>
              <TableHead className="text-sm font-semibold px-4 py-3">
                Visit Unit
              </TableHead>
              <TableHead className="text-sm font-semibold px-4 py-3">
                Visitor Type
              </TableHead>
              <TableHead className="text-sm font-semibold px-4 py-3 text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : visitors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
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
                    {visitor.visitor_type || "--"}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    <div
                      ref={dropdownRef}
                      className="relative inline-block text-left"
                    >
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="p-2 rounded hover:bg-gray-100"
                      >
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
                      </button>
                      {dropdownOpen === index && (
                        <div className="absolute right-0 z-10 mt-2 w-28 bg-white border rounded shadow-lg">
                      <button
                        onClick={() =>
                          navigate("/view", {
                            state: { visitor },
                          })
                        }
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        View
                      </button>

                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
