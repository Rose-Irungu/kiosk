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

/**
 * @param {{
 *   visitorData: Array,
 *   isLoading?: boolean,
 *   title?: string,
 *   entriesPerPage?: number
 * }} props
 */
export default function LiveLogsTable({
  visitorData = [],
  isLoading = false,
  title = "Expected Visitors",
  entriesPerPage = 5,
  callback2,
  callback3,
  callback4
}) {
  const [currentPage/*, setCurrentPage*/] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const paginatedVisitors = visitorData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm mt-5">
      <div className="flex justify-between items-center p-6 mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-[#F5F6FA] text-[#3A3F51]">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  Loading visitors...
                </TableCell>
              </TableRow>
            ) : paginatedVisitors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  No visitors found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedVisitors.map((visitor, index) => (
                <TableRow
                  key={index}
                  className="bg-white rounded-lg hover:shadow-md transition duration-200"
                >
                  <TableCell className="px-4 py-4 font-medium text-[#171B1E]">
                    {visitor.full_name}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-[#464F60]">
                    {visitor.phone_number}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-[#464F60]">
                    {visitor.unit_number || "--"}
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
                        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-50">
                          <button
                            onClick={() => navigate("/view", { state: { visitor } })}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            View
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => callback2()}
                          >
                            Check In
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => callback3()}
                          >
                            Check Out
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => callback4()}
                          >
                            Report
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
