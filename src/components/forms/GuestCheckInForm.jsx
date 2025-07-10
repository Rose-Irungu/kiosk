import React from "react";

export default function GuestCheckInForm() {
  return (
    <div className="flex flex-col gap-16 w-[280px]">
      {/* Header with language selector and close icon */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1 bg-[#d1c9fa] border border-[#2d2264] rounded px-1 py-1 h-[29px]">
          <div className="flex items-center gap-1">
            <img src="mask-group0.svg" alt="Flag" className="w-4 h-4" />
            <div className="text-[#2d2264] text-sm font-medium">EN</div>
          </div>
          <img src="dropdown0.svg" alt="Dropdown" className="w-5 h-5" />
        </div>
        <img
          src="material-symbols-light-close-rounded0.svg"
          alt="Close"
          className="w-[29px] h-[29px] rounded"
        />
      </div>

      {/* Form Content */}
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="text-[#00580d] text-sm font-medium text-left">
          Hi Audrey,<br />Angela has sent you an invite link to Westbrook
          Apartments. Complete the form for a smooth check in process.
        </div>

        <form className="flex flex-col gap-3 w-full">
          {[
            { label: "Guest Name *", placeholder: "Audrey Nyabuto" },
            { label: "Phone Number *", placeholder: "+254-723-456-789" },
            {
              label: "Email *",
              placeholder: "e.g janenjoroge@email.com",
              placeholderColor: "#9abd9f",
            },
            { label: "Date", placeholder: "dd/mm/yyyy" },
            { label: "Host Name/Unit *", placeholder: "Angela Sinei (302b)" },
            { label: "Car number plate (Optional)", placeholder: "e.g KCW 123K" },
          ].map(({ label, placeholder, placeholderColor }, index) => (
            <div key={index} className="flex flex-col gap-1 w-full">
              <label className="text-[#00d21e] text-xs font-medium">{label}</label>
              <div className="bg-white border border-[#54e168] rounded-xl px-3 py-2 text-sm text-[#00580d]">
                <input
                  type="text"
                  placeholder={placeholder}
                  className={`w-full outline-none bg-transparent placeholder:text-xs placeholder:font-medium ${
                    placeholderColor ? `placeholder:text-[${placeholderColor}]` : ""
                  }`}
                />
              </div>
            </div>
          ))}

          {/* Upload Photo */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#00d21e] text-xs font-medium">Photo *</label>
            <div className="flex items-center justify-between border border-[#00d21e] rounded-xl overflow-hidden">
              <span className="text-[#9abd9f] text-xs px-3">PNG/JPG</span>
              <button
                type="button"
                className="bg-[#00d21e] text-white text-xs font-semibold px-4 py-2 rounded-r-xl"
              >
                Upload
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-[#00d21e] text-white rounded-[24px] px-6 py-2 shadow-md text-center mt-4">
            <button type="submit" className="text-white text-base font-medium">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
