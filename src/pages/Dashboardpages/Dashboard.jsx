import React from "react";
import Layout from "../../components/layout/Layout";
import Navigation from "../../components/Navigation";
import Card1 from "../../components/Card1";
import Card2 from "../../components/Card2";
import Card3 from "../../components/Card3";
import Chart from "../../components/Chart";
import {
  Users,
  AlertTriangle,
  Shield,
  Activity,
  UserCheck,
  AlarmClock,
} from "lucide-react";
import DashboardTable from "../../components/tables/DashboardTable";

const Dashboard = () => {
  return (
    <Layout>
      {/* Separator under header */}

      {/* Cards */}
      <div className="flex flex-wrap justify-start, mb-[12px]">
        <Card1
          cardTitle="Current Visitors"
          count={50}
          link="View log"
          linkHref="/visitors"
          icon={
            <img
              src="/doorbell.svg"
              alt="Doorbell Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
        <Card1
          cardTitle="Active Incidents"
          count={3}
          link="View details"
          linkHref="/incident_report"
          icon={
            <img
              src="/active.svg"
              alt="Incients Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />

        <Card1
          cardTitle="Emergencies Today"
          count={2}
          link="View details"
          linkHref="/emergencies"
          icon={
            <img
              src="/911.svg"
              alt="Emergency Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />

        <Card1
          cardTitle="Total Active Users"
          count={80}
          link="View users"
          linkHref="/userspage"
          icon={
            <img
              src="/users.svg"
              alt="Users Icon"
              className="w-6 h-6 object-contain"
            />
          }
        />
      </div>

      
      <div className="mb-[30px]">
        <Card2
          label="Active Incidents"
          value="3"
          icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
          iconBg="bg-red-100"
          buttonText="View details"
        />
      </div>

    
      <div className="bg-white p-6 rounded-lg shadow mb-8 flex flex-col lg:flex-row gap-6">
        <Chart />
        <Card3 className="lg:ml-4" />
      </div>

  

      <DashboardTable />
    </Layout>
  );
};

export default Dashboard;
