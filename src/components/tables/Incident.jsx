import React from "react"
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
import { ChevronDown } from "lucide-react";

const incidentReports = [
  {
    reporterName: "George Weru",
    reporterRole: "Officer",
    incidentType: "Maintenance",
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "New",
  },
  {
    reporterName: "Haron Kariuki",
    reporterRole: "Resident",
    incidentType: "Noise and Disturbance",
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "Under Review",
  },
  {
    reporterName: "Lewis Oduor",
    reporterRole: "Officer",
    incidentType: "Maintenance",
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "Resolved",
  },
]

const statusStyles = {
  "New": "bg-red-100 text-red-700",
  "Under Review": "bg-yellow-100 text-yellow-700",
  "Resolved": "bg-green-100 text-green-700",
}

export default function IncidentTable() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
      {/* Header */}
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

      {/* Table */}
      <Table>
        <TableCaption className="sr-only">
          A list of incident reports.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-muted-foreground">
              Reporter Name
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Reporter Role
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Incident Type
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Short Description
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="font-medium text-muted-foreground">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidentReports.map((report, index) => (
            <TableRow
              key={index}
              className={
                (report.reporterName === "George Weru" &&
                  report.status === "New") ||
                (report.reporterName === "Lewis Oduor" &&
                  report.status === "Resolved")
                  ? "bg-[#f2f7f3]"
                  : ""
              }
            >
              <TableCell className="font-medium">
                {report.reporterName}
              </TableCell>
              <TableCell>{report.reporterRole}</TableCell>
              <TableCell>{report.incidentType}</TableCell>
              <TableCell>{report.shortDescription}</TableCell>
              <TableCell>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[report.status]}`}
                >
                  {report.status}
                </span>
              </TableCell>
              <TableCell>
                <MoreHorizontal className="cursor-pointer text-muted-foreground" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

