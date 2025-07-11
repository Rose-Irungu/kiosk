import Navigation from '../../components/Navigation.jsx';
import Layout from '../../components/layout/Layout.jsx'
import Visitors from '../../components/tables/Visitors.jsx';
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

const visitors = [
  {
    name: "Haron Mureithi",
    phone: "0744678751",
    visitorType: "Recurring",
    hostUnit: "B-04",
    status: "Checked-In",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Jackson Munene",
    phone: "0709787856",
    visitorType: "Service",
    hostUnit: "B-01",
    status: "Checked-Out",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Derick Ochieng",
    phone: "0756755634",
    visitorType: "One-time",
    hostUnit: "C-04",
    status: "Checked-In",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Mary Adhiambo",
    phone: "0718674563",
    visitorType: "Recurring",
    hostUnit: "B-10",
    status: "Checked-In",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Lucy Wanja",
    phone: "0108978651",
    visitorType: "Recurring",
    hostUnit: "A-20",
    status: "Checked-Out",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];


export default function VisitorLog() {
  return (
    <Layout>
      <Visitors />
    </Layout>
  );
}