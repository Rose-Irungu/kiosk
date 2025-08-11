import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.svg";
import rectangle from "../assets/rectangle-780.png";
import sphere from "../assets/sphere-green-glossy0.png";
import { ChevronDown } from "lucide-react";

const ErrorPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  // const languages = [
  //   { code: "EN", name: "English" },
  //   { code: "FR", name: "Français" },
  //   { code: "SWA", name: "Swahili" },
  //   { code: "橘子", name: "Mandarin" },
  // ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.code);
    setIsDropdownOpen(false);
  };
  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden relative">
      
      <Header />

     
      <div className="flex flex-col lg:flex-row w-full flex-1 overflow-hidden">
      
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

      
        <div className="w-full lg:w-1/2 bg-[#E6FBE9] relative flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 lg:pt-0 lg:pb-10 min-h-[600px] lg:min-h-full">
         
          <div className="hidden lg:flex w-full justify-between items-center mt-0 mb-10">
            <nav className="bg-[#e6fbe9] px-6 py-4 shadow-none w-full">
              <div className="flex justify-between items-center w-full">
             
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-2 bg-[#F83162] rounded-sm "></div>
                  <div className="w-12 h-2 bg-[#F83162] rounded-sm "></div>
                  <div className="w-12 h-2 bg-[#F83162] rounded-sm "></div>
                </div>

           
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 bg-[#6c50ef] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                  >
                    <span className="font-medium">{selectedLanguage}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                 
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageSelect(language)}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150 ${
                            selectedLanguage === language.code
                              ? "bg-indigo-50 text-indigo-600 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{language.name}</span>
                            <span className="text-sm text-gray-500">
                              {language.code}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
              )}
            </nav>
          </div>

       
          <div className="flex flex-col items-start gap-6 text-[#F83162] mt-10 px-4 ">
           
            <p className="text-[24px] font-semibold leading-[31px]">Oops!</p>

           
            <p className="max-w-md text-[16px] font-semibold leading-[21px]">
              Visitor information not found. Go back to enter correct details or
              clarify with security.
            </p>

          
            <div className="flex flex-row items-center justify-center gap-8 mt-4">
             
              <Link
                to="/"
                className="w-[212px] h-[57px] px-3 py-2 bg-[#00D21E] text-white font-medium rounded-xl shadow-md flex items-center justify-center"
              >
                Back to check in
              </Link>

              <Link
                to="/checkout"
                className="w-[212px] h-[57px] px-3 py-2 bg-[#6C50EF] text-white font-medium rounded-xl shadow-md flex items-center justify-center"
              >
                Back to check out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
