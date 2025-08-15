import React, { useRef } from "react";
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
    handleSubmit: originalHandleSubmit,
  } = useVisitorForm();

  const fileInputRef = useRef(null);

  const titles = {
    visitor: "Complete Your Invitation",
    security: "Security Check-in",
    resident: "Invite a Visitor",
  };

  const descriptions = {
    visitor: `Hi ${formData?.full_name || "Guest"},
${formData?.host_name || "a resident"} has sent you an invite link to West Brook Apartments.`,
    security: "Fill in the visitor details for gate entry.",
    resident: "Fill This Form To Invite Your Guest.",
  };

  const getMode = () => {
    if (isVisitorMode) return "visitor";
    if (isSecurityMode) return "security";
    return "resident";
  };

  const fieldsByMode = {
    resident: [
      { key: "full_name", label: "Name *", placeholder: "Enter guest name", type: "text", required: true },
      {
        key: "phone_number",
        label: "Phone Number *",
        placeholder: "+254-7**-***",
        type: "text",
        required: true,
        pattern: "^[0-9]{10}$",
        title: "Phone number must be 10 digits",
      },
      { key: "email", label: "Email *", placeholder: "e.g guest@email.com", type: "email", required: true },
      {
        key: "id",
        label: "ID Number *",
        placeholder: "*********",
        type: "text",
        required: true,
        pattern: "^[0-9]{6,8}$",
        title: "ID number must be between 6 and 8 digits",
      },
      { key: "photo", label: "Guest Photo *", type: "file", accept: "image/*", required: true },
      { key: "visit_date", label: "Visit Date *", type: "date", required: true },
      { key: "plate_number", label: "Car Number Plate (Optional)", placeholder: "e.g KCW 123K", type: "text" },
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

  const mode = getMode();

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (!formData.full_name || !formData.phone_number || !formData.email || !formData.id || !formData.photo || !formData.visit_date || !formData.visitor_type) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!/^[0-9]{6,8}$/.test(formData.id)) {
      alert("ID number must be between 6 and 8 digits.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone_number)) {
      alert("Phone number must be 10 digits.");
      return;
    }

    originalHandleSubmit(e);
  };

  return (
    <div className="flex flex-col gap-16 w-[480px] overflow-hidden">
      <div className="flex flex-col items-center gap-4 w-full h-full mt-[-20px]">
        <div className="text-[#002706] text-sm font-medium">
          <h2 className="font-bold mb-2">{titles[mode]}</h2>
          <p className="whitespace-pre-line">{descriptions[mode]}</p>
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {fieldsByMode[mode].map(
            ({ key, label, placeholder, type = "text", required, readOnly, options, accept, pattern, title }) => {
              const disabled = !!readOnly;

              return (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-[#002706] text-xs font-medium">{label}</label>

                  {type === "file" ? (
                    <div className="flex items-center justify-between bg-white border border-gray-400 rounded-xl px-3 py-2">
                      <span className="text-xs text-gray-500">
                        {formData[key] ? formData[key].name : "No file chosen"}
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="bg-[#005e0e] hover:bg-[#1ba134] text-white text-xs font-medium px-3 py-1 rounded-md"
                      >
                        Upload
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        onChange={(e) => handleInputChange(key, e.target.files[0])}
                        required={required}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div
                      className={`bg-white border border-gray-400 rounded-xl px-3 py-2 text-sm text-[#00580d] ${
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
                          onChange={(e) => {
                            if ((key === "phone_number" || key === "id") && e.target.value !== "") {
                              if (!/^[0-9]*$/.test(e.target.value)) return; // only numbers
                            }
                            handleInputChange(key, e.target.value);
                          }}
                          required={required}
                          disabled={disabled}
                          pattern={pattern}
                          title={title}
                          className={`w-full outline-none bg-transparent placeholder:text-xs placeholder:font-medium ${
                            disabled ? "cursor-not-allowed" : ""
                          }`}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#005e0e] hover:bg-[#1ba134] text-white rounded-[26px] px-6 py-2 shadow-md text-base font-medium mt-4"
          >
            {loading
              ? "Submitting..."
              : mode === "visitor"
              ? "Complete Registration"
              : mode === "resident"
              ? "Send Invite"
              : "Register Visitor"}
          </button>
        </form>
      </div>
    </div>
  );
}
