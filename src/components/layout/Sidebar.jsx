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
    <aside
      className={`
          ${mobileOpen ? "fixed z-50 h-full" : "hidden"}
          md:static md:flex md:h-screen
          flex-col
          ${collapsed ? "w-16" : "w-full md:w-[220px]"}
          bg-[#005E0E]
          transition-all duration-300
        `}
    >
      {/* Logo and Toggle */}
      <div className={`flex items-center justify-between ${collapsed ? "p-2" : "p-5"}`}>
        <div className="flex-1 flex justify-center">
          <img
            src="/frame-1020.png"
            alt="Logo"
            className={`${collapsed ? "h-8" : "h-[60px]"} w-auto`}
            draggable="false"
          />
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden text-white hover:text-gray-200 ml-2"
        >
          <X />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col w-full space-y-3 font-[Roboto] ">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              setMobileOpen(false);
            }}
            className={`
                group
                flex items-center
                w-full
                h-12
                gap-3
                px-4
                font-medium
                text-[13px]
                transition
                ${active === item.id
                ? "bg-[#F5F4F5] border-l-2 border-[#005E0E] text-gray-800"
                : "text-white hover:bg-[#F5F4F5] hover:text-gray-800"
              }
              `}
          >
            <img
              src={item.icon}
              alt=""
              className={`h-5 w-5 transition-all duration-200
                  ${active === item.id ? "filter brightness-0" : "group-hover:brightness-0 group-hover:sepia group-hover:saturate-[500%] group-hover:hue-rotate-[50deg] group-hover:contrast-[1.2]"}
                `}
            />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Collapse Toggle */}
      <div className="relative">
        <hr className="w-full border-t border-[#939393] my-4" />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className=" absolute right-[-16px] top-1/2 -translate-y-1/2 bg-white shadow-md rounded-lg p-1 flex items-center justify-center hover:bg-gray-100 transition"
          style={{ width: 32, height: 32 }}
        >
          <img
            src="./group0.svg"
            className={`transition-transform duration-300 ${collapsed ? "scale-x-[-1]" : "scale-x-100"}`}
            alt=""
          />
        </button>
      </div>

      {/* Secondary Items */}
      <div className="flex flex-col w-full space-y-3 mb-4 font-[Roboto] ">
        {secondaryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              setMobileOpen(false);
            }}
            className={`
                group
                flex items-center
                w-full
                h-12
                gap-3
                px-4
                font-medium
                transition
                text-[13px]
                ${active === item.id
                ? "bg-[#F5F4F5] border-l-2 border-[#005E0E] text-gray-800"
                : "text-white hover:bg-[#F5F4F5] hover:text-gray-800"
              }
              `}
          >
            <img
              src={item.icon}
              alt=""
              className={`h-5 w-5 transition-all duration-200
                  ${active === item.id ? "filter brightness-0" : "group-hover:brightness-0 group-hover:sepia group-hover:saturate-[500%] group-hover:hue-rotate-[50deg] group-hover:contrast-[1.2]"}
                `}
            />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
}
