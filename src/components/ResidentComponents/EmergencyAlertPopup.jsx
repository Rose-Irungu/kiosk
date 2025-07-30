import { AlertTriangle, Shield } from "lucide-react";

export default function EmergencyAlertCard() {
  return (
    <div className="relative bg-red-50 rounded-3xl h-30 w-50 shadow-lg overflow-hidden">
   
      <div className="absolute left-1/2 top-16 transform -translate-x-1/2">
        <div className="relative  h-30 w-50">
          <img src="/alert.svg" alt="alert icon" className="object-cover"/>
        
        </div>
      </div>
      
   
      <div className="absolute left-1/2 top-48 transform -translate-x-1/2 w-60">
        <p className="text-red-500 text-center font-medium text-xl">
          Emergency Alert Sent
        </p>
      </div>
      
  
      <div className="absolute left-1/2 top-56 transform -translate-x-1/2 w-72">
        <p className="text-red-500 text-center font-medium text-sm">
          Security guards are on the way
        </p>
      </div>
    </div>
  );
}