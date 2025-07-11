import React from 'react';
import logo from "../../assets/logo.svg";
// import rectangle from "../../assets/rectangle-780.png";
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
        <section className="relative flex w-full flex-col items-center bg-[#E6FBE9] px-4 pb-12 pt-4 lg:w-1/2 lg:px-10">
          <GuestCheckInForm />
        </section>
      </main>
    </div>
  );
}

export default GuestRegistrationPage;
