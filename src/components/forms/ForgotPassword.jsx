import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.sent_password_reset({ 'email': email })
      navigate('/loginform')
    } catch (error) {
      console.log('-----------------error-----------');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-[16px] w-full max-w-4xl flex flex-col md:flex-row overflow-hidden font-['Inter']">

        {/* Left Image Section */}
        <div className="w-full md:w-1/2 relative">
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
        <div className="w-full md:w-1/2 p-15 mx-[37.5px] mt-[50px] mb-[50px] ">
          <div className="mb-6  ">
            <h2 className="text-2xl font-semibold mb-2 ">Forgot Your Password?</h2>
            <p className="text-xs text-gray-600">
              Type the email you used to sign up on West Brook and we’ll send you
              a password reset email.
            </p>
          </div>

          <form onSubmit={handleOnSubmit}>
            <div className="mb-6 mt-[30px]">
              <label className="block text-base font-medium mb-1">Your Email</label>
              <input
                type="email"
                placeholder="e.g john@gmail.com"
                className="flex items-center gap-2 px-4 py-2 w-[299px] h-12 bg-[#F5F4F5] rounded-lg"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="mt-[30px] mb-6">
              <button type="submit"
                onClick={handleOnSubmit} className="hover:bg-[#004a0b] transition-colors duration-200 text-sm flex items-center justify-center gap-2 px-6 w-[299px] h-12 bg-[#005E0E] text-white rounded-lg flex-grow">
                SEND RESET EMAIL
              </button>

              
            </div>
          </form>

          <div className="text-start text-sm text-gray-600">
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

export default ForgotPasswordForm;
