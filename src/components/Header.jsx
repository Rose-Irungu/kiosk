import React, { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

 

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#00580d] relative z-50">
     
      <div className=" text-white px-5 text-sm   tracking-wide">
        {currentDate}
      </div>
      
     
      <div className="text-white text-2xl  tracking-widest uppercase text-center mr-45 flex-1 mx-5">
        VISITOR GATE
      </div>
      
      
      <div className="flex items-center gap-5">
        
        <div className="text-white text-lg  tracking-wide min-w-fit">
          {timeString}
        </div>
        
       
      </div>
    </header>
  );
};

export default Header;