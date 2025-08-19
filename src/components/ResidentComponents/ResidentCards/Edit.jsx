import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editVisitor } from "../../../services/visitsuser";

const Edit = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    profile_pic: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData({
        full_name: initialData.full_name || "",
        phone_number: initialData.phone_number || "",
        email: initialData.email || "",
        profile_pic: null, 
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
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = new FormData();
      data.append("full_name", formData.full_name);
      data.append("phone_number", formData.phone_number);
      data.append("email", formData.email);
      if (formData.profile_pic) {
        data.append("profile_pic", formData.profile_pic);
      }

      await editVisitor(initialData.id, data);
      navigate("/resident/dashboard");
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
            onClick={onClose}
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

        {/* Phone */}
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

        {/* Email */}
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

        {/* Photo */}
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

        {/* Save Button */}
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
