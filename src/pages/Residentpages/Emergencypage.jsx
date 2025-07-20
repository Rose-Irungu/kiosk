import Card4 from "../../components/Card4";
import Chart2 from "../../components/Chart2";              
import EmergencyTable from "../../components/tables/Emergencies";
import Layout from "../../components/layout/Layout";
export default function Emergencypage() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen w-full items-center px-4 md:px-8">
        {/* ---- Upper Row ---- */}
        <div
          id="upper"
          className="
            flex flex-col md:flex-row
            w-full max-w-[1140px]
            gap-6 md:gap-8
          "
        >
          {/* Left Card (Card4) */}
          <div className="w-full md:w-1/2">
            <Card4
              floor="5"
              unit="B05A"
              name="Wan Tam"
              status="Active"
            />
          </div>

          {/* Right Card (Chart2) - same dimensions as left */}
          <div className="w-full md:w-1/2">
            <Chart2 />
          </div>
        </div>

        {/* ---- Lower Row ---- */}
        <div
          id="lower"
          className="
            w-full max-w-[1140px]
            mt-10
          "
        >
          <EmergencyTable />
        </div>
      </div>
    </Layout>
  );
}
