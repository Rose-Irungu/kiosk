import { Search, Bell, CircleUser, User } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

export default function Header({ setMobileOpen, profileOpen, setProfileOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-[#F5F4F5] shadow-sm w-full text-[13px]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="sm:hidden text-gray-700 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg md:text-xl font-bold hidden sm:block">
              West Brook Apartment
            </h1>
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <div className="flex items-center w-full max-w-[200px] sm:w-[233px] px-4 py-[3px] gap-2.5 bg-white border border-[rgba(108,117,125,0.3)] rounded-md">
              <Search className="min-w-[16px]" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent focus:outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm">EN</p>

              <div className="relative flex items-center justify-center">
                <button className="text-gray-600 hover:text-gray-800 relative">
                  <Bell className="w-6 h-6" />
                  {/* Notification Dot */}
                  <span
                    className="absolute"
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#005E0E",
                      borderRadius: "50%",
                      top: "-1px",
                      right: "2px",
                    }}
                  ></span>
                </button>
              </div>



              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <CircleUser className="h-6 w-6 text-gray-700" />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    James
                  </span>
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-[195px] bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-lg flex flex-col p-2 z-50">
                    <div className="flex items-center gap-2 w-full p-2 border-b border-gray-200">
                      <CircleUser className="h-10 w-10 text-gray-600" />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">James</span>
                      </div>
                    </div>
                    <button className="flex items-center w-full h-10 p-2 gap-2 rounded hover:bg-gray-100 transition">
                      <User className="h-6 w-6 text-gray-400" />
                      <span className="text-sm text-[#495057]">View Profile</span>
                    </button>
                    <button className="flex items-center w-full h-10 p-2 gap-2 rounded hover:bg-gray-100 transition">
                      <img src="./logout.svg" alt="Logout" className="w-6 h-6" />
                      <span className="text-sm text-[#495057]">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
  );
}
