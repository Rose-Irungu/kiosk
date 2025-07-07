import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header1";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#EEEAFD]">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 h-screen z-50">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          active={active}
          setActive={setActive}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </aside>

      {/* Content area with fixed header and scrollable main */}
      <div className={`flex flex-col flex-1 ml-64 h-screen`}>
        {/* Fixed Header */}
        <header className="fixed ">
          <Header
            setMobileOpen={setMobileOpen}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
          />
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
