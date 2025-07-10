import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import rectangle from "../../assets/rectangle-780.png";
import sphere from "../../assets/sphere-green-glossy0.png";
import Header from "../../components/Header";

function GuestRegSuccessPage() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleClose = () => {
    navigate('/'); // Redirects to the Home page
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-white">
      {/* Header hidden on small screens */}
      <div className="hidden lg:block">
        <Header />
      </div>

      <main className="relative flex flex-col lg:flex-row w-full min-h-screen">
        {/* Background section */}
        <section
          className="absolute inset-0 z-0 w-full min-h-screen rounded-[24px] bg-cover bg-center lg:static lg:w-1/2 lg:rounded-none"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={logo}
              alt="West Brook Logo"
              className="w-32 md:w-44 lg:w-60 xl:w-72"
            />
          </div>
        </section>

        {/* Foreground section */}
        <section className="
          relative z-10 mx-[15px] my-[15px] h-[calc(100vh-30px)] flex flex-col items-center 
          rounded-[24px] bg-[#E6FBE9] px-4 pt-[20px] pb-[20px] shadow-lg backdrop-blur-sm
          lg:static lg:mx-0 lg:my-0 lg:min-h-screen lg:w-1/2 lg:rounded-none lg:shadow-none 
          lg:px-10 lg:justify-center
        ">
          {/* Sphere - Bottom Left */}
          <img
            src={sphere}
            alt="Decorative Sphere"
            className="absolute bottom-0 left-0 w-24 md:w-32 lg:w-36 xl:w-40 opacity-20"
          />

          {/* Sphere - Top Right */}
          <img
            src={sphere}
            alt="Decorative Sphere"
            className="absolute top-0 right-0 w-20 md:w-28 lg:w-32 xl:w-36 opacity-20"
          />

          {/* Logo */}
          <img src={logo} className="absolute top-[227px] w-[150px] h-[104.83px]" />

          {/* Success message */}
          <div className="absolute flex justify-center w-[297px] h-[124px] top-[352px] py-[10px] gap-[10px]">
            <p className="w-[297px] h-[104px] font-dmsans font-normal text-[20px] leading-[100%] tracking-normal mx-auto text-[#00580D] text-center">
              Your details have been successfully submitted. An email and text with your check in details have been sent to you.
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute flex items-center justify-center w-[136px] h-[42px] top-[483px] rounded-[24px] px-[18px] gap-[10px] bg-[#00D21E]"
          >
            <span className="text-white text-center font-dmsans font-normal text-[16px] leading-[100%] tracking-normal">
              Close
            </span>
          </button>
        </section>
      </main>
    </div>
  );
}

export default GuestRegSuccessPage;
