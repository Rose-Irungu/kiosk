import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const emergencyEvents = [
  {
    location: "Unit 7",
    visitor: "John Doe",
    type: "Panic",
    time: "Today, 10:22 AM",
    status: "Ongoing",
  },
  {
    location: "Unit 7",
    visitor: "John Doe",
    type: "SOS",
    time: "Today, 10:22 AM",
    status: "Resolved",
  },
  {
    location: "Unit 7",
    visitor: "John Doe",
    type: "Fire",
    time: "Today, 10:22 AM",
    status: "Resolved",
  },
  {
    location: "Unit 7",
    visitor: "John Doe",
    type: "SOS",
    time: "Today, 10:22 AM",
    status: "Resolved",
  },
  {
    location: "Unit 7",
    visitor: "Rose smith",
    type: "SOS",
    time: "Today, 10:22 AM",
    status: "Resolved",
  },
];

export function EmergencyTable() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Emergency Events</h2>
        <div className="relative">
          <select className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableCaption className="sr-only">A list of emergency alerts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-muted-foreground">Location</TableHead>
            <TableHead className="font-medium text-muted-foreground">Visitor</TableHead>
            <TableHead className="font-medium text-muted-foreground">Type</TableHead>
            <TableHead className="font-medium text-muted-foreground">Time</TableHead>
            <TableHead className="font-medium text-muted-foreground">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emergencyEvents.map((event, index) => (
            <TableRow
              key={index}
              className={
                (event.type === "Panic" && event.visitor === "John Doe") ||
                (event.visitor === "Rose smith" && event.type === "SOS") ||  
                (event.type === "Fire" && event.visitor === "John Doe")
                  ? "bg-[#f2f7f3]"
                  : ""
              }
            >
              <TableCell className="font-medium">{event.location}</TableCell>
              <TableCell>{event.visitor}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.time}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    event.status === "Ongoing"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {event.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmergencyTable;
