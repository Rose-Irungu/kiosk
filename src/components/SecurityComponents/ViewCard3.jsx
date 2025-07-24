import React from "react";
import { ClipboardList } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ViewCard3({ visitor }) {
  return (
    <Card className="rounded-xl shadow-md p-4 flex flex-col gap-4 w-full max-w-md h-full">
      {/* Header */}
      <CardHeader className="flex flex-row items-center gap-2 p-0">
        <ClipboardList className="w-5 h-5 text-muted-foreground" />
        <CardTitle className="text-[16px] font-medium text-muted-foreground">
          Visit Details
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-4 px-0">
        {/* Visit Unit */}
        <div className="flex justify-between items-center border-b border-primary/10 h-10">
          <p className="text-sm text-muted-foreground">Visit Unit</p>
          <p className="text-sm text-muted-foreground">{visitor.unit || "B-09"}</p>
        </div>

        {/* Visit Date */}
        <div className="flex justify-between items-center border-b border-primary/10 h-10">
          <p className="text-sm text-muted-foreground">Visit Date</p>
          <p className="text-sm text-muted-foreground">{visitor.visit_date || "July 19, 2025"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
