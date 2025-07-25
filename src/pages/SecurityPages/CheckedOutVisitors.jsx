import Navigation from '../../components/Navigation.jsx';
import SecurityLayout from '../../components/SecurityComponents/SecurityLayout.jsx'
import CheckedOutVisitorsTable from '../../components/tables/CheckedOutVisitorsTable.jsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ChevronDown, Upload } from "lucide-react";



export default function VisitorLog() {
  return (
    <SecurityLayout>
      <CheckedOutVisitorsTable />
    </SecurityLayout>
  );
}