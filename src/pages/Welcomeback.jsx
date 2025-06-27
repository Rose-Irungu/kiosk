import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Header from "../components/Header";
import logo from "../assets/logo.svg";
import rectangle from "../assets/rectangle-780.png";
import sphere from "../assets/sphere-green-glossy0.png";
import Navbar from "../components/Navbar";

function Welcomeback() {
  const [visitorName, setVisitorName] = useState("Guest");
  const [visitorRef, setVisitorRef] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data } = await axios.get("https://guestapi.zynamis.co.ke/api/kiosk/visitor/checkin/");
        // console.log("Visitor data:", data);
        setVisitorName(data.visitorName ?? "Visitor");
        setVisitorRef(data.visitorRef ?? "Unknown");
      } catch (err) {
        // console.error("Error fetching visitor data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">
        {/* Left: Image Pane */}
        <div
          className="w-full lg:w-1/2 h-[200px] sm:h-[300px] lg:h-auto bg-cover bg-center flex items-center justify-center p-4"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img
            src={logo}
            alt="West Brook Logo"
            className="max-w-[140px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px] max-h-[180px] sm:max-h-[300px] lg:max-h-[500px] w-full h-auto"
          />
        </div>

        {/* Right: Welcome Message */}
        <div className="w-full lg:w-1/2 bg-[#E6FBE9] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 lg:pt-0 lg:pb-10 min-h-[500px] lg:min-h-full">
          <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6">
            <div
              className="w-full p-4 sm:p-6 rounded-xl border border-blue-500 text-center shadow-md"
              style={{
                background:
                  "linear-gradient(105.46deg, rgba(108, 80, 239, 0.3) 6.53%, rgba(0, 210, 30, 0.3) 51.54%, rgba(108, 80, 239, 0.3) 91.07%)",
              }}
            >
              <h2 className="text-xl sm:text-2xl font-normal text-green-700 mb-2">
                👋🏾 Hi {visitorName}
              </h2>
              <p className="text-sm sm:text-base mb-2">
                Enjoy your stay at West Brook Apartments
              </p>
              <p className="text-sm sm:text-base mb-2">
                Your visitor reference number is:&nbsp;
                <span className="font-semibold text-blue-800">{visitorRef}</span>
              </p>
              <p className="text-sm sm:text-base">
                We’ve also slid this code into your SMS and email.
              </p>
            </div>

            {/* Return Home Button */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-2 text-sm sm:text-base text-white font-medium hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <HomeIcon className="h-5 w-5" />
              <Link to="/">Return to Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcomeback;
