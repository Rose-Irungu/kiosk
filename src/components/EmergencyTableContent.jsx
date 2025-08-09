import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";
import { incidenceService } from "@/services/incident";

const EmergencyTableContent = () => {
    const { id, floor, unit } = useLocation().state || {};
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await incidenceService.getAllResidents();
                const enriched = response.data.entries.map((r) => ({
                    ...r,
                    is_present: false,
                }));
                setResidents(enriched);
            } catch (err) {
                console.error("Error fetching residents:", err);
            }
        };

        fetchResidents();
    }, []);

    const handleCheckboxChange = (index, checked) => {
        const updated = [...residents];
        updated[index].is_present = checked;
        setResidents(updated);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                emergency_id: id,
                roll_call_entries: residents.map((r) => ({
                    full_name: r.full_name,
                    is_present: r.is_present.toString(),
                })),
            };

            await incidenceService.takeEmergencyRollCall(payload);
        } catch (error) {
            console.error("Error submitting roll call:", error);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    EMERGENCY:{" "}
                    <span className="font-bold">
                        Panic button triggered at Unit {unit || "?"} - {floor || "?"}
                    </span>
                </h2>
                <div className="relative">
                    <select className="flex h-8 items-center rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600 pr-6 appearance-none">
                        <option>All</option>
                        <option>Floor 1</option>
                        <option>Floor 2</option>
                    </select>
                </div>
            </div>

            {/* Table */}
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
                                    onChange={(e) =>
                                        handleCheckboxChange(index, e.target.checked)
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Submit button (optional) */}
                <div className="mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Submit Rollcall
                    </button>
                </div>

        </div>
    );
};

export default EmergencyTableContent;
