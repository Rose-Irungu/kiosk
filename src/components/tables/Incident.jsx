import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const incidentReports = [
  {
    reporterName: "George Weru",
    reporterRole: "Officer",
    incidentType: "Maintenance",
    shortDescription: "Lorem ipsum...",
    status: "New Incident",
  },
  {
    reporterName: "Haron Kariuki",
    reporterRole: "Resident",
    incidentType: "Noise & Disturbances",
    shortDescription: "Lorem ipsum...",
    status: "Under Review",
  },
  {
    reporterName: "Lewis Oduor",
    reporterRole: "Officer",
    incidentType: "Maintenance",
    shortDescription: "Lorem ipsum...",
    status: "Resolved",
  },
]

const statusStyles = {
  "New Incident": "bg-red-100 text-red-700",
  "Under Review": "bg-yellow-100 text-yellow-700",
  "Resolved": "bg-green-100 text-green-700",
}

export default function IncidentTable() {
  return (
    <div className="bg-white shadow-sm rounded-xl p-6 w-full max-w-6xl mx-auto">
      {/* Top */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Reported Incidents</h2>
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
        <TableCaption className="sr-only">Incident Reports</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Reporter Name</TableHead>
            <TableHead>Reporter Role</TableHead>
            <TableHead>Incident Type</TableHead>
            <TableHead>Short Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidentReports.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.reporterName}</TableCell>
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
                <button className="text-xl">⋮</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
    //   {/* Header */}
    //   <div className="flex items-center justify-between mb-4">
    //     <h2 className="text-2xl font-semibold">Incident Reports</h2>
    //     <div className="relative">
    //       <select className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
    //         <option>Today</option>
    //         <option>This Week</option>
    //         <option>This Month</option>
    //         <option>This Year</option>
    //       </select>
    //     </div>
    //   </div>

    //   {/* Table */}
    //   <Table>
    //     <TableCaption className="sr-only">A list of incident reports.</TableCaption>
    //     <TableHeader>
    //       <TableRow>
    //         <TableHead className="font-medium text-muted-foreground">Reporter</TableHead>
    //         <TableHead className="font-medium text-muted-foreground">Role</TableHead>
    //         <TableHead className="font-medium text-muted-foreground">Type</TableHead>
    //         <TableHead className="font-medium text-muted-foreground">Description</TableHead>
    //         <TableHead className="font-medium text-muted-foreground">Status</TableHead>
    //       </TableRow>
    //     </TableHeader>
    //     <TableBody>
    //       {incidentReports.map((report, index) => (
    //         <TableRow
    //           key={index}
    //           className={
    //             (report.reporterName === "George Weru" &&
    //               report.status === "New")    ||   
    //             (report.reporterName === "Lewis Oduor" &&
    //               report.status === "Resolved")           
               
    //               ? "bg-[#f2f7f3]"
    //               : ""
    //           }
    //         >
    //           <TableCell className="font-medium">{report.reporterName}</TableCell>
    //           <TableCell>{report.reporterRole}</TableCell>
    //           <TableCell>{report.incidentType}</TableCell>
    //           <TableCell>{report.shortDescription}</TableCell>
    //           <TableCell>
    //             <span
    //               className={`px-3 py-1 text-xs font-medium rounded-full ${
    //                 report.status === "New"
    //                   ? "bg-[#f3cfd6] text-pink-400"
    //                   : report.status === "Under Review"
    //                   ? "bg-[#fef8cd]"
    //                   : "bg-green-100 text-green-700"
    //               }`}
    //             >
    //               {report.status}
    //             </span>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </div>