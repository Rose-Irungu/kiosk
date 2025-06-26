import React, { useState, useEffect } from "react";
import axios from "axios";

function VisitorRegForm() {
  // Track the input and the “ready-to-send” flag
  const [regNo, setRegNo] = useState("");
  const [pendingRegNo, setPendingRegNo] = useState(null);

  // Whenever pendingRegNo gets a value, push it to the API
  useEffect(() => {
    if (!pendingRegNo) return; // nothing to send yet

    const sendRegistration = async () => {
      try {
        await axios.post("/api/visitor/register", { regNo: pendingRegNo });
        console.log("✅ Registration sent:", pendingRegNo);
      } catch (err) {
        console.error("❌ Failed to send registration:", err);
      } finally {
        setPendingRegNo(null); // reset flag
      }
    };

    sendRegistration();
  }, [pendingRegNo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regNo.trim()) return;     // basic guard
    setPendingRegNo(regNo.trim()); // triggers the effect
    setRegNo("");                  // clear the field
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/*Image Pane */}
      <div className="relative flex-1">
        <img
          src="../../public/sample.jpg"
          alt="Visitor Registration"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/*Form Pane */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg border-transparent bg-white p-6 text-green-700 shadow-md"
      >
        <h2 className="text-left text-2xl font-normal">Submit your details below</h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="regno" className="mt-5 font-small text-green-400">
            Visitor registration number
          </label>
          <input
            id="regno"
            name="regno"
            type="text"
            required
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="rounded-xl border border-green-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-green-600 px-4 py-2 font-normal text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit
        </button>

        <p className="text-center text-purple-500">------------------------or------------------------</p>
        <p className="text-sm text-center text-green-500">
          Let security scan the QR code sent to your email
        </p>
      </form>
      </div>
    </div>
  );
}

export default VisitorRegForm;
