import Layout from "../../components/layout/Layout";
import SystemPreference from "../../components/SystemPreference";
import SessionManagement from "../../components/SessionManagement";

export default function Settings() {
  return (
    <Layout>
     <div>
  <div className="w-full">
    <SystemPreference />
  </div>

  <div className="w-full">
    <SessionManagement />
  </div>
</div>

    </Layout>
  );
}
