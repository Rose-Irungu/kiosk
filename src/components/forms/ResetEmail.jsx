import React from "react";
import { Link } from "react-router-dom";

const ResetEmailSent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row">
        
        {/* Left image */}
        <div className="w-full md:w-1/2 relative ">
          <img
            src="rectangle-780.png"
            alt="Signup Visual"
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
          <img
            src="logo copy.svg"
            alt="West Brook Logo"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] max-h-[200px] sm:max-h-[300px] lg:max-h-[500px] w-full h-auto animate-bounce-once"
          />
        </div>

        {/* Right content */}
        <div className="w-full md:w-1/2 p-8 mt-14">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Check Your Email</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              We’ll send an email to{" "}
              <span className="font-medium text-black">james@gmail.com</span>, if it’s associated with your account.
              <br />
              <br />
              Bear in mind it will be valid for <strong>30 minutes only</strong>.
            </p>
          </div>

          {/* Go back to login */}
          <div className="text-sm text-center text-gray-600">
            Go back to{" "}
            <Link
              to="/loginform"
              className="text-[#005e0e] font-medium hover:underline"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetEmailSent;
