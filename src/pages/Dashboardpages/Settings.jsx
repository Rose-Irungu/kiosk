import Layout from "../../components/layout/Layout";
import SystemPreference from "../../components/SystemPreference";
import SessionManagement from "../../components/SessionManagement";

export default function Settings() {
  return (
    <Layout>
      <div className="p-2">
        <div className=" p-2 -mt-10 ">
          {" "}
          
          <SystemPreference />
        </div>
        <div className="-mt-[260px] ">
          {" "}
          
          <SessionManagement />
        </div>
      </div>
    </Layout>
  );
}
