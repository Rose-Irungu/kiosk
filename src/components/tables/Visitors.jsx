import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ChevronDown, Upload } from "lucide-react";

const visitors = [
  {
    name: "Haron Mureithi",
    phone: "0744678751",
    visitorType: "Recurring",
    hostUnit: "B-04",
    status: "Checked-In",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Jackson Munene",
    phone: "0709787856",
    visitorType: "Service",
    hostUnit: "B-01",
    status: "Checked-Out",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Derick Ochieng",
    phone: "0756755634",
    visitorType: "One-time",
    hostUnit: "C-04",
    status: "Checked-In",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Mary Adhiambo",
    phone: "0718674563",
    visitorType: "Recurring",
    hostUnit: "B-10",
    status: "Checked-In",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Lucy Wanja",
    phone: "0108978651",
    visitorType: "Recurring",
    hostUnit: "A-20",
    status: "Checked-Out",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export default function Visitors() {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-white  rounded-xl shadow-sm mt-5">
        {/* Header */}
        <div className="flex justify-between items-center p-6 mb-4 border-b border-[rgba(0,0,0,0.3)]">
          <h2 className="text-2xl font-semibold">Visitor Logs</h2>
          <button className="flex items-center justify-center h-12 w-[117px] px-4 pr-6 gap-2 bg-[#005E0E] text-white rounded-lg hover:bg-[#123107] transition">
            <Upload />
            Export
          </button>

        </div>

        {/* Controls */}
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <div className="relative">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white min-w-16 appearance-none pr-8">
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
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white min-w-24 appearance-none pr-8" >
              <option value="all">All</option>
              <option value="recurring">Recurring</option>
              <option value="service">Service</option>
              <option value="onetime">One-time</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>


        <div className="p-4 ">
          {/* Table */}
          <Table >
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
                <TableRow
                  key={index}
                  className={
                    (visitor.name === "Haron Mureithi" &&
                      visitor.phone === "0744678751") ||
                      (visitor.name === "Derick Ochieng" &&
                        visitor.phone === "0756755634") ||
                      (visitor.name === "Lucy Wanja" &&
                        visitor.phone === "0108978651")
                      ? "bg-[#f2f7f3]"
                      : ""
                  }
                >
                  <TableCell>
                    <img
                      src={visitor.photo}
                      alt={visitor.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{visitor.name}</TableCell>
                  <TableCell>{visitor.phone}</TableCell>
                  <TableCell>{visitor.visitorType}</TableCell>
                  <TableCell>{visitor.hostUnit}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${visitor.status === "Checked-In"
                        ? "bg-[#c2f0c9]"
                        : visitor.status === "Checked-Out"
                          ? "bg-[#e0dbf4]"
                          : "text-green-700"
                        }`}
                    >
                      {visitor.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div >




      {/* Pagination Section */}
      {/* Pagination Section */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full px-4 h-auto sm:h-12 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="h-12 flex items-center justify-center px-6 py-2 border border-[#005E0E] rounded-lg bg-white text-[#005E0E] hover:bg-[#f4fdf5] transition">
            Previous
          </button>
          <button className="w-14 h-12 flex items-center justify-center bg-[#005E0E] text-white rounded-lg hover:bg-[#004a0b] transition">
            1
          </button>
          <button className="w-14 h-12 flex items-center justify-center bg-[#005E0E] text-white rounded-lg hover:bg-[#004a0b] transition">
            2
          </button>
          <button className="h-12 flex items-center justify-center px-6 py-2 border border-[#005E0E] rounded-lg bg-white text-[#005E0E] hover:bg-[#f4fdf5] transition">
            Next
          </button>
        </div>

        {/* Text Content */}
        <div className="text-sm text-gray-600 mt-4 sm:mt-0">Showing 1 to 5 out of 20 entries</div>
      </div>

    </>
  );
}
