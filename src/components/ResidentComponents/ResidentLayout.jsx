import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ResidentHeader from "./ResidentHeader";
import ResidentSidebar from "./ResidentSidebar";  



const navItems = [
  { id: "residentdash", path: "/resident/dashboard" },
  { id: "users", path: "/userspage" },
  { id: "visitor_registration", path: "/visitorregistration" },
  { id: "checkincheckout", path: "/checkincheckout" },
  { id: "incidents", path: "/security/incident" },
  { id: "securityemergencies", path: "/security/emergencypage"}
];

const secondaryItems = [
  { id: "security/settings", path: "/security/settings" },
  { id: "security/help", path: "/security/help" },
];

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const getActiveId = () => {
    const currentPath = location.pathname;
    const main = navItems.find((item) => currentPath.startsWith(item.path));
    if (main) return main.id;
    const secondary = secondaryItems.find((item) => currentPath.startsWith(item.path));
    if (secondary) return secondary.id;
    return "dashboard";
  };

  const active = getActiveId();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F4F5]">
      <ResidentSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        active={active}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="relative flex flex-col flex-1 overflow-hidden">
        <header className="sticky top-0 z-40 bg-[#f5f4f5]">
          <ResidentHeader
            setMobileOpen={setMobileOpen}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
          />
        </header>

        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="rounded-lg p-2 sm:p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
