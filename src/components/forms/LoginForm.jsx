import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative">
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

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              type="text"
              placeholder="Your Email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password*</label>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be 8 characters at least
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="accent-blue-[#005e0e]" />
              Remember me
            </label>
            <span className="text-sm text-[#005e0e] hover:underline cursor-pointer">
              <Link to='/forgotpassword'>
              Forgot Password?
              </Link>
            </span>
          </div>

          <div className="mb-4">
            <button className="w-full bg-[#005e0e] text-white py-2 rounded">
              SIGN IN
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/registrationform"
              className="text-[#005e0e] font-medium hover:underline"
            >
              REGISTER
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
