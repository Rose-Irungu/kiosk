import React, { useState } from "react";
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

import useMostVisitedUnits from "../../hooks/useMostVisitedUnits";

export function DashboardTable() {
  const [filter, setFilter] = useState("today");
 const { units, loading, error } = useMostVisitedUnits(filter);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Most Visited Units</h2>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <Table>
          <TableCaption className="sr-only">
            A list of the most visited units.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium text-muted-foreground">Unit</TableHead>
              <TableHead className="font-medium text-muted-foreground">Resident</TableHead>
              <TableHead className="font-medium text-muted-foreground">Visit</TableHead>
              <TableHead className="font-medium text-muted-foreground">Last Visit</TableHead>
              <TableHead className="font-medium text-muted-foreground">Last Visitor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow
                key={unit.unit}
                className={
                  (unit.unit === "B-03" && unit.resident === "Joyce Kimani") ||
                  (unit.unit === "A-12" && unit.resident === "James Okello")
                    ? "bg-[#f2f7f3]"
                    : ""
                }
              >
                <TableCell className="font-medium">{unit.unit_number}</TableCell>
                <TableCell>{unit.resident_name}</TableCell>
                <TableCell>{unit.visit_count}</TableCell>
                <TableCell>{new Date(unit.last_visit_date).toLocaleString()}</TableCell>
                <TableCell>{unit.last_visitor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default DashboardTable;
