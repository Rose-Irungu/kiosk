import Layout from "../../components/layout/Layout";
import SystemPreference from "../../components/SystemPreference";
import SessionManagement from "../../components/SessionManagement";
import FacilityProfile from "../../components/FacilityProfile";

export default function Settings() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-6 py-6">
        <SystemPreference />
        <FacilityProfile />
        <SessionManagement />
      </div>
    </Layout>
  );
}
