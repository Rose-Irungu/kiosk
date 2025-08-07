import React from "react";
import { User } from "lucide-react";

const ViewCard2 = ({ visitor }) => {
  return (
    <div className="bg-white rounded-xl border border-transparent p-4 shadow-md flex flex-col gap-4 w-full max-w-md">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 text-muted-foreground">
          <User className="w-full h-full" />
        </div>
        <h2 className="text-base font-medium text-muted-foreground">Personal Information</h2>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between border-b border-green-900/10 h-10 items-center">
          <span className="text-sm text-muted-foreground">Full Name</span>
          <span className="text-sm text-muted-foreground">{visitor?.full_name || "No Name"}</span>
        </div>

        <div className="flex justify-between border-b border-green-900/10 h-10 items-center">
          <span className="text-sm text-muted-foreground">Phone Number</span>
          <span className="text-sm text-muted-foreground">{visitor?.phone_number || "N/A"}</span>
        </div>

        {/* Removed Car Number Plate section */}

        <div className="flex justify-between border-b border-green-900/10 h-10 items-center">
          <span className="text-sm text-muted-foreground">Visitor Type</span>
          <span className="text-sm text-muted-foreground">{visitor?.visitor_type || "Unknown"}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewCard2;
