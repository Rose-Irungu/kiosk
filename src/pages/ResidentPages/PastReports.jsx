import ResidentLayout from "../../components/ResidentComponents/ResidentLayout";

import PastReportsCard from "../../components/ResidentComponents/PastReports";
export default function PastReportsPage(){
    return(
       <ResidentLayout>
        <div className="pb-4">
            <PastReportsCard/>
        </div>
       
       </ResidentLayout> 
    )
};