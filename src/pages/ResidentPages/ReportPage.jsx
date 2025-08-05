import ResidentLayout from "../../components/ResidentComponents/ResidentLayout";
import ReportManagementCard from "../../components/ResidentComponents/ReportManagement";
import RecentReports from "../../components/ResidentComponents/RecentReports";
export default function ReportIncidentPage(){
    return(
       <ResidentLayout>
        <div className="pb-4">
            <ReportManagementCard/>
        </div>
        <div className="pb-4">
            <RecentReports/>
        </div>
       </ResidentLayout> 
    )
};