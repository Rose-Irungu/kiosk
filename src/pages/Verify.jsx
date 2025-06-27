// src/pages/VisitorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.svg';
import rectangle from '../assets/rectangle-780.png';
import sphere from '../assets/sphere-green-glossy0.png';

const Verify = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
      {/* Header */}
      <Header />

      {/* Responsive layout: column on mobile, row on lg and up */}
      <div className="flex flex-col lg:flex-row w-full flex-1 overflow-hidden">
        {/* Left section with background and logo */}
        <div
          className="w-full lg:w-1/2 h-[200px] sm:h-[300px] lg:h-auto bg-cover bg-center flex items-center justify-center p-4"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img
            src={logo}
            alt="West Brook Logo"
            className="max-w-[140px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px] max-h-[180px] sm:max-h-[300px] lg:max-h-[500px] w-full h-auto"
          />
        </div>

        {/* Right form section */}
        <div className="w-full lg:w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 lg:pt-0 lg:pb-10 min-h-[500px] lg:min-h-full">
          {/* Top bar with Navbar */}
          <div className="w-full flex justify-between items-center mt-0 mb-8 sm:mb-10">
            <Navbar />
          </div>

          {/* Form */}
          <div className="w-full max-w-sm sm:max-w-md text-start mt-4 sm:mt-10">
            <h2 className="text-lg sm:text-xl font-semibold text-[#00580D] mb-4">
              Submit your details below
            </h2>

            <label htmlFor="details" className="block text-sm text-[#00580D] mb-1">
              Visitor Registration number
            </label>
            <input
              id="details"
              type="text"
              placeholder="Enter your details"
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              className="w-full py-3 text-white rounded-xl shadow-md"
              style={{
                background: 'linear-gradient(90deg, rgba(0,210,30,1) 0%, rgba(0,88,13,1) 100%)',
              }}
            >
              <Link to="/bye" className="text-white font-medium block text-center">Submit</Link>
            </button>

            {/* OR Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-dashed border-purple-600" />
              <span className="mx-4 text-purple-600 text-sm">or</span>
              <hr className="flex-grow border-t border-dashed border-purple-600" />
            </div>

            {/* QR Instruction */}
            <p className="text-sm text-[#00580D] text-center">
              Let security scan the QR code sent to your email.
            </p>
          </div>

          {/* Decorative Sphere */}
          <img
            src={sphere}
            alt="Decorative sphere"
            className="hidden lg:block w-[90px] sm:w-[120px] xl:w-[150px] h-auto absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-60"
          />
        </div>
      </div>
    </div>
  );
};

export default Verify;
