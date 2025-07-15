import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authService } from "../../services/authService";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token, uid } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    const errors = { password: "", confirmPassword: "" };
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
    setFieldError(errors);
    return !errors.password && !errors.confirmPassword;
  };

  const handleResetPassword = async (evt) => {
    evt.preventDefault();
    setError("");
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const formData = { token, uid, new_password: password };
      await authService.password_reset(formData); // uncomment in real usage
      navigate("/loginform");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    if (fieldError.password) {
      setFieldError({ ...fieldError, password: "" });
    }
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (fieldError.confirmPassword) {
      setFieldError({ ...fieldError, confirmPassword: "" });
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row">
        {/* visual side omitted for brevity */}
        <div className="w-full md:w-1/2 p-8 mt-10">
          <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your new password to continue and login
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
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
