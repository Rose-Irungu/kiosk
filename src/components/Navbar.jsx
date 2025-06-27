// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(i18n.language.split('-')[0] || 'en');

  const langs = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'sw', label: 'SWA', name: 'Swahili' },
    { code: 'zh', label: '中文', name: 'Mandarin' },
  ];

  // sync if something else (LanguageDetector) changes the language
  useEffect(() => {
    const onChange = (lng) => setSelected(lng.split('-')[0]);
    i18n.on('languageChanged', onChange);
    return () => i18n.off('languageChanged', onChange);
  }, [i18n]);

  const pick = (code) => {
    i18n.changeLanguage(code); // async but returns a promise
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#e6fbe9] px-6 py-4 w-full">
      <div className="flex justify-between items-center">
        {/* colour bars */}
        <div className="flex space-x-2">
          <div className="w-12 h-2 bg-[#08cd24] border border-[#009515] rounded-sm" />
          <div className="w-12 h-2 bg-[#6c50ef] border border-[#4D39AA] rounded-sm" />
          <div className="w-12 h-2 bg-[#6c50ef] border border-[#4D39AA] rounded-sm" />
        </div>

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
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
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
