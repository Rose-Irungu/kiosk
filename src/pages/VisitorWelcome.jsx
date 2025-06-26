import React, { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Header from '../components/Header';
import logo from '../assets/logo.svg';
import rectangle from '../assets/rectangle-780.png';
import sphere from '../assets/sphere-green-glossy0.png';

function VisitorWelcome() {
  //Local state 
  const [visitorName, setVisitorName] = useState("Guest");
  const [visitorRef, setVisitorRef]   = useState("");   // reference #

  //fetch visitor data once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/visitor/welcome");
        console.log("Visitor data:", data);

        // Expecting { visitorName, visitorRef } back from API
        setVisitorName(data.visitorName ?? "Visitor");
        setVisitorRef(data.visitorRef  ?? "Unknown");
      } catch (err) {
        console.error("Error fetching visitor data:", err);
      }
    };

    fetchData();
  }, []);

  //Render
  return (
    <>
    <Header />
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Image Pane*/}
        <div
          className="w-1/2 h-[200px] lg:h-auto bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img src={logo} alt="West Brook Logo" className="max-w-[200px] max-h-[500px] w-full h-auto overflow-hidden" />
        </div>

      {/*Welcome Pane*/}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">
        <div className="flex w-full max-w-md flex-col items-start gap-4">
          <div className="flex flex-col gap-1 rounded-xl border border-blue-500 bg-blue-100 p-4 text-center">
            <h2 className="text-2xl font-normal text-green-700">
              👋🏾 Hi&nbsp;{visitorName}
            </h2>
            <p className="mx-2 mb-3">
              Enjoy your stay at West&nbsp;Brook&nbsp;Apartments
            </p>
            <p className="mx-2 mb-3">
              Your visitor reference number is:&nbsp;
              <span className="font-semibold text-blue-800">{visitorRef}</span>
            </p>
            <p className="mx-2 mb-3">
              We’ve also slid this code into your SMS and email.
            </p>
          </div>

          <button
            type="button"
            className="mb-1 self-center rounded-2xl bg-green-600 px-4 py-2 font-normal text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <HomeIcon className="mr-2 h-5 w-5 inline-flex" aria-hidden="true" />
            Return&nbsp;to&nbsp;Home
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default VisitorWelcome;
