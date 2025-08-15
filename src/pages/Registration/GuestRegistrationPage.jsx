import React from 'react';
import logo from "../../assets/logo.svg";
import rectangle from "../../assets/rectangle-127.png";
import sphere from "../../assets/sphere-green-glossy0.png";
import Header from "../../components/Header";
import GuestCheckInForm from "../../components/forms/GuestCheckInForm";

function GuestRegistrationPage() {
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
        <section className="relative z-10 mx-[10px] my-[15px] flex flex-col items-center 
          rounded-[24px]  px-4 pt-[20px] pb-[20px] shadow-lg backdrop-blur-sm
          lg:static lg:mx-0 lg:my-0 lg:min-h-screen lg:w-1/2 lg:rounded-none lg:shadow-none 
          lg:px-10 ">
          <GuestCheckInForm />
        </section>
      </main>
    </div>
  );
}

export default GuestRegistrationPage;
