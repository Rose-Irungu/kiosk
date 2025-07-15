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
      await authService.sent_password_reset({'email' : email})
      navigate('/loginform')
    } catch (error) {
        console.log('-----------------error-----------'); 
    }
  }

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


        <div className="w-full md:w-1/2 p-8 mt-14">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Forgot Your Password?</h2>
            <p className="text-sm text-gray-600">
              Type the email you used to sign up on West Brook and we’ll send you
              a password reset email.
            </p>
          </div>

          <form onSubmit={handleOnSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
                placeholder="e.g john@gmail.com"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={email}
                onChange={handleEmailChange}
              />
            </div>


            <div className="mb-6">
              <button type="submit" onClick={handleOnSubmit} className="w-full bg-[#005e0e] text-white py-2 rounded ">
                SEND RESET EMAIL
              </button>
            </div>
          </form>



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

export default ForgotPasswordForm;
