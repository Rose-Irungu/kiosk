import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authService } from "../../services/authService";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token, uid } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setFieldError((prev) => ({ ...prev, password: "" }));
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setFieldError((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldError(errors);
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      await authService.password_reset({
        uid,
        token,
        new_password: password,
      });

      navigate("/loginform");
    } catch (error) {
      // Extract server-side token validation errors if present
      if (
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.token
      ) {
        const tokenErrors = error.response.data.data.token.join(" ");
        setServerError(tokenErrors);
      } else {
        setServerError("Password reset failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleResetPassword} className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 relative">
          <img
            src="/rectangle-780.png"
            alt="Signup Visual"
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
          <img
            src="/logo copy.svg"
            alt="West Brook Logo"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] max-h-[200px] sm:max-h-[300px] lg:max-h-[500px] w-full h-auto animate-bounce-once"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 mt-10 ">
          <div className="mb-6">
            <h2 className="text-2xl font-DM Sans font-bold text-[#445963] mb-2">Reset Password</h2>
            <p className="text-m text-[#445963]">
              Enter your new password so as to <br /> continue and login
            </p>
          </div>

          {serverError && (
            <p className="text-red-600 text-sm mb-4">{serverError}</p>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">New Password*</label>
            <input
              type="password"
              placeholder="Create New Password"
              className={`w-full border rounded px-3 py-2 ${fieldError.password && "border-red-500"}`}
              value={password}
              onChange={onPasswordChange}
            />
            {fieldError.password && (
              <p className="text-red-600 text-sm mt-1">{fieldError.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Confirm New Password*</label>
            <input
              type="password"
              placeholder="Enter Password Again"
              className={`w-full border rounded px-3 py-2 ${fieldError.confirmPassword && "border-red-500"}`}
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
            {fieldError.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{fieldError.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#005e0e] text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? "RESETTING..." : "RESET PASSWORD"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Go back to{" "}
            <Link to="/loginform" className="text-[#005e0e] font-medium hover:underline">
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
