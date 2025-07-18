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
import { MoreHorizontal } from "lucide-react";

const statusStyles = {
  new: "bg-red-100 text-red-700",
  "under_review": "bg-yellow-100 text-yellow-700", 
  resolved: "bg-green-100 text-green-700",
};

export default function IncidentTable({ incidentReports }) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Reported Incidents</h2>
        <div className="relative">
          <select className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>
      
      <Table>
        <TableCaption className="sr-only">A list of incident reports.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-muted-foreground">Reporter Name</TableHead>
            <TableHead className="font-medium text-muted-foreground">Reporter Role</TableHead>
            <TableHead className="font-medium text-muted-foreground">Incident Type</TableHead>
            <TableHead className="font-medium text-muted-foreground">Short Description</TableHead>
            <TableHead className="font-medium text-muted-foreground">Status</TableHead>
            <TableHead className="font-medium text-muted-foreground">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidentReports?.length > 0 ? (
            incidentReports.map((report) => (
              <TableRow
                key={report.id}
                className={
                  (report.reporter_name === "George Weru" && report.incident_status === "new") ||
                  (report.reporter_name === "Lewis Oduor" && report.incident_status === "resolved")
                    ? "bg-[#f2f7f3]"
                    : ""
                }
              >
                <TableCell className="font-medium">{report.reporter_name}</TableCell>
                <TableCell className="capitalize">{report.reporter_role}</TableCell>
                <TableCell className="capitalize">{report.incident_type?.replace(/_/g, ' ')}</TableCell>
                <TableCell>{report.incident_description}</TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                      statusStyles[report.incident_status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {report.incident_status?.replace(/_/g, ' ')}
                  </span>
                </TableCell>
                <TableCell>
                  <MoreHorizontal className="cursor-pointer text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No incident reports found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}