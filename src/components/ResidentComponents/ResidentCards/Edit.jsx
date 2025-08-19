// import React, { useState } from "react";

// const Edit = ({ initialData, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || "",
//     phone: initialData?.phone || "",
//     email: initialData?.email || "",
//     photo: initialData?.photo || "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//     // clear error on input change
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     onSave(formData);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-5"
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center border-b pb-3">
//         <h2 className="text-lg font-semibold text-gray-700">Visitor Details</h2>
//         <button
//           type="button"
//           onClick={onClose}
//           className="text-gray-500 hover:text-red-500"
//         >
//           ✕
//         </button>
//       </div>

//       <h3 className="text-md font-medium text-gray-600">Personal Information</h3>

//       {/* Name */}
//       <div>
//         <label className="block text-sm text-gray-600 mb-1">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Enter name"
//           className={`w-full border rounded-lg px-3 py-2 focus:ring outline-none ${
//             errors.name ? "border-red-500" : "focus:ring-blue-300"
//           }`}
//         />
//         {errors.name && (
//           <p className="text-sm text-red-500 mt-1">{errors.name}</p>
//         )}
//       </div>

//       {/* Phone */}
//       <div>
//         <label className="block text-sm text-gray-600 mb-1">Phone</label>
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="+254-712-345-678"
//           className={`w-full border rounded-lg px-3 py-2 focus:ring outline-none ${
//             errors.phone ? "border-red-500" : "focus:ring-blue-300"
//           }`}
//         />
//         {errors.phone && (
//           <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
//         )}
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block text-sm text-gray-600 mb-1">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="rnanjala@gmail.com"
//           className={`w-full border rounded-lg px-3 py-2 focus:ring outline-none ${
//             errors.email ? "border-red-500" : "focus:ring-blue-300"
//           }`}
//         />
//         {errors.email && (
//           <p className="text-sm text-red-500 mt-1">{errors.email}</p>
//         )}
//       </div>

//       {/* Photo */}
//       <div>
//         <label className="block text-sm text-gray-600 mb-1">Photo</label>
//         <div className="flex items-center justify-between border rounded-lg p-2">
//           <span className="text-sm text-gray-500">
//             {formData.photo ? formData.photo.name : "No file chosen"}
//           </span>
//           <label
//             htmlFor="photo-upload"
//             className="cursor-pointer text-blue-600 hover:underline text-sm"
//           >
//             Upload new photo
//           </label>
//           <input
//             id="photo-upload"
//             type="file"
//             name="photo"
//             onChange={handleChange}
//             className="hidden"
//           />
//         </div>
//       </div>

//       {/* Save Button */}
//       <button
//         type="submit"
//         className="w-full bg-green-700 text-white rounded-lg py-2 font-medium hover:bg-green-700 transition"
//       >
//         Save Information
//       </button>
//     </form>
//   );
// };

// export default Edit;
