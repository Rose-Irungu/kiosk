import { X } from "lucide-react";

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

export default function Sidebar({ collapsed, setCollapsed, active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <aside className={`${mobileOpen ? "fixed z-50 h-full" : "hidden"} md:static md:flex md:h-screen flex-col ${collapsed ? "w-16" : "w-full md:w-[220px]"} bg-[#005E0E] transition-all duration-300`}>
      {/* Logo & Collapse */}
      <div className={`flex items-center ${collapsed ? "justify-center p-2" : "justify-start p-5"}`}>
        <img src="/frame-1020.png" alt="Logo" className={`${collapsed ? "h-8" : "h-[48px]"} w-auto`} draggable="false" />
        {!collapsed && <span className="ml-2 text-white font-semibold tracking-wide font-[Roboto]">VGATE</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="hidden md:inline text-white hover:text-gray-200 ml-auto">
          {collapsed ? "→" : "←"}
        </button>
        <button onClick={() => setMobileOpen(false)} className="md:hidden text-white hover:text-gray-200 ml-2">
          <X />
        </button>
      </div>

      {/* Primary Nav */}
      <div className="flex flex-col w-full space-y-1 font-[Roboto]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              setMobileOpen(false);
            }}
            className={`flex items-center w-full h-12 gap-2 px-4 font-medium transition ${active === item.id ? "bg-[#EEEAFD] border-l-2 border-[#005E0E] text-gray-800" : "text-white hover:bg-[#EEEAFD] hover:text-gray-800"}`}
          >
            <img src={item.icon} alt="" className={`h-5 w-5 ${active === item.id ? "filter brightness-0" : ""}`} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      <hr className="w-full border-t border-[#939393] my-4" />

      {/* Secondary Nav */}
      <div className="flex flex-col w-full space-y-1 mb-4 font-[Roboto]">
        {secondaryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              setMobileOpen(false);
            }}
            className={`flex items-center w-full h-12 gap-2 px-4 font-medium transition ${active === item.id ? "bg-[#EEEAFD] border-l-2 border-[#005E0E] text-gray-800" : "text-white hover:bg-[#EEEAFD] hover:text-gray-800"}`}
          >
            <img src={item.icon} alt="" className={`h-5 w-5 ${active === item.id ? "filter brightness-0" : ""}`} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
}
