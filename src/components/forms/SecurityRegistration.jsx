import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout/Layout";
// import users from "../../services/user";

export default function SecurityRegistration() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {

            const formData = new FormData();
            formData.append("first_name", data.firstName);
            formData.append("last_name", data.lastName);
            formData.append("email", data.email);
            formData.append("phone_number", data.phone);
            formData.append("id_number", data.idNo);
            formData.append("unit_number", data.unitNumber);
            formData.append("num_people", data.numPeople);
            formData.append("password", data.password);
            formData.append("photo", data.photo[0]); // file

            formData.append("next_of_kin_full_name", data.nextOfKinName);
            formData.append("next_of_kin_relationship", data.nextOfKinRelationship);
            formData.append("next_of_kin_phone", data.nextOfKinPhone);
            formData.append("next_of_kin_email", data.nextOfKinEmail);

            const response = await users.addResident(formData);

            console.log("Resident added:", response);
            alert("Resident registered successfully!");
        } catch (error) {
            alert("Failed to register resident.");
        }
    };
    return (
        <Layout>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white w-full rounded-lg p-8 flex flex-col gap-8 shadow-lg border border-transparent"
            >
                {/* Title */}
                <h2 className="text-[#495057] text-2xl font-bold">Security Registration</h2>

                <div className="flex flex-col gap-12 w-full">
                    {/* Personal Info */}
                    <div className="flex flex-col gap-6 w-full">
                        {/* First + Last Name */}
                        <div className="flex gap-6 w-full">
                            <div className="flex flex-col gap-2 flex-1">
                                <label className="text-sm text-[#495057]">
                                    First Name <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g John"
                                    {...register("firstName", { required: "First name is required" })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.firstName ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.firstName && (
                                    <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label className="text-sm text-[#495057]">
                                    Last Name <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g Doe"
                                    {...register("lastName", { required: "Last name is required" })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.lastName ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.lastName && (
                                    <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#495057]">
                                Email <span className="text-[#f93162]">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="e.g johndoe@gmail.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                                })}
                                className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.email ? "border border-red-500" : ""
                                    }`}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>
                        {/* Phone, ID, Unit, Number of People */}
                        <div className="grid grid-cols-2 gap-6 w-full">
                            {/* Phone No. */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Phone No. <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="e.g 07XXXXXXXX"
                                    {...register("phone", { required: "Phone number is required" })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.phone ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-sm">{errors.phone.message}</span>
                                )}
                            </div>

                            {/* ID No. */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    ID No. <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g 35XXXXXX"
                                    {...register("idNo", { required: "ID number is required" })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.idNo ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.idNo && (
                                    <span className="text-red-500 text-sm">{errors.idNo.message}</span>
                                )}
                            </div>

                            {/* Unit Number */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Unit <span className="text-[#f93162]">*</span>
                                </label>

                                <input
                                    list="unitNumbers"
                                    {...register("unitNumber", { required: "Unit number is required" })}
                                    placeholder="Search or select unit"
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.unitNumber ? "border border-red-500" : ""
                                        }`}
                                />

                                <datalist id="unitNumbers">
                                    <option value="A-01" />
                                    <option value="A-02" />
                                    <option value="B-05A" />
                                    <option value="C-10" />
                                    <option value="D-12" />
                                </datalist>

                                {errors.unitNumber && (
                                    <span className="text-red-500 text-sm">{errors.unitNumber.message}</span>
                                )}
                            </div>

                            {/* Number of People */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Number of People <span className="text-[#f93162]">*</span>
                                </label>
                                <select
                                    {...register("numPeople", { required: "Please select the number of people" })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.numPeople ? "border border-red-500" : ""
                                        }`}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        -- Select --
                                    </option>
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                                {errors.numPeople && (
                                    <span className="text-red-500 text-sm">{errors.numPeople.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Password + Confirm Password */}
                        <div className="grid grid-cols-2 gap-6 w-full mt-6">
                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Password <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Create Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.password ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Confirm Password <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Re-enter password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) =>
                                            value === watch("password") || "Passwords do not match",
                                    })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.confirmPassword ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Upload Photo - single row */}
                        <div className="flex flex-col gap-2 w-full mt-6">
                            <label className="text-sm text-[#495057]">
                                Upload Photo <span className="text-[#f93162]">*</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo", {
                                    required: "A photo is required",
                                    validate: {
                                        fileType: (value) =>
                                            value?.[0]?.type?.startsWith("image/") || "Only image files are allowed",
                                    },
                                })}
                                className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none file:mr-4 file:py-2 file:px-4 
      file:rounded-lg file:border-0 file:text-sm file:font-semibold 
      file:bg-[#005e0e] file:text-white hover:file:opacity-90 
      ${errors.photo ? "border border-red-500" : ""}`}
                            />
                            {errors.photo && (
                                <span className="text-red-500 text-sm">{errors.photo.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Next of Kin Section */}
                    <div className="flex flex-col gap-6 w-full">
                        <h3 className="text-lg font-semibold text-[#495057]">Next of Kin Details</h3>
                        <h2 className="text-lg italic text-[#495057]">
                            This information will only be used in case of an emergency
                        </h2>

                        {/* Grid for fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Full Name <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    {...register("nextOfKinName", { required: "Full name is required" })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.nextOfKinName ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.nextOfKinName && (
                                    <span className="text-red-500 text-sm">{errors.nextOfKinName.message}</span>
                                )}
                            </div>

                            {/* Relationship */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Relationship <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Brother, Mother"
                                    {...register("nextOfKinRelationship", { required: "Relationship is required" })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.nextOfKinRelationship ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.nextOfKinRelationship && (
                                    <span className="text-red-500 text-sm">{errors.nextOfKinRelationship.message}</span>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Phone Number <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="e.g., 07XXXXXXXX"
                                    {...register("nextOfKinPhone", { required: "Phone number is required" })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.nextOfKinPhone ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.nextOfKinPhone && (
                                    <span className="text-red-500 text-sm">{errors.nextOfKinPhone.message}</span>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#495057]">
                                    Email <span className="text-[#f93162]">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="e.g johndoe@gmail.com"
                                    {...register("nextOfKinEmail", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                                    })}
                                    className={`bg-[#f4f4f4] rounded-lg px-3 py-2 h-12 outline-none ${errors.nextOfKinEmail ? "border border-red-500" : ""
                                        }`}
                                />
                                {errors.nextOfKinEmail && (
                                    <span className="text-red-500 text-sm">{errors.nextOfKinEmail.message}</span>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-[#005e0e] text-white rounded-lg h-12 w-full shadow-md hover:opacity-90 transition"
                    >
                        SUBMIT
                    </button>
                </div>
            </form>

        </Layout>
    );
}
