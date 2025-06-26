// src/pages/VisitorPage.jsx
import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.svg';
import rectangle from '../assets/rectangle-780.png';
import sphere from '../assets/sphere-green-glossy0.png';

const ByePage = () => {
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
                    <img src={logo} alt="West Brook Logo" className="max-w-[200px]" />
                </div>

                {/* Right form section */}
                <div className="w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-6 pt-0 pb-10">
                    {/* Top bar with Navbar */}
                    <div className="w-full flex justify-between items-center mt-0 mb-10">
                        <Navbar />
                    </div>

                    {/* Bye Card */}
                    <img
                        src={sphere}
                        alt="Sphere 1"
                        className="absolute w-[150px] h-[150px] left-[718.7px] top-[327px] rotate-[1.03deg] z-[-1]"
                    />
                    <img
                        src={sphere}
                        alt="Sphere 2"
                        className="absolute w-[150px] h-[150px] left-[1055.7px] top-[391px] rotate-[1.03deg] z-[-1]"
                    />



                    <div className="flex flex-col items-center gap-7 w-[455px] h-[247px] mt-[50px]">
                        {/* children here */}
                        <div
                            className="w-[455px] h-[179px] p-[35px] px-[38px] flex flex-col gap-[10px] rounded-[24px] backdrop-blur-[17.5px]"
                            style={{
                                background:
                                    'linear-gradient(105.46deg, rgba(108, 80, 239, 0.3) 6.53%, rgba(0, 210, 30, 0.3) 51.54%, rgba(108, 80, 239, 0.3) 91.07%)',
                            }}
                        >
                            <p className="text-[24px] leading-[33px] text-[#070D18] text-center font-serif" style={{ fontFamily: '"DM Serif Display", serif' }}>
                                👋🏾Bye Jane
                            </p>

                            <div className="w-[379px] h-[63px] text-center text-[#070D18] font-medium text-[16px] leading-[42px]">
                                <p>Thank you for visiting West Brook apartments</p>
                                <p>Have a beautiful day.</p>
                            </div>



                        </div>

                        {/* Return to home button */}
                        <button className=" text-[14px] px-3 py-2 flex items-center justify-center gap-2 rounded-lg shadow-md bg-gradient-to-r from-[#00D21E] to-[#00580D] text-white font-medium">
                            {/* SVG Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>

                            {/* Text */}
                            Return to Home
                        </button>


                    </div>
                    <div>

                    </div>










                </div>




            </div>

            {/* Decorative Sphere */}
            <img
                src={sphere}
                alt="Background Sphere"
                className="absolute  right-[-1.8%] left-[1090px] top-[300px]  opacity-50 w-[120px] h-[120px]"
            />



        </div>

    );
};

export default ByePage;
