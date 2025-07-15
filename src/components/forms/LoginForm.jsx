import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/loginService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginUser({ email, password });

      if (result.result_code === 0) {
        const { access, refresh, user } = result.data;

        // Store tokens + user info
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("userRole", user.role);

        // Redirect based on role
        switch (user.role) {
          case "admin":
            navigate("/dashboard");
            break;
          case "tenant":
            // navigate("/tenant/dashboard"); // Enable when ready
            console.log("Tenant login successful – dashboard not ready.");
            break;
          case "security":
            // navigate("/security/dashboard"); // Enable when ready
            console.log("Security login successful – dashboard not ready.");
            break;
          default:
            throw new Error("Unknown role. Contact support.");
        }
      } else {
        throw new Error(result.message || "Login failed.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
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

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password*</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
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
                Forgot Password?
              </span>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            <div className="mb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#005e0e] text-white py-2 rounded hover:bg-green-700"
              >
                {loading ? "Signing In..." : "SIGN IN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
