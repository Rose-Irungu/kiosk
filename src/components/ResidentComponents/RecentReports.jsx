import Card8 from "../RecentReportsCard"
import { Files } from 'lucide-react';
export default function RecentReports(){
    return(
        <div>
        <div className="flex items-center text-green-900 text-left font-bold bg-zinc-100"> 
                
                <Files/>
                Recent Reports</div>
        <div>
            
            <ul>
                <li><Card8/></li>
            </ul>
            
        </div>
        </div>
        
    )
};