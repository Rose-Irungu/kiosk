import React from 'react';
import logo from "../assets/logo.svg";
import rectangle from "../assets/rectangle-780.png";
import sphere from "../assets/sphere-green-glossy0.png";
import Header from "../components/Header";

function GuestRegistrationPage() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <Header />
      <main className="flex flex-1 flex-col lg:flex-row">
        <section
            className="relative flex h-48 w-full flex-shrink-0 items-center justify-center bg-cover bg-center lg:h-auto lg:w-1/2"
            style={{ backgroundImage: `url(${rectangle})` }}>

            <img src={logo} alt="West Brook Logo" className="w-32 md:w-44 lg:w-60 xl:w-72" />
        </section>
        <section className="relative flex w-full flex-col items-center bg-[#E6FBE9] px-4 pb-12 pt-4 lg:w-1/2 lg:px-10"></section>
      </main>
    </div>
  )
}

export default GuestRegistrationPage;
