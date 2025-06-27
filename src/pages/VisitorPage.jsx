// src/pages/VisitorPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.svg";
import rectangle from "../assets/rectangle-780.png";
import sphere from "../assets/sphere-green-glossy0.png";
import { useTranslation } from "react-i18next";
import axios from "axios";

const VisitorPage = () => {
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Validation functions
  const validatePhoneNumber = (phone) => {
   
    const phoneRegex = /^(\+254|0)[17]\d{8}$|^(\+254|0)[14]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNumberPlate = (plate) => {
    // Kenyan number plate format: KXX XXXZ or KXXX XXXZ
    const plateRegex = /^K[A-Z]{2,3}\s\d{3}[A-Z]$/i;
    return plateRegex.test(plate.toUpperCase());
  };

  const detectAndValidateInput = (input) => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return {
        isValid: false,
        error: "Please enter your phone number, email, or number plate",
      };
    }

    // Check if it's an email (contains @)
    if (trimmedInput.includes("@")) {
      if (validateEmail(trimmedInput)) {
        return { isValid: true, type: "email" };
      } else {
        return {
          isValid: false,
          error: "Please enter a valid email address (e.g., example@gmail.com)",
        };
      }
    }

    // Check if it's a phone number (starts with + or 0, contains only digits)
    if (/^(\+|0)/.test(trimmedInput) && /^\+?[\d\s]+$/.test(trimmedInput)) {
      if (validatePhoneNumber(trimmedInput)) {
        return { isValid: true, type: "phone" };
      } else {
        return {
          isValid: false,
          error:
            "Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)",
        };
      }
    }

    // Check if it's a number plate (starts with K and contains letters/numbers)
    if (/^K[A-Z]/i.test(trimmedInput)) {
      if (validateNumberPlate(trimmedInput)) {
        return { isValid: true, type: "numberplate" };
      } else {
        return {
          isValid: false,
          error: "Please enter a valid Kenyan number plate (e.g., KCA 123A)",
        };
      }
    }

    // If none of the above, try to give helpful guidance
    return {
      isValid: false,
      error:
        "Please enter a valid phone number (+254XXXXXXXXX), email (example@gmail.com), or number plate (KCA 123A)",
    };
  };




const handleSubmit = async (e) => {
  e.preventDefault();

   const finalForm = {
    identifier: details,
  };

  try {
    const response = await axios.post(
      "https://guestapi.zynamis.co.ke/api/kiosk/visitor/checkin/",
      
        finalForm,
      
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response:", response.data);
    navigate("/welcomeback");

  } catch (error) {
    console.error("Error submitting form:", error);
    
    setError(error.response?.data?.message || "An error occurred while submitting your details. Please try again.");
  }
};


  const handleInputChange = (e) => {
    setDetails(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden relative">
      {/* Header */}
      <Header />

      {/* Content layout: responsive - vertical on mobile, horizontal on desktop */}
      <div className="flex flex-col lg:flex-row w-full flex-1 overflow-hidden">
        {/* Left section with background and logo */}
        <div
          className="w-full lg:w-1/2 h-[250px] sm:h-[300px] lg:h-auto bg-cover bg-center flex items-center justify-center p-4"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img
            src={logo}
            alt="West Brook Logo"
            className="max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] max-h-[200px] sm:max-h-[300px] lg:max-h-[500px] w-full h-auto"
          />
        </div>

        {/* Right form section */}
        <div className="w-full lg:w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 lg:pt-0 lg:pb-10 min-h-[600px] lg:min-h-full">
          {/* Top bar with Navbar - only show on desktop */}
          <div className="hidden lg:flex w-full justify-between items-center mt-0 mb-10">
            <Navbar />
          </div>

          {/* Form */}
          <div className="w-full max-w-sm sm:max-w-md text-start flex-1 flex flex-col justify-center lg:mt-10">
            <h2 className="text-lg sm:text-xl font-semibold text-[#00580D] mb-4 sm:mb-6 text-center lg:text-left lg:-ml-7">
              {t("submitDetails")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm text-[#00580D] mb-2"
                >
                  Phone number / Email / Number plate
                </label>
                <input
                  id="details"
                  type="text"
                  placeholder="e.g., +254712345678, john@gmail.com, or KCA 123A"
                  value={details}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-md bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                    error ? "border-red-500" : "border-green-200"
                  }`}
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-xs sm:text-sm leading-tight">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 sm:py-4 text-white rounded-md shadow-md font-medium text-sm sm:text-base hover:shadow-lg transition-shadow"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,210,30,1) 0%, rgba(0,88,13,1) 100%)",
                }}
              >
                <Link
                  to="/welcomeback">Submit</Link>
                
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center my-6 sm:my-8">
              <hr className="flex-grow border-t border-dashed border-purple-600" />
              <span className="mx-3 sm:mx-4 text-purple-600 text-xs sm:text-sm">
                or
              </span>
              <hr className="flex-grow border-t border-dashed border-purple-600" />
            </div>

            {/* QR Instruction */}
            <p className="text-xs sm:text-sm text-[#00580D] text-center">
              {t("letScan")}
            </p>
          </div>

          {/* Decorative Sphere - responsive positioning */}
          <img
            src={sphere}
            alt="Decorative sphere"
            className="hidden lg:block w-[120px] xl:w-[150px] absolute bottom-0 right-0 translate-x-1/3 xl:translate-x-1/2 translate-y-1/3 xl:translate-y-1/2 opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorPage;
