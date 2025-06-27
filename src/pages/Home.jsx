// src/pages/VisitorPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import download from "../assets/download.svg";
import out from "../assets/out.svg";
import sphere from "../assets/sphere-green-glossy0.png";
import logo from "../assets/logo.svg";
import rectangle from "../assets/rectangle-780.png";
const HomePage = () => {
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
          <img
            src={logo}
            alt="West Brook Logo"
            className="max-w-[200px] max-h-[500px] w-full h-auto overflow-hidden"
          />
        </div>

        {/* Right form section */}
        <div className="w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-6 pt-0 pb-10">
          {/* Top bar with Navbar */}
          <div className="w-full flex justify-between items-center mt-0 mb-10">
            <Navbar />
          </div>

          {/* Form */}
          <div className="w-full max-w-md text-start mt-10">
            <h2 className="text-black font-bold text-center text-xl mb-3">
              Welcome To
            </h2>

            <label
              htmlFor="details"
              className="block text-[#00580D] font-bold text-center mb-1"
            >
              Westbrook Apartments
            </label>

            <div className="flex justify-center gap-x-20 mt-6">
              {/* Check In Button */}
              <button className="flex flex-col items-center w-full sm:w-auto p-4 rounded-md shadow-md bg-gradient-to-r from-green-500 via-green-500 to-green-600 hover:from-green-600 hover:via-green-600 hover:to-green-700 active:from-green-700 active:via-green-700 active:to-green-800 transition-all duration-200">
                <img src={download} alt="Enter icon" className="w-6 h-7 mb-5" />
                <span className="text-white text-lg font-medium">
                  <Link to="/visitorpage">Check in guest</Link>
                </span>
              </button>

              {/* Check Out Button */}
              <button className="flex flex-col items-center w-full sm:w-auto p-4 rounded-md shadow-md bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 active:from-blue-950 active:to-blue-800 transition-all duration-200">
                <img
                  src={out}
                  alt="Exit icon"
                  className="w-6 h-7 mb-2 transform rotate 180 fill-white"
                />
                <span className="text-white text-lg font-medium">
                  <Link to="/verify">Check out guest</Link>
                </span>
              </button>
            </div>
          </div>
          {/* Decorative Sphere */}
          <img
            src={sphere}
            alt="Decorative sphere"
            className="hidden lg:block w-[300px] absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
