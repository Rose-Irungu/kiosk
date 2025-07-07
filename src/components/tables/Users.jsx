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
import { MoreHorizontal } from "lucide-react";
import { ChevronDown } from "lucide-react";

const users = [
  {
    name: "Derick Ochieng",
    phone: "0756755634",
    role: "Resident",
    unit: "C-04",
    status: "Active",
    photo: "/ellipse-160.png",
  },
  {
    name: "Haron Mureithi",
    phone: "0744678751",
    role: "Resident",
    unit: "B-04",
    status: "Active",
    photo: "/ellipse-161.png",
  },
  {
    name: "Jackson Munene",
    phone: "0709787856",
    role: "Security",
    unit: "--",
    status: "Frozen",
    photo: "/ellipse-162.png",
  },
  {
    name: "Lucy Wanja",
    phone: "0108978651",
    role: "Security",
    unit: "--",
    status: "Frozen",
    photo: "/ellipse-163.png",
  },
  {
    name: "Mary Adhiambo",
    phone: "0718674563",
    role: "Resident",
    unit: "B-10",
    status: "Active",
    photo: "/ellipse-164.png",
  },
];

export default function Users({ navigate }) {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 h-full">
      <div className="bg-white rounded-xl shadow-sm p-4 h-full flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#000]">Manage Users</h2>
          <Button
            className="bg-[#502deb] hover:bg-[#3a1fb4] text-white px-5 py-2 rounded-md"
            onClick={() => navigate("/userform")}
          >
            + Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Show
            <div className="relative">
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white pr-8 appearance-none">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            entries
          </div>

          <div className="relative text-sm text-gray-600">
            <select className="border border-gray-300 rounded-md px-3 py-2 bg-white pr-8 appearance-none">
              <option value="all">All</option>
              <option value="recurring">Recurring</option>
              <option value="service">Service</option>
              <option value="one-time">One-time</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 overflow-y-auto border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-[#f2f7f3]" : ""}
                >
                  <TableCell>
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.unit}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <MoreHorizontal className="cursor-pointer text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>Showing 1 to 5 out of 20 entries</div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1 rounded-md bg-[#e4d5fc] text-[#502deb]">
              Previous
            </button>
            <div className="px-3 py-1 rounded-md bg-[#502deb] text-white">1</div>
            <button className="px-4 py-1 rounded-md bg-[#e4d5fc] text-[#502deb]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
