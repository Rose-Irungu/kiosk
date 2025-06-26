// src/components/Navbar.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
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
    <nav className="bg-[#e6fbe9] px-6 py-4 shadow-none w-full">
      <div className="flex justify-between items-center w-full">
        {/* Three colored rectangles on the left */}
        <div className="flex items-center space-x-2">
          <div className="w-12 h-2 bg-[#08cd24] rounded-sm shadow-sm"></div>
          <div className="w-12 h-2 bg-[#6c50ef] rounded-sm shadow-sm"></div>
          <div className="w-12 h-2 bg-[#6c50ef] rounded-sm shadow-sm"></div>
        </div>

        {/* Language dropdown on the right */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-[#6c50ef] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            <span className="font-medium">{selectedLanguage}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
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
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150 ${
                    selectedLanguage === language.code
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
  );
}
