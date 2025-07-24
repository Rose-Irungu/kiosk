// src/components/Navbar.jsx - Simple version without i18n
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('en');

  const langs = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'sw', label: 'SWA', name: 'Swahili' },
    { code: 'zh', label: '中文', name: 'Mandarin' },
  ];

  const pick = (code) => {
    setSelected(code);
    setIsOpen(false);
    // You can add logic here to handle language change
    console.log('Language changed to:', code);
  };

  return (
    <nav className="bg-[#e6fbe9] px-6 py-4 w-full">
      <div className="flex  justify-end items-center">
        
        
        {/* dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="flex items-center space-x-2 bg-[#6c50ef] text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <span>{langs.find((l) => l.code === selected)?.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-50">
              {langs.map(({ code, name, label }) => (
                <button
                  key={code}
                  onClick={() => pick(code)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                    selected === code
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{name}</span>
                    <span className="text-sm text-gray-500">{label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* click‑outside overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </nav>
  );
}
