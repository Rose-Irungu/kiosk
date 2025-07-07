import React from "react";
import Header1 from "../../components/layout/Header1";
import ProfileMenu from "../../components/layout/ProfileMenu";
import Layout from "../../components/layout/Layout";
import Card1 from "../../components/Card1";
import Card2 from "../../components/Card2";
import Chart from "../../components/Chart";
import { Users, AlertTriangle, Shield, Activity } from "lucide-react";
import DashboardTable from "../../components/tables/DashboardTable";

const Dashboard = () => {
  return (
    <Layout>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card1
          label="Current Visitors"
          value="50"
          icon={<Users className="h-6 w-6 text-green-600" />}
          iconBg="bg-green-100"
          buttonText="View log"
        />
        <Card2
          label="Active Incidents"
          value="3"
          icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
          iconBg="bg-red-100"
          buttonText="View details"
        />
        <Card1
          label="Emergencies Today"
          value="2"
          icon={<Shield className="h-6 w-6 text-yellow-600" />}
          iconBg="bg-yellow-100"
          buttonText="View details"
        />
        <Card2
          label="Total Active Users"
          value="80"
          icon={<Activity className="h-6 w-6 text-blue-600" />}
          iconBg="bg-blue-100"
          buttonText="View users"
        />
      </div>

      {/* Panic Button Alert */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 p-2 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              PANIC BUTTON TRIGGERED AT UNIT 7 - FLOOR 2
            </h3>
            <p className="text-sm text-gray-600 mb-4">1 minute ago</p>
            <div className="flex gap-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Open Roll Call
              </button>
              <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Mark Resolved
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Triggered by:</span> John Doe
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Status:</span> Ongoing
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <Chart />
      </div>
      <div>
        <DashboardTable />
      </div>
    </Layout>
  );
};

export default Dashboard;
