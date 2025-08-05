// FacilityProfile.jsx
import React from "react";
import Layout from "../../components/layout/Layout";

export default function FacilityProfile() {
  return (
    <Layout>
      <div className="bg-white rounded-2xl p-12 flex flex-col gap-8 items-start">
        <h1 className="text-black text-2xl font-bold">Facility Profile</h1>

        <div className="bg-[#f5f4f5] rounded-lg border border-gray-400/50 p-8 shadow-md w-full flex flex-col gap-8">
          <h2 className="text-[#495057] text-xl font-bold">
            Basic Information
          </h2>
          <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-row gap-6 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-[#495057]">Facility Name*</label>
                <div className="bg-white rounded-md px-3 py-2 h-12 flex items-center">
                  <span className="text-[#495057] text-base">West Brook</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-[#495057]">Facility Type*</label>
                <div className="relative">
                  <select
                    defaultValue="Office"
                    className="appearance-none w-full h-12 bg-white border border-gray-300 text-[#495057] text-sm px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005e0e] focus:border-transparent"
                  >
                    <option value="Office">Office</option>
                    <option value="School">School</option>
                    <option value="Resident">Resident</option>
                    <option value="Hospital">Hospital</option>
                  </select>
                  <img
                    src="formkit-down0.svg"
                    alt="dropdown icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-[10.5px] pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-8 shadow-md w-full flex flex-col gap-8">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-[#495057] text-xl font-bold">
              Floor and Units
            </h2>
            <button className="bg-[#005e0e] hover:bg-[#023609] text-white text-sm font-medium px-6 py-3 rounded-md shadow flex items-center gap-2">
              <img src="tabler-plus0.svg" className="w-6 h-6" alt="add" />
              Add Floor
            </button>
          </div>
          <div className="bg-[#f5f4f5] border border-dashed border-black rounded-lg p-4 h-[123px] flex flex-col items-center justify-center w-full gap-4">
            <img src="group0.svg" className="w-8 h-8" alt="building icon" />
            <p className="text-sm text-black/30 font-medium">
              No floors added yet. Click ‘add floor’ to get started.
            </p>
          </div>
        </div>

        <div className="rounded-lg p-8 shadow-md w-full flex flex-col gap-8">
          <h2 className="text-[#495057] text-xl font-bold">
            Safety Instructions
          </h2>
          <div className="bg-[#f5f4f5] border border-[#495057]/50 rounded-lg p-4 h-[123px] w-full">
            <p className="text-sm text-black/30 font-medium">
              Add safety instructions...
            </p>
          </div>
        </div>

        <div className="shadow w-full flex justify-start">
          <button className="bg-[#005e0e] hover:bg-[#023609] text-white text-sm font-medium px-6 py-3 rounded-md w-full">
            SAVE FACILITY PROFILE
          </button>
        </div>
      </div>
    </Layout>
  );
}
