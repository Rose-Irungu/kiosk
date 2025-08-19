// import React, { useState } from "react";
// import { submitEmergencyFeedback } from "../../services/emergencyFeedback";

// const FeedbackForm = () => {
//   const [response, setResponse] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async () => {
//     if (!response) {
//       alert("Please select whether the emergency was handled.");
//       return;
//     }

//     try {
//       const payload = {
//         emergencyHandled: response,
//         message: message || null,
//       };

//       const result = await submitEmergencyFeedback(payload);
//       console.log("Feedback submitted successfully", result);
//       alert("Thank you for your feedback!");
//       setResponse("");
//       setMessage("");
//     } catch (err) {
//       alert("There was an issue submitting your feedback.");
//     }
//   };

//   return (
//     <div className="bg-[#e6fbe9] rounded-[33px] p-7 flex flex-col gap-3 shadow-[0px_1px_15px_rgba(0,88,13,0.15)] max-w-[928px] mx-auto">
//       <div className="px-2.5 flex justify-center w-full">
//         <h1 className="text-center text-[22px] font-semibold text-black max-w-[540px]">
//           Please give your feedback for the fire drill
//         </h1>
//       </div>

//       <div className="px-[5.5px] flex flex-col gap-4 items-center w-full">
//         <div className="flex flex-col gap-2.5 w-full">
//           <label className="text-[22px] text-[#2d2264]">
//             Was the emergency well handled?*
//           </label>
//           <div className="flex flex-col gap-1.5">
//             {["yes", "no"].map((option) => (
//               <label key={option} className="flex items-center gap-2 cursor-pointer">
//                 <div
//                   className={`w-[28px] h-[28px] rounded-full border-2 ${
//                     response === option
//                       ? "border-green-600 bg-green-600"
//                       : "border-green-500"
//                   }`}
//                 >
//                   {response === option && (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <div className="w-3 h-3 bg-white rounded-full" />
//                     </div>
//                   )}
//                 </div>
//                 <span className="text-[22px] text-[#2d2264]">
//                   {option === "yes" ? "Yes" : "No"}
//                 </span>
//                 <input
//                   type="radio"
//                   name="emergency"
//                   value={option}
//                   className="hidden"
//                   onChange={(e) => setResponse(e.target.value)}
//                 />
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white border border-[#d1c9fa] rounded-[22px] p-3 w-full h-[177px]">
//           <textarea
//             placeholder="Write a message (Optional)"
//             className="w-full h-full resize-none text-[22px] text-[#2d226499] outline-none"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-[#005e0e] border border-[#e9e9e9] text-[#e9e9e9] text-[22px] font-semibold rounded-[17px] px-4 py-2 w-full h-[55px] hover:bg-green-700 transition-all"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default FeedbackForm;
