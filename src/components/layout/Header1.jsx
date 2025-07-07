import { Search, Bell, CircleUser, User } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

export default function Header({ setMobileOpen, profileOpen, setProfileOpen }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-8 py-4 bg-[#EEEAFD] gap-4">
      <div className="flex items-center justify-between w-full md:w-auto">
        <h1 className="text-lg md:text-xl font-bold">Welcome to West Brook Apartment</h1>
        <button onClick={() => setMobileOpen(true)} className="md:hidden text-gray-700 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
        <div className="flex items-center w-full sm:w-[233px] px-4 py-[3px] gap-2.5 bg-white border border-[rgba(108,117,125,0.3)] rounded-md">
          <Search />
          <input type="text" placeholder="Search..." className="flex-1 bg-transparent focus:outline-none text-sm" />
        </div>
        <div className="flex items-center gap-6">
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
            {profileOpen && <ProfileMenu />}
          </div>
        </div>
      </div>
    </header>
  );
}
