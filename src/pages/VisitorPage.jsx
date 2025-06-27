// src/pages/VisitorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.svg';
import rectangle from '../assets/rectangle-780.png';
import sphere from '../assets/sphere-green-glossy0.png';
import { useTranslation } from "react-i18next";

const VisitorPage = () => {
  const { t } = useTranslation();

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

            <label htmlFor="details" className="block text-sm text-[#00580D] mb-1">
              {t('visitorCred')} 
            </label>
            <input
              id="details"
              type="text"
              placeholder={t('enterDetails')}
              className="w-full px-4 py-3 border-2 border-green-200 rounded-md bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              className="w-full py-3 text-white rounded-md shadow-md"
              style={{
                background: 'linear-gradient(90deg, rgba(0,210,30,1) 0%, rgba(0,88,13,1) 100%)',
              }}
            >
              <Link to="/welcomeback" className="text-white font-medium">  {t('submit')}</Link>
            
            </button>

            {/* OR Divider */}
            <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-dashed border-purple-600" />
            <span className="mx-4 text-purple-600 text-sm">{t('or')}</span>
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
