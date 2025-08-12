import React from "react";
import { useVisitorForm } from "../../hooks/useVisitorForm";

export default function GuestCheckInForm() {
  const {
    formData,
    loading,
    error,
    isVisitorMode,
    isSecurityMode,
    isResidentMode,
    handleInputChange,
    handleSubmit,
  } = useVisitorForm();

  const titles = {
    visitor: "Complete Your Invitation",
    security: "Security Check-in",
    resident: "Invite a Visitor",
  };

  const descriptions = {
    visitor: `Hi ${formData?.full_name || "Guest"},
${formData?.host_name || "a resident"} has sent you an invite link to West Brook Apartments.`,
    security: "Fill in the visitor details for gate entry.",
    resident: "Fill in guest details to send an invitation.",
  };

  const getMode = () => {
    if (isVisitorMode) return "visitor";
    if (isSecurityMode) return "security";
    return "resident";
  };

 

  const fieldsByMode = {
    resident: [
      { key: "full_name", label: "Guest Name *", placeholder: "Enter guest name", type: "text", required: true },
      { key: "phone_number", label: "Phone Number *", placeholder: "+254-7**-***", type: "text", required: true },
      { key: "email", label: "Email *", placeholder: "e.g guest@email.com", type: "email", required: true },
      { key: "visit_date", label: "Visit Date *", type: "date", required: true },
      { key: "plate_number", label: "Car Number Plate (Optional)", placeholder: "e.g KCW 123K", type: "text" },
      // { key: "host_name", label: "Host Name *", placeholder: "e.g John Doe", type: "text", required: true },
      // { key: "unit_number", label: "Unit Number *", placeholder: "e.g A002", type: "text", required: true },
      {
        key: "visitor_type",
        label: "Visitor Type *",
        placeholder: "Select visitor type",
        type: "select",
        required: true,
        options: [
          { value: "visitor", label: "Visitor" },
          { value: "delivery", label: "Delivery" },
          { value: "service", label: "Service Provider" },
        ],
      },
    ],
    visitor: [
      { key: "full_name", label: "Guest Name *", placeholder: "Enter guest name", required: true },
      { key: "phone_number", label: "Phone Number *", placeholder: "+254-72*-***", required: true },
      { key: "email", label: "Email *", placeholder: "e.g guest@email.com", required: true },
      { key: "visit_date", label: "Visit Date *", type: "date", required: true },
      { key: "plate_number", label: "Car Number Plate (Optional)", placeholder: "e.g KCW 123K" },
      { key: "host_name", label: "Host Name", readOnly: true },
      { key: "unit_number", label: "Unit Number", readOnly: true },
    ],
    security: [
      { key: "full_name", label: "Guest Name *", placeholder: "Enter guest name", required: true },
      { key: "phone_number", label: "Phone Number *", placeholder: "+254-72*-***", required: true },
      { key: "email", label: "Email *", placeholder: "e.g guest@email.com", required: true },
      { key: "visit_date", label: "Visit Date *", type: "date", required: true },
      { key: "plate_number", label: "Car Number Plate (Optional)", placeholder: "e.g KCW 123K" },
      { key: "unit_number", label: "Unit Number *", placeholder: "e.g 302b", required: true },
      { key: "host_name", label: "Host Name *", placeholder: "Host name", required: true },
      {
        key: "visitor_type",
        label: "Visitor Type *",
        placeholder: "Select visitor type",
        type: "select",
        required: true,
        options: [
          { value: "visitor", label: "Visitor" },
          { value: "delivery", label: "Delivery" },
          { value: "service", label: "Service Provider" },
        ],
      },
    ],
  };

  // if (loading && isVisitorMode) {
  //   return (
  //     <div className="flex justify-center items-center h-64 text-[#00580d]">
  //       Loading invitation details...
  //     </div>
  //   );
  // }

  const mode = getMode();

  return (
    <div className="flex flex-col gap-16 w-[280px] overflow-hidden">
      {/* <div className="flex justify-between items-center w-full">
        <img src="/logo.svg" alt="Logo" className="w-1/2 mt-7 ml-12" />
      </div> */}

      {/* Form */}
      <div className="flex flex-col items-center gap-4 w-full h-full mt-[-20px]">
        <div className="text-[#00580d] text-sm font-medium">
          <h2 className="font-bold mb-2">{titles[mode]}</h2>
          <p className="whitespace-pre-line">{descriptions[mode]}</p>
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {fieldsByMode[mode].map(
            ({ key, label, placeholder, type = "text", required, readOnly, options }) => {
              const disabled = readOnly || (key);

              return (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-[#00d21e] text-xs font-medium">{label}</label>
                  <div
                    className={`bg-white border border-[#54e168] rounded-xl px-3 py-2 text-sm text-[#00580d] ${
                      disabled ? "opacity-60 bg-gray-50" : ""
                    }`}
                  >
                    {type === "select" ? (
                      <select
                        value={formData[key] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        required={required}
                        disabled={disabled}
                        className="w-full outline-none bg-transparent text-xs font-medium"
                      >
                        <option value="">{placeholder}</option>
                        {options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={formData[key] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        required={required}
                        disabled={disabled}
                        className={`w-full outline-none bg-transparent placeholder:text-xs placeholder:font-medium ${
                          disabled ? "cursor-not-allowed" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              );
            }
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00d21e] hover:bg-[#1ba134] text-white rounded-[24px] px-6 py-2 shadow-md text-base font-medium mt-4"
          >
            {loading
              ? "Submitting..."
              : mode === "visitor"
              ? "Complete Registration"
              : mode === "resident"
              ? "Send Invitation"
              : "Register Visitor"}
          </button>
        </form>
      </div>
    </div>
  );
}
