import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showSucess, setShowSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await authService.sent_password_reset({ email });

      if (res.result_code === 0) {
        
        setEmail("");
        setShowSuccess(true);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("Error sending reset email:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-[16px] w-full max-w-4xl flex flex-col md:flex-row overflow-hidden font-['Inter']">

          {/* Left Image Section */}
          <div className="w-full md:w-1/2 relative hidden md:block">
            <img
              src="rectangle-780.png"
              alt="Signup Visual"
              className="w-full h-full object-cover"
            />
            <img
              src="logo copy.svg"
              alt="West Brook Logo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] max-h-[200px] sm:max-h-[300px] lg:max-h-[500px] w-full h-auto animate-bounce-once"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-[50px]">
            <div className="w-full max-w-xs">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Forgot Your Password?</h2>
                <p className="text-xs text-gray-600">
                  Type the email you used to sign up on West Brook and we’ll send you a password reset email.
                </p>
              </div>

              <form onSubmit={handleOnSubmit} className="w-full">
                <div className="mb-6 mt-6">
                  <label className="block text-base font-medium mb-1">Your Email</label>
                  <input
                    type="email"
                    placeholder="e.g john@gmail.com"
                    className="px-4 py-2 w-full h-12 bg-[#F5F4F5] rounded-lg"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errorMessage && (
                    <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
                  )}
                </div>

                <div className="mt-6 mb-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" cursor-pointer shadow w-full h-12 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-lg"
                  // onClick={() => (setShowSuccess(true))}
                  >
                    {isSubmitting ? "SENDING..." : "SEND RESET LINK"}
                  </button>
                </div>
              </form>

              <div className="text-start text-sm text-gray-600">
                Go back to{" "}
                <Link to="/loginform" className="text-green-700 font-medium hover:underline">
                  LOGIN
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showSucess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">

          <div className="flex flex-col gap-4 items-center justify-center rounded-[24px] w-[346px] h-[281px] bg-[#FFFF] p-6">
            <img src="/pass-success.svg" alt="" />
            <p className="text-[#005E0E] text-lg/6 text-center font-medium ">Reset Link sent!<br />Check your inbox!</p>

            <div className="  border border-[#002706] rounded-2xl h-[36.8px] flex items-center hover:bg-[#002706] justify-center">
              <button onClick={() => {
                setShowSuccess(false);
                navigate("/loginform"); 
              }} className=" cursor-pointer flex items-center text-base p-4 font-medium text-[#002706] hover:text-white   rounded-2xl transition-colors duration-300">
                Go To Login
              </button>
            </div>

          </div>

        </div>


      )}
    </>
  );
};

export default ForgotPasswordForm;
