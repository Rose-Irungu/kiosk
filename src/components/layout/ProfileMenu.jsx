import { CircleUser, User } from "lucide-react";

export default function ProfileMenu() {
  return (
    <div className="absolute right-0 mt-2 w-[195px] bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-lg flex flex-col p-2 z-50">
      <div className="flex items-center gap-2 w-full p-2 border-b border-gray-200">
        <CircleUser className="h-10 w-10 text-gray-600" />
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">James</span>
        </div>
      </div>

      <button className="flex items-center w-[179px] h-10 p-2 gap-2 rounded hover:bg-gray-100 transition">
        <User className="h-6 w-6 text-gray-400" />
        <span className="text-[16px] leading-[19px] text-[#495057] font-normal">View Profile</span>
      </button>

      <button className="flex items-center w-[179px] h-10 p-2 gap-2 rounded hover:bg-gray-100 transition">
        <img src="./logout.svg" alt="Logout" className="w-6 h-6" />
        <span className="text-[16px] leading-[19px] text-[#495057] font-normal">Logout</span>
      </button>
    </div>
  );
}
