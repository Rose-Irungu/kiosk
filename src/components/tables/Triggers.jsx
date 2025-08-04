import React, {useEffect, useState} from "react";
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
import { incidenceService } from "../../services/incident";
import { useLocation } from "react-router-dom";



export function EmergencyTable() {
  const { id, floor, unit } = useLocation().state || {};
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const data = await incidenceService.getAllResidents();
        const enrichedResidents = data.data.entries.map(resident => ({
          ...resident,
          is_present: false,
        }));
        setResidents(enrichedResidents);
      } catch (err) {
        console.error("Error fetching residents:", err);
      }
    };
    fetchResidents();
  }, []);


  const onSubmit = async () => {
    try {
      const payload = {
        emergency_id: id,
        roll_call_entries: residents.map(r => ({
          full_name: r.full_name,
          is_present: r.is_present.toString(),
        }))
      };

      await incidenceService.takeEmergencyRollCall(payload);
    } catch (error) {
      console.error("Error submitting roll call:", error);
    }
  };


  return (
    <Layout>
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
  
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          EMERGENCY:{" "}
          <span className="font-bold">Panic button triggered at Unit {unit} - {floor}</span>
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
            <TableHead className="text-gray-600">Phone</TableHead>
            <TableHead className="text-gray-600">Type</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
          <TableBody>
            {residents.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.unit_number}</TableCell>
                <TableCell>{entry.full_name}</TableCell>
                <TableCell>{entry.phone_number}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={entry.is_present}
                    onChange={(e) => {
                      const updatedResidents = [...residents];
                      updatedResidents[index].is_present = e.target.checked;
                      setResidents(updatedResidents);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

      </Table>
      {/* submitting the rollcall */}
      <div className="mt-6">
        <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
          Submit Rollcall
        </button>
        </div>
    </div>
    </Layout>
  );
}

export default EmergencyTable;
