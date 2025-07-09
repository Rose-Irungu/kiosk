import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header1";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F4F5]">
      {/* Sidebar - hidden on mobile */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        active={active}
        setActive={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-hidden">
        {/* Fixed Header */}
        <header className="sticky top-0 z-40 bg-[#EEEAFD]">
          <Header
            setMobileOpen={setMobileOpen}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
          />
        </header>

        {/* Scrollable main content with responsive padding */}
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className=" rounded-lg  p-2 sm:p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}