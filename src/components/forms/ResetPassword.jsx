import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const handleResetPassword = () => {
    // Add form validation or API logic here if needed

    // Redirect to login page after reset
    navigate("/loginform");
  };

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

       
        <div className="w-full md:w-1/2 p-8 mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
            <p className="text-sm text-gray-600">
              Enter your new password so as to continue and login
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              New Password*
            </label>
            <input
              type="password"
              placeholder="Create New Password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Confirm New Password*
            </label>
            <input
              type="password"
              placeholder="Enter Password Again"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

        
          <div className="mb-6">
            <button
              onClick={handleResetPassword}
              className="w-full bg-[#005e0e] text-white py-2 rounded"
            >
              RESET PASSWORD
            </button>
          </div>

        
          <div className="text-center text-sm text-gray-600">
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

export default ResetPasswordForm;
