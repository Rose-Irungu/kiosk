import React from "react";

const ViewCard1 = ({ visitor }) => {
  return (
    <div className="bg-white rounded-lg border-l-[5px] border-primary p-4 shadow-sm flex items-center gap-4">
      <img
        src={visitor?.photo || "/ellipse-210.png"}
        alt="Profile"
        className="w-[100px] h-[100px] rounded-full object-cover"
      />
      <div className="flex flex-col gap-5 w-48">
        <h3 className="text-lg font-medium text-muted-foreground">{visitor?.name || "John Smith"}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Visitor Type</span>
          <div className="bg-primary/10 text-muted-foreground text-xs uppercase px-3 py-1 rounded-md">
            {visitor?.type || "New"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard1;
