import Navigation from "../../components/Navigation"
import Navbar from "../../components/Navbar"
import IncidentTable from "../../components/tables/Incident" 
import Layout from "../../components/layout/Layout"
export default function IncidentReportsPage() {
  return (
    <Layout>
      
      <IncidentTable />
      
      
    </Layout>
    // <div className="flex h-screen overflow-hidden bg-[#F5F3FF]">
    //   {/* Sidebar */}
    //   <Navigation />

    //   {/* Main Content Area */}
    //   <div className="flex flex-col flex-1 overflow-auto">
    //     {/* Top bar */}
    //     <Navbar />

    //     {/* Page content */}
    //     <main className="p-6">
    //       <IncidentTable /> {/* ✅ Match the export name */}
    //     </main>
    //   </div>
    // </div>
  )
}
