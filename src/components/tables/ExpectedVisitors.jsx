import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function VisitorsTable({ visitors = [], title = "Expected Visitors" }) {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>

        {/* Example: Export Button */}
        <button className="flex items-center gap-2 border px-3 py-1 rounded text-sm text-blue-600 hover:bg-blue-50">
          <img src="/icons/uil-export0.svg" alt="Export" className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Table */}
      <Table>
        <TableCaption className="sr-only">
          A list of expected visitors.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Visitor Name</TableHead>
            <TableHead>Phone No.</TableHead>
            <TableHead>Visit Unit</TableHead>
            <TableHead>Visitor Type</TableHead>
            <TableHead>Visit Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No visitors found.
              </TableCell>
            </TableRow>
          ) : (
            visitors.map((visitor, i) => (
              <TableRow
                key={`${visitor.name}-${i}`}
                className={i % 2 === 0 ? "bg-[#f9f9f9]" : ""}
              >
                <TableCell>{visitor.name}</TableCell>
                <TableCell>{visitor.phone}</TableCell>
                <TableCell>{visitor.unit}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${visitor.type === "New"
                        ? "bg-green-100 text-green-600"
                        : visitor.type === "Recurring"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                      }`}
                  >
                    {visitor.type}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(visitor.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <img
                      src="/icons/bi-three-dots-vertical0.svg"
                      alt="Menu"
                      className="w-4 h-4"
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default VisitorsTable;
