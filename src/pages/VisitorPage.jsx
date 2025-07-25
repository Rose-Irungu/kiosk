// src/pages/VisitorPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.svg";
import rectangle from "../assets/rectangle-780.png";
import sphere from "../assets/sphere-green-glossy0.png";
import { useTranslation } from "react-i18next";
import { kioskService } from "../services/kiosk";
import axios from "axios";

const VisitorPage = () => {
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+254|0)[17]\d{8}$|^(\+254|0)[14]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNumberPlate = (plate) => {
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

    return {
      isValid: false,
      error:
        "Please enter a valid phone number (+254XXXXXXXXX), email (example@gmail.com), or number plate (KCA 123A)",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = detectAndValidateInput(details);

    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setError("");
    setIsSubmitting(true);

    const finalForm = {
      email: details,
    };

    try {
      const response = await kioskService.checkIn(finalForm);

      console.log("Response:", response.data.ref_number);
      navigate("/welcomeback", {
        state: {
          refNumber: response.data.reference_no,
          full_name: response.data.full_name,
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      setError(
        error.response?.data?.message ||
          "An error occurred while submitting your details. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setDetails(e.target.value);

    if (error) {
      setError("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden relative">
      <Header />

      <div className="flex flex-col lg:flex-row w-full flex-1 overflow-hidden">
        <div
          className="w-full lg:w-1/2 h-[250px] sm:h-[300px] lg:h-auto bg-cover bg-center flex items-center justify-center p-4"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img
            src={logo}
            alt="West Brook Logo"
            className="max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] max-h-[200px] sm:max-h-[300px] lg:max-h-[500px] w-full h-auto animate-bounce-once"
          />
        </div>

        <div className="w-full lg:w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 lg:pt-0 lg:pb-10 min-h-[600px] lg:min-h-full">
          <div className="hidden lg:flex w-full justify-between items-center mt-0 mb-10">
            <Navbar />
          </div>

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
                 Email
                </label>
                <input
                  id="details"
                  type="email"
                  placeholder="john@gmail.com"
                  required
                  value={details}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-md bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                    error ? "border-red-500" : "border-green-200"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs sm:text-sm leading-tight">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 sm:py-4 text-white rounded-md shadow-md font-medium text-sm sm:text-base hover:shadow-lg transition-shadow ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,210,30,1) 0%, rgba(0,88,13,1) 100%)",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>

            <div className="flex items-center my-6 sm:my-8">
              <hr className="flex-grow border-t border-dashed border-purple-600" />
              <span className="mx-3 sm:mx-4 text-purple-600 text-xs sm:text-sm">
                or
              </span>
              <hr className="flex-grow border-t border-dashed border-purple-600" />
            </div>

            <p className="text-xs sm:text-sm text-[#00580D] text-center">
              {t("let Security Scan the QR code sent to your email")}
            </p>
          </div>

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
