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
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden relative">
      {/* Header */}
      <Header />

      {/* Content layout: responsive - vertical on mobile, horizontal on desktop */}
      <div className="flex flex-col lg:flex-row w-full flex-1 overflow-hidden ">
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
        <div className="w-full lg:w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 lg:pt-0 lg:pb-10 min-h-[500px] lg:min-h-full ">
          {/* Top bar with Navbar - only show on desktop */}
          <div className="hidden lg:flex w-full justify-between items-center mt-0 mb-10">
            <Navbar />
          </div>

          {/* Form */}
          <div className="w-full max-w-sm sm:max-w-md text-center flex-1 flex flex-col justify-center lg:mt-10 ">
            <h2 className="text-black font-bold text-xl sm:text-2xl mb-3 ">
              Welcome To
            </h2>

            <label
              htmlFor="details"
              className="block text-[#00580D] font-bold text-lg sm:text-xl mb-6"
            >
              Westbrook Apartments
            </label>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 mt-6">
              {/* Check In Button */}
              <button className="flex flex-col items-center w-full sm:w-auto min-w-[140px] p-3 sm:p-4 rounded-md shadow-md bg-gradient-to-r from-green-500 via-green-500 to-green-600 hover:from-green-600 hover:via-green-600 hover:to-green-700 active:from-green-700 active:via-green-700 active:to-green-800 transition-all duration-200">
                <img src={download} alt="Enter icon" className="w-5 h-6 sm:w-6 sm:h-7 mb-2 sm:mb-3" />
                <span className="text-white text-sm sm:text-base lg:text-lg font-medium text-center">
                  <Link to="/visitorpage" className="block">Check in guest</Link>
                </span>
              </button>

              {/* Check Out Button */}
              <button className="flex flex-col items-center w-full sm:w-auto min-w-[140px] p-3 sm:p-4 rounded-md shadow-md bg-gradient-to-r from-[#5c4fa3] to-[#4a3d85] hover:from-[#4a3d85] hover:to-[#3d3268] active:from-[#3d3268] active:to-[#302654] transition-all duration-200">
                <img
                  src={out}
                  alt="Exit icon"
                  className="w-5 h-6 sm:w-6 sm:h-7 mb-2 sm:mb-3 transform  fill-white"
                />
                <span className="text-white text-sm sm:text-base lg:text-lg font-medium text-center">
                  <Link to="/verify" className="block">Check out guest</Link>
                </span>
              </button>
            </div>
          </div>

          {/* Decorative Sphere - responsive positioning */}
          <img
            src={sphere}
            alt="Decorative sphere"
            className="hidden lg:block w-[200px] xl:w-[300px] absolute bottom-0 right-0 translate-x-1/3 xl:translate-x-1/2 translate-y-1/3 xl:translate-y-1/2 opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;