import React, { useState, useEffect } from 'react';
import { Upload, ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import SecurityLayout from '../../components/SecurityComponents/SecurityLayout.jsx';
import { securityRegistervisitor } from '../../services/securityVisitorRegister.js';
import { userService } from "../../services/user";
import { useLocation } from 'react-router-dom';




export default function VisitorRegistration() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    visitor_type: '',
    visit_date: '',
    unit_number: '',
    plate_number: '',
    photo: null
  });

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const data = await userService.getAllUnits();
        setUnits(data);
      } catch (error) {
        console.error('Error loading units:', error);
      }
    };

    fetchUnits();
  }, []);


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [houseNumbers, setHouseNumbers] = useState([]);
  const [units, setUnits] = useState([]);

  const location = useLocation();
  const editUser = location.state?.editUser;


  const validate = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    } else if (!/^07\d{8}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be like 07XXXXXXXX.";
    }

    if (!formData.visitor_type) newErrors.visitor_type = "Please select a visitor type.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      await securityRegistervisitor(payload);
      alert("Visitor successfully registered!");
      navigate('/security/dashboard');
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register visitor. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SecurityLayout>
      <div className="flex flex-col items-start p-6 gap-8 w-full max-w-md md:max-w-xl bg-white rounded-[10px] shadow-md mx-auto mt-10">
        <h2 className="text-2xl font-bold text-[#495057] font-['Inter']">
          Visitor Registration
        </h2>

        <form className="w-full font-['Roboto'] gap-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col gap-2 w-full mt-1">
            <label className="text-sm text-[#495057]">Full Name<span className='text-[#E61C11]'>*</span></label>
            <input
              type="text"
              placeholder='e.g John Doe'
              name='full_name'
              value={formData.full_name}
              onChange={handleChange}
              className={`h-12 px-4 rounded-lg bg-[#F4F4F4] w-full focus:outline-none ${errors.full_name ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-600'}`}
            />
            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
          </div>

          {/* Email + Phone */}
          <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label className="text-sm text-[#495057]">Email<span className="text-[#E61C11]">*</span></label>
              <input
                type="text"
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={`h-12 px-4 rounded-lg bg-[#F4F4F4] w-full focus:outline-none ${errors.email ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-600'}`}
                placeholder='e.g john@gmail.com'
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label className="text-sm text-[#495057]">Phone No.<span className="text-[#E61C11]">*</span></label>
              <input
                type="text"
                name='phone_number'
                value={formData.phone_number}
                onChange={handleChange}
                className={`h-12 px-4 rounded-lg bg-[#F4F4F4] w-full focus:outline-none ${errors.phone_number ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-600'}`}
                placeholder='e.g 07XXXXXXXX'
              />
              {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
            </div>
          </div>

          {/* Visitor Type */}
          <div className="flex flex-col gap-2 w-full mt-4">
            <label className="text-sm text-[#495057]">Visitor Type<span className='text-[#E61C11]'>*</span></label>
            <div className="relative">
              <select
                name='visitor_type'
                value={formData.visitor_type}
                onChange={handleChange}
                className={`appearance-none h-12 px-4 pr-10 rounded-lg bg-[#F4F4F4] w-full text-[#495057] focus:outline-none ${errors.visitor_type ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-600'}`}
              >
                <option value="">Select type</option>
                <option value="visitor">Visitor</option>
                <option value="service_provider">Service Provider</option>
                <option value="company_visitor">Company Visitor</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#495057] pointer-events-none w-4 h-4" />
            </div>
            {errors.visitor_type && <p className="text-red-500 text-sm">{errors.visitor_type}</p>}
          </div>

          {/* House Number & Car Plate */}
          <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label className="text-sm text-[#495057]">House Number</label>
              <div className='relative'>

                <select
                name="unit_number"

                value={formData.unit_number}
                onChange={handleChange}
                className="appearance-none h-12 px-4 rounded-lg bg-[#F4F4F4] w-full focus:outline-none focus:ring-2 focus:ring-green-600"

              >
                <option value="">Select Unit Number</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.unit_name}>
                    {unit.unit_name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#495057] pointer-events-none w-4 h-4" />
              </div>
              

            </div>

            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label className="text-sm text-[#495057]">Car Number Plate</label>
              <input
                type="text"
                name='plate_number'
                value={formData.plate_number}
                onChange={handleChange}
                className="h-12 px-4 rounded-lg bg-[#F4F4F4] w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder='e.g KDQ XXXX'
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="flex flex-col gap-2 w-full mt-4">
            <label className="text-sm text-[#495057]">Photo</label>
            <label
              htmlFor="photo"
              className="flex flex-col justify-center items-center gap-2 w-full h-[98px] bg-[#F4F4F4] rounded-[4px] cursor-pointer"
            >
              <Upload className="text-[#495057]" />
              <span className="text-sm text-[#6C757D]">
                {formData.photo ? formData.photo.name : "Upload a Photo"}
              </span>
              <input
                id="photo"
                type="file"
                name="photo"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className={`flex items-center justify-center gap-4 w-full h-12 text-white rounded-md transition mt-4 text-sm ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#005E0E] hover:bg-green-700 shadow"}`}
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </SecurityLayout>
  );
}
