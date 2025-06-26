// src/pages/VisitorPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.svg';
import rectangle from '../assets/rectangle-780.png';
import sphere from '../assets/sphere-green-glossy0.png';
import { ChevronDown } from 'lucide-react';

const ErrorPage = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('EN');

    const languages = [
        { code: 'EN', name: 'English' },
        { code: 'FR', name: 'Français' },
        { code: 'SWA', name: 'Swahili' },
        { code: '橘子', name: 'Mandarin' },
    ];

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language.code);
        setIsDropdownOpen(false);
    };
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
                        <nav className="bg-[#e6fbe9] px-6 py-4 shadow-none w-full">
                            <div className="flex justify-between items-center w-full">
                                {/* Three colored rectangles on the left */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-12 h-2 bg-[#F83162] rounded-sm "></div>
                                    <div className="w-12 h-2 bg-[#F83162] rounded-sm "></div>
                                    <div className="w-12 h-2 bg-[#F83162] rounded-sm "></div>
                                </div>

                                {/* Language dropdown on the right */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-2 bg-[#6c50ef] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                                    >
                                        <span className="font-medium">{selectedLanguage}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            {languages.map((language) => (
                                                <button
                                                    key={language.code}
                                                    onClick={() => handleLanguageSelect(language)}
                                                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150 ${selectedLanguage === language.code
                                                        ? 'bg-indigo-50 text-indigo-600 font-medium'
                                                        : 'text-gray-700'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span>{language.name}</span>
                                                        <span className="text-sm text-gray-500">{language.code}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Overlay to close dropdown when clicking outside */}
                            {isDropdownOpen && (
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsDropdownOpen(false)}
                                ></div>
                            )}
                        </nav>
                    </div>

                    {/* Ooops Card */}
                    <div className="flex flex-col items-start gap-6 text-[#F83162] mt-10 px-4 text-left">
                        {/* Heading */}
                        <p className="text-[24px] font-semibold leading-[31px]">Oops!</p>

                        {/* Message */}
                        <p className="max-w-md text-[16px] font-semibold leading-[21px]">
                            Visitor information not found. Go back to enter correct details or clarify with security.
                        </p>

                        {/* Optional button row or icons – Frame 25 */}
                        <div className="flex items-center justify-center gap-8 mt-4">
                            {/* Example buttons/icons */}
                            <button className="w-[212px] h-[57px] px-3 py-2 bg-[#00D21E] text-white font-medium rounded-xl shadow-md flex items-center justify-center">
                                Back to check in
                            </button>
                            <button className="w-[212px] h-[57px] px-3 py-2 bg-[#6C50EF] text-white font-medium rounded-xl shadow-md flex items-center justify-center">
                                Back to check out
                            </button>
                        </div>
                    </div>
















                </div>




            </div>



        </div>

    );
};

export default ErrorPage;
