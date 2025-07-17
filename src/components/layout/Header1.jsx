import { Search, Bell, CircleUser, User, X } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import React, { useState } from "react";

export default function Header({ setMobileOpen, profileOpen, setProfileOpen }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePasswordForm, setshowChangePasswordForm] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);




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
                <button
                  onClick={() => {
                    setShowProfileCard(true);
                    setProfileOpen(false);
                  }}
                  className="flex items-center w-full h-10 p-2 gap-2 rounded hover:bg-gray-100 transition"
                >
                  <User className="h-6 w-6 text-gray-400" />
                  <span className="text-sm text-[#495057]">View Profile</span>
                </button>
                <button className="flex items-center w-full h-10 p-2 gap-2 rounded hover:bg-gray-100 transition">
                  <img src="./logout.svg" alt="Logout" className="w-6 h-6" />
                  <span className="text-sm text-[#495057]">Logout</span>
                </button>
              </div>
            )}

            {/* Profile Card */}
            {showProfileCard && (
              <div className="absolute top-full right-0 mt-2 z-50 w-[390px] h-[397px] bg-white shadow-lg rounded-2xl p-4 flex flex-col items-start">
                {/* Close Button */}
                <button
                  onClick={() => setShowProfileCard(false)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition"
                  aria-label="Close Profile"
                >
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
                </button>

                <div className="flex flex-col gap-8 w-full max-w-[358px] h-[341px]">
                  <div className="flex items-center gap-6 pb-4 w-full max-w-[358px] h-[156px] border-b border-[#6C757D]/50 isolate">
                    <div className="w-[140px] h-[140px] rounded-full border border-[#005E0E] bg-gray-400 overflow-hidden relative">
                      <img
                        src="/path-to-your-image.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-6 w-[194px] h-[120px] flex-grow z-[1]">
                      <div>
                        <h2 className="text-lg font-bold text-[#495057]">James</h2>
                      </div>

                      <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm text-[#495057]">
                        <div>Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</div>
                        <div>Remio</div>
                        <div>Residence&nbsp;&nbsp;:</div>
                        <div>Westbrook Apartments</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-6 px-2 w-full max-w-[358px] h-[153px]">
                    <h2 className="text-base font-semibold text-[#005E0E]">
                      Contact Information
                    </h2>

                    <div className="text-[#495057]">
                      Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;frtee
                    </div>

                    <div className="text-[#495057]">
                      Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;frettttt
                    </div>

                    <div className="flex flex-row items-center gap-[30px] w-[342px] h-[40px]">
                      <button
                        onClick={() => setShowEditForm(true)}
                        className="font-['Inter'] flex justify-center items-center px-6 py-2 gap-[10px] w-[121px] h-[40px] border border-[#005E0E] rounded-[4px] text-[#005E0E] text-sm font-medium hover:bg-[#D5DFD7]"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => setshowChangePasswordForm(true)}
                        className=" font-['Inter'] font-light flex items-center justify-center px-6 py-2 gap-2 border border-[#005E0E] rounded-[4px] text-[#005E0E] text-sm font-medium whitespace-nowrap h-[40PX] hover:bg-[#D5DFD7]">

                        CHANGE PASSWORD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
          <div className="relative flex flex-col items-center p-4 gap-8 w-[383px] max-h-screen bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-[16px]">
            <button
              onClick={() => setShowEditForm(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition"
              aria-label="Close Edit Form"
            >
              <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
            </button>

            <h2 className="text-lg font-bold text-[#495057] font-['Inter']">Edit Profile</h2>

            <form className="flex flex-col gap-4 w-full px-4 font-['Inter']">

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-[#495057] mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full h-[48px] px-4 py-2 border border-[#005E0E]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-[#495057] mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full h-[48px] px-4 py-2 border border-[#005E0E]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm  text-[#495057] mb-2">Email</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>



              <div>
                <label className="block text-sm  text-[#495057] mb-2">Phone</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-sm  text-[#495057] mb-2">Residence/Facility</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>





              <button
                type="submit"
                className="w-[351px] h-[48px] mt-auto w-full bg-[#005E0E] text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                UPDATE PROFILE
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Change Password Modal */}
      {showChangePasswordForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
          <div className="relative flex flex-col items-center p-4 gap-4 w-[383px] max-h-screen bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-[16px]">
            <button
              onClick={() => setshowChangePasswordForm(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition"
              aria-label="Close Edit Form"
            >
              <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
            </button>

            <h2 className="text-lg font-bold text-[#495057] font-['Inter']">Change Password</h2>

            <form className="flex flex-col gap-4 w-full px-4 font-['Inter']">


              <div>
                <label className="block text-sm  text-[#495057] mb-2">Old Password</label>
                <input
                  type="password"

                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>



              <div>
                <label className="block text-sm  text-[#495057] mb-2">New Password</label>
                <input
                  type="password"

                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-sm  text-[#495057] mb-2">Confirm Password</label>
                <input
                  type="password"

                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>





              <button
                type="submit"
                className="w-[351px] h-[48px] mt-auto w-full bg-[#005E0E] text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                CHANGE PASSWORD
              </button>
            </form>
          </div>
        </div>
      )}



    </header>
  );
}
