import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header1";

const navItems = [
  { id: "dashboard", path: "/dashboard" },
  { id: "users", path: "/userspage" },
  { id: "visitors", path: "/visitorlogs" },
  { id: "emergencies", path: "/emergencypage" },
  { id: "incidents", path: "/incident_report" },
];

const secondaryItems = [
  { id: "settings", path: "/settings" },
  { id: "help", path: "/help" },
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
    return "dashboard"; // default
  };

  const active = getActiveId();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F4F5]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        active={active}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="relative flex flex-col flex-1 overflow-hidden">
        <header className="sticky top-0 z-40 bg-[#EEEAFD]">
          <Header
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
