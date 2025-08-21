import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { editVisitor } from "../../../services/visitsuser";

const Edit = ({ onClose }) => {
  const location = useLocation();
  const initialData = location.state?.initialData;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    visitor_id: "",
    profile_pic: null,
    visitor_type: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("initialData:", initialData);
    if (initialData) {
      setFormData({
        full_name: initialData.visitor_name || "", 
        phone_number: initialData.phone_number || "",
        email: initialData.email || "",
        visitor_id: initialData.visitor_id || "",
        profile_pic: null,
        visitor_type: initialData.visitor_type || "", 
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Name is required";
    if (!formData.phone_number.trim())
      newErrors.phone_number = "Phone is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.visitor_id) {
      console.error("No visitor_id provided");
      return;
    }

    try {
      const response = await editVisitor(formData.visitor_id, formData); 
      console.log("Visitor updated successfully:", response);
      onClose ? onClose() : navigate(-1);
    } catch (error) {
      console.error("Failed to update visitor:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white justify-center shadow-lg rounded-2xl p-6 w-full max-w-md space-y-5"
      >
      
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Edit Visitor Details
          </h2>
          <button
            type="button"
            onClick={onClose || (() => navigate(-1))}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <h3 className="text-md font-medium text-gray-600">
          Personal Information
        </h3>

       
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter name"
            className={`w-full border rounded-lg px-3 py-2 focus:ring outline-none ${
              errors.full_name ? "border-red-500" : "focus:ring-blue-300"
            }`}
          />
          {errors.full_name && (
            <p className="text-sm text-red-500 mt-1">{errors.full_name}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="+254-712-345-678"
            className={`w-full border rounded-lg px-3 py-2 focus:ring outline-none ${
              errors.phone_number ? "border-red-500" : "focus:ring-blue-300"
            }`}
          />
          {errors.phone_number && (
            <p className="text-sm text-red-500 mt-1">{errors.phone_number}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`w-full border rounded-lg px-3 py-2 focus:ring outline-none ${
              errors.email ? "border-red-500" : "focus:ring-blue-300"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Photo</label>
          <div className="flex items-center justify-between border rounded-lg p-2">
            <span className="text-sm text-gray-500">
              {formData.profile_pic
                ? formData.profile_pic.name
                : initialData?.profile_pic
                ? "Existing photo selected"
                : "No file chosen"}
            </span>
            <label
              htmlFor="photo-upload"
              className="cursor-pointer text-green-700 hover:underline text-sm"
            >
              Upload new photo
            </label>
            <input
              id="photo-upload"
              type="file"
              name="profile_pic"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>

        
        <button
          type="submit"
          className="w-full bg-green-700 text-white rounded-lg py-2 font-medium hover:bg-green-800 transition"
        >
          Save Information
        </button>
      </form>
    </div>
  );
};

export default Edit;
