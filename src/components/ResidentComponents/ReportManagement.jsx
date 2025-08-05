import React from "react"
// import Card7 from "../ReportCard";
import Card8 from "../PastReportCard";
import { MessageSquareWarning } from "lucide-react";

export default function ReportManagementCard (){
    return(
         <div>
            
            <div className="flex items-center text-green-900 text-left   font-bold"> 
                <MessageSquareWarning/>
                
                REPORT MANAGEMENT</div>
            <div className="flex grid grid-cols-2 place-content-center gap-10 bg-inherit">
                <button>
                    <div className="flex grid columns-2 place-content-center  h-full rounded-xl bg-green-900 p-6 shadow-md border-2 border-green-900">
        
                <div className="item-self-center"><a  className="text-white text-center font-bold">Report an </a></div>  
               <div><a  className="text-white text-center  font-bold">Incident</a></div> 
               </div>
                </button>
                <button>
                    <Card8 />
                </button>
            
            
            </div>
         </div>
        


    );
}