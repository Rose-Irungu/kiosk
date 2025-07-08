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
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          active={active}
          setActive={setActive}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </aside>

      {/* Main content */}
      <div
        className={`
          flex flex-col flex-1 h-screen transition-all duration-300
          ${collapsed ? "ml-16" : "ml-64"}
        `}
      >
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40">
          <Header
            setMobileOpen={setMobileOpen}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
          />
        </header>

        {/* Main scrollable content (account for header height) */}
        <main className="flex-1 overflow-y-auto mt-20 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
