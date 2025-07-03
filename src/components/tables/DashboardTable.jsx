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

const invoices = [
  {
    unit: "B-03",
    resident: "Joyce Kimani",
    visit: "37",
    lastvisit: "Today 10:22 AM",
    lastvisitor: "John Doe",
  },
  {
    unit: "C-07",
    resident: "Ali Mwangi",
    visit: "35",
    lastvisit: "Yesterday 4:10 PM",
    lastvisitor: "Esther W.",
  },
  {
    unit: "A-12",
    resident: "James Okello",
    visit: "30",
    lastvisit: "Today 9:40 AM",
    lastvisitor: "Mary Wanja",
  },
];

export function DashboardTable() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Most Visited Units</h2>
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
        <TableCaption className="sr-only">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-muted-foreground">
              Unit
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Resident
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Visit
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Last Visit
            </TableHead>
            <TableHead className=" font-medium text-muted-foreground">
              Last Visitor
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.unit}
              className={
                (invoice.unit === "B-03" &&
                  invoice.resident === "Joyce Kimani") ||
                (invoice.unit === "A-12" && invoice.resident === "James Okello")
                  ? "bg-[#f2f7f3]"
                  : ""
              }
            >
              <TableCell className="font-medium">{invoice.unit}</TableCell>
              <TableCell>{invoice.resident}</TableCell>
              <TableCell>{invoice.visit}</TableCell>
              <TableCell>{invoice.lastvisit}</TableCell>
              <TableCell>
                {invoice.lastvisitor}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DashboardTable;
