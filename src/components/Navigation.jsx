import { useState } from "react";
import { Search, CircleUser, Bell, X, User } from "lucide-react";

export default function Navigation({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "/material-symbols-dashboard-rounded0.svg" },
    { id: "users", label: "Users", icon: "/mdi-users0.svg" },
    { id: "visitors", label: "Visitors", icon: "/material-symbols-nest-doorbell-visitor0.svg" },
    { id: "emergencies", label: "Emergencies", icon: "/material-symbols-e-911-emergency-rounded0.svg" },
    { id: "incidents", label: "Incident Reports", icon: "/tabler-message-report-filled0.svg" },
  ];

 
  const secondaryItems = [
    { id: "settings", label: "Settings", icon: "/ic-round-settings0.svg" },
    { id: "help", label: "Help", icon: "/material-symbols-help-outline0.svg" },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#EEEAFD] p-2">
      {/* Sidebar container */}
      <aside
        className={`${
          mobileOpen ? "fixed z-50 h-full" : "hidden"
        } md:flex md:h-full flex-col ${
          collapsed ? "w-14" : "w-[180px]"
        } bg-[#005E0E] transition-all duration-300 rounded-2xl shadow-lg`}
      >
        <div className={`flex items-center ${collapsed ? "justify-center p-2" : "justify-start p-4"}`}>
          <img src="/frame-1020.png" alt="Logo" className={`${collapsed ? "h-8" : "h-[42px]"} w-auto`} />
          {!collapsed && (
            <span className="ml-2 text-white font-semibold tracking-wide font-[Roboto]">VGATE</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:inline text-white hover:text-gray-200 ml-auto"
          >
            {collapsed ? "→" : "←"}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-white hover:text-gray-200 ml-2"
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col w-full space-y-1 font-[Roboto]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setMobileOpen(false);
              }}
              className={`flex items-center w-full h-12 gap-2 px-4 font-medium transition ${
                active === item.id
                  ? "bg-[#EEEAFD] border-l-2 border-[#005E0E] text-gray-800"
                  : "text-white hover:bg-[#EEEAFD] hover:text-gray-800"
              }`}
            >
              <img
                src={item.icon}
                alt=""
                className={`h-5 w-5 ${active === item.id ? "filter brightness-0" : ""}`}
              />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        <hr className="w-full border-t border-[#939393] my-4" />
        <hr className="w-full border-t border-[#939393] my-4" />

        <div className="flex flex-col w-full space-y-1 mb-4 font-[Roboto]">
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setMobileOpen(false);
              }}
              className={`flex items-center w-full h-12 gap-2 px-4 font-medium transition ${
                active === item.id
                  ? "bg-[#EEEAFD] border-l-2 border-[#005E0E] text-gray-800"
                  : "text-white hover:bg-[#EEEAFD] hover:text-gray-800"
              }`}
            >
              <img
                src={item.icon}
                alt=""
                className={`h-5 w-5 ${active === item.id ? "filter brightness-0" : ""}`}
              />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0">
        {/* Header */}
        <header className="h-[64px] flex justify-between items-center px-4 md:px-8 bg-[#EEEAFD] border-b border-gray-300">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 className="text-lg md:text-xl font-bold">Welcome to West Brook Apartment</h1>
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center w-[233px] px-4 py-[3px] gap-2.5 bg-white border border-[rgba(108,117,125,0.3)] rounded-md">
              <Search />
              <input type="text" placeholder="Search..." className="flex-1 bg-transparent focus:outline-none text-sm" />
            </div>
            <p>EN</p>
            <div className="relative flex items-center">
              <button className="flex items-center justify-center text-gray-600 hover:text-gray-800">
                <Bell />
              </button>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            </div>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 focus:outline-none">
                <CircleUser className="h-6 w-6 text-gray-700" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700">James</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-[195px] bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-lg flex flex-col p-2 z-50">
                  <div className="flex items-center gap-3 w-full p-2 border-b border-gray-200">
                    <img src="/profile-avatar.png" alt="Profile" className="h-10 w-10 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">James</span>
                      <span className="text-sm text-gray-500">james@example.com</span>
                    </div>
                  </div>
                  <button className="flex items-center w-[179px] h-10 p-2 gap-2 rounded hover:bg-gray-100 transition">
                    <User className="h-6 w-6 text-gray-400" />
                    <span className="text-[16px] text-[#495057] font-normal">View Profile</span>
                  </button>
                  <button className="flex items-center w-[179px] h-10 p-2 gap-2 rounded hover:bg-gray-100 transition">
                    <img src="./logout.svg" alt="Logout" className="w-6 h-6" />
                    <span className="text-[16px] text-[#495057] font-normal">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#EEEAFD]">
          {children}
        </main>
      </div>
    </div>
  );
}
