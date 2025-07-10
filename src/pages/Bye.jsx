// src/pages/ByePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.svg";
import rectangle from "../assets/rectangle-780.png";
import sphere from "../assets/sphere-green-glossy0.png";
import { useLocation } from "react-router-dom";

const Bye = () => {
const location = useLocation();
const { name } = location.state || {}; 
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden relative">
      {/* Header */}
      <Header />

      {/* Content layout: responsive - vertical on mobile, horizontal on desktop */}
      <div className="flex flex-col lg:flex-row w-full flex-1 overflow-hidden">
        {/* Left section with background and logo */}
        <div
          className="w-full lg:w-1/2 h-[200px] sm:h-[300px] md:h-[400px] lg:h-auto bg-cover bg-center flex items-center justify-center p-4"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img
            src={logo}
            alt="West Brook Logo"
            className="max-w-[140px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px] max-h-[180px] sm:max-h-[300px] lg:max-h-[500px] w-full h-auto"
          />
        </div>

        {/* Right section */}
        <div className="w-full lg:w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 lg:pt-0 lg:pb-10 min-h-[500px] lg:min-h-full">
          {/* Top bar with Navbar - only show on desktop */}
          <div className="hidden lg:flex w-full justify-between items-center mt-0 mb-10">
            {/* <Navbar /> */}
          </div>

          {/* Decorative Spheres - responsive positioning */}
          <img
            src={sphere}
            alt="Sphere 1"
            className="hidden lg:block absolute w-[80px] sm:w-[100px] xl:w-[150px] h-[80px] sm:h-[100px] xl:h-[150px] left-[10%] xl:left-[20%] top-[30%] xl:top-[40%] rotate-[1.03deg] z-[-1] opacity-60"
          />
          <img
            src={sphere}
            alt="Sphere 2"
            className="hidden lg:block absolute w-[80px] sm:w-[100px] xl:w-[150px] h-[80px] sm:h-[100px] xl:h-[150px] right-[5%] xl:right-[10%] top-[50%] xl:top-[60%] rotate-[1.03deg] z-[-1] opacity-60"
          />

          {/* Bye Card Container */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-7 w-full max-w-xs sm:max-w-md lg:max-w-lg flex-1 justify-center lg:mt-[50px]">
            {/* Bye Card */}
            <div
              className="w-full max-w-[455px] p-5 sm:p-7 lg:p-[35px] lg:px-[38px] flex flex-col gap-3 sm:gap-4 lg:gap-[10px] rounded-2xl lg:rounded-[24px] backdrop-blur-[17.5px] shadow-lg"
              style={{
                background:
                  "linear-gradient(105.46deg, rgba(108, 80, 239, 0.3) 6.53%, rgba(0, 210, 30, 0.3) 51.54%, rgba(108, 80, 239, 0.3) 91.07%)",
              }}
            >
              <p
                className="text-lg sm:text-2xl lg:text-[24px] leading-tight lg:leading-[33px] text-[#070D18] text-center font-serif"
                style={{ fontFamily: '"DM Serif Display", serif' }}
              >
                👋🏾Bye {name}
              </p>

              <div className="w-full text-center text-[#070D18] font-medium text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[42px] space-y-1">
                <p>Thank you for visiting West Brook apartments</p>
                <p>Have a beautiful day.</p>
              </div>
            </div>

            {/* Return to home button */}
            <button className="text-sm sm:text-base lg:text-[14px] px-4 sm:px-6 lg:px-3 py-3 sm:py-4 lg:py-2 flex items-center justify-center gap-2 rounded-lg shadow-md bg-gradient-to-r from-[#00D21E] to-[#00580D] text-white font-medium hover:shadow-lg transition-shadow w-full sm:w-auto">
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <Link to="/" className="block">
                Return to Home
              </Link>
            </button>
          </div>

          {/* Background Decorative Sphere - responsive positioning */}
          <img
            src={sphere}
            alt="Background Sphere"
            className="hidden lg:block absolute right-[5%] xl:right-[-1.8%] bottom-[10%] xl:bottom-[20%] opacity-50 w-[70px] sm:w-[90px] xl:w-[120px] h-[70px] sm:h-[90px] xl:h-[120px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Bye;
