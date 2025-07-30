import React from "react"
import Card7 from "../ReportCard";
import Card8 from "../PastReportCard";
import { MessageSquareWarning } from "lucide-react";

export default function ReportManagementCard (){
    return(
         <div>
            
            <div className="flex items-center text-green-900 text-left font-bold"> 
                <MessageSquareWarning/>
                
                REPORT MANAGEMENT</div>
            <div className="flex grid grid-cols-2 place-content-center gap-10 bg-inherit">
                <button>
                    <Card7 />
                </button>
                <button>
                    <Card8 />
                </button>
            
            
            </div>
         </div>
        


    );
}