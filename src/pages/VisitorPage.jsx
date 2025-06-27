// src/pages/VisitorPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.svg';
import rectangle from '../assets/rectangle-780.png';
import sphere from '../assets/sphere-green-glossy0.png';
import { useTranslation } from "react-i18next";

const VisitorPage = () => {
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Validation functions
  const validatePhoneNumber = (phone) => {
    // Kenyan phone number formats: +254XXXXXXXXX, 07XXXXXXXX, 01XXXXXXXX
    const phoneRegex = /^(\+254|0)[17]\d{8}$|^(\+254|0)[14]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
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
      return { isValid: false, error: 'Please enter your phone number, email, or number plate' };
    }

    // Check if it's an email (contains @)
    if (trimmedInput.includes('@')) {
      if (validateEmail(trimmedInput)) {
        return { isValid: true, type: 'email' };
      } else {
        return { isValid: false, error: 'Please enter a valid email address (e.g., example@gmail.com)' };
      }
    }

    // Check if it's a phone number (starts with + or 0, contains only digits)
    if (/^(\+|0)/.test(trimmedInput) && /^\+?[\d\s]+$/.test(trimmedInput)) {
      if (validatePhoneNumber(trimmedInput)) {
        return { isValid: true, type: 'phone' };
      } else {
        return { isValid: false, error: 'Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)' };
      }
    }

    // Check if it's a number plate (starts with K and contains letters/numbers)
    if (/^K[A-Z]/i.test(trimmedInput)) {
      if (validateNumberPlate(trimmedInput)) {
        return { isValid: true, type: 'numberplate' };
      } else {
        return { isValid: false, error: 'Please enter a valid Kenyan number plate (e.g., KCA 123A)' };
      }
    }

    // If none of the above, try to give helpful guidance
    return { 
      isValid: false, 
      error: 'Please enter a valid phone number (+254XXXXXXXXX), email (example@gmail.com), or number plate (KCA 123A)' 
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = detectAndValidateInput(details);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    // Clear error and proceed with submission
    setError('');
    console.log('Form submitted with:', details, 'Type:', validation.type);


  //   fetch('https://guestapi.zynamis.co.ke/api/kiosk/visitor/checkin/', {
  //     body: JSON.stringify({ details }),
  //     method: 'POST',
  //   })
  //   .then((res) => res.json())
  //   .then((res) => 
  //   //       if(!res.ok){
  //   //     return 'error'
  //   //   }
  //      console.log('Response:', res))
  //   return;
  //   // // Navigate to welcome back page
  // }
     


    // fetch('url')
    // .then((res) => res.json())
    // .then((data) => setVariable(data))
    navigate('/welcomeback');
  };

  const handleInputChange = (e) => {
    setDetails(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden relative">
      {/* Header */}
      <Header />

      {/* Content layout: stays horizontal even on small screens */}
      <div className="flex flex-row w-full min-w-[768px] flex-1 overflow-hidden">
        {/* Left section with background and logo */}
        <div
          className="w-1/2 h-[200px] lg:h-auto bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img src={logo} alt="West Brook Logo" className="max-w-[200px] max-h-[500px] w-full h-auto overflow-hidden" />
        </div>

        {/* Right form section */}
        <div className="w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-6 pt-0 pb-10">
          {/* Top bar with Navbar */}
          <div className="w-full flex justify-between items-center mt-0 mb-10">
            <Navbar />
          </div>

          {/* Form */}
          <div className="w-full max-w-md text-start mt-10">
            <h2 className="text-xl font-semibold text-[#00580D] mb-3 -ml-7">
              {t('submitDetails')}
            </h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="details" className="block text-sm text-[#00580D] mb-1">
                Phone number / Email / Number plate
              </label>
              <input
                id="details"
                type="text"
                placeholder="e.g., +254712345678, john@gmail.com, or KCA 123A"
                value={details}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-md bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  error ? 'border-red-500' : 'border-green-200'
                }`}
              />
              
              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 text-white rounded-md shadow-md font-medium"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,210,30,1) 0%, rgba(0,88,13,1) 100%)',
                }}
              >
                Submit
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-dashed border-purple-600" />
              <span className="mx-4 text-purple-600 text-sm">or</span>
              <hr className="flex-grow border-t border-dashed border-purple-600" />
            </div>

            {/* QR Instruction */}
            <p className="text-sm text-[#00580D] text-center">
              {t('letScan')}
            </p>
          </div>

          {/* Decorative Sphere */}
          <img
            src={sphere}
            alt="Decorative sphere"
            className="hidden lg:block w-[150px] absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorPage;