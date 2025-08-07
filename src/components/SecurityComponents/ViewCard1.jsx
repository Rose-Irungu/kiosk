import React from "react";

const ViewCard1 = ({ visitor }) => {
  return (
    <div className="bg-white rounded-lg border-l-[5px] border-primary p-4 shadow-sm flex items-center gap-4">
      <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-semibold">
        N/A
      </div>
      <div className="flex flex-col gap-5 w-48">
        <h3 className="text-lg font-medium text-muted-foreground">{visitor?.full_name || "No Name"}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Visitor Type</span>
          <div className="bg-primary/10 text-muted-foreground text-xs uppercase px-3 py-1 rounded-md">
            {visitor?.visitor_type || "Unknown"}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Unit: {visitor?.unit_number || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default ViewCard1;
