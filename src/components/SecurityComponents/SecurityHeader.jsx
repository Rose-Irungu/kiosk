
import { Search, X } from "lucide-react";

import React, { useState, useEffect } from "react";
import { authService } from "../../services/authService";
import { userService } from "../../services/user";

export default function Header({ setMobileOpen, profileOpen, setProfileOpen }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePasswordForm, setshowChangePasswordForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [userData, setUserData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    unit_number: "",
    id_number: "",
    role: "",
    fullName: "",
  });

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    // role:"",
    first_name: "",
    last_name: "",
    // email: "",
    phone_number: "",
    // id_number:"",
    // post:"",
    // unit_number: "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        const userDataFormatted = {
          id: user.id,
          role: user.role || "",
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          phone_number: user.phone_number || "",
          id_number: user.id_number || "",
          unit_number: user.unit_number || "",

          fullName:
            `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
            user.name ||
            "User",
        };
        setUserData(userDataFormatted);
        setEditFormData({
          first_name: userDataFormatted.first_name,
          last_name: userDataFormatted.last_name,
          phone_number: userDataFormatted.phone_number,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Handle edit form input changes
  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle edit form submission
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await userService.updateUser(userData.id, editFormData);

      const updatedUserData = {
        ...userData,
        ...editFormData,
        fullName: `${editFormData.first_name} ${editFormData.last_name}`.trim(),
      };

      setUserData(updatedUserData);

      const currentUserInfo = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
      );
      const updatedUserInfo = {
        ...currentUserInfo,
        first_name: editFormData.first_name,
        last_name: editFormData.last_name,
        email: editFormData.email,
        phone_number: editFormData.phone_number,
        residence: editFormData.residence,
      };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

      alert("Profile updated successfully!");
      setShowEditForm(false);
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    authService.logoutUser();
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (passwordErrors[field]) {
      setPasswordErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordForm.oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const errors = validatePasswordForm();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authService.changePassword({
        old_password: passwordForm.oldPassword,
        new_password: passwordForm.newPassword,
      });

      alert("Password changed successfully!");
      setshowChangePasswordForm(false);
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
    } catch (error) {
      if (error.message) {
        alert(error.message);
      } else {
        alert("Failed to change password. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-[#F5F4F5] shadow-sm w-full text-[13px]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="sm:hidden text-gray-700 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-lg md:text-xl font-bold hidden sm:block">
          West Brook Apartment
        </h1>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
        <div className="flex items-center w-full max-w-[200px] sm:w-[233px] px-4 py-[3px] gap-2.5 bg-white border border-[rgba(108,117,125,0.3)] rounded-md">
          <Search className="min-w-[16px]" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm">EN</p>

          {/* <div className="relative flex items-center justify-center">
            <button
              className="text-gray-600 hover:text-gray-800 relative"
              onClick={() => setShowNotification(!showNotification)}
            >
              <img src="/bell.svg" alt="" />
              <span
                className="absolute  -top-3 -right-3 text-white text-[7px]  "
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#005E0E",
                  borderRadius: "50%",
                  top: "0px",
                  right: "-1px",
                }}
              >
                3
              </span>
            </button>
          </div> */}

          <div className="relative transition-all duration-300 ease-in-out  hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] ">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 focus:outline-none "
            >
              <img src="/profile-user.svg" alt="" />
              <span className="hidden sm:inline text-sm text-[#495057] font-['Inter'] ">
                {userData.first_name || "User"}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-[195px] bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-lg flex flex-col p-2 z-50 font-['Inter']">
                <div className="flex items-center gap-2 w-full p-2 border-b border-gray-200">
                  <img src="/iconamoon_profile-circle-light.svg" alt="" />
                  <div className="flex flex-col">
                    <span className="font-medium text-[#00000]">
                      {userData.fullName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowProfileCard(true);
                    setProfileOpen(false);
                  }}
                  className="flex items-center w-full h-10 p-2 gap-3 rounded hover:bg-gray-100 transition"
                >
                  <img src="/Group.svg" alt="" />
                  <span className="text-sm text-[#495057]">View Profile</span>
                </button>
                <button
                  className="flex items-center w-full h-10 p-2 gap-2 rounded hover:bg-gray-100 transition"
                  onClick={handleLogout}
                >
                  <img src="/logout.svg" alt="Logout" />
                  <span className="text-sm text-[#495057]">Logout</span>
                </button>
              </div>
            )}

            {showProfileCard && (
              <div className="absolute top-full right-0 mt-2 z-50 w-[390px] h-[437px] bg-white shadow-lg rounded-2xl p-4 flex flex-col items-start">
                <button
                  onClick={() => setShowProfileCard(false)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition"
                  aria-label="Close Profile"
                >
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
                </button>

                <div className="flex flex-col gap-8 w-full max-w-[358px] h-[341px]">
                  <div className="flex items-center gap-6 pb-4 w-full max-w-[358px] h-[156px] border-b border-[#6C757D]/50 isolate">
                    <div className="w-[140px] h-[140px] rounded-full border border-[#005E0E] bg-gray-400 overflow-hidden relative">
                      {userData.photo ? (
                        <img
                          src={userData.photo}
                          alt="profile photo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className=" w-full h-full object-cover bg-gray-300 flex items-center justify-center text-xs text-white">
                          N/A
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-6 w-[194px] h-[120px] flex-grow z-[1]">
                      <div>
                        <h2 className="text-lg font-bold text-[#495057]">
                          {userData.fullName}
                        </h2>
                      </div>

                      <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm text-[#495057]">
                        <div>
                          Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        </div>
                        <div>{userData.phone_number || "Not provided"}</div>
                        <div>
                          Role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        </div>
                        <div>{userData.role}</div>
                        <div>
                          Post&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        </div>
                        <div>{userData.unit_number || "Not provided"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-6 px-2 w-full max-w-[358px] h-[153px]">
                    <h2 className="text-base font-semibold text-[#005E0E]">
                      Contact Information
                    </h2>

                    <div className="text-[#495057]">
                      Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {userData.phone_number || "Not provided"}
                    </div>

                    <div className="text-[#495057]">
                      Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {userData.email || "Not provided"}
                    </div>

                    <div className="text-[#495057]">
                      ID
                      No.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {userData.id_number || "Not provided"}
                    </div>

                    <div className="flex flex-row items-center gap-[30px] w-[342px] ">
                      <button
                        onClick={() => {
                          setEditFormData(userData);
                          setShowEditForm(true);
                        }}
                        className="font-['Inter'] flex justify-center items-center px-6 py-2 gap-[10px] w-[121px] h-[40px] border border-[#005E0E] rounded-[4px] text-[#005E0E] text-sm font-medium hover:bg-[#D5DFD7]"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => setshowChangePasswordForm(true)}
                        className=" font-['Inter'] font-light flex items-center justify-center px-6 py-2 gap-2 border border-[#005E0E] rounded-[4px] text-[#005E0E] text-sm font-medium whitespace-nowrap h-[40PX] hover:bg-[#D5DFD7]"
                      >
                        CHANGE PASSWORD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="absolute top-full right-[69px] mt-2 z-50 w-full max-w-[417px] flex flex-col items-start bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex flex-col items-start justify-between p-4 bg-[#005E0E] rounded-t-2xl w-full font-['Inter']">
            <p className="font-bold text-white text-xl">Notifications</p>
            <p className="text-white text-xs">1 Unread</p>
          </div>

          {/* Body: Scrollable only if needed */}
          <div className="w-full max-h-[60vh] overflow-y-auto">
            {/* Notification Row */}
            <div className="flex flex-row items-start p-4 gap-2 w-full bg-[#F5F4F5] border-b border-[#005E0E]/50 hover:bg-[#F5F4F5]">
              <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
                <img src="/oui-gear0.svg" alt="" />
              </div>

              <div className="flex flex-col items-start gap-2 font-['Inter'] w-full text-[#495057]">
                <p className="font-bold text-sm">Emergency triggered</p>
                <p className=" text-sm">
                  Panic Button activated by Gate 1 Officer
                </p>
                <p className=" text-xs">30 min ago</p>
              </div>
            </div>

            <div className="flex flex-row items-start p-4 gap-2 w-full bg-[#F5F4F5] border-b border-[#005E0E]/50">
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
                <img src="/oui-gear1.svg" alt="" />
              </div>

              <div className="flex flex-col items-start gap-2 font-['Inter'] w-full text-[#495057]">
                <p className="font-bold text-sm">Visitor Approved</p>
                <p className=" text-sm">Alison was approved by Resident B23 </p>
                <p className=" text-xs">1 hour ago</p>
              </div>
            </div>

            <div className="flex flex-row items-start p-4 gap-2 w-full bg-[#F5F4F5] border-b border-[#005E0E]/50">
              <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
                <img src="/oui-gear2.svg" alt="" />
              </div>

              <div className="flex flex-col items-start gap-2 font-['Inter'] w-full text-[#495057]">
                <p className="font-bold text-sm">System Update</p>
                <p className=" text-sm">
                  New Features are now available on your dashboard{" "}
                </p>
                <p className=" text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
          <div className="relative flex flex-col items-center p-4 gap-8 w-[383px] max-h-screen bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-[16px]">
            <button
              onClick={() => setShowEditForm(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition"
              aria-label="Close Edit Form"
            >
              <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
            </button>

            <h2 className="text-lg font-bold text-[#495057] font-['Inter']">
              Edit Profile
            </h2>

            <form
              onSubmit={handleEditFormSubmit}
              className="flex flex-col gap-4 w-full px-4 font-['Inter']"
            >
              <div>
                <label className="block text-sm  text-[#495057] mb-2">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Security"
                  value={editFormData.role}
                  onChange={(e) => handleEditFormChange("role", e.target.value)}
                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md  bg-[rgba(29,29,29,0.1)] "
                  readOnly
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-[#495057] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Daniel "
                    value={editFormData.first_name}
                    onChange={(e) =>
                      handleEditFormChange("first_name", e.target.value)
                    }
                    className="w-full h-[48px] px-4 py-2 border border-[#005E0E]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-[#495057] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Kipyegon"
                    value={editFormData.last_name}
                    onChange={(e) =>
                      handleEditFormChange("last_name", e.target.value)
                    }
                    className="w-full h-[48px] px-4 py-2 border border-[#005E0E]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm  text-[#495057] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="daniel@gmail.com"
                  value={editFormData.email}
                  onChange={(e) =>
                    handleEditFormChange("email", e.target.value)
                  }
                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-[#495057] mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="0712345678"
                    value={editFormData.phone_number}
                    onChange={(e) =>
                      handleEditFormChange("phone_number", e.target.value)
                    }
                    className="w-full h-[48px] px-4 py-2 border border-[#005E0E]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-[#495057] mb-2">
                    ID No.
                  </label>
                  <input
                    type="text"
                    placeholder="312345678"
                    value={editFormData.id_number}
                    onChange={(e) =>
                      handleEditFormChange("id_number", e.target.value)
                    }
                    className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md bg-[rgba(29,29,29,0.1)] "
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm  text-[#495057] mb-2">
                  Post
                </label>
                <input
                  type="text"
                  placeholder="Main Gate"
                  value={editFormData.residence}
                  onChange={(e) =>
                    handleEditFormChange("residence", e.target.value)
                  }
                  className=" flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border border-[#005E0E]/50 rounded-lg w-full px-4 py-2 border rounded-md bg-[rgba(29,29,29,0.1)] "
                  readOnly
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-[351px] h-[48px] mt-auto w-full ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-[#005E0E] hover:bg-green-700"
                } text-white py-2 rounded-md transition`}
              >
                {isSubmitting ? "UPDATING..." : "UPDATE PROFILE"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {/* {showChangePasswordForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
                    <div className="relative flex flex-col items-center p-4 gap-4 w-[383px] max-h-screen bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-[16px]">
                        <button
                            onClick={() => {
                                setshowChangePasswordForm(false);
                                setPasswordChangeStep(1);
                                setPasswordForm({
                                    oldPassword: "",
                                    newPassword: "",
                                    confirmPassword: "",
                                });
                                setPasswordErrors({});
                            }}
                            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition"
                            aria-label="Close Edit Form"
                        >
                            <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
                        </button>

                        <h2 className="text-lg font-bold text-[#495057] font-['Inter']">
                            {passwordChangeStep === 1 ? "Change Password" : "Change Password"}
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (passwordChangeStep === 1) {
                                    if (passwordForm.oldPassword) {
                                        setPasswordChangeStep(2);
                                    } else {
                                        setPasswordErrors({ oldPassword: "Please enter your current password" });
                                    }
                                } else {
                                    handlePasswordSubmit(e);
                                }
                            }}
                            className="flex flex-col gap-4 w-full px-4 font-['Inter']"
                        >
                            {passwordChangeStep === 1 ? (
                                <>
                                    <div>
                                        <label className="block text-sm text-[#495057] mb-2 text-center">
                                            Enter Current Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordForm.oldPassword}
                                            placeholder="Enter Current Password"
                                            onChange={(e) =>
                                                handlePasswordChange("oldPassword", e.target.value)
                                            }
                                            className={`flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border ${passwordErrors.oldPassword
                                                ? "border-red-500"
                                                : "border-[#005E0E]/50"
                                                } rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                                        />
                                        {passwordErrors.oldPassword && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {passwordErrors.oldPassword}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-row items-center gap-[30px] w-full mt-4 justify-between">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setshowChangePasswordForm(false);
                                                setPasswordForm({
                                                    oldPassword: "",
                                                    newPassword: "",
                                                    confirmPassword: "",
                                                });
                                            }}
                                            className="rounded-[4px] font-['Inter'] flex justify-center items-center px-6 py-2 w-[131px] h-[48px] border border-[#005E0E] text-[#005E0E] text-sm font-medium hover:bg-[#D5DFD7]"
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-[4px] font-['Inter'] text-white font-light flex items-center justify-center px-6 py-2 bg-[#005E0E] w-[131px] h-[48px] text-sm font-medium whitespace-nowrap hover:bg-[#38B000]"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm text-[#495057] mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordForm.newPassword}
                                            placeholder="Enter New Password"
                                            onChange={(e) =>
                                                handlePasswordChange("newPassword", e.target.value)
                                            }
                                            className={`flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border ${passwordErrors.newPassword
                                                ? "border-red-500"
                                                : "border-[#005E0E]/50"
                                                } rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                                        />
                                        {passwordErrors.newPassword && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {passwordErrors.newPassword}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[#495057] mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordForm.confirmPassword}
                                            placeholder="Re-enter Password"
                                            onChange={(e) =>
                                                handlePasswordChange("confirmPassword", e.target.value)
                                            }
                                            className={`flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border ${passwordErrors.confirmPassword
                                                ? "border-red-500"
                                                : "border-[#005E0E]/50"
                                                } rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                                        />
                                        {passwordErrors.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {passwordErrors.confirmPassword}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-[351px] h-[48px] mt-auto w-full ${isSubmitting
                                            ? "bg-gray-400"
                                            : "bg-[#005E0E] hover:bg-green-700"
                                            } text-white py-2 rounded-md transition`}
                                    >
                                        {isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            )} */}

      {/* Change Password Modal */}
      {showChangePasswordForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
          <div className="relative flex flex-col items-center p-4 gap-4 w-[383px] max-h-screen bg-white shadow-[0px_1px_20px_rgba(0,0,0,0.25)] rounded-[16px]">
            <button
              onClick={() => {
                setshowChangePasswordForm(false);
                setPasswordForm({
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                setPasswordErrors({});
              }}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition"
              aria-label="Close Edit Form"
            >
              <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
            </button>

            <h2 className="text-lg font-bold text-[#495057] font-['Inter']">
              Change Password
            </h2>

            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col gap-4 w-full px-4 font-['Inter']"
            >
              <div>
                <label className="block text-sm  text-[#495057] mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) =>
                    handlePasswordChange("oldPassword", e.target.value)
                  }
                  className={`flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border ${
                    passwordErrors.oldPassword
                      ? "border-red-500"
                      : "border-[#005E0E]/50"
                  } rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                />
                {passwordErrors.oldPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passwordErrors.oldPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm  text-[#495057] mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                  className={`flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border ${
                    passwordErrors.newPassword
                      ? "border-red-500"
                      : "border-[#005E0E]/50"
                  } rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm  text-[#495057] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                  className={`flex flex-row items-center px-4 py-2 gap-2 w-[351px] h-[48px] border ${
                    passwordErrors.confirmPassword
                      ? "border-red-500"
                      : "border-[#005E0E]/50"
                  } rounded-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-[351px] h-[48px] mt-auto w-full ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-[#005E0E] hover:bg-green-700"
                } text-white py-2 rounded-md transition`}
              >
                {isSubmitting ? "CHANGING PASSWORD..." : "CHANGE PASSWORD"}
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
