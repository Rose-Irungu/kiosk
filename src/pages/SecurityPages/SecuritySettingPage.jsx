import Layout from "../../components/layout/Layout";
import SystemPreference from "../../components/SystemPreference";
import SessionManagement from "../../components/SessionManagement";

export default function Settings() {
  return (
    <SecurityLayout>
      <div className="flex flex-col items-center gap-6 py-6">
        <SystemPreference />
        <SessionManagement />
      </div>
    </SecurityLayout>
  );
}
