import React, { useState, useEffect } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header className="bg-[#00580d] text-white px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left gap-2 sm:gap-0">
        {/* Left: Date */}
        <div className="text-sm sm:text-base lg:text-lg">{currentDate}</div>

        {/* Center: Title */}
        <div className="text-lg sm:text-xl lg:text-2xl font-semibold uppercase mx-auto">
          Visitor Gate
        </div>

        {/* Right: Time */}
        <div className="text-sm sm:text-base lg:text-lg">{timeString}</div>
      </div>
    </header>
  );
};

export default Header;
