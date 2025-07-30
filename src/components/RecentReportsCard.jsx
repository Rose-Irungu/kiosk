import React from "react"
import { TriangleAlert,MapPin,Calendar,Clock3 } from 'lucide-react';
export default function Card8(
  
) {
  return (
    
        <div className="   h-full rounded-xl bg-white p-6 shadow-md ">
            <div className="flex grid grid-cols-2 place-content-center pb-2 ">
               <div className=" text-green-900 flex">
                <TriangleAlert />
                Loud Music Complaint
                </div>
                <div className="w-40  items-center pl-6 place-self-end outline p-2 rounded-xl shadow-md border-2 border-green-900">View Details</div>
            </div>
            <div className="flex grid grid-cols-3 place-content-center pb-2">
                <div className="text-green-900 flex">
                     <MapPin/>
                     From Unit 301B
                </div>
                <div className="text-green-900 flex">
                    <Calendar/>
                    dd/mm/yyyy
                </div>
                <div className="text-green-900 flex place-self-end">
                 <Clock3/>
                 3:04pm
                </div>

            </div>
           
            <div className="  place-self-start bg-yellow-300 rounded-xl p-2 ">In Review</div>
      </div>
    
  );                                                 
}
