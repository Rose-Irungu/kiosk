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
import { ChevronDown } from "lucide-react";
import Layout from "../layout/Layout";

const emergencyData = [
  { unit: "B-10", resident: "Simon Njau" },
  { unit: "B-10", resident: "Simon Njau" },
  { unit: "B-10", resident: "Simon Njau" },
  { unit: "B-10", resident: "Simon Njau" },
  { unit: "B-10", resident: "Simon Njau" },
];

export function EmergencyTable() {
  return (
    <Layout>
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
  
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          EMERGENCY:{" "}
          <span className="font-bold">Panic button triggered at Unit 7 - Floor 2</span>
        </h2>
        <div className="relative">
          <select className="flex h-8 items-center rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600 pr-6 appearance-none">
            <option>All</option>
            <option>Floor 1</option>
            <option>Floor 2</option>
          </select>
        </div>
      </div>

      
      <Table>
        <TableCaption className="sr-only">Emergency check-ins</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600">Unit</TableHead>
            <TableHead className="text-gray-600">Resident</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {emergencyData.map((entry, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-[#f2f7f3]" : ""}>
              <TableCell className="text-sm text-gray-700">{entry.unit}</TableCell>
              <TableCell className="text-sm text-gray-700">{entry.resident}</TableCell>
              <TableCell className="text-right pr-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-green-700 border-green-700 rounded focus:ring-green-500 focus:ring-2"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </Layout>
  );
}

export default EmergencyTable;
