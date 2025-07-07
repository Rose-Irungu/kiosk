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
import { ChevronDown, ArrowUpDown, Download } from "lucide-react";

const users = [
  {
    name: "Derick Ochieng",
    phone: "0756755634",
    role: "Resident",
    unit: "C-04",
    status: "Active",
    photo: "/avatars/avatar1.jpg",
  },
  {
    name: "Haron Mureithi",
    phone: "0744678751",
    role: "Resident",
    unit: "B-04",
    status: "Active",
    photo: "/avatars/avatar2.jpg",
  },
  {
    name: "Jackson Munene",
    phone: "0709787856",
    role: "Security",
    unit: "--",
    status: "Frozen",
    photo: "/avatars/avatar3.jpg",
  },
  {
    name: "Lucy Wanja",
    phone: "0108978651",
    role: "Security",
    unit: "--",
    status: "Frozen",
    photo: "/avatars/avatar4.jpg",
  },
  {
    name: "Mary Adhiambo",
    phone: "0718674563",
    role: "Resident",
    unit: "B-10",
    status: "Active",
    photo: "/avatars/avatar5.jpg",
  },
];

export default function Users() {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <Button className="bg-[#502deb] hover:bg-[#005e0e] text-white">
          + Add User
        </Button>
      </div>
      <div className="flex justify-between items-center mb-6">
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
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white min-w-20 appearance-none pr-8">
            <option value="all">All</option>
            <option value="checked-in">Recurring</option>
            <option value="checked-out">Service</option>
            <option value="checked-out">One-time</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
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
              className={
                (user.name === "Derick Ochieng" &&
                  user.phone === "0756755634") ||
                (user.name === "Jackson Munene" &&
                  user.phone === "0709787856") ||
                (user.name === "Mary Adhiambo" && user.phone === "0718674563")
                  ? "bg-[#f2f7f3]"
                  : ""
              }
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

      {/* Pagination Placeholder */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          Showing 1 to 5 of 5 entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            &lt;
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
