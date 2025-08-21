import React, { useState, useEffect } from "react";
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
import { Label } from "recharts";

//components
import ModalDash from "../extras/ModalDash";

//Services
import submitEmergencyFeedback from '../../services/emergencyFeedback';

export function EmergencyTable({
  events = [], 
  onStatusChange,
  isLoading = false,
  error = null,
  timeFilter = "Today",
  onTimeFilterChange,
  highlightConditions = [],
  
}) {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  
  //function to close the resolve modal
  const handleCancel = () => setActiveEvent(null);

  //function to submit feedback
    const submitFeedback = async (id, feedback) => {
      try {
        const result = await submitEmergencyFeedback(id, feedback);
        console.log("Feedback submitted successfully:", result);
      } catch (err) {
        console.error("Failed to submit feedback:", err);
      } finally {
        setActiveEvent(null); // or setShowModal(false) if you stick with boolean
      }
    };

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const handleAction = (action, event, index) => {
    console.log(`Action "${action}" selected for`, event);
    
    // Call the parent component's status change handler if provided
    if (onStatusChange) {
      onStatusChange(action, event, index);
    }
    
    setOpenDropdown(null);
  };

  // Check if a row should be highlighted based on conditions
  const shouldHighlightRow = (event) => {
    if (highlightConditions.length === 0) return false;
    
    return highlightConditions.some(condition => {
      return Object.keys(condition).every(key => {
        return event[key] === condition[key];
      });
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-parent")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Emergency Event History</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading emergency events...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Emergency Events</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Emergency Events</h2>
        <div className="relative">
          <select 
            className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={timeFilter}
            onChange={(e) => onTimeFilterChange && onTimeFilterChange(e.target.value)}
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableCaption className="sr-only">A list of emergency alerts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-muted-foreground">Location</TableHead>
            <TableHead className="font-medium text-muted-foreground">Triggered By</TableHead>
            <TableHead className="font-medium text-muted-foreground">Type</TableHead>
            <TableHead className="font-medium text-muted-foreground">Time</TableHead>
            <TableHead className="font-medium text-muted-foreground">Status</TableHead>
            { user?.role === "admin" && (
            <TableHead className="font-medium text-muted-foreground">Action</TableHead>
            ) }
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No emergency events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event, index) => (
              <TableRow
                key={event.id || index}
                className={shouldHighlightRow(event) ? "bg-[#f2f7f3]" : ""}
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
                {user?.role === "admin" && (
                <TableCell className="relative dropdown-parent">
                  <MoreHorizontal
                    className="cursor-pointer text-muted-foreground"
                    onClick={() => toggleDropdown(index)}
                  />

                  {openDropdown === index && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow z-20">
                      <button
                        onClick={() => setActiveEvent(event)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Resolve
                      </button>
                      {activeEvent && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                          <ModalDash 
                            id={activeEvent.id} 
                            callback1={handleCancel} 
                            callback2={()=>submitFeedback(activeEvent.id, )} 
                          />
                        </div>
                      )}                     
                      <button
                        onClick={() => handleAction("Unresolved", event, index)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Ongoing
                      </button>
                    </div>
                  )}
                </TableCell>
                 )}
              </TableRow>

            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmergencyTable;