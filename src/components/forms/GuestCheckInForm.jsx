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
    token,
    handleInputChange,
    handleSubmit
  } = useVisitorForm();


  const getFormTitle = () => {
    if (isVisitorMode) return "Complete Your Invitation";
    if (isSecurityMode) return "Security Check-in";
    return "Invite a Visitor";
  };

  const getFormDescription = () => {
    if (isVisitorMode) {
      return "Hi there! Please complete the form for a smooth check-in process.";
    }
    if (isSecurityMode) {
      return "Fill in the visitor details for gate entry.";
    }
    return "Fill in guest details to send an invitation.";
  };

  
  const isFieldPrefilled = (key) => {
    if (!isVisitorMode) return false;
    
    const prefilledFields = ['full_name', 'email', 'visit_date', 'host_name', 'unit_number'];
    return prefilledFields.includes(key) && formData[key];
  };

  
  const getFieldConfig = () => {
    if (isResidentMode) {
      
      return [
        { 
          key: 'full_name', 
          label: 'Guest Name *', 
          placeholder: 'Enter guest name',
          required: true
        },
        { 
          key: 'email', 
          label: 'Email *', 
          placeholder: 'e.g guest@email.com',
          required: true
        },
        { 
          key: 'visit_date', 
          label: 'Visit Date *', 
          placeholder: 'dd/mm/yyyy',
          type: 'date',
          required: true
        },
        {
          key: 'visitor_type',
          label: 'Visitor Type *',
          placeholder: 'Select visitor type',
          type: 'select',
          required: true,
          options: [
            { value: 'visitor', label: 'Visitor' },
            { value: 'delivery', label: 'Delivery' },
            { value: 'service', label: 'Service Provider' }
          ]
        }
      ];
    }

    // Full field configuration for visitor and security modes
    const baseFields = [
      { 
        key: 'full_name', 
        label: 'Guest Name *', 
        placeholder: 'Enter guest name',
        required: true
      },
      { 
        key: 'phone_number', 
        label: 'Phone Number *', 
        placeholder: '+254-723-456-789',
        required: true
      },
      { 
        key: 'email', 
        label: 'Email *', 
        placeholder: 'e.g guest@email.com',
        required: true
      },
      { 
        key: 'visit_date', 
        label: 'Visit Date *', 
        placeholder: 'dd/mm/yyyy',
        type: 'date',
        required: true
      },
      { 
        key: 'plate_number', 
        label: 'Car Number Plate (Optional)', 
        placeholder: 'e.g KCW 123K',
        required: false
      }
    ];

    // Add mode-specific fields
    if (isVisitorMode) {
      
      baseFields.push(
        {
          key: 'host_name',
          label: 'Host Name',
          placeholder: 'Host information',
          readOnly: true,
          required: false
        },
        {
          key: 'unit_number',
          label: 'Unit Number',
          placeholder: 'Unit information',
          readOnly: true,
          required: false
        }
      );
    } else if (isSecurityMode) {
      
      baseFields.push(
        {
          key: 'unit_number',
          label: 'Unit Number *',
          placeholder: 'e.g 302b',
          required: true
        },
        {
          key: 'host_name',
          label: 'Host Name *',
          placeholder: 'Host name',
          required: true
        },
        {
          key: 'visitor_type',
          label: 'Visitor Type *',
          placeholder: 'Select visitor type',
          type: 'select',
          required: true,
          options: [
            { value: 'visitor', label: 'Visitor' },
            { value: 'delivery', label: 'Delivery' },
            { value: 'service', label: 'Service Provider' }
          ]
        }
      );
    }

    return baseFields;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-[#00580d]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 w-[280px]">
      {/* Header */}
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
          className="w-[29px] h-[29px] rounded cursor-pointer"
        />
      </div>

      {/* Form Content */}
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="text-[#00580d] text-sm font-medium text-left">
          <h2 className="font-bold mb-2">{getFormTitle()}</h2>
          <p>{getFormDescription()}</p>
          
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center w-full">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {getFieldConfig().map(({ key, label, placeholder, type = 'text', required, readOnly, options }) => {
            const isPrefilled = isFieldPrefilled(key);
            const isDisabled = readOnly || isPrefilled;
            
            return (
              <div key={key} className="flex flex-col gap-1 w-full">
                <label className="text-[#00d21e] text-xs font-medium">
                  {label}
                  
                </label>
                <div className={`bg-white border border-[#54e168] rounded-xl px-3 py-2 text-sm text-[#00580d] ${
                  isDisabled ? 'opacity-60 bg-gray-50' : ''
                }`}>
                  {type === 'select' ? (
                    <select
                      value={formData[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      required={required}
                      disabled={isDisabled}
                      className="w-full outline-none bg-transparent text-xs font-medium"
                    >
                      <option value="">{placeholder}</option>
                      {options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[key] || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      required={required}
                      disabled={isDisabled}
                      className={`w-full outline-none bg-transparent placeholder:text-xs placeholder:font-medium ${
                        isDisabled ? 'cursor-not-allowed' : ''
                      }`}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Photo Upload - Required for visitor mode */}
          {(isVisitorMode || isSecurityMode) && (
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[#00d21e] text-xs font-medium">
                Photo {isVisitorMode ? '*' : '(Optional)'}
              </label>
              <div className="flex items-center justify-between border border-[#00d21e] rounded-xl overflow-hidden">
                <span className="text-[#9abd9f] text-xs px-3">PNG/JPG</span>
                <button
                  type="button"
                  onClick={() => document.getElementById('photo-upload').click()}
                  className="bg-[#00d21e] text-white text-xs font-semibold px-4 py-2 rounded-r-xl"
                >
                  Upload
                </button>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange('photo', e.target.files[0])}
                  className="hidden"
                  required={isVisitorMode}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="bg-[#00d21e] text-white rounded-[24px] px-6 py-2 shadow-md text-center mt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="text-white text-base font-medium w-full"
            >
              {loading ? 'Submitting...' : 
               isVisitorMode ? 'Complete Registration' :
               isResidentMode ? 'Send Invitation' : 'Register Visitor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}