import React from "react";
import { useLocation } from "react-router-dom";
import SecurityLayout from "../../components/SecurityComponents/SecurityLayout";
import ViewCard1 from "../../components/SecurityComponents/ViewCard1";
import ViewCard2 from "../../components/SecurityComponents/ViewCard2";
import ViewCard3 from "../../components/SecurityComponents/ViewCard3";

export default function View() {
  const location = useLocation();
  const visitor = location.state?.visitor;

  if (!visitor) {
    return (
      <SecurityLayout>
        <div className="p-6 text-red-500">No visitor selected.</div>
      </SecurityLayout>
    );
  }

  return (
    <SecurityLayout>
      <div className="p-6 space-y-6">
        
        <ViewCard1 visitor={visitor} />
        
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="w-full md:w-1/2">
            <ViewCard2 visitor={visitor} />
          </div>
          <div className="w-full md:w-1/2">
            <ViewCard3 visitor={visitor} />
          </div>
        </div>
      </div>
    </SecurityLayout>
  );
}
